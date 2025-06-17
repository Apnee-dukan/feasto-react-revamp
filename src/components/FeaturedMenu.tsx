
import React from 'react';
import { Clock, Star, Heart } from 'lucide-react';

const FeaturedMenu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Nasi Lemak",
      description: "Fragrant coconut rice served with sambal, anchovies, peanuts, and boiled egg",
      price: "RM 12.90",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d096?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "15 min",
      rating: 4.8,
      isPopular: true
    },
    {
      id: 2,
      name: "Rendang Beef",
      description: "Slow-cooked beef in rich coconut curry with aromatic spices",
      price: "RM 24.90",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "20 min",
      rating: 4.9,
      isPopular: true
    },
    {
      id: 3,
      name: "Char Kway Teow",
      description: "Stir-fried rice noodles with prawns, Chinese sausage, and bean sprouts",
      price: "RM 15.90",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "12 min",
      rating: 4.7,
      isPopular: false
    },
    {
      id: 4,
      name: "Laksa",
      description: "Spicy coconut curry noodle soup with prawns and rice vermicelli",
      price: "RM 16.90",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "18 min",
      rating: 4.6,
      isPopular: false
    },
    {
      id: 5,
      name: "Satay",
      description: "Grilled marinated meat skewers served with peanut sauce",
      price: "RM 18.90",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "25 min",
      rating: 4.8,
      isPopular: true
    },
    {
      id: 6,
      name: "Roti Canai",
      description: "Flaky flatbread served with curry dipping sauce",
      price: "RM 8.90",
      image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      prepTime: "10 min",
      rating: 4.5,
      isPopular: false
    }
  ];

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Featured Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the authentic taste of Malaysia with our carefully selected signature dishes
          </p>
        </div>

        {/* Menu grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image container */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.isPopular && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart size={18} className="text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{item.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Price and order button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    {item.price}
                  </span>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors text-sm font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all menu button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
