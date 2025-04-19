import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <ShoppingCart size={32} className="text-gray-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 py-4 px-6 hidden md:grid md:grid-cols-12 text-sm text-gray-500 font-medium">
              <div className="md:col-span-6">Product</div>
              <div className="md:col-span-2 text-center">Price</div>
              <div className="md:col-span-2 text-center">Quantity</div>
              <div className="md:col-span-2 text-center">Total</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="py-6 px-6 md:grid md:grid-cols-12 md:gap-6 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center space-x-4">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-full w-full object-contain object-center p-2"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>
                  </div>
                  
                  {/* Price - Mobile & Desktop */}
                  <div className="md:col-span-2 text-center mt-4 md:mt-0 flex justify-between md:block">
                    <span className="md:hidden text-sm font-medium text-gray-500">Price:</span>
                    <span className="text-sm font-medium text-gray-900">${formatPrice(item.price)}</span>
                  </div>
                  
                  {/* Quantity - Mobile & Desktop */}
                  <div className="md:col-span-2 mt-4 md:mt-0 flex justify-between items-center md:justify-center">
                    <span className="md:hidden text-sm font-medium text-gray-500">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`p-1 text-gray-600 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <div className="w-10 text-center py-1 text-sm">{item.quantity}</div>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total - Mobile & Desktop */}
                  <div className="md:col-span-2 flex justify-between items-center md:justify-end mt-4 md:mt-0">
                    <span className="md:hidden text-sm font-medium text-gray-500">Total:</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-4">
                        ${formatPrice(item.price * item.quantity)}
                      </span>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Link to="/" className="btn btn-outline">
              Continue Shopping
            </Link>
            
            <button 
              onClick={clearCart}
              className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${formatPrice(totalPrice)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${formatPrice(totalPrice * 0.08)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${formatPrice(totalPrice + (totalPrice * 0.08))}</span>
              </div>
            </div>
            
            <button className="btn btn-primary w-full py-3 flex items-center justify-center">
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2" />
            </button>
            
            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>Secure payment processing by Stripe</p>
              <p className="mt-1">Free shipping on all orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;