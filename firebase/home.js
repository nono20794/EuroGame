firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
        if(user.email!=='admin@gmail.com')
            document.getElementById("real-admin-res").style.display= 'none';
        let items=[];
        firestore.collection("users").orderBy("total_points","desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let UserData = {
                    user:doc.data().first_name + " " + doc.data().last_name,
                    points: doc.data().total_points,
                    wildGuesses:0,
                    exactScoreGuesses:0,
                    playOffWinnerGuesses:0,
                    groupPlacesGuesses:0,
                    cupWinnerGuess:doc.data().win_team,
                    topScorerGuess:doc.data().top_scorer
                }
                console.log(UserData);
                items.push(UserData);
            });
            console.log(items);
            loadData(items);
        });


    }
    else{window.location.href = 'index.html';}
})

// Your existing table HTML structure

// Sample data


// Function to populate the table
function createRow(index, rowData = {}) {
    const row = document.createElement('tr');
    row.innerHTML = `
                <th scope="row">${index}</th>
                <td>${rowData.user !== undefined ? rowData.user : ''}</td>
                <td>${rowData.points !== undefined ? rowData.points : ''}</td>
                <td>${rowData.wildGuesses !== undefined ? rowData.wildGuesses : ''}</td>
                <td>${rowData.exactScoreGuesses !== undefined ? rowData.exactScoreGuesses : ''}</td>
                <td>${rowData.playOffWinnerGuesses !== undefined ? rowData.playOffWinnerGuesses : ''}</td>
                <td>${rowData.groupPlacesGuesses !== undefined ? rowData.groupPlacesGuesses : ''}</td>
                <td>${rowData.cupWinnerGuess !== undefined ? rowData.cupWinnerGuess : ''}</td>
                <td>${rowData.topScorerGuess !== undefined ? rowData.topScorerGuess : ''}</td>
            `;
    return row;
}

// Function to load data into the table
function loadData(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ''; // Clear existing rows

    // Load provided data
    data.forEach((item, index) => {
        tbody.appendChild(createRow(index + 1, item));
    });

    // Fill remaining rows up to 10
    for (let i = data.length + 1; i <= 10; i++) {
        tbody.appendChild(createRow(i));
    }
}
// Call the function to populate the table
