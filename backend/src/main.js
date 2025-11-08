
const inputUsername = document.getElementById('username');
const startButton = document.getElementById('startButton');
const usrNmDisplay = document.getElementById('usrNmDisplay');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');

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
    setInterval(mapUpdate, 1000); // Update map every 5 seconds
}
function mapUpdate()
{
    console.log("Map Updated");
    findLocation();
}

function findLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPosition);
    } else
    {
        console.log("Geolocation is not supported by this browser.");
    }
}

function logPosition(position)
{
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}

function geoLocateGrass()
{
    console.log("GeoLocateGrass function called");
}

//Pokemon go for touching grass
//standing on grass gets you points
//weekly leaderboard
//challenge quest to touch different patches of grass
//weather API integration for outdoor conditions
//social sharing of grass touching achievements
//AR feature to visualize grass patches
//reminders to take breaks and touch grass