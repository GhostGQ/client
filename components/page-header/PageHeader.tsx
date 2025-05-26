import BgContainer from '@/ui/components/BgContainer';
import {GoHome} from 'react-icons/go';
import {HiOutlineSlash} from 'react-icons/hi2';

interface Props {
  title: string;
  subtitle: string;
  product?: string;
}
const PageHeader = ({title, subtitle, product}: Props) => {
  return (
    <div className='md:block hidden'>
      <BgContainer>
        <div className='container'>
          <div className='py-8'>
            <div className='flex items-center'>
              <GoHome color='#5B7988' size={24} />
              <HiOutlineSlash color='#5B7988' size={30} />
              <p className='text-white text-[15px]'>{title}</p>
              {product && (
                <>
                  <HiOutlineSlash color='#5B7988' size={30} />
                  <p className='text-white text-[15px]'>{product}</p>
                </>
              )}
            </div>
            <div className='text-white'>
              <h1 className='text-[40px] font-medium mb-5 mt-8'>{title}</h1>
              <p className='text-[16px] font-medium w-[45%]'>{subtitle}</p>
            </div>
          </div>
        </div>
      </BgContainer>
    </div>
  );
};

export default PageHeader;
