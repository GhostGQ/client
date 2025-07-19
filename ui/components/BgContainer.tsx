import {ReactNode} from 'react';

const BgContainer = ({children}: {children: ReactNode}) => {
  return (
    <section className='relative overflow-hidden bg-[#052C4C]'>
      <div
        className="absolute top-0 -left-5 h-full w-[20%] bg-[url('/patern.png')] bg-cover bg-left opacity-20 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
          maskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />

      <div
        className="absolute top-0 -right-5 h-full w-[20%] bg-[url('/patern.png')] bg-cover bg-right opacity-20 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
          maskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div className='relative z-10'>{children}</div>
    </section>
  );
};

export default BgContainer;
