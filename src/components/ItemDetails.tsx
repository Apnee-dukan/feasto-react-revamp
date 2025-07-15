// 👇 This version has EDIT + ADD functionality based on cartIndex

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
  topping_details?: Topping[];
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
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
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

  const params = queryString.parse(window.location.search);
  const cartIndex = params.cartIndex !== undefined ? Number(params.cartIndex) : null;
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
          setCurrency(d.currency_symbol || "RM");
          setToppings(d.topping_details || []);
          setIngredients(d.ingredients_details || []);
          if (d.varient_details?.length > 0) {
            setSelectedVariant(d.varient_details[0]);
          }

          // 🔄 Pre-fill for edit
          if (cartIndex !== null) {
            const cartStorage = localStorage.getItem("cartDetailsData");
            if (cartStorage) {
              const parsed = JSON.parse(cartStorage);
              const cartItem = parsed.cartItemLists?.[cartIndex];
              if (cartItem && cartItem.itemDetail?.id === d.id) {
                if (cartItem.variant) setSelectedVariant(cartItem.variant);
                if (cartItem.toppings?.length > 0) {
                  setSelectedToppings(cartItem.toppings.map((t: Topping) => t.topping_id));
                }
                if (cartItem.ingredients?.length > 0) {
                  setSelectedIngredients(cartItem.ingredients.map((i: Ingredient) => i.id));
                }
              }
            }
          }
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

    const toppingDetails = toppings.filter((t) =>
      selectedToppings.includes(t.topping_id)
    );
    const ingredientDetails = ingredients?.filter((ing) =>
      selectedIngredients.includes(ing.id)
    );

    const basePrice = selectedVariant
      ? parseFloat(selectedVariant.price)
      : parseFloat(item.price);

    const toppingPrice = toppingDetails.reduce(
      (acc, cur) => acc + parseFloat(cur.price),
      0
    );

    const total = (basePrice + toppingPrice).toFixed(2);

    const newItem = {
      itemDetail: {
        id: item.id,
        name: item.name,
        price: total,
      },
      variant: selectedVariant,
      toppings: toppingDetails,
      ingredients: ingredientDetails || [],
      qty: 1,
      totalPrice: total,
    };

    // ✅ Edit existing item
    if (cartIndex !== null && cartCopy[cartIndex]) {
      cartCopy[cartIndex] = newItem;
    } else {
      // ➕ Add new item
      cartCopy.push(newItem);
    }

    updateCart(cartCopy);
    window.location.href = "/cart";
  };

  if (!item || !restaurant)
    return <div className="p-6 text-center">Loading…</div>;

  return (
    <>
      {/* Restaurant Info (unchanged) */}
      <div className="bg-white border-b border-gray-200 rounded-b-2xl shadow-sm px-6 py-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={restaurant.branch_image || "/dist/images/logo/default.png"}
              alt="Restaurant"
              className="w-16 h-16 object-cover rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {restaurant.restaurant_name}
              </h2>
              <p className="text-sm text-gray-500">
                {restaurant.cityName}, {restaurant.stateName}
              </p>
              <p className="text-xs text-orange-500">
                ⭐ {parseFloat(restaurant.rating || "0").toFixed(1)} (
                {restaurant.reviewDetails?.length || 0} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details + Customization UI */}
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="mt-4 flex flex-col md:flex-row items-start gap-6">
          <img
            src={item.item_img || "/dist/images/logo/default.png"}
            alt={item.name}
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>

            {item.varient_details?.length > 0 && (
              <div className="mb-4 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Choose Variant:</p>
                {item.varient_details.map((variant) => (
                  <label key={variant.id} className="flex items-center gap-2 py-1">
                    <input
                      type="radio"
                      name="variant"
                      checked={selectedVariant?.id === variant.id}
                      onChange={() => setSelectedVariant(variant)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-800">
                      {variant.name} — {currency} {parseFloat(variant.price).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {toppings.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Select Toppings:</p>
                <div className="flex flex-wrap gap-2">
                  {toppings.map((topping) => (
                    <label
                      key={topping.topping_id}
                      className="flex items-center gap-2 text-sm border border-gray-300 rounded-full px-3 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedToppings.includes(topping.topping_id)}
                        onChange={() => {
                          setSelectedToppings((prev) =>
                            prev.includes(topping.topping_id)
                              ? prev.filter((id) => id !== topping.topping_id)
                              : [...prev, topping.topping_id]
                          );
                        }}
                      />
                      {topping.topping_name} (+{currency} {parseFloat(topping.price).toFixed(2)})
                    </label>
                  ))}
                </div>
              </div>
            )}

            {ingredients && ingredients.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Select Ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <label
                      key={ing.id}
                      className="flex items-center gap-2 text-sm border border-gray-300 rounded-full px-3 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ing.id)}
                        onChange={() => {
                          setSelectedIngredients((prev) =>
                            prev.includes(ing.id)
                              ? prev.filter((id) => id !== ing.id)
                              : [...prev, ing.id]
                          );
                        }}
                      />
                      {ing.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t flex items-center justify-between gap-4 z-10">
          <div className="font-bold">
            {currency} {(
              (selectedVariant
                ? parseFloat(selectedVariant.price)
                : parseFloat(item.price)) +
              toppings
                .filter((t) => selectedToppings.includes(t.topping_id))
                .reduce((acc, cur) => acc + parseFloat(cur.price), 0)
            ).toFixed(2)}
          </div>
          <Button
            onClick={addToCart}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg"
          >
            {cartIndex !== null ? "Update Cart" : "Add to Cart"}{" "}
            <ShoppingCart className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;