let products = [];

async function fetchAllProducts() {
  const urlBase =
    "http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/products";
  fetch(urlBase)
    .then((response) => response.json())
    .then((response) => {
      products = response;
      displayProducts(products);
      searchProducts();
    });
  //console.log(products)
}

function displayProducts(products) {
  const productContainer = document.getElementById("productList");

  let produtos = "";
  products.forEach((product) => {
    produtos =
      produtos +
      `<div class="container my-4">
        <div class="d-flex flex-wrap justify-content-start">
          <div class="col-md-4  product-card">
            <div class="card h-100 text-center shadow-sm">
              <img src="https://images.tcdn.com.br/img/img_prod/809258/camiseta_preta_malha_pv_manga_curta_gola_redonda_267_1_948ec668619667388dfc700bf588df6d.jpg">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-danger fs-5">R$ ${product.price}</p>
                <a href="#" class="btn btn-danger mt-auto">Comprar</a>
            </div>
          </div>
        </div>
      </div>`;
  });

  productContainer.innerHTML = produtos;
}

function searchProducts() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", function () {
    const input = this.value.toLowerCase();
    const filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );
    displayProducts(filterProducts);
  });
}

window.onload = () => {
    fetchAllProducts()
}
