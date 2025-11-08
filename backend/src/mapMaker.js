var map = null;
var marker = null;

function makeMapDisply(position) 
{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Latitude: ${lat} Longitude: ${lon}`);
    if(map==null) map = L.map('map')
    map.setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    if(marker == null) {marker = L.marker([lat, lon]).addTo(map);}
    else marker.setLatLng([lat, lon]);
}

function findLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(makeMapDisply);
    } else
    {
        console.log("Geolocation is not supported by this browser.");
    }
}

function logPosition(position)
{
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}