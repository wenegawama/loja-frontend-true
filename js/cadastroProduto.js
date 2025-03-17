document.getElementById('produtoForm').addEventListener('submit', function(event) { //depois q o DOM recarregar, verificar se o usuario está logado na sessão antes de prosseguir
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const cor = document.getElementById('cor').value;
    const quantidade = document.getElementById('quantidade').value;
    const descricao = document.getElementById('descricao').value;
    
    document.getElementById('tamanho').addEventListener('change', function() {
        const tamanhoSelecionado = document.getElementById('tamanho')
        const tamanho = tamanhoSelecionado.options[tamanhoSelecionado.selected].innerText;
        console.log('Tamanho selecionado: ', tamanho)
    })

    document.getElementById('categoria').addEventListener('change', function() {
        const categoriaSelecionada = document.getElementById('categoria');
        const categoriaTexto = categoriaSelecionada.options[categoriaSelecionada.selected].innerText;
        console.log('Categoria selecionada: ', categoriaTexto);
    })

    const dadosProdutos = {
        nome: nome,
        preco: preco,
        cor: cor,
        quantidade: quantidade,
        descricao: descricao,
        tamanho: tamanho,
        categoria: categoria
    }
    console.log(dadosProdutos);

    /*const produtoForm =  document.getElementById('produtoForm');
    const campos = document.querySelectorAll('.required');
    const spans = document.querySelectorAll('.span-required');

    const fullNameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/
    
    const documentRegex = /^\d{11}$/
    
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
 

 
    fetch('http://localhost:8080/api/v1/users', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProdutos)
    })
    .then(response => response.json())
    .then(response => {
        console.log('Dados do produto enviado para o backend com sucesso!!')
    })
    .catch(error => {
        console.log('Error: ', error)
    })
    */
})

















