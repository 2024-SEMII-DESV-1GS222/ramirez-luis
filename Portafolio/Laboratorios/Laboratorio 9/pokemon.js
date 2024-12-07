const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  return response.json();
}

const renderPokemon = (template, pokemon) => {
  const { name, sprites, weight, height } = pokemon;
  const html = `
    <div class="pokemon-card">
      <div class="pokemon-card__header">
        <h2>${name} (${pokemon.id})</h2>
      </div>
      <div class="pokemon-card__body">
        <div class="pokemon-card__sprites">
          <h3>Sprites</h3> <!-- Título "Sprites" -->
          <div class="sprite-images">
            <img src="${sprites.front_default}" alt="${name} front sprite" />
            <img src="${sprites.back_default}" alt="${name} back sprite" />
          </div>
        </div>
        <div class="pokemon-card__stats">
          <h3>Weight / Height</h3>
          <p>${weight} / ${height}</p>
        </div>
      </div>
    </div>
  `;
  template.innerHTML = html;
}

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};
