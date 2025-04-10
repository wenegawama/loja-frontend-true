document.getElementById('recupararForm').addEventListener('submit', function(event) { 

    event.preventDefault();

    const cpf = document.getElementById('input-cpf').value;
    const email = document.getElementById('email').value;
    const pergunta = document.getElementById('pergunta').value;
    const resposta = document.getElementById('resposta').value;

    const userData = {      
        documento: cpf,       
        email: email,
        pergunta: pergunta,
        resposta: resposta
    }

    console.log(userData)

    
    fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/recovery', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Dados enviados com sucesso para atualização!')
    })
    .catch(error => {
        console.log('Error: ', error)
    })

})