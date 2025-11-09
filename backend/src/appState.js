// Central app state module to avoid globals and circular imports
let playerLocation = null;
let polygons = [];
let points = 0;

function setPlayerLocation(position) {
  playerLocation = position;
}

function getPlayerLocation() {
  return playerLocation;
}

function setPolygons(polys) {
  polygons = polys;
}

function getPolygons() {
  return polygons;
}

function getPoints() {
  return points;
}

function setPoints(p) {
  points = Number(p) || 0;
}

function addPoints(amount) {
  points = (Number(points) || 0) + Number(amount || 0);
  return points;
}

export { setPlayerLocation, getPlayerLocation, setPolygons, getPolygons, getPoints, setPoints, addPoints };
