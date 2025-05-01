import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
            <p className="ml-4 text-base font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
          <p className="mt-1 text-sm text-gray-500">Color: {item.color}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <button 
              className="px-2 py-1 text-gray-600 hover:text-gray-900" 
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.size, item.quantity - 1);
                }
              }}
            >
              -
            </button>
            <span className="px-2 py-1 text-gray-800">{item.quantity}</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:text-gray-900" 
              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            type="button" 
            className="text-indigo-600 hover:text-indigo-500"
            onClick={() => removeFromCart(item.id, item.size)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
