import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

type TPersonaRevealProps = {
  persona: {
    name: string;
    desc: string;
  };
};

const PersonaReveal = ({ persona }: TPersonaRevealProps) => (
  <div className='text-center px-10'>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className='w-24 h-24 bg-gradient-to-br from-[#FF6154] to-orange-400 rounded-3xl mx-auto mb-10 rotate-12 flex items-center justify-center shadow-[0_20px_50px_rgba(255,97,84,0.3)]'
    >
      <Trophy className='text-white' size={40} />
    </motion.div>
    <h2 className='text-5xl font-black mb-4'>{persona.name}</h2>
    <p className='text-white/40 leading-relaxed font-medium'>{persona.desc}</p>
  </div>
);

export default PersonaReveal;
