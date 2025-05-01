// src/components/store/ShoeCard.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { calculateTotalQuantity, useShoeStore } from '../../data/shoesData';

const ShoeCard = ({ shoe }) => {
  const [selectedSize, setSelectedSize] = useState(shoe.sizeInventory[0]?.size || 0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { getSizeQuantity, getAvailableSizes } = useShoeStore();
  
  // Calculate total quantity for display
  const totalQuantity = calculateTotalQuantity(shoe);
  
  // Get quantity for the selected size
  const selectedSizeQuantity = getSizeQuantity(shoe.id, selectedSize);
  
  // Get available sizes (for keyboard navigation and accessibility)
  const availableSizes = getAvailableSizes(shoe.id);

  // Determine stock status for the badge display
  const getStockStatusInfo = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", bgColor: "bg-red-100 text-red-800" };
    if (quantity <= 5) return { text: `${quantity} in stock`, bgColor: "bg-yellow-100 text-yellow-800" };
    return { text: `${quantity} in stock`, bgColor: "bg-green-100 text-green-800" };
  };
  
  const stockStatus = getStockStatusInfo(totalQuantity);
  
  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/300x200?text=${shoe.name.replace(/ /g, '+')}`;
  };
  
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
        
        {/* Main stock badge - machine-readable for bots */}
        <div className="absolute top-2 right-2">
          <span 
            className={`px-2 py-1 rounded-full text-xs font-bold ${stockStatus.bgColor}`}
            id={`stock-${shoe.id}`}
            data-shoe-id={shoe.id}
            data-total-quantity={totalQuantity}
          >
            {stockStatus.text}
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
        
        {/* Size Selection with Inventory Info */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
          <div className="flex flex-wrap gap-2">
            {shoe.sizeInventory.map(sizeItem => {
              const isAvailable = sizeItem.quantity > 0;
              const isSelected = selectedSize === sizeItem.size;
              
              return (
                <button
                  key={sizeItem.size}
                  className={`relative px-3 py-1 text-sm rounded-md
                    ${isSelected
                      ? isAvailable 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-400 text-white cursor-not-allowed'
                      : isAvailable
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  onClick={() => isAvailable && setSelectedSize(sizeItem.size)}
                  disabled={!isAvailable}
                  aria-label={`Size ${sizeItem.size}${isAvailable ? '' : ' - Out of stock'}`}
                  data-size={sizeItem.size}
                  data-quantity={sizeItem.quantity}
                  id={`size-${shoe.id}-${sizeItem.size}`}
                >
                  {sizeItem.size}
                  {isAvailable && (
                    <span 
                      className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700 border border-white"
                      title={`${sizeItem.quantity} in stock`}
                    >
                      {sizeItem.quantity}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Size-specific inventory status */}
        {selectedSize > 0 && (
          <div className="mt-2 text-sm">
            <span className="text-gray-600">
              Selected size {selectedSize}: 
              <span className={`ml-1 font-medium ${
                selectedSizeQuantity > 5 
                  ? 'text-green-600' 
                  : selectedSizeQuantity > 0 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
              }`}>
                {selectedSizeQuantity > 0 
                  ? `${selectedSizeQuantity} in stock` 
                  : 'Out of stock'}
              </span>
            </span>
          </div>
        )}
        
        {/* Machine-readable inventory data for bot crawling */}
        <div 
          className="hidden" 
          id={`inventory-data-${shoe.id}`}
          data-shoe-id={shoe.id}
          data-shoe-name={shoe.name}
          data-total-quantity={totalQuantity}
          data-available-sizes={JSON.stringify(availableSizes)}
          data-all-inventory={JSON.stringify(shoe.sizeInventory)}
        >
          {/* This hidden div contains structured data for bots to crawl */}
        </div>
      </div>
      
      {isHovered && totalQuantity > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-4">
          <button 
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => addToCart(shoe, selectedSize)}
            disabled={selectedSizeQuantity === 0}
          >
            {selectedSizeQuantity > 0 
              ? 'Add to Cart' 
              : 'Size Unavailable'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoeCard;