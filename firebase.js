const firebaseConfig = {
    apiKey: "AIzaSyDq8vIkqgBNyXtjzqhGPBbzTP-I-gJ29ME",
    authDomain: "ci-euro.firebaseapp.com",
    databaseURL: "https://ci-euro-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ci-euro",
    storageBucket: "ci-euro.appspot.com",
    messagingSenderId: "488425937623",
    appId: "1:488425937623:web:bc2a3af2760109246f2e92"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
// const database = firebase.database()
const firestore = firebase.firestore();

const regSubmitButton = document.querySelector('.register-submit');
// regSubmitButton.addEventListener('click', register);
if (regSubmitButton) {
    regSubmitButton.addEventListener('click', register);
}
function register () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("LastName").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth.currentUser;
            const user_data = {
                first_name : firstName,
                last_name : lastName,
                user_img : "",
                win_team : "",
                top_scorer : "",
                total_points : 0,
                group_Stages_Points : 0,
                group_Standing_Points : 0,
                knockout_Points: 0,
                top_Scorer_points : 0
            }

            firestore.collection("users").doc(user.uid).set(user_data)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        })
        .catch((error) => {
            alert(error);
        })
}

//login
const loginButton = document.querySelector('.login-submit');
// loginButton.addEventListener('click', logIn);
if (loginButton) {
    loginButton.addEventListener('click', logIn);
}
function logIn () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {

            // Open the index.html file
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error);
        })
}
// const saveGBtn = document.getElementById('save-group-submit');
// if (saveGBtn) {
//     saveGBtn.addEventListener('click',saveGroups);
// }
// function saveGroups(){
//     let updates = {};
//     const user = auth.currentUser;
//     let groups=['A','B','C','D','E','F']
//     for(let i =0; i<6; i++){
//         for (let j = 1; j <= 4; j++) { // Assuming each card has 4 rows
//             let selectElement = document.getElementById(`group${groups[i]}Select${j}`);
//             updates[`group_standing.group${groups[i]}.team${j}`] = selectElement.options[selectElement.selectedIndex].value;
//         }
//     }
//
//     firestore.collection("users").doc(user.uid).update(updates)
//         .then(() => {
//             alert("Document successfully updated!");
//         })
//         .catch((error) => {
//             // The document probably doesn't exist.
//             console.error("Error updating document: ", error);
//         });
//
// }

const saveButtons = document.querySelectorAll('.save-group-match-submit');

if(saveButtons)
{
    saveButtons.forEach((saveButton) => {
        saveButton.addEventListener('click', () => {
            // Find the corresponding instance of the HTML structure
            const matchInstance = saveButton.closest('.match-group');

            if (matchInstance) {
                const matchId = matchInstance.dataset.matchgroupId;
                const groupId = matchInstance.dataset.groupId;// Get the match ID
                const user = auth.currentUser;
                const teamA = matchInstance.querySelector('.teamA').textContent;
                const teamB = matchInstance.querySelector('.teamB').textContent;
                const teamAPoints = matchInstance.querySelector('.teamA-points').value;
                const teamBPoints = matchInstance.querySelector('.teamB-points').value;

                console.log(`Match ID: ${matchId},group id: ${groupId}, User: ${user}, Team A: ${teamA}, Team B: ${teamB}, Team A Points: ${teamAPoints}, Team B Points: ${teamBPoints}`);
                let updates = {
                    teamA : teamA,
                    teamA_score : Number(teamAPoints),
                    teamB :teamB,
                    teamB_score :Number(teamBPoints)
                };


                    const GroupRef = firestore.collection("groups").doc(`group${groupId}`);
                    const matchRef= GroupRef.collection("matches").doc(`match${matchId}`);
                    matchRef.collection("prediction").doc(user.uid).set(updates)
                        .then(() => {
                                    alert("Document successfully updated!");
                                })
                                .catch((error) => {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });
                // firestore.collection("groups").doc('user.uid').update(updates)
                //     .then(() => {
                //         alert("Document successfully updated!");
                //     })
                //     .catch((error) => {
                //         // The document probably doesn't exist.
                //         console.error("Error updating document: ", error);
                //     });
                // Your code to save the match data goes here
            } else {
                console.log('No match instance found for the clicked save button.');
            }
        });
    });


}
// Function to save the match data
function saveMatch(user, matchId, groupId,teamA, teamB, teamAPoints, teamBPoints) {
    // Your code to save the match data goes here
    // updates[`matches_guess.match${matchId}.team${j}`] = selectElement.options[selectElement.selectedIndex].value;

}