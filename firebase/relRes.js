firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
        if(user.email !== 'admin@gmail.com')
            window.location.href = 'index.html';
    }
    else{window.location.href = 'index.html';}
})