import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Handle truncating long titles
  const truncateTitle = (title, maxLength = 40) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="card group h-full flex flex-col animate-fade-in">
      <Link 
        to={`/product/${product.id}`}
        className="block h-full"
      >
        <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-50"
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} className="text-primary-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400 mr-2">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-gray-700 text-sm">{product.rating?.rate || '4.5'}</span>
            </div>
            <span className="text-gray-500 text-xs">({product.rating?.count || '120'} reviews)</span>
          </div>
          
          <h3 className="font-medium text-gray-800 mb-1">{truncateTitle(product.title)}</h3>
          
          <p className="text-gray-500 text-sm mb-3">{product.category}</p>
          
          <div className="mt-auto">
            <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;