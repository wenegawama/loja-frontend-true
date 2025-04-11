document.getElementById('produtoForm').addEventListener('submit', function(event) { 
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const precoDouble = parseFloat(preco).toFixed(2)
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

    //Validação dos campos
    
    const form =  document.getElementById('produtoForm');
    const fields = document.querySelectorAll('.required');
    const spans = document.querySelectorAll('.span-required');
    
    const quantidadeRegex = /^[1-9]\\d*$/

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

    function quantidadeValidate() {
        if(!quantidadeRegex.test(nome)) {
            console.log('não validou')
            setError(0)
        }
        else {
            console.log('validou')
            removeError(0)
        }
    } 
    

    //
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
        foto: null,
        id_user: user.user.id
    }
    console.log(dadosProdutos);


    fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/product', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProdutos)
    })
    .then(response => response.json())
    .then(response => {
        alert("Produto cadastrado com sucesso")
        console.log('Dados do produto enviado para o backend com sucesso!!' + response)
    })
    .catch(error => {
        alert("Algo deu erro!!!")
        console.log('Error: ', error)
    })
})

















