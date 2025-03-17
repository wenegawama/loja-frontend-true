document.addEventListener('DOMContentLoaded', (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    if(user) {
        document.getElementById('profileTile').innerHTML = ` 
            <p>Perfil: ${user.perfil.name} </p>
        `
    }
}) 


//logout
document.addEventListener('click', (event) => {
    sessionStorage.removeItem('user')
    window.location.href='/'
})









