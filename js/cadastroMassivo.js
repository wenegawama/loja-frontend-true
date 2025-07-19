document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    
    const userId = user.user.id
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file || !userId) {
        alert("Preencha todos os campos.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`http://localhost:8080/api/v1/sellers/upload?userId=${userId}`, {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        const messageDiv = document.getElementById('responseMessage');

        if (response.ok) {
            messageDiv.innerHTML = `<div class="alert alert-success">Upload realizado com sucesso! ${result} produtos cadastrados.</div>`;
        } else {
            messageDiv.innerHTML = `<div class="alert alert-danger">Erro ao enviar: ${result}</div>`;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerHTML =
            `<div class="alert alert-danger">Erro na requisição: ${error.message}</div>`;
    }
});
