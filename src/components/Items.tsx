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

  // Dialog states
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
      // sales_date:2020-06-30
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
        .catch((err) => {
          console.error("Error fetching table details:", err);
        });
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
          setItems(res.data.items.Data);
          setFilteredItems(res.data.items.Data);
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
          setItems(res.data.Data);
          setFilteredItems(res.data.Data);
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

  const tableId = localStorage.getItem("table_id");

  const handleScan = (data: string | null) => {
    if (data) {
      setShowQR(false);
      window.location.href = data;
    }
  };

  const handleError = (err: any) => {
    console.error(err);
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
            {tableId && (
              <span className="block mt-1 text-orange-600 font-medium">
                Table ID: {tableId}
              </span>
            )}
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
            <span className="flex items-center justify-center"> <Scan className="w-4 h-4 mr-2" /> Scan QR Code</span>
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
        {filteredItems.filter((item: any) => parseFloat(item.price) > 0)
          .length > 0 ? (
          filteredItems
            .filter((item: any) => parseFloat(item.price) > 0)
            .map((item: any) => (
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
                      src={
                        item.item_img || "/dist/images/logo/feasto-orange-1.png"
                      }
                      alt={item.name}
                      className="w-[10rem] h-40 object-cover mt-3"
                    />
                  </div>
                  <div className="p-3 flex flex-row justify-between items-start">
                    <div className="flex items-center justify-between mt-2">
                      {item.item_type_name === "Non-Veg" ? (
                        <img
                          src="/dist/images/logo/non-veg.png"
                          alt="Non-Veg"
                          className="w-4 h-4"
                        />
                      ) : (
                        <img
                          src="/dist/images/logo/veg.png"
                          alt="Veg"
                          className="w-4 h-4"
                        />
                      )}
                      <h3 className="font-semibold text-lg truncate ml-1">
                        {item.name}
                      </h3>
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

      {/* Cart Button */}
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
