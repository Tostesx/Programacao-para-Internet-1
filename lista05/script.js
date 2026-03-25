const inputTarefa = document.querySelector('#tarefaInput');
const btnAdicionar = document.querySelector('#btnAdicionar');
const listaTarefas = document.querySelector('#listaTarefas');

function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (texto === '') {
        alert('Digite uma tarefa!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'tarefa-item';

    const span = document.createElement('span');
    span.className = 'tarefa-texto';
    span.textContent = texto;

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => li.remove());

    li.appendChild(span);
    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);

    inputTarefa.value = '';
    inputTarefa.focus();
}

btnAdicionar.addEventListener('click', adicionarTarefa);
inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});