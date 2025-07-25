document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('input-name').value;
    const cpfInput = document.getElementById('input-cpf');
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

    const cpfLimpo = cpfInput.value.replace(/[.-]/g, "");
   
    console.log(pergunta);

    const userData = {
        name: name,
        documento: cpfLimpo,
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

    // Enviar para o backend
    fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(response => {
        console.log('Dados do usuário enviados para o backend com sucesso!!' + response);
        alert('Usuário cadastrado com sucesso!')
    })
    .catch(error => {
        console.log('Erro: ', error);
        alert('Algo deu erro, tente novamente!')
    });
});
    
// Formatação dinâmica do CPF ao digitar
document.getElementById('input-cpf').addEventListener('input', function(event) {
    let cpf = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (cpf.length > 3) cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
    if (cpf.length > 7) cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
    if (cpf.length > 11) cpf = cpf.slice(0, 11) + '-' + cpf.slice(11, 13);
    event.target.value = cpf;
});


const form =  document.getElementById('userForm');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/

const documentRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

const addressRegex = /^[a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})*,\s*\d+$/

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

/*
function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        }
        else {
            //cep é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulário_cep();
    }
}

function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
    }
    else {
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}
*/        


