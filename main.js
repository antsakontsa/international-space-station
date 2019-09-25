// Insert map into HTML
function initMap(latitude, longitude) {
  // The location of space station
  let satellite = { lat: latitude, lng: longitude };

  // The map, centered at space station
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: satellite,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  // Display marker in order for user to see where space station actually is
  let marker = new google.maps.Marker({
    position: satellite,
    map: map
  });
}

// Get the location of the space station
async function getISS() {
  // URL where the data comes from
  const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

  // Fetch the data
  const response = await fetch(api_url);

  // Convert data into JSON
  data = await response.json();

  // Execute InitMap function and give parameters latitude and longitude from JSON data
  initMap(data.latitude, data.longitude);

  // Return all JSON for other functions to use
  return data;
}

// Set latitude and longitude data into HTML
async function setLatLng() {
  // get data from getISS function
  let data = await getISS();
  let latitude = data.latitude;
  let longitude = data.longitude;

  // Insert data into HTML
  document.getElementById('lat').textContent = latitude;
  document.getElementById('lng').textContent = longitude;
}

// Set location into HTML
async function getLocation() {
  // get data from getISS function
  let data = await getISS();
  let latitude = data.latitude;
  let longitude = data.longitude;

  // URL where the data comes from
  let api_url_location =
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    latitude +
    ',' +
    longitude +
    
    // YOU NEED TO CHANGE TEXT "ADD_YOUR_API_KEY HERE" WITH YOUR OWN API KEY!
    '&key=ADD_YOUR_API_KEY HERE';

  // Fetch the data
  let response2 = await fetch(api_url_location);

  // Convert data into JSON
  let data2 = await response2.json();

  // Insert data into HTML
  document.getElementById('location').textContent =
    data2.results[0].formatted_address;
}

function executor() {
  getISS();
  getLocation();
  setLatLng();
}

executor();
