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


/*Validação dos campos
const form =  document.getElementById('cartao');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/


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

function documentValidate() {
    if(!documentRegex.test(fields[1].value)) {
        setError(1)
    }
    else {
        removeError(1)
    }
}
*/

// Validação do formulário
const form = document.getElementById('cartao');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let valid = true;
        document.querySelectorAll('.msg-erro').forEach(el => el.remove());

        const nome = document.getElementById('nome');
        const nomeValor = nome.value.trim();
        const nomeRegex = /^([A-Za-zÀ-ú]{2,}\s){1,}[A-Za-zÀ-ú]{2,}$/;
        if (!nomeRegex.test(nomeValor)) {
            mostrarErro(nome, 'O Nome Completo deve conter duas ou mais palavras, cada uma com pelo menos 2 letras, sem números ou caracteres especiais.');
            valid = false;
        }

        const numero = document.getElementById('numero');
        const numeroValor = numero.value.replace(/\s/g, '');
        const numeroRegex = /^\d{16}$/
        if (!numeroRegex.test(numeroValor)) {
            mostrarErro(numero, 'O número do cartão deve conter 16 dígitos.');
            valid = false;
        }

        const validade = document.getElementById('validade');
        const validadeValor = validade.value.trim();
        const validadeRegex = /^(\d{2}\/\d{2}|\d{4})$/
        if (!validadeRegex.test(validadeValor)) {
            mostrarErro(validade, 'A validade deve estar no formato MM/AA ou MMAA.');
            valid = false;
        }

        const cvc = document.querySelector('input[placeholder="669"]');
        const cvcValor = cvc.value.trim();
        const cvcRegex = /^\d{3}$/
        if (!cvcRegex.test(cvcValor)) {
            mostrarErro(cvc, 'O código de segurança deve conter 3 dígitos.');
            valid = false;
        }

        document.getElementById('numero').addEventListener('input', (e) => {
            if(this.value.length > 16) {
                this.value = this.value.slice(0, 16)
            }
        })


        const toastElemento = document.getElementById('successToast')
        const toast = new bootstrap.Toast(toastElemento, {delay: 5000})

        if (valid) {
            //form.insertAdjacentHTML('beforeend', '<div class="msg-sucesso text-success mt-2">Cartão salvo com sucesso!</div>');
             form.submit(); // Descomente para enviar de verdade

            //form.reset()
            //toast.show()
            
            

        }
    });

    function mostrarErro(input, mensagem) {
        const erro = document.createElement('div');
        erro.className = 'msg-erro text-danger mb-2';
        erro.textContent = mensagem;
        input.parentNode.appendChild(erro);
    }
}

