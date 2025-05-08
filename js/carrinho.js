/*
let contador  = 1

document.getElementById('btnMais').addEventListener('click', function aumentar() {
    const contador = document.getElementById('inputQuantidade').value
    //input.value = quantidade
    console.log(contador)
}) 

function aumentar(contador = 1) {
    return contador ++
}

let productData = document.cookie
console.log('Carrinho - Dados do item produto adicionado : '+ productData)
console.log('Tamanho do carrinho: '+ productData.length)

*/

/*--------------------------------------*/
function mostrarCarrinho () {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || []
    console.log(cart)
    const tabela = document.getElementById('tabela')
    tabela.innerHTML = ''

    cart.forEach((item, index) => {
        const linha = document.createElement('tr')
        linha.innerHTML = 
            `
                <th scope="row">${index + 1}</th>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                    <div class="container align-items-center">
                        <button class="botao btnMenos" data-index="${index}"><img src="/images/menos.png" alt="Botão menos" height="20px" width="20px"></button>
                        <input type="text" name="" id="inputQuantidade" class="inputQuantidade" height="20px"  value="${item.quantity || 1}" readonly>
                        <button class="botao btnMais" data-index="${index}"><img src="/images/mais.png" alt="Botão mais" height="20px" width="20px"></button>
                    </div>
                    </td>
                    <td><button class="text-white bg-danger  rounded" onclick="removerDoCarrinho(${index})">Remover</button></td>
            `
            tabela.appendChild(linha)
    })
    adicionarEventosBotoes()
    atualizarCarrinho(cart)
}

function atualizarCarrinho (cart) {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0) 

    document.getElementById('total').innerHTML = `<p id="total" px-5><b>Total : </b>R$ ${total.toFixed(2)} </p>`
}

function removerDoCarrinho (index) {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || []
    cart.splice(index, 1)

    localStorage.setItem('carrinho', JSON.stringify(cart))
    mostrarCarrinho()
}

//Add eventos botões
 function adicionarEventosBotoes() {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || []
    
    document.querySelectorAll('.btnMais').forEach((btnMais) => {
        btnMais.addEventListener('click', () => {
            const index = btnMais.getAttribute('data-index')
            
            //console.log(index)

            cart[index].quantity = (cart[index].quantity || 1) + 1
            localStorage.setItem('carrinho', JSON.stringify(cart))
            mostrarCarrinho()
        })
    })
    
    document.querySelectorAll('.btnMenos').forEach((btnMenos) => {
        btnMenos.addEventListener('click', () => {
            const index = btnMenos.getAttribute('data-index')
            
            if (cart[index].quantity > 1) {
                cart[index].quantity = cart[index].quantity -1
            }

            localStorage.setItem('carrinho', JSON.stringify(cart))
            mostrarCarrinho()
        })
    })
 }

document.addEventListener ('DOMContentLoaded', mostrarCarrinho) 