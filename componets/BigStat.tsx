type TBigStatProps = {
  label: string;
  val: number | string;
  sub: string;
  icon: React.ReactNode;
};

const BigStat = ({ label, val, sub, icon }: TBigStatProps) => (
  <div className='text-center'>
    <div className='mb-8 opacity-20 flex justify-center'>{icon}</div>
    <div className='text-[#FF6154] font-black uppercase tracking-[0.4em] text-[10px] mb-4'>
      {label}
    </div>
    <div className='text-9xl font-black leading-none mb-4'>{val}</div>
    <div className='text-white/30 font-bold uppercase text-xs tracking-widest'>
      {sub}
    </div>
  </div>
);

export default BigStat;
