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

document.addEventListener('DOMContentLoaded', (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const cartaoDebito = document.getElementById('debito');
    const cartaoCredito = document.getElementById('credito');
    const labelNome = document.getElementById('labelNome');
    const labelNumero = document.getElementById('labelNumero');

    let tipoCartaoValue = '';

    if (cartaoDebito) {
        cartaoDebito.addEventListener('click', () => {
            tipoCartaoValue = 'Cartão débito';
            labelNome.textContent = 'Nome do titular do cartão débito *';
            labelNumero.textContent = 'Número do cartão débito *';
        });
    }

    if (cartaoCredito) {
        cartaoCredito.addEventListener('click', () => {
            tipoCartaoValue = 'Cartão crédito';
            labelNome.textContent = 'Nome do titular do cartão crédito *';
            labelNumero.textContent = 'Número do cartão crédito *';
        });
    }

    if (user) {
        document.getElementById('cartao').addEventListener('submit', (event) => {
            event.preventDefault();

            const nomeTitular = document.getElementById('nome').value;
            const numeroCartao = document.getElementById('numero').value;
            const validade = document.getElementById('validade').value;
            const cvc = document.getElementById('cvc').value;
            const metodoPagamento = document.getElementById('metodoPagamento').value;

            const dadosCartao = {
                nameCard: nomeTitular,
                numberCard: numeroCartao,
                validity: validade,
                cvc: cvc,
                typeCard: tipoCartaoValue,
                typeMetodoPagamento: metodoPagamento,
                idContact: user
            };
            console.log(dadosCartao);

            if (!nomeTitular || !numeroCartao || !validade || !cvc || !tipoCartaoValue ) {
                alert('Por favor, clica no botão para escolher o tipo de cartão e preencha todos os campos antes de enviar!');
                return;
            }

            fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/card/create', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosCartao)
            })
            .then(response => response.json())
            .then(response => {
                console.log('Dados do cartão enviados para o backend com sucesso!!' + response);
                alert('Cartão cadastrado com sucesso!');
            })
            .catch(error => {
                console.log('Erro: ', error);
                alert('Algo deu erro, tente novamente!');
            });
        });
    } else {
        window.location.href = `/pages/login.html?redirect=pagamentos.html`;
    }
});


//Validação dos campos
const form =  document.getElementById('cartao');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.spanRequired');

const fullNameRegex = /^([a-zA-Z]{2,})(\s[a-zA-Z]{2,})+$/
const numeroRegex = /^\d{16}$/
const validadeRegex = /^(0[1-9]|1[0-2])\/(25|2[6-9]|[3-9][0-9])$/;
const cvcRegex = /^\d{3}$/

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
    if(!fullNameRegex.test(fields[0].value)) {
        setError(0)
    }
    else {
        removeError(0)
    }
}
function numeroValidate() {
    if(!numeroRegex.test(fields[1].value)) {
        setError(1)
    }
    else {
        removeError(1)
    }
}
function numeroValidate() {
    if(!numeroRegex.test(fields[1].value)) {
        setError(1)
    }
    else {
        removeError(1)
    }
}
function validadeValidate() {
    if(!validadeRegex.test(fields[2].value)) {
        setError(2)
    }
    else {
        removeError(2)
    }
}
function cvcValidate() {
    if(!cvcRegex.test(fields[3].value)) {
        setError(3)
    }
    else {
        removeError(3)
    }
}
