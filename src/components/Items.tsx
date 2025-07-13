import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Scan, ShoppingCart } from "lucide-react";
import QRScanner from "./QRScanner";

const Items: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { branch = "" } = queryString.parse(location.search);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [branchDetails, setBranchDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryType, setDeliveryType] = useState("1");
  const [showQR, setShowQR] = useState(false);
  const [tableData, setTableData] = useState<any>({});
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
  const [showDialog, setShowDialog] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("1");

  const API_HEADER = {
    headers: {
      "x-api-key": "Sdrops!23",
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
    },
  };

  useEffect(() => {
    localStorage.setItem("deliveryType", "1");
    localStorage.setItem("dropdownValue", "1");
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);
    localStorage.setItem("branch_id", params.branch as string);
    if (params.table_id) {
      localStorage.setItem("table_id", params.table_id as string);
      setDeliveryType("1");
      const url = `http://feasto.com.my/web/api/pos/touch_order/branchTableDetails?branch_id=${
        params.branch
      }&table_id=${params.table_id}&sales_date=${
        new Date().toISOString().split("T")[0]
      }`;
      axios
        .get(url, API_HEADER)
        .then((res) => {
          if (res.status) {
            setTableData(res.data.Data);
            setShowDialog(true);
          }
        })
        .catch((err) => console.error("Error fetching table details:", err));
    }

    const savedDeliveryType = localStorage.getItem("deliveryType");
    if (savedDeliveryType) setDeliveryType(savedDeliveryType);

    const savedDropdownValue = localStorage.getItem("dropdownValue");
    if (savedDropdownValue) setDropdownValue(savedDropdownValue);

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

    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/loadPOSData?branch_id=${branch}`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.categories?.status)
          setCategories(res.data.categories.Data);
        if (res.data.items?.status) {
          const validItems = res.data.items.Data.filter(
            (item: any) => parseFloat(item.price) > 0
          );
          setItems(validItems);
          setFilteredItems(validItems);
        }
      });

    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/AllItemsListsData?branch_id=${branch}`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.status) setBranchDetails(res.data.BranchDetails || []);
      });
  }, [branch, location.search]);

  const filterByCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    axios
      .get(
        `https://feasto.com.my/web/api/pos/touch_order/AllItemsListsData?branch_id=${branch}&category_id=${categoryId}`,
        API_HEADER
      )
      .then((res) => {
        if (res.data.status) {
          const validItems = res.data.Data.filter(
            (item: any) => parseFloat(item.price) > 0
          );
          setItems(validItems);
          setFilteredItems(validItems);
          setSearchQuery("");
        }
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
  };

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

  const handleAdd = (item: any) => {
    const cartCopy = [...cart.cartItemLists];
    const existing = cartCopy.find((i) => i.itemDetail.id === item.id);

    if (existing) {
      existing.qty += 1;
      existing.totalPrice = (existing.qty * parseFloat(item.price)).toFixed(2);
    } else {
      cartCopy.push({
        itemDetail: { id: item.id, name: item.name, price: item.price },
        variant: null,
        ingredients: [],
        toppings: [],
        qty: 1,
        totalPrice: parseFloat(item.price).toFixed(2),
      });
    }
    updateCart(cartCopy);
  };

  const handleRemove = (itemId: string) => {
    let cartCopy = [...cart.cartItemLists];
    const existing = cartCopy.find((i) => i.itemDetail.id === itemId);

    if (!existing) return;

    if (existing.qty === 1) {
      cartCopy = cartCopy.filter((i) => i.itemDetail.id !== itemId);
    } else {
      existing.qty -= 1;
      existing.totalPrice = (
        existing.qty * parseFloat(existing.itemDetail.price)
      ).toFixed(2);
    }

    updateCart(cartCopy);
  };

  const handleViewMoreDetails = (item: any) => {
    if (parseInt(item.is_varient) > 0) {
      const branchId = localStorage.getItem("branch_id");
      window.location.href = `/itemdetails?branch=${branchId}&item_id=${item.id}`;
    }
  };

  const branchId = localStorage.getItem("branch_id");

  return (
    <>
      {/* Header */}
      {restaurant && (
        <div className="bg-white shadow-sm border-b border-gray-200 rounded-b-2xl px-4 py-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
            {/* Logo and Name Section */}
            <div className="flex items-center gap-4">
              <img
                src={
                  restaurant.branch_image ||
                  "/dist/images/logo/feasto-orange-1.png"
                }
                alt={restaurant.restaurant_name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {restaurant.restaurant_name}
                </h1>
                <p className="text-sm text-gray-500">
                  {restaurant.cityName}, {restaurant.stateName}
                </p>
                {tableData[0] && (
                  <p className="text-sm text-orange-600 font-medium">
                    Table: {tableData[0].name}
                  </p>
                )}
              </div>
            </div>

            {/* Right Section (Search + Category) */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                type="text"
                placeholder="Search Dishes..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full sm:w-60 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-400 focus:outline-none"
              />

              <select
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setFilteredItems(items);
                    setSelectedCategory("");
                    setSearchQuery("");
                  } else {
                    filterByCategory(value);
                  }
                }}
                className="w-full sm:w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-400 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen px-4 py-6 bg-gray-50">
        {/* Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
              {tableData[0]?.available_for ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Select Number of People
                  </h2>
                  <select
                    value={dropdownValue}
                    onChange={(e) => {
                      setDropdownValue(e.target.value);
                      localStorage.setItem("dropdownValue", e.target.value);
                    }}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {Array.from(
                      { length: tableData[0]?.available_for },
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    onClick={() => setShowDialog(false)}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <p>No available seats</p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center sm:justify-center gap-2 mb-4">
          <label className="text-lg font-medium text-gray-700">
            Delivery Type:
          </label>
          {/* Delivery Type Options */}
          {[
            { label: "Dine In", value: "1" },
            { label: "Take Away", value: "2" },
            { label: "Delivery", value: "3" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium cursor-pointer transition
                  ${
                    deliveryType === option.value
                      ? "bg-orange-500 text-white border-orange-600"
                      : "bg-white text-gray-800 hover:bg-orange-100 border-orange-300"
                  }`}
            >
              <input
                type="radio"
                name="deliveryType"
                value={option.value}
                checked={deliveryType === option.value}
                disabled={option.value === "3"}
                onChange={() => {
                  setDeliveryType(option.value);
                  localStorage.setItem("deliveryType", option.value);
                }}
                className="form-radio text-orange-500 focus:ring-orange-500"
              />
              {option.label}
            </label>
          ))}
        </div>

        {/* QR Code Scanner (Mobile only view) */}
        <div className="max-w-md mx-auto mb-4 sm:hidden text-center">
          {!showQR ? (
            <button
              className="text-sm bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition"
              onClick={() => setShowQR(true)}
            >
              <span className="flex items-center justify-center">
                {" "}
                <Scan className="w-4 h-4 mr-2" /> Scan QR Code
              </span>
            </button>
          ) : (
            <QRScanner
              onScan={(url) => {
                setShowQR(false);
                window.location.href = url;
              }}
              onClose={() => setShowQR(false)}
            />
          )}
        </div>

        {/* Items */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => {
            const cartItem = cart.cartItemLists.find(
              (c) => c.itemDetail.id === item.id
            );
            const isVeg = item.item_type_name === "Veg";
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="font-medium">
                    By {restaurant?.restaurant_name}
                  </span>
                  <span>
                    ⭐ {restaurant?.rating ?? 4.2} •{" "}
                    {restaurant?.eta ?? "45-50 MINS"}
                  </span>
                </div>

                <div className="relative flex justify-between items-center mt-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          isVeg
                            ? "/dist/images/logo/veg.png"
                            : "/dist/images/logo/non-veg.png"
                        }
                        alt={isVeg ? "Veg" : "Non-Veg"}
                        className="w-4 h-4"
                      />
                      <h2 className="font-semibold text-base text-gray-900 truncate w-40">
                        {item.name}
                      </h2>
                    </div>
                    <p className="text-base font-medium text-black mt-1">
                      ₹{item.price}
                    </p>
                    <button
                      className={`text-sm mt-2 border rounded-full px-3 py-1 transition ${
                        parseInt(item.is_varient) <= 0 ||
                        !restaurant.currentBranchOpenStatus
                          ? "text-gray-400 border-gray-300 cursor-not-allowed opacity-60"
                          : "text-gray-600 border-gray-300 hover:bg-gray-100"
                      }`}
                      disabled={
                        parseInt(item.is_varient) <= 0 ||
                        !restaurant.currentBranchOpenStatus
                      }
                      onClick={() => {
                        handleViewMoreDetails(item);
                      }}
                    >
                      More Details →
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src={
                        item.item_img || "/dist/images/logo/feasto-orange-1.png"
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-full"
                    />
                    {cartItem ? (
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="px-2 py-1 bg-orange-300 text-white rounded"
                        >
                          -
                        </button>
                        <span>{cartItem.qty}</span>
                        <button
                          onClick={() => handleAdd(item)}
                          className="px-2 py-1 bg-orange-600 text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={!restaurant.currentBranchOpenStatus}
                        onClick={() => handleAdd(item)}
                        className={`mt-2 font-bold px-5 py-1 rounded-full transition ${
                          !restaurant.currentBranchOpenStatus
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                            : "bg-orange-500 hover:bg-orange-700 text-white"
                        }`}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate("/cart")}
          style={{ backgroundColor: "rgb(255 113 0)" }}
          className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition"
        >
          <ShoppingCart />
        </button>
      </div>
    </>
  );
};

export default Items;
