document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.

        } else {
            window.location.href = 'index.html';
        }
    });
});

const saveGBtn = document.getElementById('save-group-submit');
if (saveGBtn) {
    saveGBtn.addEventListener('click',saveGroups);
}
function saveGroups(){
    let updates = {};
    const user = auth.currentUser;
    let groups=['A','B','C','D','E','F']
    for(let i =0; i<6; i++){
        const GroupRef = firestore.collection("groups").doc(`group${groups[i]}`);
        for (let j = 1; j <= 4; j++) { // Assuming each card has 4 rows
            let selectElement = document.getElementById(`group${groups[i]}Select${j}`);
            updates[`team${j}`] = selectElement.options[selectElement.selectedIndex].value;
        }
        GroupRef.collection("standing_predictions").doc(user.uid).set(updates)
            .then(() => {

            })
            .catch(() => {
                // The document probably doesn't exist.
                alert("Error updating document: ");
            });
    }

    alert("Document successfully updated!");


}

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

            } else {
                console.log('No match instance found for the clicked save button.');
            }
        });
    });


}
