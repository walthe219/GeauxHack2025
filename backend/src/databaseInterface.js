import { getDocFromFirebase, addToFirebase, upsertToFirebase } from './firebase.js';

function packageUserData(username, score){
    return {
        username: username,
        score: parseInt(score),
    };
}
async function getUserData(username){
    return await getDocFromFirebase(username);
}

async function addUser(username){
    return await addToFirebase(packageUserData(username, 0));
}
async function updateUserData(username,newData){
    return await upsertToFirebase(username, newData);
}

export { packageUserData, getUserData, addUser, updateUserData };