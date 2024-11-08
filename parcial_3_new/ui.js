export const htmlElements = {
  searchButton: document.getElementById('search-button'),
  clearButton: document.getElementById('clear-button'),
  buttonContainer: document.querySelector('.button-container'),
  pokemonInfo: document.getElementById('pokemon-info'),
  abilityInfo: document.querySelector('.ability-info'),
  searchTypeSelect: document.getElementById('search-type'),
  searchInput: document.getElementById('pokemon-name')
};

export const uiHandlers = {
  displayPokemon(pokemon) {
      htmlElements.pokemonInfo.innerHTML = pokemon.getHTMLRepresentation();
      htmlElements.pokemonInfo.style.display = 'block';
      htmlElements.abilityInfo.style.display = 'none';
      htmlElements.clearButton.style.display = 'inline';
      htmlElements.buttonContainer.classList.add('space-between');
  },

  displayAbility(ability) {
      htmlElements.abilityInfo.innerHTML = ability.getHTMLRepresentation();
      htmlElements.abilityInfo.style.display = 'block';
      htmlElements.pokemonInfo.style.display = 'none';
      htmlElements.clearButton.style.display = 'inline';
      htmlElements.buttonContainer.classList.add('space-between');
  },

  displayError(errorType) {
      if (errorType === 'pokemon') {
          htmlElements.pokemonInfo.innerHTML = '<p>Pokémon no encontrado.</p>';
      } else if (errorType === 'ability') {
          htmlElements.pokemonInfo.innerHTML = '<p>Habilidad no encontrada.</p>';
      } else {
          htmlElements.pokemonInfo.innerHTML = '<p>Error desconocido.</p>';
      }
      htmlElements.pokemonInfo.style.display = 'block';
      htmlElements.abilityInfo.style.display = 'none';
  },

  clearSearch() {
      htmlElements.searchInput.value = '';
      htmlElements.pokemonInfo.innerHTML = '';
      htmlElements.abilityInfo.innerHTML = '';
      htmlElements.pokemonInfo.style.display = 'none';
      htmlElements.abilityInfo.style.display = 'none';
      htmlElements.clearButton.style.display = 'none';
      htmlElements.buttonContainer.classList.remove('space-between');
  },

  handleSearchTypeChange() {
      const searchType = htmlElements.searchTypeSelect.value;
      if (searchType === 'pokemon') {
          htmlElements.pokemonInfo.style.display = 'none';
          htmlElements.abilityInfo.style.display = 'none';
      } else {
          htmlElements.pokemonInfo.style.display = 'none';
          htmlElements.abilityInfo.style.display = 'none';
      }
  }
};