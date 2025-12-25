import React from 'react';
import { Calendar, Award } from 'lucide-react';

type AccountAgeProps = {
  createdAt: string;
};

function getAccountAgeStats(createdAt: string) {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - created.getTime();

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });

  return {
    years,
    totalDays: days,
    joinedDate: formatter.format(created),
    isVeteran: years >= 3,
  };
}

const AccountAge: React.FC<AccountAgeProps> = ({ createdAt }) => {
  const { years, totalDays, joinedDate, isVeteran } =
    getAccountAgeStats(createdAt);

  return (
    <div className='text-center flex flex-col items-center justify-center space-y-6'>
      {/* Visual Icon with Ring */}
      <div className='relative'>
        <div className='absolute inset-0 bg-[#FF6154]/20 blur-2xl rounded-full' />
        <div className='relative w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center rotate-3'>
          <Calendar className='text-[#FF6154]' size={40} strokeWidth={2.5} />
        </div>
      </div>

      <div className='space-y-2'>
        <div className='text-[#FF6154] font-black uppercase tracking-[0.4em] text-[10px] opacity-80'>
          The Beginning
        </div>

        <h2 className='text-4xl font-black italic uppercase leading-none tracking-tighter'>
          {years > 0 ? (
            <>
              A <span className='text-[#FF6154]'>{years} Year</span> <br />
              Journey
            </>
          ) : (
            <>
              <span className='text-[#FF6154]'>{totalDays} Days</span> <br />
              of Shipping
            </>
          )}
        </h2>
      </div>

      <div className='bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md'>
        <p className='text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1'>
          Member Since
        </p>
        <p className='text-lg font-black italic uppercase'>{joinedDate}</p>
      </div>

      {isVeteran && (
        <div className='flex items-center gap-2 text-yellow-500 font-black uppercase text-[9px] tracking-[0.2em] animate-pulse'>
          <Award size={14} /> Community Veteran
        </div>
      )}
    </div>
  );
};

export default AccountAge;
