const titulo = document.querySelector('#meuTitulo');
const paragrafo = document.querySelector('#meuParagrafo');
const botao = document.querySelector('#botaoAlterar');

botao.addEventListener('click', () => {
    titulo.textContent = 'Título Alterado!';
    paragrafo.textContent = 'O parágrafo foi modificado pelo JavaScript.';
});