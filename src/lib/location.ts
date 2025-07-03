export const loadCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const google = window.google;
      const geocoder = new google.maps.Geocoder();
      const latLng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const locality = results[0].address_components.find(comp =>
            comp.types.includes("locality")
          );
          if (locality) {
            return locality.long_name;
          }
        }
      });
    });
  };