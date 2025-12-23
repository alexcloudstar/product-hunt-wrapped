import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

type TFinalCardProps = {
  onReset: () => void;
  username: string;
  avatar: string;
  totalVotes: number;
  bestRank: string;
  globalRank: string;
  persona: string;
};

const FinalCard = ({
  onReset,
  username,
  avatar,
  totalVotes,
  bestRank,
  globalRank,
  persona,
}: TFinalCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
  }, []);

  const downloadImage = async () => {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement('a');
      link.download = `${username || 'john doe'}-wrapped-2025.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div
        ref={ref}
        className='w-[320px] bg-white text-black p-10 rounded-[3rem] shadow-2xl'
      >
        <div className='flex items-center gap-3 mb-10'>
          <img
            src={avatar}
            className='w-10 h-10 rounded-full'
            crossOrigin='anonymous'
          />
          <div className='font-black text-sm uppercase'>
            @{username || 'john doe'}
          </div>
        </div>
        <div className='text-8xl font-black leading-none tracking-tighter mb-2'>
          {totalVotes}
        </div>
        <div className='text-[10px] font-black uppercase opacity-20 tracking-widest mb-10'>
          Total Votes 2025
        </div>
        <div className='space-y-2 mb-10'>
          <div className='flex justify-between border-b pb-1'>
            <span className='text-[9px] font-bold opacity-30 uppercase'>
              Best Rank
            </span>
            <span className='font-black text-sm'>{bestRank}</span>
          </div>
          <div className='flex justify-between border-b pb-1'>
            <span className='text-[9px] font-bold opacity-30 uppercase'>
              Global Rank
            </span>
            <span className='font-black text-sm'>{globalRank}</span>
          </div>
          <div className='flex justify-between border-b pb-1'>
            <span className='text-[9px] font-bold opacity-30 uppercase'>
              Persona
            </span>
            <span className='font-black text-sm italic'>{persona}</span>
          </div>
        </div>
        <div className='flex justify-between items-end'>
          <div className='font-black text-2xl italic leading-none'>
            PH
            <br />
            WRAPPED
          </div>
          <div className='w-10 h-10 bg-[#FF6154] rounded-xl flex items-center justify-center text-white font-black shadow-lg'>
            P
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-8 w-full'>
        <button
          onClick={downloadImage}
          disabled={downloading}
          className='flex-1 bg-white text-black px-6 py-5 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all'
        >
          {downloading ? (
            'Saving...'
          ) : (
            <>
              <Download size={18} /> Save
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className='flex-1 bg-[#FF6154] text-white px-6 py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-all'
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default FinalCard;
