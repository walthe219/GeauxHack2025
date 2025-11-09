import { addToFirebase, getDocFromFirebase } from "./firebase.js";

document.getElementById("submitBtn").addEventListener("click", async (event) => {
    const username = document.getElementById("username").value.trim();
    let score = document.getElementById("score").value.trim();


    const doc = await getDocFromFirebase(username);
    if(doc === null){
        await addToFirebase({ username: username, score: parseInt(score) });    
        console.log("User added to database.");
    }
    else{
        console.log("User already exists in database.");
        score = doc.data.score;
    }
    console.log(`Username: ${username}, Score: ${score}`);

});