import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import UserMarquee from './UserMarquee';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='h-screen flex flex-col items-center justify-between bg-black relative overflow-hidden'
    >
      <div className='w-full pt-12'>
        <div className='text-[10px] font-black uppercase tracking-[0.3em] text-center text-white/20 mb-4'>
          Recently Wrapped
        </div>
        <UserMarquee items={recentMakers} />
      </div>

      <div className='w-full max-w-md px-8 z-10 space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-6xl font-black italic uppercase tracking-tighter leading-none'>
            Find Your <br />
            <span className='text-[#FF6154]'>Rank.</span>
          </h1>
          <p className='text-white/40 text-sm font-medium max-w-[280px] mx-auto'>
            Join the leaderboard of 2025 makers.
          </p>
        </div>

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
              placeholder='token'
              className='w-full bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl py-6 pl-12 pr-16 text-xl font-bold focus:outline-none focus:border-[#FF6154] transition-all placeholder:text-white/10'
              onKeyDown={e => e.key === 'Enter' && token && onSubmit()}
            />
            <button
              onClick={() => token && onSubmit()}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-xl transition-all ${
                token
                  ? 'bg-[#FF6154] text-white scale-100'
                  : 'bg-white/5 text-white/20 scale-90'
              }`}
            >
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
        <small className='flex items-center justify-center font-bold text-white/60'>
          <Link
            href='https://www.producthunt.com/v2/oauth/applications'
            target='_blank'
            className='underline underline-offset-4'
          >
            You can get your token from Product Hunt API dashboard
          </Link>
        </small>
      </div>

      <div className='w-full pb-12'>
        <UserMarquee items={recentMakers} reverse={true} />
      </div>

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6154]/5 blur-[120px] rounded-full' />
      </div>
    </motion.div>
  );
};

export default UserInput;
