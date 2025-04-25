document.addEventListener('DOMContentLoaded', (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)

    if(user) {
        document.getElementById('profileTile').innerHTML = ` 
            <p>Perfil: ${user.user.perfil.name}</p>
            <p>Olá ${user.user.email}</p>
            <p>Olá ${user.name}</p>
        `   
        if(user.user.perfil.id == 1) {
            const idVend = document.getElementById('menu-vendedor')
            idVend.style.display = 'none';

            const idCli = document.getElementById('menu-cliente')
            idCli.style.display = 'none';
        } 
        if(user.user.perfil.id == 2) {
            const idAdm = document.getElementById('menu-administrador')
            idAdm.style.display = 'none';

            const idCli = document.getElementById('menu-cliente')
            idCli.style.display = 'none';
        }
        if(user.user.perfil.id == 3) {
            const idAdm = document.getElementById('menu-administrador')
            idAdm.style.display = 'none';

            const idVend = document.getElementById('menu-vendedor')
            idVend.style.display = 'none';
        }  
    }
    else {
        window.location.href = './permission.html';
    }
}) 


//logout
function logout() {
    sessionStorage.clear();
    window.location.href='/';
}









