'use client';

import AccountAge from '@/components/AccountAge';
import BigStat from '@/components/BigStat';
import FinalCard from '@/components/FinalCard';
import Landing from '@/components/Landing';
import LoadingScreen from '@/components/LoadingScreen';
import PersonaReveal from '@/components/PersonaReveal';
import ProductDetail from '@/components/ProductDetail';
import ProgressBar from '@/components/ProgressBar';
import SupportedProducts from '@/components/SupportedProducts';
import UserInput from '@/components/UserInput';
import { AnimatePresence, motion } from 'framer-motion';
import { Fingerprint, Globe, Rocket, Search, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getMakers } from './actions/getMakers';
import { getUserData, TUserData } from './actions/getUserData';

const PERSONAS = [
  { name: 'The Blitzscaler', desc: 'You ship fast and scale hard.' },
  {
    name: 'The Global Contender',
    desc: 'Cracking the yearly top 1000 is no small feat.',
  },
  {
    name: 'The Community Pillar',
    desc: 'High engagement and consistent reviews.',
  },
  {
    name: 'The Serial Maker',
    desc: "You don't just launch; you iterate with precision.",
  },
];

const NARRATIVES = [
  "You didn't just build, you dominated.",
  '2025: The year of the 5-star builder.',
  'The leaderboard is starting to recognize you.',
];

