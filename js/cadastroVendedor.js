document.getElementById('userForm').addEventListener('submit', function(event) { 

    event.preventDefault();

    const name = document.getElementById('input-name').value;
    const cnpj = document.getElementById('input-cnpj').value;
    const endereco = document.getElementById('endereco').value;
    const cep = document.getElementById('cep').value;
    //

    const cidade = document.getElementById('cidade').value;
    const complemento = document.getElementById('complemento').value;
    const referencia = document.getElementById('referencia').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const phone = document.getElementById('phone').value;
    const perguntaSelecionado = document.getElementById('pergunta')
    const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
    const resposta = document.getElementById('resposta_pergunta').value;
    const perfil = document.getElementById('perfil').value;
    console.log(pergunta);

    const sellerData = {
        name: name,
        documento: cnpj,
        address: endereco,
        zipcode: cep,
        city: cidade,
        complement: complemento,
        reference_place: referencia,
        email: email,
        password: senha,
        phone: phone,
        pergunta: pergunta,
        resposta_pergunta: resposta,
        perfil: perfil
    }

document.getElementById('pergunta').addEventListener('change', function() {
    const perguntaSelecionado = document.getElementById('pergunta')
    const pergunta = perguntaSelecionado.options[perguntaSelecionado.selected].innerText;

    console.log('Pergunta selecionado: ', pergunta)
})

console.log(sellerData);

localStorage.setItem('sellerData', JSON.stringify(sellerData)) //armazenar no localStorage

   
fetch('http://localhost:8080/api/v1/users/sellers', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sellerData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados do vendedor enviado para o backend com sucesso!!')
    })
    .catch(error => {
        console.log('Error: ', error)
    })
})

const form =  document.getElementById('userForm');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');


const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/
 
const documentRegex = /^\d{14}$/
 
const addressRegex = /^[a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})*,\s*\d+$/
 
const zipcodeRegex = /^\d{8}$/
 
const cityRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/
 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 
const phoneRegex =  /^\d{11}$/
 
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 
const answerRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/
 
function setError(index) {
    fields[index].style.border = "2px solid #e63636"
    spans[index].style.display = "block"
}
 
function removeError(index) {
    fields[index].style.border = ""
    spans[index].style.display = "none"
}
 
function fullNameValidate() {//não ta validando
    if(fields[0].value) {
        //setError(0)
        console.log('validou')
    }
    else {
        //removeError(0)
        console.log('não validou')
    }
}
 
function documentValidate() {
    if(!documentRegex.test(fields[1].value)) {
        setError(1)
    }
    else {
        removeError(1)
    }
 }
 
function addressValidate() {
    if (!addressRegex.test(fields[2].value)) {
        setError(2)
    }
    else {
        removeError(2)
    }
}
 
function zipCodeValidade() {
    if (!zipcodeRegex.test(fields[3].value)) {
        setError(3)
    }
    else {
        removeError(3)
    }
}
 
function cityValidate() {
    if (!cityRegex.test(fields[4].value)) {
        setError(4)
    }
    else {
        removeError(4)
    }
}
 
function emailValidate() {
    if (!emailRegex.test(fields[5].value)) {
        setError(5)
       
    }
    else {
        removeError(5)
    }
}
 
function passwordValidate() {
    if (!passwordRegex.test(fields[6].value)) {
        setError(6)
    }
    else {
        removeError(6)
    }
}
 
function phoneValidate() {
    if(!phoneRegex.test(fields[7].value)) {
        setError(7)
    }
    else {
        removeError(7)
    }
}
 
function answerValidate() {
    if (!answerRegex.test(fields[8].value)) {
        setError(8)
    }
    else {
        removeError(8)
    }
}















