import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaxDetail {
  id: string;
  name: string;
  percentage: string;
  taxAmount?: string;
}
interface Topping {
  topping_id: string;
  topping_name: string;
  price: string;
}
interface Ingredient {
  id: string;
  name: string;
}
interface Variant {
  id: string;
  name: string;
  price: string;
  size_id: string;
}
interface ItemData {
  id: string;
  name: string;
  description: string;
  price: string;
  currency_symbol: string;
  is_parcel: string;
  item_img?: string;
  is_varient: string;
  varient_details: Variant[];
  ingredients_details?: Ingredient[];
}

interface RestaurantData {
  branch_id: string;
  restaurant_name: string;
  branch_image: string | null;
  cuisine_details: string;
  cityName: string;
  stateName: string;
  rating: string;
  reviewDetails: any[];
  taxDetails: TaxDetail[];
}

const ItemDetails: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [item, setItem] = useState<ItemData | null>(null);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [currency, setCurrency] = useState<string>('RM');
  const [cartItem, setCartItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'addons' | 'ingredients' | 'desc' | 'review'>('addons');

  const params = queryString.parse(window.location.search);
  const branch = params.branch as string;
  const itemId = params.item_id as string;

  useEffect(() => {
    const headers = {
      'x-api-key': 'Sdrops!23',
      'Access-Control-Allow-Origin': '*',
      crossdomain: 'true',
      'Content-Type': 'application/json',
    };

    axios
      .get(`https://feasto.com.my/web/api/frontEnd/restaurant/restaurantsDetails?branch_id=${branch}`, { headers })
      .then((res) => {
        if (res.data.status && res.data.Data?.length > 0) {
          setRestaurant(res.data.Data[0]);
        }
      });

    axios
      .get(`https://feasto.com.my/web/api/pos/touch_order/item_lists?branch_id=${branch}&item_id=${itemId}`, { headers })
      .then((res) => {
        if (res.data.success && res.data.item_lists?.length > 0) {
          const d = res.data.item_lists[0] as ItemData;
          setItem(d);
          setCartItem({
            itemDetail: { id: d.id, name: d.name },
            variant: d.is_varient === '1' ? d.varient_details[0] : null,
            ingredients: [],
            toppings: [],
            qty: 1,
            totalPrice: parseFloat(d.price),
          });
        }
      });

    axios
      .get(`https://feasto.com.my/web/api/pos/touch_order/variant_topping_details?branch_id=${branch}&item_id=${itemId}&size_id=1`, { headers })
      .then((res) => {
        if (res.data.status) {
          setToppings(res.data.result.topping_details || []);
          setCurrency(res.data.result.currency_symbol || 'RM');
        }
      });
  }, [branch, itemId]);

  const addToCart = () => {
    if (!cartItem) return;

    const stored = localStorage.getItem('cartDetailsData');
    const cart = stored
      ? JSON.parse(stored)
      : { cartItemLists: [], subTotal: 0, taxDetails: [], totalTaxAmount: 0 };

    cart.cartItemLists.push(cartItem);
    const newSubtotal = cart.cartItemLists.reduce((a: number, c: any) => a + parseFloat(c.totalPrice), 0);
    cart.subTotal = newSubtotal.toFixed(2);

    if (restaurant) {
      cart.taxDetails = (restaurant.taxDetails || []).map((t) => ({
        ...t,
        taxAmount: ((newSubtotal * parseFloat(t.percentage)) / 100).toFixed(2),
      }));
      cart.totalTaxAmount = cart.taxDetails.reduce(
        (a: number, t: any) => a + parseFloat(t.taxAmount),
        0
      ).toFixed(2);
    }

    cart.grandTotal = (parseFloat(cart.subTotal) + parseFloat(cart.totalTaxAmount)).toFixed(2);

    localStorage.setItem('cartDetailsData', JSON.stringify(cart));
    localStorage.setItem('no_of_cart_items', cart.cartItemLists.length.toString());
    window.location.href = '/cart';
  };

  const toggleTopping = (t: Topping) => {
    setCartItem((ci: any) => {
      if (!ci) return ci;
      const exists = ci.toppings.find((x: any) => x.topping_id === t.topping_id);
      let newToppings = exists
        ? ci.toppings.filter((x: any) => x.topping_id !== t.topping_id)
        : [...ci.toppings, t];
      let priceChange = exists ? -parseFloat(t.price) : parseFloat(t.price);
      return {
        ...ci,
        toppings: newToppings,
        totalPrice: (parseFloat(ci.totalPrice) + priceChange).toFixed(2),
      };
    });
  };

  if (!item || !restaurant) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src={restaurant.branch_image || '/dist/images/logo/default.png'}
          alt="Restaurant"
          className="w-32 h-32 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{restaurant.restaurant_name}</h2>
          <p className="text-gray-600">{restaurant.cuisine_details}</p>
          <p className="text-sm text-gray-500">
            {restaurant.cityName}, {restaurant.stateName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Star size={16} className="text-yellow-400" />{' '}
            {parseFloat(restaurant.rating || '0').toFixed(1)} (
            {restaurant.reviewDetails?.length || 0})
          </div>
        </div>
      </div>

      {/* Item Info */}
      <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
        <img
          src={item.item_img || '/dist/images/logo/default.png'}
          alt={item.name}
          className="w-40 h-40 rounded-lg object-cover mx-auto"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-lg font-bold mt-2">
            {item.currency_symbol} {parseFloat(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setActiveTab('addons')}
          className={`flex-1 py-2 border-b ${
            activeTab === 'addons' ? 'border-orange-600' : 'border-transparent'
          }`}
        >
          Add‑Ons
        </button>
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex-1 py-2 border-b ${
            activeTab === 'ingredients' ? 'border-orange-600' : 'border-transparent'
          }`}
        >
          Ingredients
        </button>
        <button
          onClick={() => setActiveTab('desc')}
          className={`flex-1 py-2 border-b ${
            activeTab === 'desc' ? 'border-orange-600' : 'border-transparent'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-1 py-2 border-b ${
            activeTab === 'review' ? 'border-orange-600' : 'border-transparent'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'addons' && (
          <div className="grid grid-cols-2 gap-2">
            {(toppings || []).map((t) => (
              <button
                key={t.topping_id}
                onClick={() => toggleTopping(t)}
                className={`p-2 rounded border ${
                  cartItem?.toppings?.find((x: any) => x.topping_id === t.topping_id)
                    ? 'bg-orange-100'
                    : 'bg-white'
                }`}
              >
                {t.topping_name} (+{currency}
                {parseFloat(t.price).toFixed(2)})
              </button>
            ))}
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul className="text-gray-700 list-disc ml-6">
            {(item.ingredients_details || []).length ? (
              item.ingredients_details?.map((ing) => (
                <li key={ing.id}>{ing.name}</li>
              ))
            ) : (
              <p className="text-gray-500">No ingredients available</p>
            )}
          </ul>
        )}
        {activeTab === 'desc' && (
          <div className="p-2 text-gray-700">{item.description}</div>
        )}
        {activeTab === 'review' && (
          <div className="p-2 text-gray-700">[Review section coming soon]</div>
        )}
      </div>

      {/* Add to Cart */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t flex items-center justify-between gap-4">
        <div className="font-bold">
          {currency} {cartItem?.totalPrice}
        </div>
        <Button onClick={addToCart} className="bg-orange-600 text-white">
          Add To Cart <ShoppingCart className="inline-block ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ItemDetails;
