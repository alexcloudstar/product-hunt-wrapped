import { motion } from 'framer-motion';

type TLoadingScreenProps = {
  text: string;
};

const LoadingScreen = ({ text }: TLoadingScreenProps) => (
  <div className='h-screen flex flex-col items-center justify-center p-8'>
    <div className='w-16 h-16 border-4 border-[#FF6154] border-t-transparent rounded-full animate-spin mb-8' />
    <motion.div
      key={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='text-xl font-black italic text-white/60'
    >
      {text}
    </motion.div>
  </div>
);

export default LoadingScreen;
