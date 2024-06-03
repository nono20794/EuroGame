firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
        if(user.email !== 'admin@gmail.com')
            window.location.href = 'index.html';

        //upload matches
        const matches  = document.querySelectorAll('.match-group');
        matches.forEach((matchInstance)=>{
            const groupId = matchInstance.dataset.groupId;
            const matchId = matchInstance.dataset.matchgroupId;
            const GroupRef = firestore.collection("groups").doc(`group${groupId}`);
            const matchRef = GroupRef.collection("matches").doc(`match${matchId}`);
            matchRef.get().
            then((doc) => {
                if (doc.exists) {
                    matchInstance.querySelector('.teamA-points-real').value = doc.data().teamA_score;
                    matchInstance.querySelector('.teamB-points-real').value = doc.data().teamB_score;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        });

        //upload groups
        let groups=['A','B','C','D','E','F']
        for(let i=0;i<6;i++)
        {
            const GroupRef = firestore.collection("groups").doc(`group${groups[i]}`);
            GroupRef.get().
            then((doc) => {
                if (doc.exists) {
                    const docData = doc.data();
                    console.log("Document data:", docData);

                    // Iterate over the keys of the docData object
                    const dataArray = Object.entries(docData);

                    // Sort the array based on the values (in ascending order)
                    dataArray.sort((a, b) => b[1] - a[1]);

                    // Log the sorted data
                    dataArray.forEach(([key, value]) => {
                        console.log(`Field "${key}": ${value}`);
                        const groupItem = document.querySelector(`.${key}`);
                        groupItem.querySelector('.points-real').value = value;
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

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
                if (teamAPoints>teamBPoints) {
                    points1=3;
                    points2=0;
                } else if (teamAPoints === teamBPoints) {
                    points1=1;
                    points2=1;
                } else {
                    points1=0;
                    points2=3;
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
                updateUserScores(matchId,groupId,teamAPoints,teamBPoints);

            }
        })
    })
}

function updateUserScores(matchId, groupId, teamAPoints, teamBPoints)
{
    const GroupRef = firestore.collection("groups").doc(`group${groupId}`);
    const matchRef= GroupRef.collection("matches").doc(`match${matchId}`);
    const batch = firestore.batch();
    matchRef.collection("prediction").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // const guessTeamA = doc.data().teamA;
            // const guessTeamB = doc.data().teamB;
            const guessTeamAPoints = doc.data().teamA_score;
            const guessTeamBPoints = doc.data().teamB_score;
            let points = 0;
            if (teamAPoints>teamBPoints){
                if(guessTeamAPoints>guessTeamBPoints){
                    points=points+3;
                    if((guessTeamAPoints === teamAPoints) && (guessTeamBPoints === teamBPoints))
                    {
                        points = points+1;
                        if((teamBPoints+teamAPoints) >= 4)
                        {
                            points=points+1;
                        }
                    }
                }
            }
            else if (teamAPoints === teamBPoints){
                if(guessTeamAPoints === guessTeamBPoints)
                {
                    points=points+3;
                    if((guessTeamAPoints === teamAPoints) && (guessTeamBPoints === teamBPoints))
                    {
                        points = points+1;
                        if((teamBPoints+teamAPoints) >= 4)
                        {
                            points=points+1;
                        }
                    }
                }
            }
            else{
                if(guessTeamAPoints < guessTeamBPoints)
                {
                    points=points+3;
                    if((guessTeamAPoints === teamAPoints) && (guessTeamBPoints === teamBPoints))
                    {
                        points = points+1;
                        if((teamBPoints+teamAPoints) >= 4)
                        {
                            points=points+1;
                        }
                    }
                }
            }
            const userRef = firestore.collection("users").doc(doc.id);

            userRef.get().then((userDoc) => {
                if (userDoc.exists) {
                    let userData =userDoc.data();
                    console.log("Document data:", userDoc.data());
                    const updatedGroupData = {
                        total_points: userData['total_points'] ? userData['total_points'] + points : points,
                        group_Stages_Points: userData['group_Stages_Points'] ? userData['group_Stages_Points'] + points : points,
                    };
                    console.log(updatedGroupData)
                    batch.update(userRef, updatedGroupData);
                    batch.commit();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        });
    });
}
