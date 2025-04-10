document.getElementById('updatePassword').addEventListener('submit', (event) => {
    event.preventDefault()

    const password1 = document.getElementById('senha1').value 
    const password2 = document.getElementById('senha2').value 

    const form =  document.getElementById('senha');
    const fields = document.querySelectorAll('.required');
    const spans = document.querySelectorAll('.span-required');

    function setError(index) {
        fields[index].style.border = "2px solid #e63636"
        spans[index].style.display = "block"
    }   
    function removeError(index) {
        fields[index].style.border = ""
        spans[index].style.display = "none"
    }
    function passwordValidate() {
        if (!passwordRegex.test(fields[0].value)) {
            setError(0)
            console.log(0)
        }
        else {
            removeError(0)
        }
    }

    if(password1 === password2) {
        let contactRecuperado = JSON.parse(sessionStorage.getItem('responseUpdatePassword'));
        //console.log(contactRecuperado.name)
        const updateData = {
            id: contactRecuperado.user.id,
            password: password2
        }

        fetch('http://NPRCURJBE02PYDW.REDECORP.BR:8080/api/v1/users/updatePassword', {
            method:  'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(response => {
            alert('Senha alterada com sucesso !')
            console.log('Senha do usuário enviado para o backend com sucesso!!' + response.user.password);
        })
        .catch(error => {
            console.error('Erro : ', error)
            alert('Algo deu erro, digite a senha novamente !')
        })
    }
}) 
