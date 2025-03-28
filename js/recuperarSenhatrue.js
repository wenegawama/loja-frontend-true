document.getElementById('recupararForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cpf = document.getElementById('cpf').value;   
    const email = document.getElementById('email').value;   
    const perguntaSelecionado = document.getElementById('pergunta');
    const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
    const resposta = document.getElementById('resposta').value;

    const userRecovery = {       
        documento: cpf,       
        email: email,      
        pergunta: pergunta,
        respostaPergunta: resposta
 
    };
    console.log(userRecovery)
    
    
    fetch('http://localhost:8080/api/v1/auth/recovery', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRecovery)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        sessionStorage.setItem('responseUpdatePassword', JSON.stringify(response));
        let contactRecuperado = JSON.parse(sessionStorage.getItem('responseUpdatePassword'));
        console.log(contactRecuperado.name)
        if(response != null) {
            window.location.href = 'updatePassword.html'
        }
    })
    
        /*if(response.user != null) {
            console.log(response.user)
            sessionStorage.setItem('user', JSON.stringify(response.user));

            fetch('http://localhost:8080/api/v1/users/updatePassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.id, user.password)
            })
            .then(response => response.json())
            .then(response => {
                console.log('Senha atualizada')
            })
        }
        else {
            alert('Atualização da senha falhou: ' + response.message)
            window.location.href = '/';
        }       
    })
    .catch(error => console.error('Erro: ', error))
    */

})