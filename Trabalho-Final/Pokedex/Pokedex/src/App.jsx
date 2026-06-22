import React, { useState, useEffect, useCallback } from 'react';

// Hook customizado para consumir a PokeAPI
function usePokemon() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchList = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
            const data = await res.json();

            const details = await Promise.all(
                data.results.map(async (p) => {
                    const r = await fetch(p.url);
                    if (!r.ok) throw new Error(`Erro ao buscar ${p.name}`);
                    return r.json();
                })
            );
            setList(details);
        } catch (err) {
            setError(err.message || 'Falha ao carregar os Pokémon.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return { list, loading, error, refetch: fetchList };
}

// Componente Card
function PokemonCard({ pokemon, onClick }) {
    const name = pokemon.name;
    const id = pokemon.id;
    const sprite = pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default ||
        '';
    const types = pokemon.types.map(t => t.type.name);
    const primaryType = types[0] || 'normal';
    const number = `#${String(id).padStart(3, '0')}`;

    return (
        <div
            className={`pokemon-card card-border-${primaryType}`}
            onClick={() => onClick(pokemon)}
        >
            <img className="sprite" src={sprite} alt={name} loading="lazy" />
            <div className="number">{number}</div>
            <div className="name">{name}</div>
            <div className="types">
                {types.map(t => (
                    <span key={t} className={`type-badge type-${t}`}>{t}</span>
                ))}
            </div>
        </div>
    );
}

// Componente Lista
function PokemonList({ list, onSelect }) {
    if (!list || list.length === 0) {
        return <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
            Nenhum Pokémon encontrado.
        </p>;
    }

    return (
        <div className="pokemon-grid">
            {list.map(p => (
                <PokemonCard key={p.id} pokemon={p} onClick={onSelect} />
            ))}
        </div>
    );
}

// Componente Detalhe
function PokemonDetail({ pokemon, onBack }) {
    const [speciesData, setSpeciesData] = useState(null);
    const name = pokemon.name;
    const id = pokemon.id;
    const number = `#${String(id).padStart(3, '0')}`;
    const sprite = pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default ||
        '';
    const types = pokemon.types.map(t => t.type.name);

    const height = pokemon.height ? (pokemon.height / 10).toFixed(1) : '?';
    const weight = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '?';
    const abilities = pokemon.abilities.map(a => a.ability.name.replace('-', ' '));

    const statsMap = {};
    pokemon.stats.forEach(s => {
        statsMap[s.stat.name] = s.base_stat;
    });
    const statNames = {
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        'special-attack': 'Sp. Atk',
        'special-defense': 'Sp. Def',
        speed: 'Speed'
    };
    const statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    const statData = statKeys.map(key => ({
        label: statNames[key] || key,
        value: statsMap[key] || 0,
        key
    }));

    // Buscar dados da espécie para reprodução
    useEffect(() => {
        async function fetchSpecies() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setSpeciesData(data);
                }
            } catch (_) { /* silencioso */ }
        }
        fetchSpecies();
    }, [id]);

    const genderRate = speciesData?.gender_rate ?? -1;
    let genderText = 'Desconhecido';
    if (genderRate === -1) genderText = 'Gênero desconhecido';
    else if (genderRate === 0) genderText = '♂ 100% ♀ 0%';
    else if (genderRate === 8) genderText = '♂ 0% ♀ 100%';
    else {
        const male = ((8 - genderRate) / 8 * 100).toFixed(1);
        const female = (genderRate / 8 * 100).toFixed(1);
        genderText = `♂ ${male}% ♀ ${female}%`;
    }

    const eggGroups = speciesData?.egg_groups?.map(g => g.name).join(', ') || '—';
    const eggCycle = speciesData?.hatch_counter !== undefined ?
        `${speciesData.hatch_counter} ciclos` :
        '—';

    return (
        <div className="detail-container">
            <button className="back-btn" onClick={onBack}>
                ← Voltar
            </button>

            <div className="detail-header">
                <img className="sprite-big" src={sprite} alt={name} />
                <div className="info">
                    <div className="number">{number}</div>
                    <div className="name">{name}</div>
                    <div className="types">
                        {types.map(t => (
                            <span key={t} className={`type-badge type-${t}`}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="detail-body">
                <div>
                    <div className="detail-section">
                        <h3>Espécie</h3>
                        <div className="row"><span className="label">Altura</span><span className="value">
                                {height} m</span></div>
                        <div className="row"><span className="label">Peso</span><span className="value">
                                {weight} kg</span></div>
                        <div className="row"><span className="label">Habilidades</span><span className="value">
                                {abilities.join(', ') || '—'}</span></div>
                    </div>

                    <div className="detail-section" style={{ marginTop: '14px' }}>
                        <h3>Reprodução</h3>
                        <div className="row"><span className="label">Gênero</span><span className="value">
                                {genderText}</span></div>
                        <div className="row"><span className="label">Grupos de Ovo</span><span className="value">
                                {eggGroups}</span></div>
                        <div className="row"><span className="label">Ciclo de Ovo</span><span className="value">
                                {eggCycle}</span></div>
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Stats Base</h3>
                    {statData.map(stat => {
                        const maxStat = 255;
                        const pct = Math.min((stat.value / maxStat) * 100, 100);
                        let color = '#4caf50';
                        if (stat.value < 50) color = '#f44336';
                        else if (stat.value < 80) color = '#ff9800';
                        else if (stat.value < 120) color = '#4caf50';
                        else color = '#2196f3';

                        return (
                            <div key={stat.key} className="stat-row">
                                <span className="stat-label">{stat.label}</span>
                                <div className="stat-bar-bg">
                                    <div
                                        className="stat-bar-fill"
                                        style={{ width: `${pct}%`, background: color }}
                                    />
                                </div>
                                <span className="stat-value">{stat.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Componente principal App
function App() {
    const { list, loading, error, refetch } = usePokemon();
    const [selected, setSelected] = useState(null);

    if (selected) {
        return (
            <div className="app">
                <PokemonDetail pokemon={selected} onBack={() => setSelected(null)} />
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Pokédex</h1>
                <div className="sub">Os primeiros 20 Pokémon</div>
            </header>

            {loading && (
                <div className="loading">
                    <div className="spinner" />
                    <p>Carregando Pokédex…</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <p>⚠️ {error}</p>
                    <button
                        onClick={refetch}
                        style={{
                            marginTop: 12,
                            padding: '8px 24px',
                            borderRadius: 30,
                            border: 'none',
                            background: '#e33535',
                            color: '#fff',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Tentar novamente
                    </button>
                </div>
            )}

            {!loading && !error && (
                <PokemonList list={list} onSelect={setSelected} />
            )}
        </div>
    );
}

export default App;