import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

type TUserMarqueeProps = {
  items: string[];
  reverse?: boolean;
};

const UserMarquee = ({ items, reverse = false }: TUserMarqueeProps) => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className='relative flex overflow-hidden whitespace-nowrap py-4 border-y border-white/5 bg-white/[0.02]'>
      <motion.div
        initial={{ x: reverse ? '-33.33%' : 0 }}
        animate={{ x: reverse ? 0 : '-33.33%' }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className='flex gap-8 px-4'
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-2 font-black italic uppercase tracking-widest ${
              reverse ? 'text-white/[0.05] text-4xl' : 'text-white/30 text-xs'
            }`}
          >
            {!reverse && (
              <Link
                href={`https://producthunt.com/@${item}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='text-[#FF6154]'>@</span>
                {item}
              </Link>
            )}

            {reverse ? '2025 RECAP' : null}
            {!reverse && (
              <span className='mx-4 h-1 w-1 bg-white/20 rounded-full' />
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default UserMarquee;
