var userConected = JSON.parse(sessionStorage.getItem('userConected'))

if(userConected) {
    document.getElementById('msg-bemvindo').innerText = `Ola ${userConected.name}`;
} else {
    window.localStorage.href = "login.html"
}
//const user = JSON.parse(sessionStorage.getItem('user'))

let products = []

async function fetchAllProducts () {
    //try {
            const urlBase = "http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/products"
            fetch(urlBase)
            .then(response => response.json())
            .then(response => {
                products = response
                displayProducts(products)
    })
            console.log(products)
           
    /*} catch (error) {
        console.error("Erro ao carregar os produtos: ", error)
    }*/
}

function displayProducts(products) {
    const productContainer = document.getElementById('productList')
    
    var produtos = ''
    products.forEach(product => {

        produtos = produtos+ 
        `<div class="col-md-4 mb-4">
            <div class="card">
            <a href="./produto.html?id=${product.id}">
                <img
                src="https://www.chersamis.com.br/media/img/content/produtos/default.jpg"
                width="20px" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p>R$ ${product.price}</p>
                </div>
            </a>
            </div>
      </div>`        
    });
    
    productContainer.innerHTML = produtos;
}
window.onload = () => {
    fetchAllProducts()
}

//estilizar o card