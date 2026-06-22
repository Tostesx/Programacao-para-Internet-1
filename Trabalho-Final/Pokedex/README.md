
# Project Title

A brief description of what this project does and who it's for

Pokédex - React App

Aplicação web desenvolvida em React que consome a PokeAPI para exibir uma lista de Pokémon e seus detalhes. Projeto acadêmico focado em componentização, gerenciamento de estado e consumo de API.
📸 Demonstração

    https://./placeholder.png

✨ Funcionalidades

    Listagem inicial: Exibe os primeiros 20 Pokémon em cards.

    Cards informativos: Cada card mostra:

        Sprite (imagem) do Pokémon.

        Nome e número (#001, #004, etc.).

        Tipos com cores correspondentes.

        Borda inferior colorida conforme o tipo primário.

    Tela de detalhes: Ao clicar em um card, você acessa:

        Sprite em tamanho maior.

        Informações de espécie (altura, peso, habilidades).

        Dados de reprodução (gênero, grupos de ovo, ciclo de ovo).

        Stats base com barras de progresso (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).

    Navegação: Botão "Voltar" para retornar à lista.

    Estados de carregamento e erro: Feedback visual durante requisições e tratamento de falhas com opção de tentar novamente.

🛠️ Tecnologias Utilizadas

    React – Interface declarativa baseada em componentes.

    Vite – Ferramenta de build rápida e servidor de desenvolvimento.

    CSS3 – Estilização customizada com foco no layout de referência (cards, barras de progresso, cores por tipo).

    Fetch API – Para consumo dos dados da PokeAPI.

    React Hooks (useState, useEffect, useCallback) – Gerenciamento de estado e efeitos colaterais.

📋 Pré-requisitos

    Node.js (versão 18 ou superior)

    npm (gerenciador de pacotes do Node)

🚀 Como Executar o Projeto Localmente

    Clone o repositório
    bash

    git clone https://github.com/Tostesx/Programacao-para-Internet-1/Trabalho-Final.git
    cd Pokedex

    Instale as dependências
    bash

    npm install

    Inicie o servidor de desenvolvimento
    bash

    npm run dev

    Abra no navegador

    O Vite informará o endereço (geralmente http://localhost:5173). Acesse para visualizar a aplicação.

    Build para produção (opcional)
    bash

    npm run build
    npm run preview

📁 Estrutura de Arquivos
text

Pokedex/
├── index.html                # Ponto de entrada HTML
├── package.json              # Dependências e scripts
├── vite.config.js            # Configuração do Vite
└── src/
    ├── main.jsx              # Renderização do React
    ├── App.jsx               # Componente principal com toda a lógica
    ├── index.css             # Estilos globais (cores, cards, layout)
    └── assets/               # Ícones/imagens estáticas (opcional)

🧠 Decisões de Implementação

    Componentização: Separação em componentes menores (PokemonCard, PokemonList, PokemonDetail) para facilitar manutenção e reuso.

    Hook customizado: A lógica de requisição foi isolada no hook usePokemon para manter o componente principal limpo.

    Tratamento de erros: Mensagens amigáveis e botão de retry para melhor experiência do usuário.

    Estilização: Cores dinâmicas aplicadas via classes CSS baseadas no tipo do Pokémon, com barras de stat adaptadas ao valor (vermelho para baixo, azul para alto).

🔜 Próximos Passos (Melhorias Sugeridas)

    Paginação para navegar entre mais páginas de Pokémon.

    Barra de pesquisa para buscar Pokémon por nome ou número.

    Filtro por tipo.

    Animações de transição entre telas.

📄 Licença

Este projeto foi desenvolvido como parte de um trabalho acadêmico. Sinta-se à vontade para usá-lo como referência ou estudo.

Desenvolvido por [Matheus Soares Tostes] – 2026
GitHub: @Tostesx