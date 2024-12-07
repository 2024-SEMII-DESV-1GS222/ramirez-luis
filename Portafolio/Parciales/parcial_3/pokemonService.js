export class PokemonService {
  static async fetchPokemonData(name) {
    try {
      // Obtener datos básicos del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon no encontrado');
      const pokemonData = await response.json();

      // Obtener datos de la especie (para la cadena evolutiva)
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();

      // Obtener la cadena evolutiva
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      // Procesar la cadena evolutiva
      const evolutionChain = [];
      let evoData = evolutionData.chain;
      
      do {
        evolutionChain.push({
          name: evoData.species.name,
          isBaby: evoData.is_baby
        });
        evoData = evoData.evolves_to[0]; // Tomamos solo la primera evolución por simplicidad
      } while (evoData && evoData.evolves_to);

      return {
        ...pokemonData,
        evolutionChain,
        abilities: pokemonData.abilities.map(ability => ({
          name: ability.ability.name,
          isHidden: ability.is_hidden
        }))
      };
    } catch (error) {
      console.error('Error al obtener datos del Pokémon:', error);
      throw error;
    }
  }

  static async fetchAbilityData(abilityName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName.toLowerCase()}`);
      if (!response.ok) throw new Error('Habilidad no encontrada');
      const abilityData = await response.json();
      return {
        name: abilityData.name,
        learners: abilityData.pokemon.map(pokemon => ({
        name: pokemon.pokemon.name,
        isHidden: pokemon.is_hidden
        }))
      };
    } catch (error) {
      console.error('Error al obtener datos de la habilidad:', error);
      throw error;
    }
  }
}