const Home = () => {
  const [API_DATA, setAPI_DATA] = useState<TUserData | null>(null);
  const [step, setStep] = useState(-2);
  const [token, setToken] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState('Scanning API...');
  const [recentMakers, setRecentMakers] = useState<string[]>([]);

  const TOTAL_STEPS = 11;
  const next = () => step < TOTAL_STEPS && setStep(s => s + 1);
  const prev = () => step > 0 && setStep(s => s - 1);

  const startAnalysis = () => {
    setAnalyzing(true);
    const sequence = [
      'Analyzing Vote Velocity...',
      'Cross-referencing Yearly Ranks...',
      'Checking Topic Diversity...',
      'Identity Confirmed.',
    ];
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setAnalysisText(text);
        if (i === sequence.length - 1) {
          setTimeout(() => {
            setAnalyzing(false);
            setStep(10);
          }, 1000);
        }
      }, i * 1200);
    });
  };

  const handleDbSubmit = async () => {
    if (!token) return;
    const data = await getUserData(token);
    setAPI_DATA(data);
    setStep(-1);
  };

  useEffect(() => {
    const fetchMakers = async () => {
      const makers = await getMakers();
      setRecentMakers(
        makers.map((maker: { username: string }) => maker.username)
      );
    };
    fetchMakers();
  }, []);

  const selectPersona = () => {
    if (!API_DATA) return PERSONAS[0];
    const user = API_DATA.data.viewer.user;
    const madePosts = user.madePosts.nodes ?? [];
    const votes = madePosts.reduce(
      (sum, p) => sum + (typeof p.votesCount === 'number' ? p.votesCount : 0),
      0
    );
    if (madePosts.length >= 5) return PERSONAS[3];
    if (votes >= 1000) return PERSONAS[0];
    if (
      madePosts.some(
        p => typeof p.yearlyRank === 'number' && p.yearlyRank < 1000
      )
    )
      return PERSONAS[1];
    if (votes >= 300) return PERSONAS[5];
    return PERSONAS[2];
  };

  return (
    <main className='relative min-h-screen bg-black text-white font-sans overflow-hidden select-none'>
      <AnimatePresence mode='wait'>
        {step === -2 ? (
          <div key='input-container' className='relative w-full h-full'>
            <UserInput
              token={token}
              setToken={setToken}
              recentMakers={recentMakers}
              onSubmit={handleDbSubmit}
            />
          </div>
        ) : step === -1 ? (
          <Landing setStep={setStep} />
        ) : analyzing ? (
          <LoadingScreen text={analysisText} />
        ) : (
          <motion.div
            key='story'
            className='relative z-10 h-screen flex flex-col'
          >
            <ProgressBar current={step} total={TOTAL_STEPS} />
            <div
              className='flex-1 flex items-center justify-center p-6'
              onClick={e => {
                const target = e.target as HTMLElement;
                if (target.closest('button')) return;
                if (e.clientX > window.innerWidth / 2) {
                  step === 9 ? startAnalysis() : next();
                } else {
                  prev();
                }
              }}
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className='w-full max-w-lg'
                >
                  {step === 0 && (
                    <BigStat
                      label='The 2025 Summary'
                      val={API_DATA?.data.viewer.user.madePosts.totalCount || 0}
                      sub='Products Launched'
                      icon={<Rocket className='text-[#FF6154]' />}
                    />
                  )}
                  {step === 1 && API_DATA && (
                    <AccountAge
                      createdAt={API_DATA.data.viewer.user.createdAt}
                    />
                  )}
                  {step === 2 && API_DATA && (
                    <SupportedProducts
                      count={API_DATA.data.viewer.user.votedPosts.totalCount}
                    />
                  )}
                  {(() => {
                    const nodes =
                      API_DATA?.data.viewer.user.madePosts.nodes ?? [];
                    const productIndex = step - 3;
                    if (
                      nodes.length > 0 &&
                      productIndex >= 0 &&
                      productIndex < nodes.length &&
                      productIndex < 3
                    )
                      return <ProductDetail product={nodes[productIndex]} />;
                    return null;
                  })()}
                  {step === 6 && (
                    <BigStat
                      label='The Hunter Mindset'
                      val={
                        API_DATA?.data.viewer.user.submittedPosts.totalCount ||
                        0
                      }
                      sub='Posts Found & Submitted'
                      icon={<Search className='text-blue-400' />}
                    />
                  )}
                  {step === 7 &&
                    (() => {
                      const nodes =
                        API_DATA?.data?.viewer?.user?.madePosts?.nodes ?? [];
                      if (nodes.length === 0) return null;
                      const bestProduct = [...nodes]
                        .filter(p => typeof p.yearlyRank === 'number')
                        .sort(
                          (a, b) =>
                            (a.yearlyRank ?? Infinity) -
                            (b.yearlyRank ?? Infinity)
                        )[0];
                      return (
                        <div className='text-center'>
                          <Globe
                            size={80}
                            className='mx-auto mb-8 text-[#FF6154] animate-pulse'
                          />
                          <div className='text-8xl font-black italic'>
                            #{bestProduct?.yearlyRank ?? '—'}
                          </div>
                          <div className='text-white/40 font-bold uppercase tracking-widest mt-4 text-xs'>
                            Global Yearly Rank ({bestProduct?.name ?? '—'})
                          </div>
                        </div>
                      );
                    })()}
                  {step === 8 &&
                    (() => {
                      const nodes =
                        API_DATA?.data?.viewer?.user?.madePosts?.nodes ?? [];
                      const totalVotes = nodes.reduce(
                        (sum, p) =>
                          sum +
                          (typeof p.votesCount === 'number' ? p.votesCount : 0),
                        0
                      );
                      return (
                        <BigStat
                          label='The Crowd Roared'
                          val={totalVotes}
                          sub='Total Upvotes across 2025'
                          icon={
                            <Zap
                              className='text-yellow-400'
                              fill='currentColor'
                            />
                          }
                        />
                      );
                    })()}
                  {step === 9 && (
                    <div className='text-center'>
                      <div className='text-white/40 mb-10 text-sm font-medium uppercase tracking-widest leading-relaxed'>
                        "
                        {
                          NARRATIVES[
                            Math.floor(Math.random() * NARRATIVES.length)
                          ]
                        }
                        "
                      </div>
                      <div className='w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <Fingerprint size={40} className='text-[#FF6154]' />
                      </div>
                      <h2 className='text-2xl font-black italic'>
                        Reveal My Persona
                      </h2>
                      <p className='text-[10px] text-white/20 mt-4 uppercase font-bold tracking-[0.2em]'>
                        Tap to reveal
                      </p>
                    </div>
                  )}
                  {step === 10 && <PersonaReveal persona={selectPersona()} />}
                  {step === 11 &&
                    (() => {
                      const user = API_DATA?.data.viewer.user;
                      const nodes = user?.madePosts.nodes ?? [];
                      const totalVotes = nodes.reduce(
                        (sum, p) =>
                          sum +
                          (typeof p.votesCount === 'number' ? p.votesCount : 0),
                        0
                      );
                      const bestProduct = [...nodes]
                        .filter(p => typeof p.dailyRank === 'number')
                        .sort(
                          (a, b) =>
                            (a.dailyRank ?? Infinity) -
                            (b.dailyRank ?? Infinity)
                        )[0];
                      return (
                        <FinalCard
                          username={user?.username || ''}
                          onReset={() => setStep(-2)}
                          avatar={user?.profileImage || ''}
                          totalVotes={totalVotes}
                          bestRank={
                            bestProduct
                              ? `#${bestProduct.dailyRank} Daily`
                              : '—'
                          }
                          globalRank={
                            bestProduct?.yearlyRank
                              ? `#${bestProduct.yearlyRank}`
                              : '—'
                          }
                          persona={selectPersona().name}
                        />
                      );
                    })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;
