import {useTranslation} from 'next-i18next';
import {FaCogs} from 'react-icons/fa';
import {FaChartLine, FaIndustry} from 'react-icons/fa6';

const Advantages = () => {
  const {t} = useTranslation('main');

  const items = [
    {
      icon: <FaCogs size={34} color='#fff' />,
      title: t('advantages.item2.title'),
      desc: t('advantages.item2.text'),
    },
    {
      icon: <FaChartLine size={34} color='#fff' />,
      title: t('advantages.item3.title'),
      desc: t('advantages.item3.text'),
    },
    {
      icon: <FaIndustry size={34} color='#fff' />,
      title: t('advantages.item1.title'),
      desc: t('advantages.item1.text'),
    },
  ];

  return (
    <section className='pb-10'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex md:flex-row flex-col md:items-start items-center md:text-start text-center gap-6 bg-white p-6'
            >
              <div className='bg-[#4b53cf] p-3 rounded-full'>{item.icon}</div>
              <div>
                <h3 className='text-xl mb-4 font-semibold text-[#1A1A1A]'>
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
