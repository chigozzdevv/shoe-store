// src/components/store/ShoeCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductUrl } from '../../data/shoesData';

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
            data-shoe-id={shoe.id}
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
        
        {/* Size Selection */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
          <div className="flex flex-wrap gap-2">
            {shoe.sizeInventory.map(sizeItem => (
              <button
                key={sizeItem.size}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedSize === sizeItem.size
                    ? 'bg-gray-900 text-white'
                    : sizeItem.quantity > 0
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400'
                }`}
                onClick={() => setSelectedSize(sizeItem.size)}
                data-size={sizeItem.size}
                data-quantity={sizeItem.quantity}
              >
                {sizeItem.size}
                {sizeItem.quantity > 0 && (
                  <span className="ml-1 text-xs">
                    ({sizeItem.quantity})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Actions Container - Combine View Details and Add to Cart */}
        <div className="mt-4 flex items-center justify-between">
          {/* View Product Link - Direct link to product page with selected size */}
          <Link 
            to={getProductUrl(shoe.id, selectedSize)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium relative z-10"
          >
            View Details
          </Link>
          
          {/* Add to Cart Button - Always visible but styled differently */}
          {totalQuantity > 0 && (
            <button 
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                selectedSizeQuantity > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              onClick={() => selectedSizeQuantity > 0 && addToCart(shoe, selectedSize)}
              disabled={selectedSizeQuantity === 0}
            >
              {selectedSizeQuantity > 0 ? 'Add to Cart' : 'Size Out of Stock'}
            </button>
          )}
        </div>
        
        {/* Machine-readable data for chatbot crawling */}
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
        
        {/* Structured Data for SEO and chatbots */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": shoe.name,
              "description": shoe.description,
              "brand": {
                "@type": "Brand",
                "name": shoe.brand
              },
              "color": shoe.color,
              "category": shoe.category,
              "offers": shoe.sizeInventory.map(item => ({
                "@type": "Offer",
                "availability": item.quantity > 0 
                  ? "https://schema.org/InStock" 
                  : "https://schema.org/OutOfStock",
                "itemCondition": "https://schema.org/NewCondition",
                "price": shoe.price,
                "priceCurrency": "USD",
                "size": item.size,
                "inventoryLevel": {
                  "@type": "QuantitativeValue",
                  "value": item.quantity
                }
              }))
            })
          }}
        />
      </div>
      
      {/* Remove the hovering Add to Cart button that was causing the issue */}
    </div>
  );
};

export default ShoeCard;