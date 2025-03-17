document.getElementById('login-form').addEventListener('submit', function(event) { 
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    }
    console.log(loginData)

    const form =  document.getElementById('login-form');
    const fields = document.querySelectorAll('.required');
    const spans = document.querySelectorAll('.span-required');

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    function setError(index) {
        fields[index].style.border = "2px solid #e63636"
        spans[index].style.display = "block"
    }   
    function removeError(index) {
        fields[index].style.border = ""
        spans[index].style.display = "none"
    }
    function emailValidate() {//não ta validando
        if (!emailRegex.test(fields[0].value)) {
            setError(0)
        }
        else {
            removeError(0)
        }
    }   
    function passwordValidate() {
        if (!passwordRegex.test(fields[1].value)) {
            setError(1)
        }
        else {
            removeError(1)
        }
    }
    if(fields[0].style.border  === "2px solid #e63636" || fields[1].style.border  === "2px solid #e63636") {
        return;
    }

    fetch('http://localhost:8080/api/v1/auth/login', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        if(response.user != null) {
            console.log(response.user)
            sessionStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = `profile.html?profile=${response.user.perfil.id}`;
            // -> tela nao authenticada
            // -> tela authenticada dependendo do perfil
        }
        else {
            alert('Login falhou: ' + response.message)
            window.location.href = login.html;
        }       
    })
    .catch(error => console.error('Erro: ', error))
    
})


