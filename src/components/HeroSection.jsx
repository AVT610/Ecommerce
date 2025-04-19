import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-700 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Elevate Your <span className="text-accent-300">Style</span> with Premium Products
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
              Discover our curated collection of high-quality products designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/?category=electronics" 
                className="btn bg-white text-indigo-900 hover:bg-gray-100"
              >
                Shop Electronics
              </Link>
              
              <Link 
                to="/" 
                className="btn border border-white bg-transparent hover:bg-white/10"
              >
                Explore All 
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm transform translate-y-8 animate-slide-up">
                  <img 
                    src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Featured Product" 
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <img 
                    src="https://images.pexels.com/photos/9075355/pexels-photo-9075355.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Featured Product" 
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <img 
                    src="https://images.pexels.com/photos/1599705/pexels-photo-1599705.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Featured Product" 
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm transform translate-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <img 
                    src="https://images.pexels.com/photos/5081918/pexels-photo-5081918.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Featured Product" 
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;