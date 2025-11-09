import { addPoints, getPoints } from './appState.js';
import { packageUserData } from './databaseInterface.js';
import { upsertToFirebase } from './firebase.js';   

const pointDisplay = document.getElementById("pointsDisplay");

function updatePoints(isOnGrass)
{
    if(isOnGrass){
        const newPoints = addPoints(3);
        pointDisplay.textContent = `Points: ${newPoints}`;


        return newPoints;
    }
    //upsertToFirebase(window.username, packageUserData(window.username, getPoints()));
    return getPoints();
}

export { updatePoints };