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
        if (res.data.status) setRestaurant(res.data.Data[0]);
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

  return (
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

      {/* Header */}
      {restaurant && (
        <div className="text-center mb-6">
          <img
            src={
              restaurant.branch_image || "/dist/images/logo/feasto-orange-1.png"
            }
            alt={restaurant.restaurant_name}
            className="mx-auto w-24 h-24 rounded-full object-cover shadow"
          />
          <h2 className="text-xl font-semibold mt-3">
            {restaurant.restaurant_name}
          </h2>
          <p className="text-gray-600">{restaurant.cuisine_details}</p>
          <p className="text-sm text-gray-500">
            {restaurant.cityName}, {restaurant.stateName}
            {/* {tableId && (
              <span className="block mt-1 text-orange-600 font-medium">
                Table ID: {tableId}
              </span>
            )} */}
          </p>

          {/* Delivery Type Radio Buttons */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Choose Delivery Option
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Dine In", value: "1" },
                { label: "Take Away", value: "2" },
                { label: "Delivery", value: "3" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200
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
          </div>
        </div>
      )}

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

      {/* Search */}
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
              selectedCategory === cat.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
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
            setSelectedCategory("");
            setSearchQuery("");
          }}
        >
          All
        </button>
      </div>

      {/* Items */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => {
          const cartItem = cart.cartItemLists.find(
            (c) => c.itemDetail.id === item.id
          );
          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={item.item_img || "/dist/images/logo/feasto-orange-1.png"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />

                {/* Veg/Non-Veg Icon */}
                <img
                  src={
                    item.item_type_name === "Non-Veg"
                      ? "/dist/images/logo/non-veg.png"
                      : "/dist/images/logo/veg.png"
                  }
                  alt={item.item_type_name}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full border bg-white p-[2px]"
                />
              </div>
              <div className="mt-3">`
                <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <p className="text-gray-500 mb-2">₹ {item.price}</p>
                </div>
                {cartItem ? (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-1 bg-orange-300 rounded text-white"
                    >
                      -
                    </button>
                    <span>{cartItem.qty}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      className="px-3 py-1 bg-orange-600 rounded text-white"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(item)}
                    className="w-full mt-2 bg-orange-500 text-white py-1 rounded hover:bg-orange-600"
                  >
                    Add
                  </button>
                )}
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
  );
};

export default Items;
