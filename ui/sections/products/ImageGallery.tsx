import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useState} from 'react';
import {useScreen} from '@/hooks/useScreen';

interface ImageGalleryProps {
  img: string;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({img, images}) => {
  const md = useScreen(768);
  const [selectedImg, setSelectedImg] = useState<string>(img);

  return (
    <div className='flex md:h-[500px] lg:min-w-[650px] rounded md:flex-row flex-col overflow-hidden justify-center'>
      {/* Левая панель с миниатюрами */}
      <div className='bg-gray-100 flex md:flex-col gap-3 p-1 overflow-y-hidden md:order-1 order-2'>
        <Swiper
          direction={md ? 'vertical' : 'horizontal'}
          slidesPerView={3}
          freeMode={true}
          grabCursor={true}
          className='h-full'
        >
          {[img, ...images].map((image, idx) => (
            <SwiperSlide
              key={idx}
              className='h-fit w-fit p-1'
              style={{height: 'fit-content', width: 'fit-content'}}
            >
              <img
                src={image}
                alt={`thumbnail-${idx}`}
                className={`cursor-pointer object-cover h-full rounded ${
                  image === selectedImg ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImg(image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Правая панель с большой картинкой */}
      <div className='flex items-center justify-center h-full w-fit md:ml-2 mb-3 md:mb-0 border-8 border-[#F3F3F3] md:order-2 order-1'>
        <img
          src={selectedImg}
          alt='selected'
          className='object-cover h-full max-w-full'
        />
      </div>
    </div>
  );
};

export default ImageGallery;
