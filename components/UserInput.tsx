'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  HelpCircle,
  X,
  ExternalLink,
  Zap,
  Copy,
  Check,
  PlayCircle,
  Loader2,
} from 'lucide-react';
import UserMarquee from './UserMarquee';
import { Dispatch, SetStateAction, useState } from 'react';

type TUserInputProps = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  recentMakers: string[];
  onSubmit: () => Promise<void>;
};

const UserInput = ({
  token,
  setToken,
  recentMakers,
  onSubmit,
}: TUserInputProps) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const copyRedirect = () => {
    navigator.clipboard.writeText('https://product-hunt-wrap.vercel.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModalClose = () => {
    setIsHelpOpen(false);
    setIsVideoLoading(true); // Reset for next time it opens
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='h-screen flex flex-col items-center justify-between bg-black relative overflow-hidden'
    >
      {/* Background Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6154]/5 blur-[120px] rounded-full' />
      </div>

      <div className='w-full pt-12 z-10'>
        <div className='text-[10px] font-black uppercase tracking-[0.3em] text-center text-white/20 mb-4'>
          Recently Wrapped
        </div>
        <UserMarquee items={recentMakers} />
      </div>

      <div className='w-full max-w-md px-8 z-20 space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-6xl font-black italic uppercase tracking-tighter leading-none'>
            Find Your <br />
            <span className='text-[#FF6154]'>Rank.</span>
          </h1>
          <p className='text-white/40 text-sm font-medium max-w-[280px] mx-auto'>
            Join the leaderboard of 2025 makers.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-[#FF6154] to-orange-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000'></div>
            <div className='relative'>
              <span className='absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-black text-xl'>
                @
              </span>
              <input
                autoFocus
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder='Developer Token'
                className='w-full bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl py-6 pl-12 pr-16 text-xl font-bold focus:outline-none focus:border-[#FF6154] transition-all placeholder:text-white/10'
                onKeyDown={e => e.key === 'Enter' && token && onSubmit()}
                type='password'
              />
              <button
                onClick={() => token && onSubmit()}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed ${
                  token
                    ? 'bg-[#FF6154] text-white scale-100'
                    : 'bg-white/5 text-white/20 scale-90'
                }`}
                disabled={!token}
              >
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsHelpOpen(true)}
            className='flex items-center justify-center gap-2 w-full text-[#FF6154] transition-colors group underline underline-offset-4 decoration-[#FF6154]/30'
          >
            <PlayCircle
              size={14}
              className='group-hover:scale-110 transition-transform'
            />
            <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
              Watch Tutorial: How to get token
            </span>
          </button>
        </div>
      </div>

      <div className='w-full pb-12 z-10'>
        <UserMarquee items={recentMakers} reverse={true} />
      </div>

      {/* HELP MODAL */}
      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6'
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='max-w-4xl w-full bg-neutral-900 border border-white/10 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row'
            >
              <button
                onClick={handleModalClose}
                className='absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white transition-colors border border-white/10'
              >
                <X size={20} />
              </button>

              {/* Video Section with Loader */}
              <div className='w-full md:w-3/5 bg-black flex items-center justify-center aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-white/10 relative'>
                {isVideoLoading && (
                  <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900'>
                    <Loader2
                      className='text-[#FF6154] animate-spin'
                      size={32}
                    />
                    <span className='text-[10px] font-black uppercase tracking-[0.2em] text-white/40'>
                      Loading Tutorial...
                    </span>
                  </div>
                )}
                <iframe
                  src='https://www.loom.com/embed/db614599f560483cb2489907a6394ae6'
                  allowFullScreen={true}
                  onLoad={() => setIsVideoLoading(false)}
                  className={`w-full h-full min-h-[300px] transition-opacity duration-500 ${
                    isVideoLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>

              {/* Steps Section */}
              <div className='w-full md:w-2/5 p-8 flex flex-col justify-between space-y-8'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <Zap
                      className='text-[#FF6154]'
                      size={20}
                      fill='currentColor'
                    />
                    <h3 className='text-xl font-black italic uppercase'>
                      Quick Guide
                    </h3>
                  </div>

                  <div className='space-y-5 text-[11px] text-white/50 font-bold uppercase tracking-wider leading-relaxed'>
                    <div className='flex gap-3'>
                      <span className='text-[#FF6154]'>01</span>
                      <p>
                        Open{' '}
                        <span className='text-white underline underline-offset-2'>
                          API Dashboard
                        </span>{' '}
                        and Click &quot;Add Application&quot;
                      </p>
                    </div>

                    <div className='space-y-3'>
                      <div className='flex gap-3'>
                        <span className='text-[#FF6154]'>02</span>
                        <p>Use any name and paste this Redirect URI:</p>
                      </div>
                      <button
                        onClick={copyRedirect}
                        className='flex items-center gap-2 w-full bg-white/5 border border-white/10 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all text-[10px] text-[#FF6154]'
                      >
                        {copied ? (
                          <Check size={12} className='text-green-400' />
                        ) : (
                          <Copy size={12} />
                        )}
                        <span className='truncate text-white'>
                          https://product-hunt-wrap.vercel.app
                        </span>
                      </button>
                    </div>

                    <div className='flex gap-3'>
                      <span className='text-[#FF6154]'>03</span>
                      <p>
                        Create{' '}
                        <span className='text-white'>Developer Token</span> &
                        paste in the main input.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href='https://www.producthunt.com/v2/oauth/applications'
                  target='_blank'
                  className='flex items-center justify-center gap-2 w-full py-4 bg-[#FF6154] text-white rounded-2xl font-black italic uppercase text-[10px] tracking-[0.2em] hover:brightness-110 transition-all'
                >
                  Go to API Dashboard <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserInput;
