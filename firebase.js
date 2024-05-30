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
const database = firebase.database()

const regSubmitButton = document.querySelector('.register-submit');
// regSubmitButton.addEventListener('click', register);
if (regSubmitButton) {
    regSubmitButton.addEventListener('click', register);
}
function register () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    console.log(firstName);

    const lastName = document.getElementById("LastName").value;
    console.log(lastName);

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Email:', email);
            console.log('Password:', password);
            const user = auth.currentUser;
            console.log(user.uid);
            const user_data = {
                first_name : firstName,
                last_name : lastName,
                user_img : "",
                win_team : "",
                top_scorer : "",
                matches_guess : {
                    game1 : {
                        germany:0,
                        scotland:0
                    }
                },
                group_standing :{
                    groupA:{
                        team1 : "",
                        team2 : "",
                        team3 : "",
                        team4: ""
                    }
                }

            }
            database.ref('users/' + user.uid).set(user_data)
                .then(function() {
                    window.location.href = "home.html";
                })
                .catch(function(error) {
                    alert(error.message);
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
            console.log('Email:', email);
            console.log('Password:', password);

            // Open the index.html file
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error);
        })
}