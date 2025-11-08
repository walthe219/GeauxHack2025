const pointDisplay = document.getElementById("pointsDisplay");
let points = 0;

function updatePoints(isOnGrass)
{
    if(isOnGrass){
        points += 3;
        pointDisplay.textContent = `Points: ${points}`;
    }
}