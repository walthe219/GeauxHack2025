
const south = 30.39139;
const west = -91.20918;
const north = 30.43212;
const east = -91.14576;

const bbox = [south, west, north, east];

// Default tags to query (you provided this list)
const defaultTags = [
  'leisure=pitch',
  'leisure=dog_park',
  'leisure=garden',
  'leisure=nature_reserve',
  'leisure=playground',
  'leisure=resort',
  'leisure=summer_camp',
  'leisure=golf_course',
  'landuse=greenery',
  'landuse=grass',
  'natural=grassland',
  'natural=wood',
  'leisure=beach_resort',
  'landuse=village_green',
  'leisure=recreation_ground',
  'leisure=sports_centre',
  'landuse=flowerbed' ,
  'landuse=meadow',
  'landuse=park',
  'landuse=flowerbed',
  'leisure=park'

];

// Keep a reference to the layer so we don't add duplicates
let grassLayer = null;

function buildOverpassQueryFromTags(tags, bboxArr) {
  const bboxStr = bboxArr.join(',');
  const clauses = tags.map(t => {
    // t is expected in 'key=value' format
    if (typeof t === 'string' && t.includes('=')) {
      const [k, v] = t.split('=');
      return `  way["${k}"="${v}"](${bboxStr});\n  relation["${k}"="${v}"](${bboxStr});`;
    }
    return '';
  }).join('\n');

  return `[out:json][timeout:25];\n(\n${clauses}\n);\nout body;\n>;\nout skel qt;`;
}

async function fetchGrass(map, tags = null)
{
  const useTags = Array.isArray(tags) && tags.length ? tags : defaultTags;
  const query = buildOverpassQueryFromTags(useTags, bbox);

  try {
    if (typeof osmtogeojson === 'undefined') {
      console.error('osmtogeojson is not loaded. Make sure the script is included in index.html');
      return;
    }

    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: query,
    });

    if (!res.ok) {
      console.error('Overpass API returned HTTP', res.status, res.statusText);
      const text = await res.text().catch(() => null);
      console.debug('Overpass response body:', text);
      return;
    }

    const data = await res.json();
    console.debug('Overpass response (truncated):', {
      elements: (data && data.elements) ? data.elements.length : 0
    });

    // Convert OSM JSON to GeoJSON (use osmtogeojson library)
    let geojson = null;
    try {
      geojson = osmtogeojson(data);
      createPolygonList(geojson);
    } catch (convErr) {
      console.error('osmtogeojson conversion failed:', convErr, data);
      return;
    }

    if (!geojson || !geojson.features || geojson.features.length === 0) {
      console.warn('Converted GeoJSON is empty or has no features', geojson);
    }

    // Remove previous layer if present
    if (grassLayer) {
      try { map.removeLayer(grassLayer); } catch (e) { /* ignore */ }
      grassLayer = null;
    }

    grassLayer = L.geoJSON(geojson, {
      style: { color: '#2E8B57', weight: 2, fillOpacity: 0.3 }
    }).addTo(map);

    console.log('Added grass polygons to map, features:', (geojson.features || []).length);
  } catch (err) {
    console.error('fetchGrass error:', err);
  }

  
}

function createPolygonList(geojson) {
    polygons = [];
    for (const feature of geojson.features) {
        if (feature.geometry && (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')) {
            polygons.push(feature);
        }
    }
   setPolygons(polygons);

}