
const user = JSON.parse(sessionStorage.getItem('user'))
let idVend = user.user.id

async function fetchAllProducts (idVend) {
            const urlBase =  `http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/product/${idVend}/products`
            fetch(urlBase)
            .then(response => response.json())
            .then(produtos => {
                     const tabela = document.querySelector('tbody')
                     console.log(tabela)
                     tabela.innerHTML = ''
            
                     produtos.forEach(produto => {
                         const linha = document.createElement('tr')
                         linha.innerHTML = `
                             <td>${produto.name}</td>
                             <td>R$${produto.price}</td>
                             <td>${produto.tamanho}</td>   
                             <td>${produto.color}</td>
                             <td>${produto.quantity}</td>
                             <td>${produto.category}</td>
                             <td>${produto.description}</td>
                         `
                         tabela.appendChild(linha)
                     })
                 })
                 .catch(error =>  {
                     console.log('Erro ao buscar produtos : ', error)
                 })  
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAllProducts(idVend)
    })


