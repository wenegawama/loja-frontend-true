var userConected = JSON.parse(sessionStorage.getItem('userConected'))

if(userConected) {
    document.getElementById('msg-bemvindo').innerText = `Ola ${userConected.name}`;
} else {
    window.localStorage.href = "login.html"
}
