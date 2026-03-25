let contador = 0;
const valorSpan = document.querySelector('#valor');
const btnIncrementar = document.querySelector('#incrementar');
const btnDecrementar = document.querySelector('#decrementar');

function atualizarDisplay() {
    valorSpan.textContent = contador;
}

btnIncrementar.addEventListener('click', () => {
    contador++;
    atualizarDisplay();
});

btnDecrementar.addEventListener('click', () => {
    if (contador > 0) {
        contador--;
        atualizarDisplay();
    }
});