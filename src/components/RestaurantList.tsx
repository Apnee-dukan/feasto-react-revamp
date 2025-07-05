import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Clock, MapPin, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface TaxDetail {
  id: string;
  name: string;
  percentage: string;
}

interface Restaurant {
  branch_id: string;
  restaurant_name: string;
  branch_address: string;
  cuisine_details: string;
  rating: string;
  cost_per_person: string;
  deliveryTime: string;
  distance: string;
  branch_image: string | null;
  currentBranchOpenStatus: boolean;
  taxDetails: TaxDetail[];
}

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigate = useNavigate();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('Error fetching location:', err);
          // Fallback to KL
          setLocation({ latitude: 3.139, longitude: 101.6869 });
        }
      );
    } else {
      console.error("Geolocation not supported.");
      setLocation({ latitude: 3.139, longitude: 101.6869 });
    }
  }, []);

  const fetchRestaurants = async (q?: string, lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const baseUrl = `https://feasto.com.my/web/api/frontEnd/restaurant/restaurantsDetails`;
      const url = q
        ? `${baseUrl}?restaurant_name=${encodeURIComponent(q)}`
        : `${baseUrl}?currentLatitude=${lat}&currentLongitude=${lng}`;

      const res = await axios.get(url, {
        headers: {
          'x-api-key': 'Sdrops!23',
          'Access-Control-Allow-Origin': '*',
          crossdomain: true,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });

      if (res.data?.status && Array.isArray(res.data.Data)) {
        setRestaurants(res.data.Data);
      } else {
        setRestaurants([]);
      }
    } catch (err) {
      console.error('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchRestaurants(undefined, location.latitude, location.longitude);
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      fetchRestaurants(query, location.latitude, location.longitude);
    }
  };

  const handleMenuButtonClick = (restaurant: Restaurant) => {
    navigate(`/items?branch=${restaurant.branch_id}`);
  };

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10 flex gap-3 items-center">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search restaurant by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-700">
            Search
          </Button>
        </form>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Restaurants Near You</h2>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((r) => (
              <div
                key={r.branch_id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative flex justify-center items-center">
                  <img
                    src={
                      r.branch_image === 'https://feasto.com.my/web/images/logo/default.png'
                        ? '/dist/images/logo/default.png'
                        : r.branch_image ?? '/dist/images/logo/default.png'
                    }
                    alt={r.restaurant_name}
                    className="object-cover"
                    style={{ width: '10rem' }}
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {r.restaurant_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{r.branch_address}</p>
                  <p className="text-sm text-gray-600 mb-2 truncate">{r.cuisine_details}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm font-medium">{parseFloat(r.rating).toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-600">{r.cost_per_person}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{r.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{parseFloat(r.distance).toFixed(1)} km</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleMenuButtonClick(r)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    View Menu
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantListPage;
