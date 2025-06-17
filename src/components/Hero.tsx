
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Authentic Malaysian
              <span className="block text-yellow-300">Cuisine</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Experience the rich flavors of Malaysia with our carefully crafted dishes. 
              From traditional favorites to modern interpretations, every meal is a journey.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-300" size={20} />
                <span className="font-semibold">4.8 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-300" size={20} />
                <span className="font-semibold">30 Min Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-yellow-300" size={20} />
                <span className="font-semibold">10K+ Happy Customers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105">
                Order Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all">
                View Menu
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Delicious Malaysian cuisine"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Star className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Rated #1</p>
                    <p className="text-sm text-gray-600">Best Malaysian Restaurant</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
