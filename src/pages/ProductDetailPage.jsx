import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, Star, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // Reset state when product ID changes
        setProduct(null);
        setRelatedProducts([]);
        setQuantity(1);
        setAddedToCart(false);
        
        const productData = await fetchProductById(id);
        
        if (productData) {
          setProduct(productData);
          
          // Fetch related products from the same category
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter(item => item.category === productData.category && item.id !== productData.id)
            .slice(0, 4);
            
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset "Added to cart" status after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-custom py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(product.rating?.rate || 4) ? 'currentColor' : 'none'}
                    className={i < Math.round(product.rating?.rate || 4) ? '' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-gray-600">{product.rating?.rate || '4.5'}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600">{product.rating?.count || '120'} reviews</span>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="mb-6">
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                {product.category}
              </span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <ChevronDown size={20} />
                </button>
                
                <div className="w-12 text-center py-2 border-x border-gray-300">
                  {quantity}
                </div>
                
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`btn ${
                  addedToCart ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'
                } py-3 px-8 w-full sm:w-auto flex items-center justify-center`}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Details</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Premium quality materials</li>
                <li>Ethically sourced and manufactured</li>
                <li>Free shipping on orders over $50</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 border-b pb-4">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;