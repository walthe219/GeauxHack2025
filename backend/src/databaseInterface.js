
function packageUserData(username, score){
    return {
        username: username,
        score: score,
    };
}
async function getUserData(username){
    return await firebase.getDocFromFirebase(username);
}

async function addUser(username){
    return await firebase.addToFirebase(packageUserData(username, 0));
}
async function updateUserData(username,newData){
    return await firebase.upsertToFirebase(username, newData);
}