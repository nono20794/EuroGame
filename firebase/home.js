firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
        if(user.email!=='admin@gmail.com')
            document.getElementById("real-admin-res").style.display= 'none';

    }
    else{window.location.href = 'index.html';}
})
