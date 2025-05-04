// src/pages/ProductPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useShoeStore, getProductUrl } from '../data/shoesData';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialSize = parseInt(searchParams.get('size') || '0');
  
  const { getShoe, getSizeQuantity } = useShoeStore();
  const { addToCart } = useCart();
  
  const [shoe, setShoe] = useState(null);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [sizeQuantity, setSizeQuantity] = useState(0);
  
  useEffect(() => {
    const fetchedShoe = getShoe(id);
    setShoe(fetchedShoe);
    
    if (fetchedShoe) {
      // If no size is selected or the selected size is invalid, select the first available size
      if (!initialSize || !fetchedShoe.sizeInventory.some(item => item.size === initialSize)) {
        const firstAvailableSize = fetchedShoe.sizeInventory.find(item => item.quantity > 0)?.size;
        setSelectedSize(firstAvailableSize || fetchedShoe.sizeInventory[0].size);
      }
    }
    
    setLoading(false);
  }, [id, initialSize, getShoe]);
  
  useEffect(() => {
    if (shoe && selectedSize) {
      const availableQuantity = getSizeQuantity(shoe.id, selectedSize);
      setSizeQuantity(availableQuantity);
      // Reset quantity to 1 or available quantity, whichever is smaller
      setQuantity(Math.min(1, availableQuantity));
    }
  }, [shoe, selectedSize, getSizeQuantity]);
  
  const handleAddToCart = () => {
    if (shoe && sizeQuantity >= quantity) {
      addToCart({...shoe, size: selectedSize}, quantity);
    }
  };
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  
  if (!shoe) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }
  
  const totalQuantity = shoe.sizeInventory.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img 
            src={shoe.image} 
            alt={shoe.name} 
            className="w-full rounded-lg" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/600x400?text=${shoe.name.replace(/ /g, '+')}`;
            }}
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <div className="mb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {shoe.category}
            </span>
            <span className="inline-block bg-gray-800 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
              {shoe.brand}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold">{shoe.name}</h1>
          <p className="text-gray-600 mt-2">{shoe.color}</p>
          
          <div className="mt-4">
            <p className="text-xl font-bold">${shoe.price.toFixed(2)}</p>
            
            {/* Availability Badge */}
            <div className="mt-2">
              {totalQuantity > 0 ? (
                <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  totalQuantity > 5 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {totalQuantity > 5 
                    ? 'In Stock' 
                    : `Only ${totalQuantity} left`
                  }
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm font-semibold">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-2">{shoe.description}</p>
          </div>
          
          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-medium">Size</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {shoe.sizeInventory.map(item => (
                <button 
                  key={item.size}
                  className={`px-4 py-2 border rounded-md ${
                    item.size === selectedSize 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-900'
                  } ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setSelectedSize(item.size)}
                  disabled={item.quantity === 0}
                >
                  {item.size}
                  {item.quantity > 0 ? ` (${item.quantity})` : ' (Out of stock)'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity Selection */}
          {sizeQuantity > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-medium">Quantity</h2>
              <div className="flex items-center mt-2">
                <button 
                  className="px-3 py-1 border rounded-l-md"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{quantity}</span>
                <button 
                  className="px-3 py-1 border rounded-r-md"
                  onClick={() => setQuantity(q => Math.min(sizeQuantity, q + 1))}
                  disabled={quantity >= sizeQuantity}
                >
                  +
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  (Max: {sizeQuantity})
                </span>
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <div className="mt-8">
            {sizeQuantity > 0 ? (
              <button 
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button 
                className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            )}
          </div>
          
          {/* Special Notes - Eco-friendly callout if applicable */}
          {(shoe.name.toLowerCase().includes('eco') || 
            shoe.description.toLowerCase().includes('eco') ||
            shoe.description.toLowerCase().includes('sustainable')) && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 font-medium">Eco-Friendly Product</p>
              </div>
              <p className="mt-1 text-sm text-green-600">
                This product is made with sustainable materials and practices to minimize environmental impact.
              </p>
            </div>
          )}
        </div>
      </div>
      
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
            "url": window.location.href,
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
              },
              "url": `${window.location.origin}${getProductUrl(shoe.id, item.size)}`
            }))
          })
        }}
      />
      
      {/* Hidden data for chatbot crawling */}
      <div 
        id={`product-details-${shoe.id}`}
        className="hidden"
        data-product-id={shoe.id}
        data-product-name={shoe.name}
        data-product-brand={shoe.brand}
        data-product-category={shoe.category}
        data-product-color={shoe.color}
        data-product-price={shoe.price}
        data-total-quantity={totalQuantity}
        data-inventory={JSON.stringify(shoe.sizeInventory)}
        data-sizes={JSON.stringify(shoe.sizeInventory.map(item => item.size))}
        data-available-sizes={JSON.stringify(shoe.sizeInventory.filter(item => item.quantity > 0).map(item => item.size))}
      ></div>
    </div>
  );
};

export default ProductPage;