import {FilterAccordion} from '@/components/accordion/FilterAccordion';
import ProductList from './ProductList';
import {VscSettings} from 'react-icons/vsc';
import {useFilterDrawerStore} from './filterDrawerStore';
import {MobileFilterDrawer} from './MobileFilterDrawer';

const Catalog = () => {
  const {open} = useFilterDrawerStore();

  return (
    <section className='md:py-20 py-4 relative'>
      <div className='container sm:flex gap-6 relative'>
        <div className='sm:hidden flex justify-between items-center mb-6'>
          <h1 className='text-[#2A3F87] text-[20px] font-medium'>Продукция</h1>
          <button onClick={open}>
            <VscSettings size={30} color='#43A1D0' />
          </button>
        </div>

        <div className='hidden sm:block sm:w-[250px] lg:w-[400px]'>
          <div className='sticky top-6 shadow-md'>
            <FilterAccordion />
          </div>
        </div>

        <div className='flex-1'>
          <ProductList />
        </div>
      </div>

      <MobileFilterDrawer />
    </section>
  );
};

export default Catalog;
