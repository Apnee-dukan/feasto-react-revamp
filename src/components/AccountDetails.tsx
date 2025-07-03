import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import ResponsiveMap from './ResponsiveMap';

export default function AccountDetails() {
  const [tab, setTab] = useState<'dashboard'|'orders'|'addresses'|'profile'>('dashboard');
  const [orders, setOrders] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [mapAddress, setMapAddress] = useState<any>(null);
  const [otpDialog, setOtpDialog] = useState<null | 'email' | 'mobile'>(null);
  const [otpValue, setOtpValue] = useState('');
  const [newContact, setNewContact] = useState<string>(''); // email or mobile based on context
  const [viewOrderDetails, setViewOrderDetails] = useState<any>(null);
  const [orderDetailsDialog, setOrderDetailsDialog] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('userid');
    if (!uid) return;
    const base = 'https://feasto.com.my/web/api/';
    
    axios.get(`${base}customer/customer/customerAccountDetails?user_id=${uid}`, { headers: {
          'x-api-key': 'Sdrops!23',
          'Access-Control-Allow-Origin': '*',
          'crossdomain': true,
          'Content-Type': 'application/json;charset=UTF-8',
        } })
      .then(res => {
        const d = res.data;
        if (d.userDetails.status) setCustomer(d.userDetails.Data);
        if (d.allOrdersDetails.status) setOrders(d.allOrdersDetails.Data);
        if (d.userAddressDetails.status) setAddresses(d.userAddressDetails.Data);
      });
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = '/loginpage';
  }

  function openMap(address?: any) {
    setMapAddress(address || null);
    setShowMapDialog(true);
  }

  function submitOtp() {
    // Depending on otpDialog, call correct endpoint
    setOtpDialog(null);
    setOtpValue('');
  }

  function loadOrderViewDetails(orderID: string) {
    const documenturl = 'https://feasto.com.my/web/api/';
    const URL = `${documenturl}customer/customer/loadOrderDetails?order_id=${orderID}`;
    axios.get(URL, {
      headers: {
        'x-api-key': 'Sdrops!23',
        'Access-Control-Allow-Origin': '*',
        'crossdomain': true,
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then(res => {
      if (res.data.status) {
        setViewOrderDetails(res.data.Data);
        setOrderDetailsDialog(true);
      }
    }).catch(console.error);
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Account Details</h1>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['dashboard','orders','addresses','profile'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded ${tab === t ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === 'dashboard' && customer && (
        <div className="bg-white p-4 rounded shadow">
          <p>Hello, <strong>{customer.f_name} {customer.l_name}</strong></p>
          <p>From your account dashboard you can view <button className="text-orange-600" onClick={()=>setTab('orders')}>orders</button>, <button className="text-orange-600" onClick={()=>setTab('addresses')}>shipping addresses</button>, and <button className="text-orange-600" onClick={()=>setTab('profile')}>edit account</button>.</p>
        </div>
      )}

      {/* Orders */}
      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.length ? orders.map(o => (
            <div key={o.orderID} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-2 flex items-center justify-center">
                <img
                  src={o.item_img}
                  alt=""
                  className="w-full h-40 md:h-32 object-contain rounded"
                />
              </div>
              <div>
                <h3>{o.branchName}</h3>
                <p>ORDER #{o.sales_no} • {o.orderON}</p>
                <button onClick={()=>loadOrderViewDetails(o.orderID)} className="text-orange-600">View Details</button>
              </div>
              <div className="text-right">
                <p>{o.statusName} on {o.updatedON}</p>
                <p className="font-semibold">{o.currency_symbol}{o.totalAmount}</p>
              </div>
            </div>
          )) : <p>No orders yet.</p>}
        </div>
      )}

      {/* Addresses */}
      {tab === 'addresses' && (
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>{addr.address_type_name}</strong></p>
                <p>{addr.address}</p>
              </div>
              <div className="space-x-2">
                <button onClick={()=>openMap(addr)} className="text-orange-600">Edit</button>
                <button onClick={()=>{/* TODO: delete */}} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
          <button onClick={()=>openMap()} className="bg-orange-600 text-white px-4 py-2 rounded">Add New Address</button>
        </div>
      )}

      {/* Profile */}
      {tab === 'profile' && customer && (
        <div className="bg-white p-4 rounded shadow space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">Profile Image</label>
            <img src={customer.image || '/dist/images/default-profile.png'} alt="" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <div>
            <p><strong>Name:</strong> {customer.f_name} {customer.l_name}</p>
            <p><strong>DOB:</strong> {customer.dob}</p>
            <p><strong>Gender:</strong> {customer.gender===1?'Male':'Female'}</p>
            <p>
              <strong>Mobile:</strong> +{customer.code_mobile}-{customer.mobile}
              <button onClick={()=>{ setOtpDialog('mobile'); setNewContact(customer.mobile); }} className="ml-2 text-orange-600">Change</button>
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
              <button onClick={()=>{ setOtpDialog('email'); setNewContact(customer.email); }} className="ml-2 text-orange-600">Change</button>
            </p>
            <button onClick={() => {/* TODO: update profile */}} className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
            <button onClick={() => {/* TODO: change password */}} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Change Password</button>
          </div>
        </div>
      )}

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={() => setShowMapDialog(false)}>
        <DialogOverlay />
        <DialogContent className="relative w-full max-w-md mx-auto mt-16 bg-white p-4 rounded shadow-lg">
          <ResponsiveMap
            addressDetails={mapAddress}
            changeStateValue={() => {}}
            accessNewLocation={(loc: any) => {
              setAddresses(prev => prev.map(a => a.id===loc.id?loc:a));
              setShowMapDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      <Dialog open={!!otpDialog} onOpenChange={()=> setOtpDialog(null)}>
        <DialogOverlay />
        <DialogContent className="relative w-full max-w-sm mx-auto mt-16 bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {otpDialog === 'email' ? 'Verify Email OTP' : 'Verify Mobile OTP'}
          </h2>
          <p>We’ve sent an OTP to <strong>{newContact}</strong>. Enter below:</p>
          <input
            type="text"
            maxLength={6}
            className="mt-4 w-full border px-3 py-2 rounded text-center text-lg tracking-widest"
            value={otpValue}
            onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
          />
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded" onClick={()=> setOtpDialog(null)}>Cancel</button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded" onClick={submitOtp}>Verify</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details View */}
      {viewOrderDetails && (
        <Dialog open={orderDetailsDialog} onOpenChange={() => setOrderDetailsDialog(false)}>
          <DialogContent className="w-full max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">Order #{viewOrderDetails.sales_no}</h2>
              {/* <button onClick={() => setOrderDetailsDialog(false)} className="text-gray-500 hover:text-red-500">✕</button> */}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Restaurant</h3>
                <p className="text-sm text-gray-600">{viewOrderDetails.branchName}</p>
                <p className="text-sm text-gray-500">{viewOrderDetails.branchAddress}</p>
              </div>

              {parseInt(viewOrderDetails.deliveryStatus) ? (
                <div>
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <p className="text-sm text-gray-600">{viewOrderDetails.address_type_name}</p>
                  <p className="text-sm text-gray-500">{viewOrderDetails.deliveryAddress}</p>
                </div>
              ) : null}

              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                <p className="text-sm text-green-600 font-medium">On Time</p>
                <p className="text-sm text-gray-500">{viewOrderDetails.serviceTypeName} on {viewOrderDetails.updatedON}</p>
              </div>

              <div className="divide-y">
                {viewOrderDetails.itemDetails.map((itemRow, i) => (
                  <div key={i} className="py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img src={itemRow.item_type_img} alt="" className="w-5 h-5" />
                      <span>{itemRow.item_name} × {itemRow.item_quantity}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {viewOrderDetails.currency_symbol} {itemRow.total_amount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Sub-Total</span>
                  <span>{viewOrderDetails.currency_symbol} {viewOrderDetails.subTotal}</span>
                </div>
                {viewOrderDetails.taxDetails?.map((taxRow, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{taxRow.name} ({taxRow.percentage}%)</span>
                    <span>{viewOrderDetails.currency_symbol} {taxRow.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>{viewOrderDetails.currency_symbol} {viewOrderDetails.net_amount}</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => setOrderDetailsDialog(false)}>Close</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
