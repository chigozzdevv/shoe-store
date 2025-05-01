import ShoeList from '../components/store/ShoeList';

const HomePage = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Step Into Style
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Quality footwear for every occasion. From casual to formal, sports to hiking, we've got you covered.
          </p>
          <div className="mt-10">
            <a
              href="#collection"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
      
      <div id="collection">
        <ShoeList />
      </div>
    </div>
  );
};

export default HomePage;