import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import ResponsiveMap from "./ResponsiveMap";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";

export default function AccountDetails() {
  const [tab, setTab] = useState<
    "dashboard" | "orders" | "addresses" | "profile"
  >("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [mapAddress, setMapAddress] = useState<any>(null);
  const [otpDialog, setOtpDialog] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [newContact, setNewContact] = useState<string>("");
  const [newMobile, setNewMobile] = useState("");
  const [newMobileCode, setNewMobileCode] = useState("");
  const [showMobileOTPInput, setShowMobileOTPInput] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState("");
  const [viewOrderDetails, setViewOrderDetails] = useState<any>(null);
  const [orderDetailsDialog, setOrderDetailsDialog] = useState(false);
  const [showUpdateProfileDialog, setShowUpdateProfileDialog] = useState(false);
  const [showChangeMobileForm, setShowChangeMobileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    f_name: "",
    l_name: "",
    dob: "",
    gender: 1,
  });
  const [newEmail, setNewEmail] = useState("");
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const [emailOtpError, setEmailOtpError] = useState("");
  const [showEmailOTPInput, setShowEmailOTPInput] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("userid");
    if (!uid) return;
    const base = "https://feasto.com.my/web/api/";

    axios
      .get(`${base}customer/customer/customerAccountDetails?user_id=${uid}`, {
        headers: {
          "x-api-key": "Sdrops!23",
          "Access-Control-Allow-Origin": "*",
          crossdomain: true,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        const d = res.data;
        if (d.userDetails.status) setCustomer(d.userDetails.Data);
        if (d.allOrdersDetails.status) setOrders(d.allOrdersDetails.Data);
        if (d.userAddressDetails.status)
          setAddresses(d.userAddressDetails.Data);
      });
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/loginpage";
  }

  function openMap(address?: any) {
    setMapAddress(address || null);
    setShowMapDialog(true);
  }

  function loadOrderViewDetails(orderID: string) {
    const documenturl = "https://feasto.com.my/web/api/";
    const URL = `${documenturl}customer/customer/loadOrderDetails?order_id=${orderID}`;
    axios
      .get(URL, {
        headers: {
          "x-api-key": "Sdrops!23",
          "Access-Control-Allow-Origin": "*",
          crossdomain: true,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        if (res.data.status) {
          setViewOrderDetails(res.data.Data);
          setOrderDetailsDialog(true);
        }
      })
      .catch(console.error);
  }

  function handleProfileUpdate() {
    const url =
      "https://feasto.com.my/web/api/customer/customer/updateCustomerProfileDetails";
    setCustomer((prev: any) => ({
      ...prev,
      ...profileForm,
    }));
    const uid = localStorage.getItem("userid");
    const data = {
      id: uid,
      ...profileForm,
    };
    axios
      .post(url, data, {
        headers: {
          "x-api-key": "Sdrops!23",
          "Access-Control-Allow-Origin": "*",
          crossdomain: true,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        if (res.data.status) {
          setCustomer((prev: any) => ({
            ...prev,
            ...profileForm,
          }));
        }
      })
      .catch(console.error);
    setShowUpdateProfileDialog(false);
  }

  const sendOTPtoMobile = () => {
    if (!newMobile || !newMobileCode) {
      setMobileOtpError("Please enter country code and mobile number");
      return;
    }
    setMobileOtpError("");
    const base = "https://feasto.com.my/web/api/";
    const URL = `${base}mobile/customer_registration/changeNewMobileOtp`;
    const uid = localStorage.getItem("userid");
    const data = {
      customer_id: uid,
      mobile: newMobile,
      mobile_code: newMobileCode,
    };
    axios
      .post(URL, data, {
        headers: {
          "x-api-key": "Sdrops!23",
          "Access-Control-Allow-Origin": "*",
          crossdomain: true,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        if (res.data.status) {
          setShowMobileOTPInput(true);
          setOtpValue("");
        }
      })
      .catch(console.error);
  };

  const sendOTPtoEmail = () => {
    if (!newEmail) {
      setEmailOtpError("Please enter a valid email address");
      return;
    }
    setEmailOtpError("");
    // simulate sending OTP
    setShowEmailOTPInput(true);
  };

  const handleEditProfile = () => {
    if (customer) {
      setProfileForm({
        f_name: customer.f_name || "",
        l_name: customer.l_name || "",
        dob: customer.dob || "",
        gender: customer.gender || 1,
      });
      setShowUpdateProfileDialog(true);
    }
  };

  const verifyMobileOTP = () => {
    if (otpValue === "123456") {
      // dummy OTP check
      setCustomer((prev) => ({
        ...prev,
        mobile: newMobile,
        code_mobile: newMobileCode,
      }));
      setShowChangeMobileForm(false);
      setShowMobileOTPInput(false);
      setOtpValue("");
    } else {
      setMobileOtpError("Invalid OTP");
    }
  };

  const verifyEmailOTP = () => {
    if (otpValue === "123456") {
      // dummy OTP check
      setCustomer((prev) => ({
        ...prev,
        email: newEmail,
      }));
      setShowEmailOTPInput(false);
      setOtpValue("");
    } else {
      setEmailOtpError("Invalid OTP");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Account Details</h1>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["dashboard", "orders", "addresses", "profile"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-orange-600 text-white" : "bg-gray-200"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === "dashboard" && customer && (
        <div className="bg-white p-4 rounded shadow">
          <p>
            Hello,{" "}
            <strong>
              {customer.f_name} {customer.l_name}
            </strong>
          </p>
          <p>
            From your account dashboard you can view{" "}
            <button
              className="text-orange-600"
              onClick={() => setTab("orders")}
            >
              orders
            </button>
            ,{" "}
            <button
              className="text-orange-600"
              onClick={() => setTab("addresses")}
            >
              shipping addresses
            </button>
            , and{" "}
            <button
              className="text-orange-600"
              onClick={() => setTab("profile")}
            >
              edit account
            </button>
            .
          </p>
        </div>
      )}

      {/* Orders */}
      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length ? (
            orders.map((o) => (
              <div
                key={o.orderID}
                className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-gray-100 p-2 flex items-center justify-center">
                  <img
                    src={o.item_img}
                    alt=""
                    className="w-full h-40 md:h-32 object-contain rounded"
                  />
                </div>
                <div>
                  <h3>{o.branchName}</h3>
                  <p>
                    ORDER #{o.sales_no} • {o.orderON}
                  </p>
                  <button
                    onClick={() => loadOrderViewDetails(o.orderID)}
                    className="text-orange-600"
                  >
                    View Details
                  </button>
                </div>
                <div className="text-right">
                  <p>
                    {o.statusName} on {o.updatedON}
                  </p>
                  <p className="font-semibold">
                    {o.currency_symbol}
                    {o.totalAmount}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      )}

      {/* Addresses */}
      {tab === "addresses" && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{addr.address_type_name}</strong>
                </p>
                <p>{addr.address}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => openMap(addr)}
                  className="text-orange-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    /* TODO: delete */
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => openMap()}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Add New Address
          </button>
        </div>
      )}

      {/* Profile */}
      {tab === "profile" && customer && (
        <div className="bg-white p-4 rounded shadow space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">Profile Image</label>
            <img
              src={customer.image || "/dist/images/default-profile.png"}
              alt=""
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div>
            <p>
              <strong>Name:</strong> {customer.f_name} {customer.l_name}
            </p>
            <p>
              <strong>DOB:</strong> {customer.dob}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {customer.gender === 1 ? "Male" : "Female"}
            </p>
            <p>
              <strong>Mobile:</strong> +{customer.code_mobile}-{customer.mobile}
              <button
                onClick={() => {
                  setShowChangeMobileForm(true); // <-- this must be set
                  setNewMobileCode(customer.code_mobile || "");
                  setNewMobile(customer.mobile || "");
                  setOtpValue("");
                  setMobileOtpError("");
                  setShowMobileOTPInput(false);
                }}
                className="ml-2 text-orange-600"
              >
                Change
              </button>
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
              <button
                onClick={() => {
                  setOtpDialog(true);
                  setNewContact(customer.email);
                }}
                className="ml-2 text-orange-600"
              >
                Change
              </button>
            </p>
            <button
              onClick={() => {
                handleEditProfile();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Profile
            </button>
            <button
              onClick={() => {
                /* TODO: change password */
              }}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Change Password
            </button>
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
              setAddresses((prev) =>
                prev.map((a) => (a.id === loc.id ? loc : a))
              );
              setShowMapDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Mobile Number Update Dialog */}
      <Dialog
        open={showChangeMobileForm}
        onOpenChange={() => {
          setShowChangeMobileForm(false);
          setShowMobileOTPInput(false);
          setMobileOtpError("");
          setNewMobile("");
          setNewMobileCode("");
          setOtpValue("");
        }}
      >
        <DialogContent className="w-full max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">
            {showMobileOTPInput ? "Enter OTP" : "Update Mobile Number"}
          </h2>

          {!showMobileOTPInput ? (
            <>
              <label className="block text-sm font-medium text-gray-700">
                New Mobile Number
              </label>
              <div className="flex gap-2">
                <select
                  className="border rounded px-3 py-2"
                  value={newMobileCode || "60"}
                  onChange={(e) => setNewMobileCode(e.target.value)}
                >
                  <option value="60">🇲🇾 +60 (Malaysia)</option>
                  <option value="91">🇮🇳 +91 (India)</option>
                  <option value="1">🇺🇸 +1 (USA)</option>
                  <option value="44">🇬🇧 +44 (UK)</option>
                  <option value="61">🇦🇺 +61 (Australia)</option>
                </select>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={newMobile}
                  onChange={(e) => setNewMobile(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
                className="border rounded p-2 w-full tracking-widest text-center text-lg"
              />
            </>
          )}

          {mobileOtpError && (
            <p className="text-red-600 text-sm">{mobileOtpError}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {!showMobileOTPInput ? (
              <button
                onClick={sendOTPtoMobile}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={verifyMobileOTP}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Verify OTP
              </button>
            )}
            <button
              onClick={() => {
                setShowChangeMobileForm(false);
                setShowMobileOTPInput(false);
                setMobileOtpError("");
                setNewMobile("");
                setNewMobileCode("");
                setOtpValue("");
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Email Dialog */}
      <Dialog
        open={otpDialog}
        onOpenChange={() => {
          setOtpDialog(false);
        }}
      >
        <DialogContent className="w-full max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">Update Your Email</h2>

          {!showMobileOTPInput ? (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Enter New Email
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Email"
                  className="border rounded p-2 w-full"
                />
              </div>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                value={emailOtpValue}
                onChange={(e) =>
                  setEmailOtpValue(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter OTP"
                className="border rounded p-2 w-full tracking-widest text-center text-lg"
              />
            </>
          )}

          {emailOtpError && (
            <p className="text-red-600 text-sm">{emailOtpError}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {!showMobileOTPInput ? (
              <button
                onClick={sendOTPtoEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={verifyEmailOTP}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Verify OTP
              </button>
            )}
            <button
              onClick={() => {
                setShowChangeMobileForm(false);
                setShowMobileOTPInput(false);
                // setEmailOtpError("");
                setNewEmail("");
                setNewMobileCode("");
                setEmailOtpValue("");
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details View */}
      {viewOrderDetails && (
        <Dialog
          open={orderDetailsDialog}
          onOpenChange={() => setOrderDetailsDialog(false)}
        >
          <DialogContent className="w-full max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">
                Order #{viewOrderDetails.sales_no}
              </h2>
              {/* <button onClick={() => setOrderDetailsDialog(false)} className="text-gray-500 hover:text-red-500">✕</button> */}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Restaurant</h3>
                <p className="text-sm text-gray-600">
                  {viewOrderDetails.branchName}
                </p>
                <p className="text-sm text-gray-500">
                  {viewOrderDetails.branchAddress}
                </p>
              </div>

              {parseInt(viewOrderDetails.deliveryStatus) ? (
                <div>
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <p className="text-sm text-gray-600">
                    {viewOrderDetails.address_type_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {viewOrderDetails.deliveryAddress}
                  </p>
                </div>
              ) : null}

              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                <p className="text-sm text-green-600 font-medium">On Time</p>
                <p className="text-sm text-gray-500">
                  {viewOrderDetails.serviceTypeName} on{" "}
                  {viewOrderDetails.updatedON}
                </p>
              </div>

              <div className="divide-y">
                {viewOrderDetails.itemDetails.map((itemRow, i) => (
                  <div
                    key={i}
                    className="py-3 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={itemRow.item_type_img}
                        alt=""
                        className="w-5 h-5"
                      />
                      <span>
                        {itemRow.item_name} × {itemRow.item_quantity}
                      </span>
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
                  <span>
                    {viewOrderDetails.currency_symbol}{" "}
                    {viewOrderDetails.subTotal}
                  </span>
                </div>
                {viewOrderDetails.taxDetails?.map((taxRow, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {taxRow.name} ({taxRow.percentage}%)
                    </span>
                    <span>
                      {viewOrderDetails.currency_symbol} {taxRow.amount}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>
                    {viewOrderDetails.currency_symbol}{" "}
                    {viewOrderDetails.net_amount}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => setOrderDetailsDialog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Update Profile */}
      <Dialog
        open={showUpdateProfileDialog}
        onOpenChange={() => {
          setShowUpdateProfileDialog(false);
          setShowMobileOTPInput(false);
          setMobileOtpError("");
          setNewMobile("");
          setNewMobileCode("");
          setOtpValue("");
        }}
      >
        <DialogContent className="w-full max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <DialogTitle className="text-lg font-semibold mb-4">
            Update Profile
          </DialogTitle>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={profileForm.f_name}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, f_name: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={profileForm.l_name}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, l_name: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={profileForm.dob}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, dob: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={profileForm.gender}
                onChange={(e) =>
                  setProfileForm((p) => ({
                    ...p,
                    gender: parseInt(e.target.value),
                  }))
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setShowUpdateProfileDialog(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
