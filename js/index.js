let products = [];

const IMAGE_BASE = "http://NPRCURJBE02PYDW.REDECORP.BR:8080/imagens";

async function fetchAllProducts() {
  const urlBase = "http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/products";
  try {
    const response = await fetch(urlBase);
    const data = await response.json();
    products = data;
    displayProducts(products);
    searchProducts();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("productList");

  let produtos = `
    <div class="container my-4">
      <div class="row g-4">
  `;

  products.forEach((product) => {
    produtos += `
      <div class="col-md-4 ">
      <a href="/pages/produto.html">
        <div class="card h-100 text-center shadow-sm border-0 rounded-4 product-card">
          <img src="${IMAGE_BASE}/${product.foto}" alt="${product.name}" 
               class="card-img-top img-fluid  rounded-top" 
               style="object-fit: contain; max-height: 300px;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>        
            <p class="card-text text-secondary fs-5">
              <s>R$ ${(product.price * 1.10).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</s>
            </p>
            <p class="card-text text-sucess fs-5">
              R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            </a>
            <a href="/pages/produto.html" class="btn btn-danger mt-auto">Comprar</a>
          </div>
        </div>
      </div>
    `;
  });

  produtos += `
      </div>
    </div>
  `;

  productContainer.innerHTML = produtos;

  // Efeito passando o mouse
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.03)';
      card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
    });
  });
}

function searchProducts() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", function () {
    const input = this.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );
    displayProducts(filteredProducts);
  });
}

window.onload = () => {
  fetchAllProducts();
};
