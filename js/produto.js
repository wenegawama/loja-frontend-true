function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchSingleProduct(id) {
  const urlBase = `http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/produtos/buscar?id=${id}`;
  const response = await fetch(urlBase);
  const product = await response.json();

  try {
    document.getElementById("name").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("tamanho").textContent = product.tamanho;
    document.getElementById("category").textContent = product.category;
    document.getElementById("description").textContent = product.description;

    const itemProduct = {
      name: document.getElementById("name").textContent,
      price: document.getElementById("price").textContent,
      tamanho: document.getElementById("tamanho").textContent,
      category: document.getElementById("category").textContent,
      description: document.getElementById("description").textContent,
    };

    //saveProductToCookie(itemProduct);

    /*let products = [];
        const productsCookie = getCookie('products');
        if (productsCookie) {
            products = JSON.parse(productsCookie);
        }

        products.push(itemProduct);
        document.cookie = `products=${JSON.stringify(products)}; path=/; max-age=86400`;
        console.log('Tamanho da lista dos produtos: ' + products.length);
        */
  } catch (error) {
    console.log(error);
  }
}

/*
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function saveProductToCookie(itemProduct) {
    let products = [];
    const productsCookie = getCookie('products');
    if (productsCookie) {
        products = JSON.parse(productsCookie);
    }

    products.push(itemProduct);
    document.cookie = `products=${JSON.stringify(products)}; path=/; max-age=86400`;
    console.log('Produto salvo no cookie: ', itemProduct);
    console.log('Tamanho da lista dos produtos: ' + products.length)
}
*/

document.addEventListener("DOMContentLoaded", () => {
  const id = getProductIdFromUrl();
  if (id) {
    fetchSingleProduct(id);
  } else {
    console.log("Id do produto não encontrado");
  }
});

document
  .getElementById("addToCartButton")
  .addEventListener("click", function () {
    var successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    successModal.show();

    setTimeout(function () {
      successModal.hide();
    }, 2000);
  });

function salvarProdutoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.carrinho || "[]");
  carrinho.push(produto);
  localStorage.carrinho = JSON.stringify(carrinho);
  console.log("Carrinho" + carrinho);
}

document.getElementById("addToCartButton").addEventListener("click", () => {
  const produto = {
    name: document.getElementById("name").textContent,
    price: document.getElementById("price").textContent,
    tamanho: document.getElementById("tamanho").textContent,
    category: document.getElementById("category").textContent,
    description: document.getElementById("description").textContent,
  };

  salvarProdutoCarrinho(produto);
});
