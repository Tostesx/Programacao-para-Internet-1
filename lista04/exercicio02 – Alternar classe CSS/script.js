const bloco = document.querySelector('#bloco');
const botao = document.querySelector('#btnToggle');

botao.addEventListener('click', () => {
    bloco.classList.toggle('destacado');
});