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
                    window.location.href = 'home.html';
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






