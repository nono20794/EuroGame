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

    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log('Email:', email);
            console.log('Password:', password);
            // Open the index.html file
            window.location.href = 'home.html';
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
        .then((user) => {
            console.log('Email:', email);
            console.log('Password:', password);
            // Open the index.html file
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error);
        })
}