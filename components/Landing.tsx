import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type TLandingProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

const Landing = ({ setStep }: TLandingProps) => (
  <motion.div
    exit={{ opacity: 0 }}
    className='h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0a0a0a] to-black'
  >
    <div className='w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-10 backdrop-blur-3xl'>
      <Trophy className='text-[#FF6154]' size={40} />
    </div>
    <h1 className='text-7xl font-black italic tracking-tighter mb-4 uppercase'>
      Wrapped<span className='text-[#FF6154]'>.</span>
    </h1>
    <p className='text-white/40 mb-12 font-medium tracking-wide max-w-xs'>
      A data-driven deep dive into your 2025 Product Hunt performance.
    </p>
    <button
      onClick={() => setStep(0)}
      className='bg-white text-black px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-2 active:scale-95 transition-all'
    >
      Start The Reel <ChevronRight />
    </button>
  </motion.div>
);

export default Landing;
