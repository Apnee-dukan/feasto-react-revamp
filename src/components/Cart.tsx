import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus } from 'lucide-react';

const Cart: React.FC = () => {
  const [cartData, setCartData] = useState<any>({});
  const [items, setItems] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<number>(-1);
  const [userID, setUserID] = useState<string | null>(null);
  const [store, setStore] = useState<any>(null);
  const [currency, setCurrency] = useState('₹');

  useEffect(() => {
    const uid = localStorage.getItem('userid');
    const branch = localStorage.getItem('branch_id');
    const cart = localStorage.getItem('cartDetailsData');
    const storeInfo = localStorage.getItem('storeDetails');

    if (uid) {
      setUserID(uid);
      fetchAddresses(uid);
    }
    if (branch && storeInfo) setStore(JSON.parse(storeInfo));

    if (cart) {
      const parsed = JSON.parse(cart);
      setCartData(parsed);
      setItems(parsed.cartItemLists || []);
    }
  }, []);

  const fetchAddresses = async (uid: string) => {
    const url = `https://feasto.com.my/web/api/customer/customer/customerAddressDetails?user_id=${uid}`;
    try {
      const res = await axios.get(url, {
        headers: {
          'x-api-key': 'Sdrops!23',
          'Access-Control-Allow-Origin': '*',
          'crossdomain': true,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
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
      grandTotal: (subtotal + parseFloat(cartData?.totalTaxAmount ?? 0)).toFixed(2),
    };
    setItems(newItems);
    setCartData(updated);
    localStorage.setItem('cartDetailsData', JSON.stringify(updated));
    localStorage.setItem('no_of_cart_items', `${newItems.length}`);
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
    localStorage.setItem('cartDetailsData', JSON.stringify({ cartItemLists: [], subTotal: '0.00', grandTotal: '0.00' }));
    localStorage.removeItem('branch_id');
    localStorage.removeItem('no_of_cart_items');
    localStorage.removeItem('dropdownValue');
    localStorage.removeItem('deliveryType');
    localStorage.removeItem('table_id');
    setItems([]);
    setCartData({});
    setStore(null);
  };

  const placeOrder = async () => {
    if (!items.length) return;
    const serviceType = localStorage.getItem('deliveryType') || '1';
    const tableId = localStorage.getItem('table_id') || '';
    const branchId = localStorage.getItem('branch_id') || '';
    const numberOfPeoples = localStorage.getItem('dropdownValue') || 0;

    const itemListUpdated = items.map(it => ({
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
      comments: '',
      ingredients: '',
      toppings: 0,
      sub_toppings: 0,
      variants: 0,
    }));

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
        'https://feasto.com.my/web/api/pos/touch_order/saveOrderData',
        payload,
        {
          headers: {
            'x-api-key': 'Sdrops!23',
            'Access-Control-Allow-Origin': '*',
            'crossdomain': true,
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );
      if (res.data) {
        window.location.href = '/restaurants';
        clearCart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-8 px-4 md:px-12 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {items.length ? (
            items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      it.itemDetail?.item_type_name === 'Non-Veg'
                        ? '/dist/images/logo/non-veg.png'
                        : '/dist/images/logo/veg.png'
                    }
                    alt={it.itemDetail?.item_type_name}
                    className="w-4 h-4"
                  />
                  <div>
                    <h2 className="font-medium">{it.itemDetail?.name}</h2>
                    <p className="text-sm text-gray-600">
                      ₹ {(parseFloat(it.itemDetail?.price ?? 0) + parseFloat(it.extra_amount ?? 0)).toFixed(2)} × {it.qty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQty(idx, -1)}>
                    <Minus className="w-5 h-5 text-red-600" />
                  </button>
                  <span>{it.qty}</span>
                  <button onClick={() => changeQty(idx, +1)}>
                    <Plus className="w-5 h-5 text-green-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-24">
              <img src="/dist/images/logo/feasto-orange.png" alt="Empty" className="mx-auto mb-4 w-24" />
              <p className="text-xl">Your cart is empty</p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between py-1">
              <span>Sub‑Total:</span>
              <span>{currency} {cartData.subTotal}</span>
            </div>
            <div className="flex justify-between font-semibold py-1">
              <span>Total:</span>
              <span>{currency} {cartData.grandTotal}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => placeOrder()} disabled={!items.length} className="flex-1">
                Place Order
              </Button>
              <Button variant="outline" onClick={() => clearCart()} disabled={!items.length} className="flex-1">
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;



{/* <div className="bg-white p-4 rounded-lg shadow">
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
          </div> */}