'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Plus, Loader2 } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { submitSuggestion } from '@/app/actions/submit-suggestion';
import { addUpvote } from '@/app/actions/add-upvote';

interface Suggestion {
  id: string;
  title: string;
  code: string;
  status: string;
  upvotes: { id: string }[];
}

export default function Roadmap({
  initialFeatures,
}: {
  initialFeatures: Suggestion[];
}) {
  const [suggestion, setSuggestion] = useState('');
  const [isPending, startTransition] = useTransition();

  const [votedIds, setVotedIds] = useState<string[]>([]);

  useEffect(() => {
    const syncStorage = () => {
      const savedVotes = localStorage.getItem('user_votes');
      if (savedVotes) {
        try {
          const parsed = JSON.parse(savedVotes);

          setVotedIds(parsed);
        } catch {
          console.error('STORAGE_SYNC_ERROR');
        }
      }
    };

    syncStorage();
  }, []);

  const handleAddFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion || isPending) return;

    startTransition(async () => {
      const result = await submitSuggestion(suggestion);
      if (result.success) {
        setSuggestion('');
      }
    });
  };

  const handleVote = async (id: string) => {
    if (votedIds.includes(id)) return;

    const newVotes = [...votedIds, id];
    setVotedIds(newVotes);
    localStorage.setItem('user_votes', JSON.stringify(newVotes));

    await addUpvote(id);
  };

  return (
    <main className='min-h-screen bg-black text-white font-mono selection:bg-[#FF6154] selection:text-white'>
      <div
        className='fixed inset-0 opacity-[0.05] pointer-events-none'
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className='relative max-w-7xl mx-auto px-8 py-16'>
        <nav className='flex justify-between items-start mb-32'>
          <Link
            href='/'
            className='flex items-center gap-2 border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all group'
          >
            <ArrowLeft
              size={14}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span className='text-[10px] font-bold uppercase tracking-tighter'>
              Exit_System
            </span>
          </Link>
          <div className='text-right'>
            <div className='text-[#FF6154] text-xs font-bold leading-none mb-1'>
              ROADMAP_v2.0.26
            </div>
            <div className='text-white/20 text-[10px] uppercase tracking-widest'>
              Status: Open_Protocol
            </div>
          </div>
        </nav>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40'>
          <div>
            <h1 className='text-8xl md:text-[10rem] font-black italic uppercase leading-[0.8] tracking-tighter'>
              Build <br /> <span className='text-[#FF6154]'>Next.</span>
            </h1>
          </div>
          <div className='flex flex-col justify-end gap-8'>
            <p className='text-white/40 text-sm leading-relaxed max-w-sm font-sans italic'>
              2025 was a snapshot. 2026 is the full feature. Submit your
              protocols below to influence the master build.
            </p>
            <form onSubmit={handleAddFeature} className='relative group'>
              <input
                value={suggestion}
                onChange={e => setSuggestion(e.target.value)}
                disabled={isPending}
                className='w-full bg-transparent border-b-4 border-white/10 py-4 pr-12 text-2xl font-black uppercase outline-none focus:border-[#FF6154] transition-all disabled:opacity-50 placeholder:text-white/5'
                placeholder={isPending ? 'INITIALIZING...' : 'PROPOSE_MODULE'}
              />
              <button
                type='submit'
                disabled={isPending || !suggestion}
                className='absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#FF6154] transition-colors'
              >
                {isPending ? (
                  <Loader2 className='animate-spin' size={24} />
                ) : (
                  <Plus size={32} />
                )}
              </button>
            </form>
          </div>
        </section>

        <section className='border-t border-white/10'>
          {initialFeatures?.map((f, i) => {
            const hasVoted = votedIds.includes(f.id);
            const voteCount = f.upvotes.length;

            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='group border-b border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.01] transition-all px-4'
              >
                <div className='flex items-center gap-12'>
                  <span className='text-white/10 text-4xl font-black italic'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className='flex items-center gap-3 mb-2'>
                      <span className='text-[#FF6154] text-[9px] font-bold border border-[#FF6154] px-2 py-0.5 tracking-tighter'>
                        {f.status}
                      </span>
                      <span className='text-white/20 text-[9px] font-bold tracking-widest uppercase'>
                        {f.code}
                      </span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-[#FF6154] transition-colors leading-none'>
                      {f.title}
                    </h2>
                  </div>
                </div>

                <div className='flex items-center gap-6 self-end md:self-center'>
                  <div className='text-right'>
                    <motion.div
                      key={voteCount}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className='text-2xl font-black italic leading-none'
                    >
                      {voteCount}
                    </motion.div>
                    <div className='text-[9px] font-bold text-white/20 uppercase tracking-widest'>
                      Confirmed_Votes
                    </div>
                  </div>

                  <button
                    onClick={() => handleVote(f.id)}
                    disabled={hasVoted}
                    className={`w-16 h-16 flex items-center justify-center border-2 transition-all duration-300 ${
                      hasVoted
                        ? 'bg-[#FF6154] border-[#FF6154] text-white shadow-[0_0_30px_rgba(255,97,84,0.4)]'
                        : 'border-white/10 hover:border-white text-white/20 hover:text-white'
                    }`}
                  >
                    <Zap
                      size={24}
                      fill={hasVoted ? 'currentColor' : 'none'}
                      className={
                        hasVoted ? 'scale-110 animate-pulse' : 'scale-100'
                      }
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </section>

        <footer className='mt-40 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20 border-t border-white/5 pt-8'>
          <div className='space-y-2'>
            <div className='text-[10px] font-black uppercase'>System_Load</div>
            <div className='h-1 bg-white/10 w-full overflow-hidden'>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className='h-full bg-white w-1/4'
              />
            </div>
          </div>
          <div className='space-y-2 text-[10px] font-black uppercase'>
            <div>Encryption: DISABLED</div>
            <div>Auth: OPEN_ACCESS</div>
          </div>
          <div className='space-y-2 text-[10px] font-black uppercase md:col-span-2 text-right italic'>
            Product_Hunt_Wrapped_2026
          </div>
        </footer>
      </div>
    </main>
  );
}
