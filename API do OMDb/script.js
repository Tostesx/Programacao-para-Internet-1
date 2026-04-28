// Substitua pela sua chave (ex: '4dc9e3e1' se for válida)
const API_KEY = '4dc9e3e1';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// Elementos da interface
const inputSerie  = document.getElementById('serieInput');
const btnBuscar   = document.getElementById('buscarBtn');
const divErro     = document.getElementById('erro');
const cabecalho   = document.getElementById('cabecalho');
const poster      = document.getElementById('poster');
const tituloSerie = document.getElementById('tituloSerie');
const tabela      = document.getElementById('matrizTabela');
const matrizCont  = document.getElementById('matrizContainer');
const loadingMsg  = document.getElementById('loading');

// Buscar ao clicar ou pressionar Enter
btnBuscar.addEventListener('click', buscarSerie);
inputSerie.addEventListener('keypress', e => e.key === 'Enter' && buscarSerie());

async function buscarSerie() {
  const nome = inputSerie.value.trim();
  if (!nome) {
    divErro.textContent = 'Digite o nome de uma série.';
    return;
  }

  // Limpa resultados anteriores
  divErro.textContent = '';
  cabecalho.style.display = 'none';
  matrizCont.style.display = 'none';
  tabela.innerHTML = '';

  try {
    // 1. Dados gerais da série
    const resSerie = await fetch(`${BASE_URL}&t=${encodeURIComponent(nome)}&type=series`);
    const serie = await resSerie.json();

    if (serie.Response === 'False') {
      divErro.textContent = 'Série não encontrada.';
      return;
    }

    // Exibe cabeçalho
    tituloSerie.textContent = serie.Title;
    poster.src = (serie.Poster && serie.Poster !== 'N/A') ? serie.Poster : 'https://via.placeholder.com/150x220?text=Sem+Poster';
    poster.alt = `Pôster de ${serie.Title}`;
    cabecalho.style.display = 'flex';

    // 2. Busca todas as temporadas
    const totalTemp = parseInt(serie.totalSeasons);
    const imdbID = serie.imdbID;
    loadingMsg.style.display = 'block';

    const temporadas = [];
    for (let s = 1; s <= totalTemp; s++) {
      const resEp = await fetch(`${BASE_URL}&i=${imdbID}&Season=${s}`);
      const dadosEp = await resEp.json();
      temporadas.push({
        numero: s,
        episodios: (dadosEp.Response === 'True') ? dadosEp.Episodes : []
      });
    }

    // 3. Constrói a tabela (matriz)
    construirMatriz(temporadas);

    loadingMsg.style.display = 'none';
    matrizCont.style.display = 'block';

  } catch (erro) {
    divErro.textContent = 'Erro de conexão. Tente novamente.';
    console.error(erro);
    loadingMsg.style.display = 'none';
  }
}

function construirMatriz(temporadas) {
  // Maior número de episódios em uma temporada
  const maxEps = temporadas.reduce((max, t) => Math.max(max, t.episodios.length), 0);

  // Cabeçalho
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');
  hr.innerHTML = '<th>Temp.</th>' + Array.from({length: maxEps}, (_, i) => `<th>Ep ${i + 1}</th>`).join('');
  thead.appendChild(hr);
  tabela.appendChild(thead);

  // Corpo
  const tbody = document.createElement('tbody');
  temporadas.forEach(temp => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${temp.numero}</td>`;

    for (let epNum = 1; epNum <= maxEps; epNum++) {
      const ep = temp.episodios.find(e => parseInt(e.Episode) === epNum);
      let conteudo = '';
      let cor = '';

      if (ep && ep.imdbRating && ep.imdbRating !== 'N/A') {
        const nota = parseFloat(ep.imdbRating);
        conteudo = ep.imdbRating;
        if (nota >= 8) cor = '#27ae60';
        else if (nota >= 6) cor = '#f39c12';
        else cor = '#e74c3c';
      } else if (ep) {
        conteudo = '-';
      }
      // célula com estilo inline
      row.innerHTML += `<td style="color:${cor}">${conteudo}</td>`;
    }
    tbody.appendChild(row);
  });

  tabela.appendChild(tbody);
}