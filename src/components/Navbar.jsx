import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-primary-600 flex items-center"
        >
          <span className="text-2xl mr-2">LuxeMarket</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10 w-64"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600"
            >
              <Search size={18} />
            </button>
          </form>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/?category=electronics" className="text-gray-700 hover:text-primary-600 font-medium">
              Electronics
            </Link>
            <Link to="/?category=jewelery" className="text-gray-700 hover:text-primary-600 font-medium">
              Jewelry
            </Link>
            <Link to="/?category=men's clothing" className="text-gray-700 hover:text-primary-600 font-medium">
              Men's Clothing
            </Link>
            <Link to="/?category=women's clothing" className="text-gray-700 hover:text-primary-600 font-medium">
              Women's Clothing
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Link 
            to="/cart" 
            className="flex items-center relative p-2 text-gray-700 hover:text-primary-600"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            className="ml-4 p-2 rounded-md md:hidden text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10 w-full"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600"
            >
              <Search size={18} />
            </button>
          </form>
          
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-primary-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Home
            </Link>
            <Link to="/?category=electronics" className="text-gray-700 hover:text-primary-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Electronics
            </Link>
            <Link to="/?category=jewelery" className="text-gray-700 hover:text-primary-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Jewelry
            </Link>
            <Link to="/?category=men's clothing" className="text-gray-700 hover:text-primary-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Men's Clothing
            </Link>
            <Link to="/?category=women's clothing" className="text-gray-700 hover:text-primary-600 py-2 px-4 rounded-md hover:bg-gray-100">
              Women's Clothing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;