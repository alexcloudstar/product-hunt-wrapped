import { motion } from 'framer-motion';

type TProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: TProgressBarProps) => (
  <div className='absolute top-6 left-6 right-6 flex gap-1 z-50'>
    {Array.from({ length: total + 1 }).map((_, i) => (
      <div
        key={i}
        className='h-1 flex-1 bg-white/10 rounded-full overflow-hidden'
      >
        {i <= current && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className='h-full bg-white'
          />
        )}
      </div>
    ))}
  </div>
);

export default ProgressBar;
