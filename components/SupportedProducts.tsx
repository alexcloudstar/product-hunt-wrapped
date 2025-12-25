import React from 'react';
import { Heart, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

type SupportedProductsProps = {
  count: number;
};

const SupportedProducts: React.FC<SupportedProductsProps> = ({ count }) => {
  // Determine a "Supporter Tier" based on volume
  const getTier = (c: number) => {
    if (c > 1000)
      return { label: 'Legendary Hunter', color: 'text-purple-400' };
    if (c > 500) return { label: 'Elite Supporter', color: 'text-blue-400' };
    if (c > 100) return { label: 'Active Citizen', color: 'text-green-400' };
    return { label: 'Growing Peer', color: 'text-white/40' };
  };

  const tier = getTier(count);

  return (
    <div className='text-center flex flex-col items-center justify-center space-y-8'>
      {/* Animated Heart Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className='relative'
      >
        <div className='absolute inset-0 bg-red-500/20 blur-3xl rounded-full' />
        <div className='relative w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center'>
          <Heart
            className='text-[#FF6154]'
            size={48}
            fill='#FF6154'
            strokeWidth={0}
          />
          <Zap
            className='absolute -top-1 -right-1 text-yellow-400'
            size={24}
            fill='currentColor'
          />
        </div>
      </motion.div>

      <div className='space-y-2'>
        <div className='text-[#FF6154] font-black uppercase tracking-[0.4em] text-[10px]'>
          Community Karma
        </div>
        <h2 className='text-7xl font-black italic uppercase leading-none tracking-tighter'>
          {count.toLocaleString()}
        </h2>
        <div className='text-white/30 font-bold uppercase text-xs tracking-widest'>
          Products Supported
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <div className='h-[1px] w-12 bg-white/20' />
        <div className='space-y-1'>
          <p className='text-[10px] font-black uppercase text-white/20 tracking-widest'>
            Your Maker Identity
          </p>
          <p className={`text-xl font-black italic uppercase ${tier.color}`}>
            {tier.label}
          </p>
        </div>

        <div className='bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full flex items-center gap-2'>
          <ShieldCheck size={14} className='text-white/20' />
          <span className='text-[9px] font-bold text-white/40 uppercase tracking-tight'>
            Verified 2025 Activity
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportedProducts;
