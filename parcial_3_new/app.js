import { PokemonService } from './pokemonService.js';
import { Pokemon } from './pokemon.js';
import { Ability } from './ability.js';
import { htmlElements, uiHandlers } from './ui.js';

const handlers = {
  searchPokemon: async (event) => {
    event.preventDefault();
    const searchType = htmlElements.searchTypeSelect.value;
    const searchTerm = htmlElements.searchInput.value.trim();
    if (!searchTerm) return;

    try {
      if (searchType === 'pokemon') {
        const pokemonData = await PokemonService.fetchPokemonData(searchTerm);
        const pokemon = new Pokemon(
          pokemonData.name,
          pokemonData.id,
          pokemonData.sprites.front_default,
          pokemonData.sprites.back_default,
          pokemonData.weight,
          pokemonData.height,
          pokemonData.evolutionChain,
          pokemonData.abilities
        );
        uiHandlers.displayPokemon(pokemon);
      } else if (searchType === 'ability') {
        const abilityData = await PokemonService.fetchAbilityData(searchTerm);
        const ability = new Ability(abilityData.name, abilityData.learners);
        uiHandlers.displayAbility(ability);
      }
    } catch (error) {
      if (error.message === 'Pokémon no encontrado') {
        uiHandlers.displayError('pokemon');
      } else if (error.message === 'Habilidad no encontrada') {
        uiHandlers.displayError('ability');
      } else {
        uiHandlers.displayError();
      }
    }
  }
};

const bindEvents = () => {
  htmlElements.searchButton.addEventListener('click', handlers.searchPokemon);
  htmlElements.clearButton.addEventListener('click', uiHandlers.clearSearch);
  htmlElements.searchTypeSelect.addEventListener('change', uiHandlers.handleSearchTypeChange);
};

const init = () => {
  bindEvents();
};

init();