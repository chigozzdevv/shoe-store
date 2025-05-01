import ShoeCard from './ShoeCard';
import { shoesData } from '../../data/shoesData';

const ShoeList = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Collection</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find the perfect pair for every occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shoesData.map(shoe => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoeList;
