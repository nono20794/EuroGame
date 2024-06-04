firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(user.email!=='admin@gmail.com')
            document.getElementById("real-admin-res").style.display= 'none';

        const userRef = firestore.collection('users').doc(user.uid);
        userRef.get()
            .then((userDoc)=>{
                if(userDoc.exists){
                    const firstName = userDoc.data().first_name;
                    const lastName = userDoc.data().last_name;
                    document.querySelector(".fullName").innerHTML=`${firstName} ${lastName}`
                }
                else{
                    console.log("no such user doc")
                }
            })
            .catch((error)=>{
                console.log("Error getting document:", error);
            });

        let groups=['A','B','C','D','E','F']
        for(let i=0;i<groups.length;i++){
            const GroupRef = firestore.collection("groups").doc(`group${groups[i]}`);
            let docRefStand = GroupRef.collection("standing_predictions").doc(user.uid)
            docRefStand.get().then((doc) => {
                if (doc.exists) {
                    GroupRef.get()
                        .then((groupDoc)=>{
                            if(groupDoc.exists){
                                let groupData = groupDoc.data()
                                console.log("Document data:", doc.data());
                                let selectVal = document.getElementById(`group${groups[i]}Select1`)
                                selectVal.value = doc.data().team1;
                                updateImage(document.getElementById(`group${groups[i]}Flag1`), selectVal.value);
                                if(selectVal.value !== 'Select country'){
                                    document.getElementById(`group${groups[i]}Select1Points`).innerText=groupData[selectVal.value];
                                }
                                selectVal = document.getElementById(`group${groups[i]}Select2`);
                                selectVal.value = doc.data().team2;
                                updateImage(document.getElementById(`group${groups[i]}Flag2`), selectVal.value);
                                if(selectVal.value !== 'Select country'){
                                    document.getElementById(`group${groups[i]}Select2Points`).innerText=groupData[selectVal.value];
                                }
                                selectVal = document.getElementById(`group${groups[i]}Select3`);
                                selectVal.value = doc.data().team3;
                                updateImage(document.getElementById(`group${groups[i]}Flag3`), selectVal.value);
                                if(selectVal.value !== 'Select country'){
                                    document.getElementById(`group${groups[i]}Select3Points`).innerText=groupData[selectVal.value];
                                }
                                selectVal = document.getElementById(`group${groups[i]}Select4`);
                                selectVal.value = doc.data().team4;
                                updateImage(document.getElementById(`group${groups[i]}Flag4`), selectVal.value);
                                if(selectVal.value !== 'Select country'){
                                    document.getElementById(`group${groups[i]}Select4Points`).innerText=groupData[selectVal.value];
                                }
                            }
                            else{
                                console.log("Document data:", doc.data());
                                let selectVal = document.getElementById(`group${groups[i]}Select1`)
                                selectVal.value = doc.data().team1;
                                updateImage(document.getElementById(`group${groups[i]}Flag1`), selectVal.value);

                                selectVal = document.getElementById(`group${groups[i]}Select2`);
                                selectVal.value = doc.data().team2;
                                updateImage(document.getElementById(`group${groups[i]}Flag2`), selectVal.value);

                                selectVal = document.getElementById(`group${groups[i]}Select3`);
                                selectVal.value = doc.data().team3;
                                updateImage(document.getElementById(`group${groups[i]}Flag3`), selectVal.value);

                                selectVal = document.getElementById(`group${groups[i]}Select4`);
                                selectVal.value = doc.data().team4;
                                updateImage(document.getElementById(`group${groups[i]}Flag4`), selectVal.value);

                            }
                        })
                        .catch((error)=>{console.log("Error getting document:", error);})

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such user document!");
                    return null;
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });





            window.onload = disableSelectForm;


        }
        const matches  = document.querySelectorAll('.match-group');
        matches.forEach((matchInstance)=>{
            const groupId= matchInstance.dataset.groupId;
            const GroupRef = firestore.collection("groups").doc(`group${groupId}`);

            const matchId = matchInstance.dataset.matchgroupId;
            const user = auth.currentUser;

            const matchRef= GroupRef.collection("matches").doc(`match${matchId}`);
            matchRef.collection("prediction").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        matchInstance.querySelector('.teamA-points').value = doc.data().teamA_score;
                        matchInstance.querySelector('.teamB-points').value = doc.data().teamB_score;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        return null;

                    }
                }).catch((error) => {
                console.log("Error getting document:", error);
            });
        });

    } else {
        window.location.href = 'index.html';
    }
});
function disableSelectForm() {
    const disableDate = new Date('2024-06-14T21:59:59'); // June 3, 2024, 8:00 PM
    const currentDate = new Date();

    let groups=['A','B','C','D','E','F'];
    for(let i=0;i<6;i++)
    {
        for(let j=1;j<=4;j++){
            if (currentDate >= disableDate) {
                const selectForm = document.getElementById(`group${groups[i]}Select${j}`);
                selectForm.disabled = true;
            }
        }

    }

}


