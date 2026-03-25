const cards = document.querySelectorAll('.card');

function removerDestaque() {
    cards.forEach(card => {
        card.classList.remove('destaque');
    });
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        removerDestaque();
        card.classList.add('destaque');
    });
});