
import React from 'react';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  priceRange: string;
  offers?: string;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Nasi Lemak Wanjo",
    cuisine: "Malaysian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=250&fit=crop",
    priceRange: "RM 5-15",
    offers: "20% OFF"
  },
  {
    id: 2,
    name: "Char Kuey Teow House",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "30-40 min",
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
    priceRange: "RM 8-25"
  },
  {
    id: 3,
    name: "Roti Canai Corner",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=250&fit=crop",
    priceRange: "RM 3-12",
    offers: "Free Delivery"
  },
  {
    id: 4,
    name: "Satay Station",
    cuisine: "Malaysian",
    rating: 4.9,
    deliveryTime: "35-45 min",
    distance: "3.2 km",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
    priceRange: "RM 10-30"
  }
];

const RestaurantList = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Restaurants Near You
          </h2>
          <p className="text-xl text-gray-600">
            Discover amazing food from top-rated restaurants in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant.offers && (
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {restaurant.offers}
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  View Menu
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
            View All Restaurants
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;