document.addEventListener('DOMContentLoaded', function() {
    const selectElements = document.querySelectorAll('select.form-select');

    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            const selectedValue = this.value;
            const imgElement = this.parentElement.querySelector('img.img-fluid');
            updateImage(imgElement, selectedValue);
        });
    });
});

function updateImage(imgElement, selectedValue) {
    let flagSrc;
    switch (selectedValue) {
        //GROUP A
        case 'Germany':
            flagSrc = 'flags/Germany.svg';
            break;
        case 'Switzerland':
            flagSrc = 'flags/Switzerland.svg';
            break;
        case 'Hungary':
            flagSrc = 'flags/Hungary.svg';
            break;
        case 'Scotland':
            flagSrc = 'flags/Scotland.svg';
            break;
        //GROUP B
        case 'Spain':
            flagSrc = 'flags/Spain.svg';
            break;
        case 'Croatia':
            flagSrc = 'flags/Croatia.svg';
            break;
        case 'Italy':
            flagSrc = 'flags/Italy.svg';
            break;
        case 'Albania':
            flagSrc = 'flags/Albania.svg';
            break;
        //GROUP C
        case 'England':
            flagSrc = 'flags/England.svg';
            break;
        case 'Slovenia':
            flagSrc = 'flags/Slovenia.svg';
            break;
        case 'Denmark':
            flagSrc = 'flags/Denmark.svg';
            break;
        case 'Serbia':
            flagSrc = 'flags/Serbia.svg';
            break;
        //GROUP D
        case 'Netherlands':
            flagSrc = 'flags/Netherlands.svg';
            break;
        case 'France':
            flagSrc = 'flags/France.svg';
            break;
        case 'Poland':
            flagSrc = 'flags/Poland.svg';
            break;
        case 'Austria':
            flagSrc = 'flags/Austria.svg';
            break;
        //GROUP E
        case 'Ukraine':
            flagSrc = 'flags/Ukraine.svg';
            break;
        case 'Slovakia':
            flagSrc = 'flags/Slovakia.svg';
            break;
        case 'Belgium':
            flagSrc = 'flags/Belgium.svg';
            break;
        case 'Romania':
            flagSrc = 'flags/Romania.svg';
            break;
        //GROUP F
        case 'Portugal':
            flagSrc = 'flags/Portugal.svg';
            break;
        case 'Czechia':
            flagSrc = 'flags/Czechia.svg';
            break;
        case 'Georgia':
            flagSrc = 'flags/Georgia.svg';
            break;
        case 'Turkey':
            flagSrc = 'flags/Turkey.svg';
            break;
        default:
            flagSrc = 'images/card-image.svg';
    }
    imgElement.src = flagSrc;
}



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
                const predRef = matchRef.collection("prediction").doc(user.uid);
                const batch = firestore.batch();
                // matchRef.collection("prediction").doc(user.uid).set(updates)
                //     .then(() => {
                //         alert("Document successfully updated!");
                //     })
                //     .catch((error) => {
                //         // The document probably doesn't exist.
                //         console.error("Error updating document: ", error);
                //     });
                batch.set(predRef, updates);
                batch.commit();
            } else {
                console.log('No match instance found for the clicked save button.');
            }
        });
    });


}
//modal functions
const listItems = document.querySelectorAll('.team-modal-list-item');


// Get the search input field
const searchInput = document.getElementById('ModalSearchInputTeam');

// Add event listener to the search input field
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();

    // Loop through each list item
    listItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();

        // Check if the item text includes the search term
        if (itemText.includes(searchTerm)) {
            item.style.display = 'block'; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
});

// Add click event listener to each list item
listItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove the 'active' class from all list items
        listItems.forEach(item => item.classList.remove('active'));

        // Add the 'active' class to the clicked list item
        this.classList.add('active');
    });
});

const saveTeamModal = document.getElementById('modalSaveTeam');
if(saveTeamModal)
    saveTeamModal.addEventListener('click',saveTeam);

function saveTeam(){
    const selectedItem = document.querySelector('.team-modal-list-item.active');
    if (selectedItem) {
        const selectedItemText = selectedItem.textContent.trim();
        console.log('Selected item:', selectedItemText);
        // You can perform additional actions here with the selected item text
        document.querySelector(".teamWinImg").src = `rounded-flags/${selectedItemText}.svg`;
        document.querySelector('.teamWinName').innerText = selectedItemText;
    } else {
        console.log('No item selected');
    }
}
