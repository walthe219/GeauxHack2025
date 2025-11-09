

document.getElementById("form").addEventListener("submit", async (event) => {
    const username = document.getElementById("username").value;
    const score = document.getElementById("score").value;

    // Example usage
    await addUser(username);
    const userData = await getUserData(username);
    await updateUserData(username, { score: score });

    console.log(userData);
});