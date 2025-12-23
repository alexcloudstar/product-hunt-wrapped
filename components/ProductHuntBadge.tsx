import Image from 'next/image';
import Link from 'next/link';

const ProductHuntBadge = () => {
  return (
    <Link
      href='https://www.producthunt.com/products/product-hunt-wrapped?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-product-hunt-wrapped'
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center justify-center'
    >
      <Image
        alt='Product Hunt Wrapped - Your year in shipping, visualized. See your 2025 impact. | Product Hunt'
        width='250'
        height='54'
        src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1053707&amp;theme=dark&amp;t=1766513130459'
      />
    </Link>
  );
};

export default ProductHuntBadge;
