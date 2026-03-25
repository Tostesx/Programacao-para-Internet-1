const input = document.querySelector('#itemInput');
const botao = document.querySelector('#btnAdicionar');
const lista = document.querySelector('#lista');

botao.addEventListener('click', () => {
    const texto = input.value.trim();
    if (texto !== '') {
        const novoItem = document.createElement('li');
        novoItem.textContent = texto;
        lista.appendChild(novoItem);
        input.value = '';
    } else {
        alert('Digite um texto válido!');
    }
});