import { TUserData } from '@/app/actions/getUserData';

type TProductDetailProps = {
  product: TUserData['data']['viewer']['user']['madePosts']['nodes'][0];
};

const ProductDetail = ({ product }: TProductDetailProps) => (
  <div className='bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl'>
    <div className='flex justify-between items-start mb-10'>
      <div>
        <h3 className='text-3xl font-black mb-1'>{product.name}</h3>
        <span className='text-[10px] font-black uppercase text-white/30 tracking-widest'>
          {product.scheduledAt.slice(0, 4)} Launch
        </span>
      </div>
      <div className='bg-[#FF6154] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase'>
        Launch
      </div>
    </div>
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-black/40 p-6 rounded-3xl'>
        <div className='text-4xl font-black text-[#FF6154]'>
          #{product.dailyRank}
        </div>
        <div className='text-[9px] font-bold opacity-30 uppercase mt-1'>
          Daily Rank
        </div>
      </div>
      <div className='bg-black/40 p-6 rounded-3xl'>
        <div className='text-4xl font-black'>{product.votesCount}</div>
        <div className='text-[9px] font-bold opacity-30 uppercase mt-1'>
          Votes
        </div>
      </div>
      <div className='bg-black/40 p-6 rounded-3xl'>
        <div className='text-2xl font-black'>#{product.weeklyRank}</div>
        <div className='text-[9px] font-bold opacity-30 uppercase mt-1'>
          Weekly
        </div>
      </div>
      <div className='bg-black/40 p-6 rounded-3xl'>
        <div className='text-2xl font-black'>{product.commentsCount}</div>
        <div className='text-[9px] font-bold opacity-30 uppercase mt-1'>
          Comments
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
