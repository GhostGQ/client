const PartnersLogoCarousel = () => {
  const partners = [
    {src: '/partners/layers.png', alt: 'Layers'},
    {src: '/partners/sysyphus.png', alt: 'Sysyphus'},
    {src: '/partners/circooles.png', alt: 'Circooles'},
    {src: '/partners/catalog.png', alt: 'Catalog'},
    {src: '/partners/quotient.png', alt: 'Quotient'},
  ];

  return (
    <div className='mt-9'>
      {/* Десктопная версия */}
      <div className='hidden md:flex justify-between'>
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner.src}
            alt={partner.alt}
            className='h-12 object-contain'
          />
        ))}
      </div>

      {/* Мобильная версия */}
      <div className='md:hidden overflow-x-auto pb-4'>
        <div className='inline-flex space-x-8 px-4'>
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.src}
              alt={partner.alt}
              className='h-12 flex-shrink-0 object-contain'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersLogoCarousel;
