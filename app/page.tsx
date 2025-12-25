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
import {
  Fingerprint,
  Globe,
  Rocket,
  Search,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { getMakers } from './actions/getMakers';
import { getUserData, TUserData } from './actions/getUserData';

const PERSONAS = {
  LEGEND: {
    name: 'The Industry Legend',
    desc: 'Top tier ranks and massive community trust. You define Product Hunt.',
  },
  BLITZSCALER: {
    name: 'The Blitzscaler',
    desc: 'You ship fast, scale hard, and dominate the daily leaderboards.',
  },
  GLOBAL: {
    name: 'The Global Contender',
    desc: 'Cracking the yearly top 1000 is a feat reserved for the elite.',
  },
  SERIAL: {
    name: 'The Serial Maker',
    desc: "You don't just launch; you iterate with surgical precision.",
  },
  PILLAR: {
    name: 'The Community Pillar',
    desc: 'High engagement, consistent support, and a bedrock of the ecosystem.',
  },
  HUNTER: {
    name: 'The Apex Hunter',
    desc: 'You have an eye for greatness, discovering the next big things.',
  },
  ARCHITECT: {
    name: 'The Growth Architect',
    desc: 'Every launch you touch is a masterclass in strategic execution.',
  },
  NEWBIE: {
    name: 'The Rising Star',
    desc: '2025 was just the beginning. The ecosystem is starting to notice.',
  },
};

const NARRATIVES = [
  "You didn't just build, you dominated.",
  '2025: The year your roadmap met reality.',
  'The leaderboard is starting to recognize your name.',
  'A year of grit, shipping, and 5-star reviews.',
  "You turned 'Hello World' into a movement this year.",
  'Your 2025 stats are looking like a hockey stick growth curve.',
  "The ecosystem is louder because you're in it.",
  'Calculated moves. Relentless shipping.',
];

const Home = () => {
  const [API_DATA, setAPI_DATA] = useState<TUserData | null>(null);
  const [step, setStep] = useState(-2);
  const [token, setToken] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: For button loading
  const [submitError, setSubmitError] = useState<string | null>(null); // NEW: For error handling
  const [analysisText, setAnalysisText] = useState('Scanning API...');
  const [recentMakers, setRecentMakers] = useState<string[]>([]);

  const slides = useMemo(() => {
    if (!API_DATA) return [];
    const user = API_DATA.data.viewer.user;
    const nodes = user.madePosts.nodes ?? [];
    const activeSlides: string[] = [];
    activeSlides.push('summary', 'age');
    if (user.votedPosts.totalCount > 0) activeSlides.push('support');
    nodes.slice(0, 3).forEach((_, i) => activeSlides.push(`product-${i}`));
    if (user.submittedPosts.totalCount > 0) activeSlides.push('hunter');
    if (nodes.some(p => typeof p.yearlyRank === 'number'))
      activeSlides.push('rank');
    const totalVotes = nodes.reduce((sum, p) => sum + (p.votesCount || 0), 0);
    if (totalVotes > 0) activeSlides.push('votes');
    activeSlides.push('persona-trigger', 'persona-reveal', 'final');
    return activeSlides;
  }, [API_DATA]);

  const TOTAL_STEPS = slides.length - 1;

  const next = () => step < TOTAL_STEPS && setStep(s => s + 1);
  const prev = () => step > 0 && setStep(s => s - 1);

  const startAnalysis = () => {
    setAnalyzing(true);
    const sequence = [
      'Analyzing Vote Velocity...',
      'Cross-referencing Yearly Ranks...',
      'Synthesizing Community Impact...',
      'Identity Confirmed.',
    ];
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setAnalysisText(text);
        if (i === sequence.length - 1) {
          setTimeout(() => {
            setAnalyzing(false);
            const revealIndex = slides.indexOf('persona-reveal');
            setStep(revealIndex);
          }, 1000);
        }
      }, i * 1200);
    });
  };

  const handleDbSubmit = async () => {
    if (!token) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = await getUserData(token);

      // Basic validation if the API returns an error or no user
      if (!data || !data.data?.viewer?.user) {
        throw new Error('Invalid Token');
      }

      setAPI_DATA(data);
      setStep(-1);
    } catch (err) {
      console.error(err);
      setSubmitError('Invalid token or connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
    if (!API_DATA) return PERSONAS.NEWBIE;
    const user = API_DATA.data.viewer.user;
    const madePosts = user.madePosts.nodes ?? [];
    const totalVotes = madePosts.reduce(
      (sum, p) => sum + (p.votesCount || 0),
      0
    );
    const hunts = user.submittedPosts.totalCount || 0;
    const products = user.madePosts.totalCount || 0;
    const bestYearly = Math.min(...madePosts.map(p => p.yearlyRank || 9999));

    if (products > 3 && totalVotes > 2000 && bestYearly < 500)
      return PERSONAS.LEGEND;
    if (bestYearly < 1000) return PERSONAS.GLOBAL;
    if (products >= 5) return PERSONAS.SERIAL;
    if (totalVotes > 1000) return PERSONAS.BLITZSCALER;
    if (hunts > products && hunts > 5) return PERSONAS.HUNTER;
    if (user.votedPosts.totalCount > 100) return PERSONAS.PILLAR;
    if (products >= 1) return PERSONAS.ARCHITECT;
    return PERSONAS.NEWBIE;
  };

  const currentSlideType = slides[step] || '';

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

            {/* NEW: Global Error Toast for UserInput */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className='fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] bg-red-500/10 border border-red-500/50 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold'
                >
                  <AlertCircle size={18} />
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* NEW: Global Loading Overlay */}
            {isSubmitting && (
              <div className='fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-12 h-12 border-4 border-[#FF6154]/20 border-t-[#FF6154] rounded-full animate-spin' />
                  <p className='text-[10px] font-black uppercase tracking-[0.3em] text-white/40'>
                    Fetching your 2025...
                  </p>
                </div>
              </div>
            )}
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
                if (target.closest('button') || target.closest('a')) return;
                if (e.clientX > window.innerWidth / 2) {
                  currentSlideType === 'persona-trigger'
                    ? startAnalysis()
                    : next();
                } else {
                  prev();
                }
              }}
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentSlideType}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className='w-full max-w-lg'
                >
                  {currentSlideType === 'summary' && (
                    <BigStat
                      label='The 2025 Summary'
                      val={API_DATA?.data.viewer.user.madePosts.totalCount || 0}
                      sub='Products Launched'
                      icon={<Rocket className='text-[#FF6154]' />}
                    />
                  )}
                  {currentSlideType === 'age' && API_DATA && (
                    <AccountAge
                      createdAt={API_DATA.data.viewer.user.createdAt}
                    />
                  )}
                  {currentSlideType === 'support' && API_DATA && (
                    <SupportedProducts
                      count={API_DATA.data.viewer.user.votedPosts.totalCount}
                    />
                  )}
                  {currentSlideType.startsWith('product-') &&
                    (() => {
                      const index = parseInt(currentSlideType.split('-')[1]);
                      const product =
                        API_DATA?.data.viewer.user.madePosts.nodes[index];
                      return product ? (
                        <ProductDetail product={product} />
                      ) : null;
                    })()}
                  {currentSlideType === 'hunter' && (
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
                  {currentSlideType === 'rank' &&
                    (() => {
                      const nodes =
                        API_DATA?.data?.viewer?.user?.madePosts?.nodes ?? [];
                      const bestProduct = [...nodes]
                        .filter(p => typeof p.yearlyRank === 'number')
                        .sort(
                          (a, b) => (a.yearlyRank || 0) - (b.yearlyRank || 0)
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
                  {currentSlideType === 'votes' &&
                    (() => {
                      const nodes =
                        API_DATA?.data?.viewer?.user?.madePosts?.nodes ?? [];
                      const totalVotes = nodes.reduce(
                        (sum, p) => sum + (p.votesCount || 0),
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
                  {currentSlideType === 'persona-trigger' && (
                    <div className='text-center'>
                      <div className='text-white/40 mb-10 text-sm font-medium uppercase tracking-widest leading-relaxed px-4'>
                        "
                        {
                          NARRATIVES[
                            Math.floor(
                              (API_DATA?.data.viewer.user.username.length ||
                                0) % NARRATIVES.length
                            )
                          ]
                        }
                        "
                      </div>
                      <div className='w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <Fingerprint size={40} className='text-[#FF6154]' />
                      </div>
                      <h2 className='text-2xl font-black italic'>
                        REVEAL MY PERSONA
                      </h2>
                      <p className='text-[10px] text-white/20 mt-4 uppercase font-bold tracking-[0.2em] animate-bounce'>
                        Tap to analyze
                      </p>
                    </div>
                  )}
                  {currentSlideType === 'persona-reveal' && (
                    <PersonaReveal persona={selectPersona()} />
                  )}
                  {currentSlideType === 'final' &&
                    (() => {
                      const user = API_DATA?.data.viewer.user;
                      const nodes = user?.madePosts.nodes ?? [];
                      const totalVotes = nodes.reduce(
                        (sum, p) => sum + (p.votesCount || 0),
                        0
                      );
                      const bestProduct = [...nodes].sort(
                        (a, b) => (a.dailyRank || 999) - (b.dailyRank || 999)
                      )[0];
                      return (
                        <FinalCard
                          username={user?.username || ''}
                          onReset={() => {
                            setToken('');
                            setStep(-2);
                            setSubmitError(null);
                          }}
                          avatar={user?.profileImage || ''}
                          totalVotes={totalVotes}
                          bestRank={
                            bestProduct?.dailyRank
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
