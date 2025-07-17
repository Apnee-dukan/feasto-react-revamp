import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Pencil } from "lucide-react";

interface CartProps {
  setCartItems: (count: number) => void;
}

const Cart: React.FC<CartProps> = ({ setCartItems }) => {
  const [cartData, setCartData] = useState<any>({});
  const [items, setItems] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<number>(-1);
  const [userID, setUserID] = useState<string | null>(null);
  const [store, setStore] = useState<any>(null);
  const [currency, setCurrency] = useState("₹");
  const [branchId, setBranchId] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any>({});
  const [restaurant, setRestaurant] = useState<any>(null);
  const [dropdownValue, setDropdownValue] = useState(() => {
      const value = localStorage.getItem("dropdownValue") || "1";
      return value;
    });

  const API_HEADER = {
    headers: {
      "x-api-key": "Sdrops!23",
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
    },
  };

  useEffect(() => {
    const uid = localStorage.getItem("userid");
    const branch = localStorage.getItem("branch_id");
    const cart = localStorage.getItem("cartDetailsData");
    const storeInfo = localStorage.getItem("storeDetails");
    const table_id = localStorage.getItem("table_id");

    if (uid) {
      setUserID(uid);
      fetchAddresses(uid);
    }
    if (branch) setBranchId(branch);
    if (table_id) setTableId(table_id);
    if (branch && storeInfo) setStore(JSON.parse(storeInfo));

    if (cart) {
      const parsed = JSON.parse(cart);
      setCartData(parsed);
      setItems(parsed.cartItemLists || []);
    }

    if (branch && table_id) {
      const url = `http://feasto.com.my/web/api/pos/touch_order/branchTableDetails?branch_id=${branch}&table_id=${table_id}&sales_date=${
        new Date().toISOString().split("T")[0]
      }`;
      axios
        .get(url, API_HEADER)
        .then((res) => {
          if (res.status) {
            setTableData(res.data.Data);
          }
        })
        .catch((err) => console.error("Error fetching table details:", err));
    }

    if (branch) {
      axios
        .get(
          `https://feasto.com.my/web/api/frontEnd/restaurant/restaurantsDetails?branch_id=${branch}`,
          API_HEADER
        )
        .then((res) => {
          if (res.data.status) {
            setRestaurant(res.data.Data[0]);
          }
        });
    }
  }, []);

  const fetchAddresses = async (uid: string) => {
    try {
      const res = await axios.get(
        `https://feasto.com.my/web/api/customer/customer/customerAddressDetails?user_id=${uid}`,
        {
          headers: {
            "x-api-key": "Sdrops!23",
            "Access-Control-Allow-Origin": "*",
            crossdomain: true,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      if (res.data.status) setAddresses(res.data.Data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCart = (newItems: any[]) => {
    const subtotal = newItems.reduce((sum, i) => {
      const price = parseFloat(i.itemDetail?.price ?? 0);
      const extra = parseFloat(i.extra_amount ?? 0);
      const total = (price + extra) * i.qty;
      i.totalPrice = total;
      return sum + total;
    }, 0);

    const updated = {
      ...cartData,
      cartItemLists: newItems,
      subTotal: subtotal.toFixed(2),
      grandTotal: (
        subtotal + parseFloat(cartData?.totalTaxAmount ?? 0)
      ).toFixed(2),
    };
    setItems(newItems);
    setCartData(updated);
    localStorage.setItem("cartDetailsData", JSON.stringify(updated));
    localStorage.setItem("no_of_cart_items", `${newItems.length}`);
    setCartItems(newItems.length);
  };

  const changeQty = (idx: number, delta: number) => {
    const newArr = [...items];
    const item = newArr[idx];
    const item_price = parseFloat(item.itemDetail?.price ?? 0);
    const extra_amount = parseFloat(item.extra_amount ?? 0);
    const newQty = Math.max(0, item.qty + delta);

    if (newQty === 0) {
      newArr.splice(idx, 1);
    } else {
      item.qty = newQty;
      item.totalPrice = (item_price + extra_amount) * newQty;
    }
    updateCart(newArr);
  };

  const clearCart = () => {
    localStorage.setItem(
      "cartDetailsData",
      JSON.stringify({
        cartItemLists: [],
        subTotal: "0.00",
        grandTotal: "0.00",
      })
    );
    localStorage.removeItem("branch_id");
    localStorage.removeItem("no_of_cart_items");
    localStorage.removeItem("dropdownValue");
    localStorage.removeItem("deliveryType");
    localStorage.removeItem("table_id");
    setItems([]);
    setCartData({});
    setStore(null);
  };

  const placeOrder = async () => {
    if (!items.length) return;
    const serviceType = localStorage.getItem("deliveryType") || "1";
    const tableId = localStorage.getItem("table_id") || "";
    const branchId = localStorage.getItem("branch_id") || "";
    const numberOfPeoples = localStorage.getItem("dropdownValue") || 0;

    const itemListUpdated = items.map((it) => {
      const hasToppings = Array.isArray(it.toppings) && it.toppings.length > 0;
      return {
        item_id: it.itemDetail?.id,
        item_name: it.itemDetail?.name,
        item_qty: it.qty,
        item_price: parseFloat(it.itemDetail?.price ?? 0),
        is_parcel: it.is_parcel ? 1 : 0,
        parcel_amount: parseFloat(it.parcel_amount ?? 0),
        parcel_price: parseFloat(it.price ?? 0),
        item_amount: parseFloat(it.totalPrice ?? 0),
        extra_amount: parseFloat(it.extra_amount ?? 0),
        total_amount: parseFloat(it.totalPrice ?? 0),
        comments: "",
        ingredients:
          it.ingredients?.map((ing: any) => ing.name).join(",") ?? "",
        toppings: hasToppings
          ? it.toppings.map((t) => t.topping_id).join(",")
          : 0,
        sub_toppings: 0,
        variants: it.variant?.id ?? 0,
      };
    });

    const payload = {
      customer_id: userID,
      branch_id: branchId,
      table_id: tableId,
      items_details: itemListUpdated,
      total_amount: cartData.subTotal,
      net_amount: cartData.grandTotal,
      payable_amount: cartData.grandTotal,
      service_type: serviceType,
      no_of_items: items.length,
      no_of_people: numberOfPeoples,
      delivery_details: JSON.stringify(
        selectedAddress >= 0 ? addresses[selectedAddress] : location
      ),
    };

    try {
      const res = await axios.post(
        "https://feasto.com.my/web/api/pos/touch_order/saveOrderData",
        payload,
        {
          headers: {
            "x-api-key": "Sdrops!23",
            "Access-Control-Allow-Origin": "*",
            crossdomain: true,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      if (res.data) {
        window.location.href = `/items?branch=${branchId}`;
        clearCart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-10 px-4 md:px-12 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700">🛒 Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.length ? (
            items.map((it, idx) => {
              const showEdit = it.variant || (it.toppings?.length ?? 0) > 0 || (it.ingredients?.length ?? 0) > 0;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={it.itemDetail?.item_type_name === "Non-Veg" ? "/dist/images/logo/non-veg.png" : "/dist/images/logo/veg.png"}
                        alt="type"
                        className="w-4 h-4"
                      />
                      <h2 className="text-lg font-semibold text-gray-800">{it.itemDetail?.name}</h2>
                    </div>

                    {it.variant?.name && <p className="text-sm text-gray-700"><strong>Variant:</strong> {it.variant.name}</p>}
                    {it.toppings?.length > 0 && <p className="text-sm text-gray-700"><strong>Toppings:</strong> {it.toppings.map((t: any) => t.topping_name).join(", ")}</p>}
                    {it.ingredients?.length > 0 && <p className="text-sm text-gray-700"><strong>Ingredients:</strong> {it.ingredients.map((ing: any) => ing.name).join(", ")}</p>}
                    <p className="text-sm mt-1 text-gray-600">{currency} {(parseFloat(it.itemDetail?.price ?? 0) + parseFloat(it.extra_amount ?? 0)).toFixed(2)} × {it.qty}</p>
                  </div>

                  <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:flex-col">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(idx, -1)}><Minus className="w-5 h-5 text-red-600" /></button>
                      <span>{it.qty}</span>
                      <button onClick={() => changeQty(idx, 1)}><Plus className="w-5 h-5 text-green-600" /></button>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Subtotal: ₹{it.totalPrice}</p>
                    {showEdit && (
                      <button onClick={() => (window.location.href = `/itemdetails?branch=${branchId}&item_id=${it.itemDetail.id}&cartIndex=${idx}`)} className="mt-2 text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-24">
              <img src="/dist/images/logo/feasto-orange.png" alt="Empty" className="mx-auto mb-4 w-24" />
              <p className="text-xl">Your cart is empty</p>
            </div>
          )}

          {items.length > 0 && (
            <Button variant="outline" className="w-full mt-4" onClick={() => { if (branchId && tableId) { window.location.href = `/items?branch=${branchId}&table_id=${tableId}`; }}}>+ Add More Items</Button>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="font-semibold mb-4 text-lg">🧾 Order Summary</h2>
            {restaurant && (<><h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {restaurant.restaurant_name}
            </h1><p className="text-sm text-gray-500">
                {restaurant.cityName}, {restaurant.stateName}
              </p></>)}
            <div className="flex justify-between py-1 text-sm">
              <span>Sub‑Total:</span>
              <span>{currency} {cartData.subTotal}</span>
            </div>
            <div className="flex justify-between py-1 font-semibold text-base">
              <span>Total:</span>
              <span>{currency} {cartData.grandTotal}</span>
            </div>
            <div className="flex justify-between py-1 font-semibold text-base ">
              {tableData[0] && (
                <><span>Table:</span><p className="text-sm font-medium">
                  {tableData[0].name}
                </p></>
                )}
            </div>

            {/* Number of People */}
            <div className="flex justify-between py-1 font-semibold text-base">
              {tableData && tableData[0]?.available_for ? (
                <>
                  <span >No. of People:</span>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1">
                    <button
                      onClick={() => {
                        const updatedValue = Math.max(1, parseInt(dropdownValue) - 1).toString();
                        setDropdownValue(updatedValue);
                        localStorage.setItem("dropdownValue", updatedValue);
                      }}
                      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
                      disabled={parseInt(dropdownValue) <= 1}
                    >
                      <Minus className="w-4 h-4 text-red-600" />
                    </button>
                    <span className="min-w-[24px] text-center text-sm font-medium">{dropdownValue}</span>
                    <button
                      onClick={() => {
                        const updatedValue = Math.min(tableData[0]?.available_for, parseInt(dropdownValue) + 1).toString();
                        setDropdownValue(updatedValue);
                        localStorage.setItem("dropdownValue", updatedValue);
                      }}
                      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
                      disabled={parseInt(dropdownValue) >= tableData[0]?.available_for}
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </>
              ) : tableData.length > 0 ? (
                <p className="text-sm text-red-600 font-medium mt-2">No available seats</p>
              ) : null}
            </div>
            

            <div className="mt-6 flex gap-2">
              <Button onClick={placeOrder} disabled={!items.length} className="flex-1">Place Order</Button>
              <Button variant="outline" onClick={clearCart} disabled={!items.length} className="flex-1">Clear Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

{
  /* <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Select Delivery Address</h2>
            <div className="space-y-4">
              {addresses.map((addr, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAddress(idx)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAddress === idx ? 'border-orange-600' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium">{addr.address_type_name}</div>
                  <div className="text-sm">{addr.address}</div>
                </div>
              ))}
            </div>
          </div> */
}
