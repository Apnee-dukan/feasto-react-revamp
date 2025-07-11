import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  item_type_name?: string;
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
  const [currency, setCurrency] = useState<string>("RM");
  const [cart, setCart] = useState<any>(() => {
    const stored = localStorage.getItem("cartDetailsData");
    return stored
      ? JSON.parse(stored)
      : {
          cartItemLists: [],
          subTotal: 0,
          taxDetails: [],
          totalTaxAmount: 0,
          grandTotal: 0,
        };
  });
  const [activeTab, setActiveTab] = useState<
    "addons" | "ingredients" | "desc" | "review"
  >("addons");
  const [cartItem, setCartItem] = useState<any>(null);

  const params = queryString.parse(window.location.search);
  const branch = params.branch as string;
  const itemId = params.item_id as string;

  const API_HEADER = {
    headers: {
      "x-api-key": "Sdrops!23",
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://feasto.com.my/web/api/frontEnd/restaurant/restaurantsDetails?branch_id=${branch}`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.status && res.data.Data?.length > 0) {
          setRestaurant(res.data.Data[0]);
        }
      });

    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/item_lists?branch_id=${branch}&item_id=${itemId}`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.success && res.data.item_lists?.length > 0) {
          const d = res.data.item_lists[0] as ItemData;
          setItem(d);
        }
      });

    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/variant_topping_details?branch_id=${branch}&item_id=${itemId}&size_id=1`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.status) {
          setToppings(res.data.result.topping_details || []);
          setCurrency(res.data.result.currency_symbol || "RM");
        }
      });
  }, [branch, itemId]);

  const updateCart = (newCartItems: any[]) => {
    const subTotal = newCartItems.reduce(
      (acc, cur) => acc + parseFloat(cur.totalPrice),
      0
    );
    const taxDetails = (restaurant?.taxDetails || []).map((t: any) => ({
      ...t,
      taxAmount: ((subTotal * parseFloat(t.percentage)) / 100).toFixed(2),
    }));
    const totalTaxAmount = taxDetails.reduce(
      (acc: number, t: any) => acc + parseFloat(t.taxAmount),
      0
    );
    const grandTotal = subTotal + totalTaxAmount;

    const updatedCart = {
      cartItemLists: newCartItems,
      subTotal: subTotal.toFixed(2),
      taxDetails,
      totalTaxAmount: totalTaxAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };

    localStorage.setItem("cartDetailsData", JSON.stringify(updatedCart));
    localStorage.setItem("no_of_cart_items", newCartItems.length.toString());
    setCart(updatedCart);
  };

  const addToCart = () => {
    if (!item) return;

    const cartCopy = [...cart.cartItemLists];
    const existing = cartCopy.find((i) => i.itemDetail.id === item.id);

    if (existing) {
      existing.qty += 1;
      existing.totalPrice = (
        existing.qty * parseFloat(existing.itemDetail.price)
      ).toFixed(2);
    } else {
      cartCopy.push({
        itemDetail: {
          id: item.id,
          name: item.name,
          price: item.price,
        },
        variant: null,
        ingredients: [],
        toppings: [],
        qty: 1,
        totalPrice: parseFloat(item.price).toFixed(2),
      });
    }
    updateCart(cartCopy);
    window.location.href = "/cart";
  };

  if (!item || !restaurant)
    return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-white shadow-lg border border-orange-100">
        <div className="w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-xl border-2 border-white shadow-md ring-2 ring-orange-200">
          <img
            src={restaurant.branch_image || "/dist/images/logo/default.png"}
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {restaurant.restaurant_name}
          </h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
            {restaurant.cuisine_details?.split(",").map((cuisine, index) => (
              <span
                key={index}
                className="text-xs sm:text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium"
              >
                {cuisine.trim()}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start text-sm text-gray-600">
            <p className="flex items-center gap-1">
              📍 {restaurant.cityName}, {restaurant.stateName}
            </p>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-gray-800">
                {parseFloat(restaurant.rating || "0").toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({restaurant.reviewDetails?.length || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
        <img
          src={item.item_img || "/dist/images/logo/default.png"}
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

      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t flex items-center justify-between gap-4">
        <div className="font-bold">
          {item.currency_symbol} {item.price}
        </div>
        <Button onClick={addToCart} className="bg-orange-600 text-white">
          Add To Cart <ShoppingCart className="inline-block ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ItemDetails;