document.getElementById('produtoForm').addEventListener('submit', function(event) { 
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    console.log(preco)
    const precoDouble = parseFloat(preco.replace(',', '.'))
    console.log(precoDouble)
    const cor = document.getElementById('cor').value;
    const quantidade = document.getElementById('quantidade').value;
    const descricao = document.getElementById('descricao').value;
    const tamanhoSelecionado = document.getElementById('tamanho')
    const tamanho = tamanhoSelecionado.options[tamanhoSelecionado.selectedIndex].innerText
    const categoriaSelecionada = document.getElementById('categoria')
    const categoria = categoriaSelecionada.options[categoriaSelecionada.selectedIndex].innerText

    document.getElementById('tamanho').addEventListener('change', function() {
        const tamanhoSelecionado = document.getElementById('tamanho')
        const tamanho = tamanhoSelecionado.options[tamanhoSelecionado.selectedIndex].innerText;
        console.log('Tamanho selecionado: ', tamanho)
    })
    document.getElementById('categoria').addEventListener('change', function() {
        const categoriaSelecionada = document.getElementById('categoria');
        const categoria = categoriaSelecionada.options[categoriaSelecionada.selected].innerText;
        console.log('Categoria selecionada: ', categoria);
    })
    

    const successToast = new bootstrap.Toast(document.getElementById('successToast'))


    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)

    const dadosProdutos = {
        name: nome,
        description: descricao,
        category: categoria,
        price: precoDouble,
        color: cor,
        quantity: quantidade,
        tamanho: tamanho,
        foto: null
        
    }
    console.log(dadosProdutos);

    
    const urlBase = `http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/product/products/${id}`
    fetch(urlBase, {   
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProdutos)
    })
    .then(response => response.json())
    .then(response => {
        
        console.log('Dados do produto enviado para o backend com sucesso!!' + response)

        form.reset()
        successToast.show()  // ver o tempo de exibição 
        //window.location.href = '/index.html'  
    })
    .catch(error => {
        //alert("Algo deu erro!!!")
        console.log('Error: ', error)
    })
})

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

document.addEventListener("DOMContentLoaded", () => {
const id = getProductIdFromUrl()
if (id) {
    fetchSingleProduct(id)
} else {
    console.log("Id do produto não encontrado")
}
})

 //Validação dos campos
    
const form =  document.getElementById('produtoForm');
const fields = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

//O Nome deve conter duas ou mais palavras, cada uma com pelo menos 2 caracteres, sem números ou caracteres especiais mas aceita hifen somente. Camiseta infantil-juvenil
const nameRegex = /^(?!.*\s{2})[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ-]{1,}( [A-Za-zÀ-ÿ][A-Za-zÀ-ÿ-]{1,})*$/

//Faça um regex que para validar o campo cor que deve aceitar uma ou mas palavras (minimo de 4 letras) formado somente de letras. Deve aceitar uma palavra composta . 
const corRegex = /^(?!.*\s{2})[A-Za-zÀ-ÿ]{4,}(-[A-Za-zÀ-ÿ]{4,})?( ?[A-Za-zÀ-ÿ]{4,}(-[A-Za-zÀ-ÿ]{4,})?)*\s?$/;

const precoRegex = /^(?!0{2,})(?!0{3,},00$)(?!-)(0|[1-9]\d*),\d{2}$/

//Deve ser um número inteiro maior que um
const quantidadeRegex =  /^(?!0+$)[0-9]+$/;


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
 
 function nameValidate() {
    if(!nameRegex.test(fields[0].value)) {
       console.log('não validou')
       setError(0)
    }
    else {
       console.log('validou')
       removeError(0)
    }
} 

function precoValidate() {
    if(!precoRegex.test(fields[1].value)) {
       console.log('não validou' + fields[1].value)
       setError(1)
    }
    else {
       console.log('validou')
       removeError(1)
    }
} 

function corValidate() {
    if(!corRegex.test(fields[3].value)) {
       console.log('não validou')
       setError(3)
    }
    else {
       console.log('validou')
       removeError(3)
    }
}
 
function quantidadeValidate() {
    if(!quantidadeRegex.test(fields[4].value)) {
        console.log('não validou')
        setError(4)
    }
    else {
        console.log('validou')
        removeError(4)
    }
} 


