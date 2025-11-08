
var map = null;
var marker = null;
var polygons = []; // Store grass/park polygons for point-in-polygon checking


function makeMapDisply(position) 
{
    // Use test coordinates
    const testLat = 30.414952;
    const testLon = -91.177130;
    
    // Override the position with test coordinates
    position = {
        coords: {
            latitude: testLat,
            longitude: testLon
        }
    };
    setPlayerLocation(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    lat = 30.414952 ;
    lon = -91.177130;
    console.log(`Latitude: ${lat} Longitude: ${lon}`);
    if(map==null) {
        map = L.map('map').setView([lat, lon], 15);
        fetchGrass(map);
    } 
    else map.panTo([lat,lon]);
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

function setPolygons(polys){
    polygons = polys;
}