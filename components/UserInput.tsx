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
} from 'lucide-react';
import UserMarquee from './UserMarquee';
import { Dispatch, SetStateAction, useState } from 'react';
import ProductHuntBadge from './ProductHuntBadge';

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

  const copyRedirect = () => {
    navigator.clipboard.writeText('https://product-hunt-wrap.vercel.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='h-screen flex flex-col items-center justify-between bg-black relative overflow-hidden'
    >
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
          {/* <ProductHuntBadge /> */}
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
            className='flex items-center justify-center gap-2 w-full text-[#FF6154] transition-colors group'
          >
            <HelpCircle
              size={14}
              className='group-hover:rotate-12 transition-transform'
            />
            <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
              How to get my token?
            </span>
          </button>
        </div>
      </div>

      <div className='w-full pb-12 z-10'>
        <UserMarquee items={recentMakers} reverse={true} />
      </div>

      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6'
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='max-w-md w-full bg-neutral-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden'
            >
              <button
                onClick={() => setIsHelpOpen(false)}
                className='absolute top-4 right-4 text-white/20 hover:text-white transition-colors'
              >
                <X size={20} />
              </button>

              <div className='flex items-center gap-3 mb-8'>
                <div className='w-10 h-10 bg-[#FF6154]/20 rounded-xl flex items-center justify-center'>
                  <Zap
                    className='text-[#FF6154]'
                    size={20}
                    fill='currentColor'
                  />
                </div>
                <h3 className='text-xl font-black italic uppercase'>
                  The Setup
                </h3>
              </div>

              <div className='space-y-5 text-xs text-white/60 font-medium leading-relaxed'>
                <div className='flex gap-4'>
                  <span className='text-[#FF6154] font-black'>01</span>
                  <p>
                    Hover profile &rarr;{' '}
                    <span className='text-white'>API Dashboard</span> &rarr; Add
                    Application.
                  </p>
                </div>

                <div className='flex gap-4'>
                  <span className='text-[#FF6154] font-black'>02</span>
                  <div className='space-y-2'>
                    <p>
                      Enter any name & this{' '}
                      <span className='text-white'>Redirect URI</span>:
                    </p>
                    <button
                      onClick={copyRedirect}
                      className='flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-[10px] text-white'
                    >
                      {copied ? (
                        <Check size={12} className='text-green-400' />
                      ) : (
                        <Copy size={12} />
                      )}
                      https://product-hunt-wrap.vercel.app
                    </button>
                  </div>
                </div>

                <div className='flex gap-4 border-t border-white/5 pt-5'>
                  <span className='text-[#FF6154] font-black'>03</span>
                  <p>
                    Scroll to{' '}
                    <span className='text-white italic'>"Developer Token"</span>
                    , click{' '}
                    <span className='text-white font-bold'>Create Token</span>,
                    and paste it here.
                  </p>
                </div>
              </div>

              <a
                href='https://www.producthunt.com/v2/oauth/applications'
                target='_blank'
                className='mt-8 flex items-center justify-center gap-2 w-full py-4 bg-white text-black rounded-xl font-black italic uppercase text-[10px] tracking-widest hover:bg-[#FF6154] hover:text-white transition-all group'
              >
                Open API Dashboard <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserInput;
