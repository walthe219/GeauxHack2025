import { fetchGrass } from './dataFetch.js';
import { setPlayerLocation, setPolygons } from './appState.js';

var map = null;
var marker = null;


function makeMapDisply(position) 
{
    /*
    // Override the position with test coordinates
    let lat = 30.414952;
    let lon = -91.177130;
    position = {
        coords: {
            latitude: lat,
            longitude: lon
        }
    };*/
    // update shared app state
    setPlayerLocation(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(`Latitude: ${lat} Longitude: ${lon}`);
    if(map==null) {
        map = L.map('map').setView([lat, lon], 15);
        fetchGrass(map);
    } 
    //else map.setView([lat,lon],15);//map.panTo([lat,lon]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    if(marker == null) {marker = L.marker([lat, lon]).addTo(map);}
    else marker.setLatLng([lat, lon]);
}

function recenterPlayer(playerLocation){
    map.setView([playerLocation.coords.latitude, playerLocation.coords.longitude], 15);
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

function setMapPolygons(polys){
    // store polygons in app state
    setPolygons(polys);
}

export { map, makeMapDisply, setMapPolygons as setPolygons, findLocation, recenterPlayer };