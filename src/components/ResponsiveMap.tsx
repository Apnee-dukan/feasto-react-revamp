// src/components/ResponsiveMap.js

import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import axios from 'axios';
import '../styles/ResponsiveMap.css'; // add styles here or globally

const ResponsiveMap = ({ addressDetails, changeStateValue, accessNewLocation }) => {
  const [addressType, setAddressType] = useState(1);
  const [markerPos, setMarkerPos] = useState(null);
  const [currentUserLatLng, setCurrentUserLatLng] = useState({});
  type UserLocation = {
    formatted_address?: string;
    latitude?: number;
    longitude?: number;
    pincode?: string;
    state?: string;
    country?: string;
    city?: string;
    door_floor_no?: string;
    landmark?: string;
    address_type?: number;
  };
  
  const [userLocation, setUserLocation] = useState<UserLocation>({});
  const [formFieldError, setFormFieldError] = useState({
    address: '',
    door_floor_no: '',
    landmark: '',
  });
  const [editMode, setEditMode] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const landmarkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addressDetails) {
      const lat = Number(addressDetails.latitude);
      const lng = Number(addressDetails.longitude);
      const pos = { lat, lng };
      setCurrentUserLatLng(pos);
      setMarkerPos(pos);
      setAddressType(Number(addressDetails.address_type));
      setEditMode(true);
      setUserLocation(addressDetails);
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude };
        setCurrentUserLatLng(pos);
        setMarkerPos(pos);
      });
    }
  }, [addressDetails]);

  const geocodePosition = (pos) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results) => {
      if (results && results[0]) {
        const r = results[0];
        const newLoc: {
          formatted_address: string;
          latitude: number;
          longitude: number;
          pincode?: string;
          state?: string;
          country?: string;
          city?: string;
        } = {
          formatted_address: r.formatted_address,
          latitude: r.geometry.location.lat(),
          longitude: r.geometry.location.lng(),
        };

        r.address_components.forEach(c => {
          if (c.types.includes('postal_code')) newLoc.pincode = c.long_name;
          if (c.types.includes('administrative_area_level_1')) newLoc.state = c.long_name;
          if (c.types.includes('country')) newLoc.country = c.long_name;
          if (c.types.includes('locality')) newLoc.city = c.long_name;
        });

        setUserLocation(prev => ({ ...prev, ...newLoc }));
        if (!editMode) changeStateValue({ userLoaction: newLoc });
      }
    });
  };

  const handleMarkerDragEnd = (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPos(pos);
    geocodePosition(pos);
  };

  const handleInputChange = (field) => {
    setFormFieldError(prev => ({ ...prev, [field]: '' }));
  };

  const saveAddressAndProceed = () => {
    const address = addressRef.current && addressRef.current.value ? addressRef.current.value : '';
    const door = floorRef.current && floorRef.current.value ? floorRef.current.value : '';
    const landmark = landmarkRef.current && landmarkRef.current.value ? landmarkRef.current.value : '';
    let valid = true;

    const errors = {
      address: '',
      door_floor_no: '',
      landmark: '',
    };

    if (!address) {
      errors.address = "Address can't be empty";
      valid = false;
    }
    if (!door) {
      errors.door_floor_no = "Door / Floor No can't be empty";
      valid = false;
    }
    if (!landmark) {
      errors.landmark = "Landmark can't be empty";
      valid = false;
    }

    if (!valid) {
      setFormFieldError(errors);
      return;
    }

    const updatedLocation = {
      ...userLocation,
      formatted_address: address,
      door_floor_no: door,
      landmark,
      address_type: addressType,
    };

    if (editMode) {
      updateUserAddressDB(updatedLocation);
    } else {
      changeStateValue({
        userLoaction: updatedLocation,
        selectedAddressBox: -1,
      });
      accessNewLocation(false);
    }
  };

  const updateUserAddressDB = async (obj) => {
    const API_URL = 'https://feasto.com.my/web/api/' + 'customer/customer/updateCustomersAddress';
    // const headers = config.get('API_HEADER');
    const payload = {
      ...obj,
      address: obj.formatted_address,
    };
    delete payload.formatted_address;

    (document.querySelector('.main-loader') as HTMLElement | null)?.style?.setProperty('display', 'flex');

    try {
      const res = await axios.post(API_URL, payload, {
          headers: {
            'x-api-key' : 'Sdrops!23',
            'Access-Control-Allow-Origin': '*',
            'crossdomain': true,
            'Content-Type': 'application/json;charset=UTF-8',
          }
        });
      if (res.data.status) {
        changeStateValue({ userAddressDetails: res.data.Data });
        accessNewLocation(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      (document.querySelector('.main-loader') as HTMLElement | null)?.style?.setProperty('display', 'none');
    }
  };

  return (
    <APIProvider apiKey={'AIzaSyAeTX1XOX-SiE6XMIePIF6sXsTfTnAx3SQ'}>
      <div className="newGoogleAddress">
        <div className="map-container">
          {markerPos && (
            <Map center={markerPos} zoom={18} style={{ width: '100%', height: '100%' }}>
              <AdvancedMarker
                position={markerPos}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            </Map>
          )}
        </div>

        <div className="newGoogleAddressForm">
          <div className="row">
            <label className="col-md-2">Address</label>
            <div className="col-md-10">
              {["Home", "Work", "Other"].map((label, index) => (
                <label key={index} className="form-check-inline form-check-label">
                  <i className={`fa ${label === "Home" ? "fa-home" : label === "Work" ? "fa-briefcase" : "fa-map-marker"} fa-icon-color`}></i> {label}
                  <input
                    type="radio"
                    name="address_type"
                    value={index + 1}
                    checked={addressType === index + 1}
                    onChange={() => setAddressType(index + 1)}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            <div className="col-md-12">
              <input
                ref={addressRef}
                type="text"
                name="address"
                className="form-control"
                defaultValue={userLocation.formatted_address || ''}
                placeholder="Address"
                onChange={() => handleInputChange("address")}
              />
              <span style={{ color: 'red' }}>{formFieldError.address}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Door / Floor No</label>
              <input
                ref={floorRef}
                type="text"
                name="door_floor_no"
                className="form-control"
                placeholder="Door / Floor No"
                defaultValue={userLocation.door_floor_no || ''}
                onChange={() => handleInputChange("door_floor_no")}
              />
              <span style={{ color: 'red' }}>{formFieldError.door_floor_no}</span>
            </div>
            <div className="col-md-6">
              <label>LandMark</label>
              <input
                ref={landmarkRef}
                type="text"
                name="landmark"
                className="form-control"
                placeholder="LandMark"
                defaultValue={userLocation.landmark || ''}
                onChange={() => handleInputChange("landmark")}
              />
              <span style={{ color: 'red' }}>{formFieldError.landmark}</span>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <button className="btn btn-danger btn-block" onClick={() => accessNewLocation(false)}>
                Continue with Old Address
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-success btn-block" onClick={saveAddressAndProceed}>
                Save Address and Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default ResponsiveMap;
