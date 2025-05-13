
document.addEventListener('DOMContentLoaded', function () {
    fetch("/pages/template/header.html")
    .then(response => {
        if(response.ok) {
            return response.text()
        }
        return new Error("Erro ao carregar o header" + response.statusText)
    })
    .then(data => {
        document.getElementById('header-container').innerHTML = data
    })
    .catch(error => console.error(error))
})

document.addEventListener('DOMContentLoaded', function () {
    fetch("/pages/template/footer.html")
    .then(response => {
        if(response.ok) {
            return response.text()
        }
        return new Error("Erro ao carregar o footer" + response.statusText)
    })
    .then(data => {
        document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error(error))
})

document.addEventListener('DOMContentLoaded', (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log('user' + 2) //ainda não ta funcionando

    if (user) {

    } else {
        window.location.href = '/pages/login.html'
    }

})

