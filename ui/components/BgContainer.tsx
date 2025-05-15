import {ReactNode} from 'react';

const BgContainer = ({children}: {children: ReactNode}) => {
  return (
    <section
      className='relative overflow-hidden'
      style={{
        background: 'linear-gradient(to right, #010205, #152B6B)',
      }}
    >
      {children}
      <img
        src='/star.png'
        alt='Star'
        className='absolute bottom-[-30%] -left-40'
      />
      <img
        src='/star.png'
        alt='Star'
        className='absolute top-[-60%] -right-24'
      />
    </section>
  );
};

export default BgContainer;
