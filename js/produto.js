function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    console.log(params)
    return params.get('id')
}

async function fetchSingleProduct(id) {
    const urlBase =  `http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/sellers/produtos/buscar?id=${id}`
    
    const response = await fetch(urlBase)
    const product = await response.json()

    //console.log(product)

    try {
        document.getElementById('name').textContent = product.name
        document.getElementById('price').textContent = product.price
        document.getElementById('tamanho').textContent = product.tamanho
        document.getElementById('category').textContent = product.category
        document.getElementById('description').textContent = product.description

    } catch(error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getProductIdFromUrl()
    if(id) {
        fetchSingleProduct(id)
    } else {
        console.log('Id do produto não encontrado')
    }
})

document.getElementById('addToCartButton').addEventListener('click', function() {
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    setTimeout(function() {
        successModal.hide();
      }, 3000);
  });