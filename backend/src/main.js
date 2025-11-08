
const inputUsername = document.getElementById('username');
const startButton = document.getElementById('startButton');
const usrNmDisplay = document.getElementById('usrNmDisplay');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
let playerLocation = null;
let isGrassed = false;

function setPlayerLocation(position)
{
    playerLocation = position;
    console.log(`Player location set to Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
}

startButton.addEventListener('click', function() {
    console.log(`Username entered: ${inputUsername.value}`);
    startScreen.style.display = 'none';
    loadGame();
});

function loadGame()
{
    usrNmDisplay.textContent = inputUsername.value;
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

function isOnGrass(){
    if(polygons.length === 0 ){
        console.log("No grass polygons loaded yet :(.");
        return false;
    }

    const point = turf.point([playerLocation.coords.longitude, playerLocation.coords.latitude]);
    
    for(const poly of polygons){
    
        // Create a polygon from the feature's geometry
        
        if(turf.booleanPointInPolygon(point, poly)){
            console.log("Yay! You're on grass!", poly.properties);
            return true;
        }
        
    }
    
    console.log("Keep looking for grass!");
    return false;
}

//chat feature
//Pokemon go for touching grass
//standing on grass gets you points
//weekly leaderboard
//challenge quest to touch different patches of grass
//weather API integration for outdoor conditions
//social sharing of grass touching achievements
//AR feature to visualize grass patches
//reminders to take breaks and touch grass