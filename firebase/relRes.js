firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
        if(user.email !== 'admin@gmail.com')
            window.location.href = 'index.html';
    }
    else{window.location.href = 'index.html';}
})
const saveButtons = document.querySelectorAll('.save-group-match-submit');
if(saveButtons)
{
    saveButtons.forEach((saveButton)=>{
        saveButton.addEventListener('click',()=>{
            const matchInstance = saveButton.closest('.match-group');
            if(matchInstance){
                const matchId = matchInstance.dataset.matchgroupId;
                const groupId = matchInstance.dataset.groupId;// Get the match ID
                const teamA = matchInstance.querySelector('.teamA').textContent;
                const teamB = matchInstance.querySelector('.teamB').textContent;
                const teamAPoints = Number(matchInstance.querySelector('.teamA-points-real').value);
                const teamBPoints = Number(matchInstance.querySelector('.teamB-points-real').value);
                console.log(`Match ID: ${matchId},group id: ${groupId}, , Team A: ${teamA}, Team B: ${teamB}, Team A Points: ${teamAPoints}, Team B Points: ${teamBPoints}`);
                const data = {
                    teamA_name: teamA,
                    teamA_score: teamAPoints,
                    teamB_name: teamB,
                    teamB_score: teamBPoints
                }
                let points1=0;
                let points2=0;
                if(teamAPoints>teamBPoints){
                    points1=3;
                    points2=0;
                }
                else{
                    if(teamAPoints === teamBPoints){
                    points1=1;
                    points2=1;
                }
                    else{
                        points1=0;
                        points2=3;
                    }
                }

                const GroupRef = firestore.collection("groups").doc(`group${groupId}`);
                const batch = firestore.batch();
                let docData;
                let updatedGroupData = {};
                GroupRef.get()
                    .then((doc) => {
                        if (doc.exists) {
                            docData=doc.data();
                            updatedGroupData = {
                                [teamA]: docData[teamA] ? docData[teamA] + points1 : points1,
                                [teamB]: docData[teamB] ? docData[teamB] + points2 : points2,
                            };
                            console.log("Document data:", updatedGroupData);
                            batch.update(GroupRef, updatedGroupData);
                            batch.commit();
                                // .then(() => {
                                //     console.log("Document successfully written!");
                                // })
                                // .catch((error) => {
                                //     console.error("Error writing document: ", error);
                                // });
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            return null;
                        }
                    }).catch((error) => {
                    console.log("Error getting document:", error);
                });

                GroupRef.collection("matches").doc(`match${matchId}`).set(data)
                    .then(() => {
                        console.log("Document successfully written!");

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });

            }
        })
    })
}