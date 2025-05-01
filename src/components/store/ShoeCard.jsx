// src/components/store/ShoeCard.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const ShoeCard = ({ shoe }) => {
  const [selectedSize, setSelectedSize] = useState(shoe.sizeInventory[0]?.size || shoe.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  // Calculate total quantity for display
  const totalQuantity = shoe.sizeInventory.reduce((total, item) => total + item.quantity, 0);
  
  // Get current selected size inventory
  const selectedSizeItem = shoe.sizeInventory.find(item => item.size === selectedSize);
  const selectedSizeQuantity = selectedSizeItem ? selectedSizeItem.quantity : 0;
  
  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/300x200?text=${shoe.name.replace(/ /g, '+')}`;
  };
  
  // Stock status badge style
  const getStockBadge = () => {
    if (totalQuantity === 0) return { text: "Out of Stock", bgColor: "bg-red-100 text-red-800" };
    if (totalQuantity <= 5) return { text: `${totalQuantity} left`, bgColor: "bg-yellow-100 text-yellow-800" };
    return { text: `In Stock`, bgColor: "bg-green-100 text-green-800" };
  };
  
  const stockBadge = getStockBadge();
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-60 overflow-hidden relative">
        <img 
          src={shoe.image} 
          alt={shoe.name} 
          className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
          onError={handleImageError}
        />
        
        {/* Stock badge with machine-readable data attributes */}
        <div className="absolute top-2 right-2">
          <span 
            className={`px-2 py-1 rounded-full text-xs font-bold ${stockBadge.bgColor}`}
            id={`stock-${shoe.id}`}
            data-total-quantity={totalQuantity}
          >
            {stockBadge.text}
          </span>
        </div>

        {/* Brand Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-800 text-white">
            {shoe.brand}
          </span>
        </div>
        
        {/* Out of Stock Overlay */}
        {totalQuantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{shoe.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{shoe.color}</p>
          </div>
          <span className="text-lg font-bold text-gray-900">${shoe.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{shoe.description}</p>
        
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {shoe.category}
          </span>
        </div>
        
        {/* Size Selection - Fixed to allow selection */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
          <div className="flex flex-wrap gap-2">
            {shoe.sizeInventory.map(sizeItem => {
              const isAvailable = sizeItem.quantity > 0;
              const isSelected = selectedSize === sizeItem.size;
              
              return (
                <button
                  key={sizeItem.size}
                  className={`px-3 py-1 text-sm rounded-md ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : isAvailable
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                  onClick={() => setSelectedSize(sizeItem.size)}
                  data-size={sizeItem.size}
                  data-quantity={sizeItem.quantity}
                >
                  {sizeItem.size}
                  {isAvailable && (
                    <span className="ml-1 text-xs">
                      ({sizeItem.quantity})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Simple size quantity display */}
        {selectedSize && (
          <div className="mt-2 text-sm text-gray-600">
            {selectedSizeQuantity > 0 
              ? `Size ${selectedSize}: ${selectedSizeQuantity} in stock` 
              : `Size ${selectedSize}: Out of stock`}
          </div>
        )}
        
        {/* Machine-readable data for crawling - simplified */}
        <div 
          id={`inventory-data-${shoe.id}`} 
          className="hidden"
          data-product-id={shoe.id}
          data-product-name={shoe.name}
          data-product-brand={shoe.brand}
          data-product-category={shoe.category}
          data-total-quantity={totalQuantity}
          data-inventory={JSON.stringify(shoe.sizeInventory)}
        ></div>
      </div>
      
      {/* Fixed hover gradient and button */}
      {isHovered && totalQuantity > 0 && (
        <div className="absolute bottom-0 left-0 right-0 py-4 px-4 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
          <button 
            className={`w-full py-2 rounded-md font-medium ${
              selectedSizeQuantity > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            onClick={() => selectedSizeQuantity > 0 && addToCart(shoe, selectedSize)}
            disabled={selectedSizeQuantity === 0}
          >
            {selectedSizeQuantity > 0 ? 'Add to Cart' : 'Size Out of Stock'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoeCard;