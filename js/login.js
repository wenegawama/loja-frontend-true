document.addEventListener('DOMContentLoaded', function () {
    fetch('/pages/template/headerSemLoginCarrinho.html')
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        return new Error('Erro ao carregar o header' + response.statusText)
      })
      .then(data => {
        document.getElementById('header-container').innerHTML = data
      })
      .catch(error => console.error(error))
})
  
document.addEventListener('DOMContentLoaded', function () {
    fetch('/pages/template/footer.html')
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        return new Error('Erro ao carregar o footer' + response.statusText)
      })
      .then(data => {
        document.getElementById('footer').innerHTML = data
      })
      .catch(error => console.error(error))
})

document.getElementById('login-form').addEventListener('submit', function(event) { 
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    }
    //console.log(loginData)

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

    fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/auth/login', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(response => {
        if(response != null) {
            sessionStorage.setItem('user', JSON.stringify(response));   
            
            const params = new URLSearchParams(window.location.search)
            const redirect = params.get('redirect')

            if (redirect) {
                window.location.href='/pages/pagamentos.html';
            } else {
                window.location.href='/pages/profile.html'
            } 
        }
    })
    .catch(error => console.error('Erro: ', error))    
})


