document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('input-name').value;
    const cnpjInput = document.getElementById('input-cnpj');
    const phone = document.getElementById('phone').value;
    const cepInput = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const neighborhood = document.getElementById('bairro').value;
    const street = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const referencePlace = document.getElementById('referencia').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const perguntaSelecionado = document.getElementById('pergunta');
    const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
    const resposta_pergunta = document.getElementById('resposta_pergunta').value;
    const perfil = document.getElementById('perfil').value;

    const cnpjLimpo = cnpjInput.value.replace(/[.,\/-]/g, "");
    
    console.log(pergunta);

    const userData = {
        name: name,
        documento: cnpjLimpo,
        zipcode: cepInput,
        city: cidade,
        neighborhood: neighborhood,
        street: street,
        numero: numero,
        complement: complemento,
        referencePlace: referencePlace,
        email: email,
        password: senha,
        phone: phone,
        pergunta: pergunta,
        respostaPergunta: resposta_pergunta,
        perfil: perfil
    };

    // Atualizar a pergunta quando o usuário alterar
    document.getElementById('pergunta').addEventListener('change', function() {
        const perguntaSelecionado = document.getElementById('pergunta');
        const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
        console.log('Pergunta selecionada: ', pergunta);
    });

    console.log(userData);

    if (!name || !cnpjLimpo || !phone || !cepInput || !cidade || !neighborhood || !street || !email || !senha || !pergunta || !resposta_pergunta) {
        alert('Por favor, preencha todos os campos antes de enviar!');
        return;
    }

    // Enviar para o backend
    fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(response => {
        console.log('Dados do vendedor enviados para o backend com sucesso!!' + response);
        alert('Vendedor cadastrado com sucesso!')
    })
    .catch(error => {
        console.log('Erro: ', error);
        alert('Algo deu erro, tente novamente!')
    });
});
    
// Formatação dinâmica do CNPJ ao digitar
document.getElementById('input-cnpj').addEventListener('input', function(event) {
    let cnpj = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (cnpj.length > 2) cnpj = cnpj.slice(0, 2) + '.' + cnpj.slice(2);
    if (cnpj.length > 6) cnpj = cnpj.slice(0, 6) + '.' + cnpj.slice(6);
    if (cnpj.length > 10) cnpj = cnpj.slice(0, 10) + '/' + cnpj.slice(10);
    if (cnpj.length > 15) cnpj = cnpj.slice(0, 15) + '-' + cnpj.slice(15);
    event.target.value = cnpj;
});

const form =  document.getElementById('userForm');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/

const documentRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

const zipcodeRegex = /^\d{8}$/

const cityRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/

const neighborhoodRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/

const streetRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/

const numeroRegex= /^\d+$/

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const phoneRegex =  /^\d{11}$/

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const answerRegex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*(?:,\s*[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*)*$/

function setError(index) {
    fields[index].style.border = "2px solid #e63636"
    spans[index].style.display = "block"
}

function removeError(index) {
    if(fields[index]) {
        fields[index].style.border = ""
    }
    if(spans[index]) {
        spans[index].style.display = "none"
    }
}

function fullNameValidate() {
    if(fields[0].value) {
        console.log('validou')
    }
    else {
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

function phoneValidate() {
    if(!phoneRegex.test(fields[2].value)) {
        console.log('não validou')
        setError(2)
    }
    else {
        console.log('validou')
        removeError(2)
    }
}

function zipcodeValidate() {
    if(!zipcodeRegex.test(fields[3].value)) {
        console.log('não validou')
        setError(3)
    }
    else {
        console.log('validou')
        removeError(3)
    }
}

function cityValidate() {
    if(!cityRegex.test(fields[4].value)) {
        console.log('não validou')
        setError(4)
    }
    else {
        console.log('validou')
        removeError(4)
    }
}

function neighborhoodValidate() {
    if(!neighborhoodRegex.test(fields[5].value)) {
        console.log('não validou')
        setError(5)
    }
    else {
        console.log('validou')
        removeError(5)
    }
}

function streetValidate() {
    if(!streetRegex.test(fields[6].value)) {
        console.log('não validou')
        setError(6)
    }
    else {
        console.log('validou')
        removeError(6)
    }
}

function numeroValidate() {
    if(!numeroRegex.test(fields[7].value)) {
        console.log('não validou')
        setError(7)
    }
    else {
        console.log('validou')
        removeError(7)
    }
}

function emailValidate() {
    if (!emailRegex.test(fields[8].value)) {
        console.log('não validou')
        setError(8)
    }
    else {
        console.log('validou')
        removeError(8)
    }
}

function passwordValidate() {
    if (!passwordRegex.test(fields[9].value)) {
        console.log('não validou !')
        setError(9)
    }
    else {
        console.log('validou')
        removeError(9)
    }
}

function answerValidate() {
    if(fields[10] && spans[10]) {
        if (!answerRegex.test(fields[10].value)) {
            setError(10)
        }
        else {
            removeError(10)
        }
    }
}