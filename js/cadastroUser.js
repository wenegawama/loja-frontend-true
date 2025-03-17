document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
 
    const name = document.getElementById('input-name').value;
    const cpfInput = document.getElementById('input-cpf');
    const endereco = document.getElementById('endereco').value;
    const cepInput = document.getElementById('input-cep').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;

    const complemento = document.getElementById('complemento').value;
    const referencia = document.getElementById('referencia').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const phone = document.getElementById('phone').value;
    const perguntaSelecionado = document.getElementById('pergunta');
    const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
    const resposta = document.getElementById('resposta_pergunta').value;
    const perfil = document.getElementById('perfil').value;
 
    // Remover pontos e traços do CPF
    const cpfLimpo = cpfInput.value.replace(/[.-]/g, "");
    const cepLimpo = cepInput.value.replace(/[-]/g, "")
 
    console.log(pergunta);
 
    const userData = {
        name: name,
        documento: cpfLimpo,
        address: endereco,
        zipcode: cepLimpo,
        city: cidade,
        bairro: bairro,
        rua: rua,
        complement: complemento,
        reference_place: referencia,
        email: email,
        password: senha,
        phone: phone,
        pergunta: pergunta,
        resposta_pergunta: resposta,
        perfil: perfil
    };
 
    // Atualizar a pergunta quando o usuário alterar
    document.getElementById('pergunta').addEventListener('change', function() {
        const perguntaSelecionado = document.getElementById('pergunta');
        const pergunta = perguntaSelecionado.options[perguntaSelecionado.selectedIndex].innerText;
        console.log('Pergunta selecionada: ', pergunta);
    });
 
    console.log(userData);
 
    // Armazena no sessionStorage
    sessionStorage.setItem('userData', JSON.stringify(userData));
 
    // Enviar para o backend
    fetch('http://localhost:8080/api/v1/users', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados do usuário enviados para o backend com sucesso!!');
    })
    .catch(error => {
        console.log('Erro: ', error);
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

function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '')

    if(cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5,8)
    }
    return cep;
}

document.getElementById('input-cep').addEventListener('input', function(event) {
    event.target.value = formatarCEP(event.target.value);
});

const form =  document.getElementById('userForm');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/
 
const documentRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
 
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
 
function addressValidate() {
    if (!addressRegex.test(fields[2].value)) {
        setError(2)
    }
    else {
        removeError(2)
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
