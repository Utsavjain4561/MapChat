var API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/messages"
    : "https://mapchatnearby.herokuapp.com/messages";
export function getMessages() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
export function sendMessage(message) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
export function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 12,
          userLocation: true,
        });
      },
      (err) => {
        console.log("Location Blocked by user");
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  });
}
