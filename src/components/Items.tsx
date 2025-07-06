import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';


const Items: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { branch = '' } = queryString.parse(location.search);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [branchDetails, setBranchDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const API_HEADER = {
    headers: {
      'x-api-key': 'Sdrops!23',
      'Access-Control-Allow-Origin': '*',
      crossdomain: true,
    },
  };

  useEffect(() => {
    // Fetch restaurant details
    axios
      .get(`https://feasto.com.my/web/api/frontEnd/restaurant/restaurantsDetails?branch_id=${branch}`, API_HEADER)
      .then(res => {
        if (res.data.status) setRestaurant(res.data.Data[0]);
      });

    // Fetch category list and items
    axios
      .get(`https://feasto.com.my/web/api/pos/touch_order/loadPOSData?branch_id=${branch}`, API_HEADER)
      .then(res => {
        if (res.data.categories?.status) setCategories(res.data.categories.Data);
        if (res.data.items?.status) {
          setItems(res.data.items.Data);
          setFilteredItems(res.data.items.Data);
        }
      });

    // Get item details (with currency info)
    axios
      .get(`https://feasto.com.my/web/api/pos/touch_order/AllItemsListsData?branch_id=${branch}`, API_HEADER)
      .then(res => {
        if (res.data.status) setBranchDetails(res.data.BranchDetails || []);
      });
  }, [branch]);

  const filterByCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/AllItemsListsData?branch_id=${branch}&category_id=${categoryId}`,
        API_HEADER
      )
      .then(res => {
        if (res.data.status) {
          setItems(res.data.Data);
          setFilteredItems(res.data.Data);
          setSearchQuery('');
        }
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = items.filter(item => item.name.toLowerCase().includes(value));
    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Header with Restaurant Info */}
      {restaurant && (
        <div className="text-center mb-6">
          <img
            src={restaurant.branch_image || '/dist/images/logo/feasto-orange-1.png'}
            alt={restaurant.restaurant_name}
            className="mx-auto w-24 h-24 rounded-full object-cover shadow"
          />
          <h2 className="text-xl font-semibold mt-3">{restaurant.restaurant_name}</h2>
          <p className="text-gray-600">{restaurant.cuisine_details}</p>
          <p className="text-sm text-gray-500">
            {restaurant.cityName}, {restaurant.stateName}
          </p>
        </div>
      )}

      {/* Search Box */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search your Dishes..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedCategory === cat.id ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => filterByCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border"
          onClick={() => {
            setFilteredItems(items);
            setSelectedCategory('');
            setSearchQuery('');
          }}
        >
          All
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition"
            >
              <div
                onClick={() => {
                  window.location.href = `/itemdetails?branch=${branch}&item_id=${item.id}`;
                }}
                className="cursor-pointer"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={item.item_img || '/dist/images/logo/feasto-orange-1.png'}
                    alt={item.name}
                    className="w-[10rem] h-40 object-cover mt-3"
                  />
                </div>
                <div className="p-3 flex flex-row justify-between items-start">
                  <div className="flex items-center justify-between mt-2">
                  {item.item_type_name === "Non-Veg" ? (<img src='/dist/images/logo/non-veg.png' alt="Non-Veg" className="w-4 h-4" />) : (<img src='/dist/images/logo/veg.png' alt="Veg" className="w-4 h-4" />)}
                  <h3 className="font-semibold text-lg truncate ml-1">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p>₹ {item.price}</p>
                 </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-10 text-gray-500">
            <img
              src="/dist/images/notfound.png"
              alt="Not Found"
              className="mx-auto mb-4 w-40"
            />
            <p>No items found</p>
          </div>
        )}
      </div>

      {/* Cart Floating Button */}
      <button
        onClick={() => navigate('/cart')}
        style={{ backgroundColor: 'rgb(255 113 0)' }}
        className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition"
      >
        {/* 🛒 */}
        <ShoppingCart />
      </button>
    </div>
  );
};

export default Items;
