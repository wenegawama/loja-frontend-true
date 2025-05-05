let products = []

async function fetchAllProducts () {
            const urlBase = "http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/products"
            fetch(urlBase)
            .then(response => response.json())
            .then(response => {
                products = response
                displayProducts(products)
                searchProducts()
    })
            console.log(products)
}

function displayProducts(products) {
    const productContainer = document.getElementById('productList')
    
    let produtos = ''
    products.forEach(product => {

        produtos = produtos+ 
        `<div class="col-md-4 mb-4">
            <div class="card">
            <a href="/pages/produto.html?id=${product.id}">
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

function searchProducts() {
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('keyup', function () {
        const input = this.value.toLowerCase()
        const filterProducts = products.filter(product => product.name.toLowerCase().includes(input))
        displayProducts(filterProducts)
    })
}

window.onload = () => {
    fetchAllProducts()
}
