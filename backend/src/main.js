import { getDocFromFirebase, addToFirebase } from './firebase.js';
import { findLocation, recenterPlayer } from './mapMaker.js';
import { updatePoints } from './pointUpdate.js';
import { getPolygons, getPlayerLocation, setPlayerLocation, getPoints, setPoints } from './appState.js';


const inputUsername = document.getElementById('username');
const startButton = document.getElementById('startButton');
const usrNmDisplay = document.getElementById('usrNmDisplay');
const pointDisplay = document.getElementById("pointsDisplay");
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const locationButton = document.getElementById('locationButton');
const onGrassDisplay = document.getElementById("onGrass");

let username = "placeholder";
// points now stored in appState (getPoints/setPoints)
// playerLocation is now stored in appState; access via getPlayerLocation()/setPlayerLocation()
let isGrassed = false;
let polygons = [];

// re-export appState setter for other modules that may import main
// (main will delegate storing the player location to appState)
function setPlayerLocationLocal(position) {
    setPlayerLocation(position);
    console.log(`Player location set to Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
}

// make the setter available globally for any remaining non-module code (compat)
try { globalThis.setPlayerLocation = setPlayerLocationLocal; } catch (e) { /* ignore */ }
try { globalThis.playerLocation = getPlayerLocation(); } catch (e) { /* ignore */ }

startButton.addEventListener('click', async function() {
    const enteredUsername = document.getElementById("username").value.trim();
    console.log(`Username entered: ${enteredUsername}`);
    if(enteredUsername === "") {
        alert("Please enter a valid username.");
        return;
    }
    else{
        const doc = await getDocFromFirebase(enteredUsername);
        if(doc === null){
            await addToFirebase({ username: enteredUsername, score: 0 });
            console.log("User added to database.");
            setPoints(0);
        }
        else{
            console.log("User exists in database.");
            setPoints(doc.data.score);
            pointDisplay.textContent = `Points: ${getPoints()}`;
        }

        username = enteredUsername;
        console.log(`Username: ${username}, Points: ${getPoints()}`);


        startScreen.style.display = 'none';
        loadGame();
    }
    
});

function loadGame()
{
    usrNmDisplay.textContent = `Username: ${inputUsername.value}`;
    console.log(`Username entered: ${inputUsername.value}`);
    
    gameScreen.style.display = 'inline-block';
    console.log("Game Loaded");
    setInterval(mapUpdate, 3000); // Update map every 5 seconds
}
function mapUpdate()
{
    
    console.log("Map Updated");
    findLocation(); 
    isGrassed = isOnGrass();
    updatePoints(isGrassed);
    
}

locationButton.addEventListener('click', function() {
    recenterPlayer(getPlayerLocation());
});

function isOnGrass(){
    const polygons = getPolygons();
    if(!Array.isArray(polygons) || polygons.length === 0 ){
        console.log("No grass polygons loaded yet :(.");
        return false;
    }

    const turfLib = globalThis.turf || (typeof turf !== 'undefined' ? turf : null);
    if (!turfLib) {
        console.warn('turf is not available');
        return false;
    }

    const pl = getPlayerLocation();
    if (!pl) {
        console.log('Player location not yet available');
        return false;
    }

    const point = turfLib.point([pl.coords.longitude, pl.coords.latitude]);

    for(const poly of polygons){
        // Create a polygon from the feature's geometry
        
        if(turfLib.booleanPointInPolygon(point, poly)){
            console.log("Yay! You're on grass!", poly.properties);
            onGrassDisplay.textContent = "Yay! You're on grass!";
            onGrassDisplay.style.color = "green";
            return true;
        }
        
    }

    console.log("Keep looking for grass!");
    onGrassDisplay.textContent = "Keep looking for grass!";
    onGrassDisplay.style.color = "red";
    return false;
}

export { username, getPoints as points, getPlayerLocation as playerLocation, isOnGrass, setPlayerLocationLocal as setPlayerLocation };

//chat feature
//Pokemon go for touching grass
//standing on grass gets you points
//weekly leaderboard
//challenge quest to touch different patches of grass
//weather API integration for outdoor conditions
//social sharing of grass touching achievements
//AR feature to visualize grass patches
//reminders to take breaks and touch grass