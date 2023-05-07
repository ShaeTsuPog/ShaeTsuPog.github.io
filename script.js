const pokemonListElement = document.getElementById('pokemonList');
const pokemonDetailsElement = document.getElementById('pokemonDetails');
const searchInput = document.getElementById('searchInput');
const typeFilters = document.querySelectorAll('input[name="typeFilter"]');

// Sample data of Pokemon
const pokemonData = [
  { name: 'Bulbasaur', type: ['grass', 'poison'], sprite: 'bulbasaur.png', stats: { hp: 45, attack: 49, defense: 49 }, abilities: ['overgrow'], moves: ['tackle', 'growl', 'leech-seed'] },
  { name: 'Charmander', type: ['fire'], sprite: 'charmander.png', stats: { hp: 39, attack: 52, defense: 43 }, abilities: ['blaze'], moves: ['scratch', 'growl', 'ember'] },
  { name: 'Squirtle', type: ['water'], sprite: 'squirtle.png', stats: { hp: 44, attack: 48, defense: 65 }, abilities: ['torrent'], moves: ['tackle', 'tail-whip', 'water-gun'] },
  // Add more Pokemon data here
];

// Function to render the list of Pokemon
function renderPokemonList(pokemonData) {
  pokemonListElement.innerHTML = '';
  pokemonData.forEach(pokemon => {
    const pokemonItem = document.createElement('div');
    pokemonItem.classList.add('pokemon-item');
    pokemonItem.textContent = pokemon.name;

    pokemonItem.addEventListener('click', () => {
      displayPokemonDetails(pokemon);
    });

    pokemonListElement.appendChild(pokemonItem);
  });
}

// Function to display the details of a selected Pokemon
function displayPokemonDetails(pokemon) {
    pokemonDetailsElement.innerHTML = '';

    // Create elements for sprite, base stats, types, abilities, and moves
    const spriteElement = document.createElement('img');
    spriteElement.src = pokemon.sprite;
  
    const statsElement = document.createElement('div');
    statsElement.innerHTML = `
      <h3>Base Stats</h3>
      <p>HP: ${pokemon.stats.hp}</p>
      <p>Attack: ${pokemon.stats.attack}</p>
      <p>Defense: ${pokemon.stats.defense}</p>
    `;
  
    const typesElement = document.createElement('div');
    typesElement.innerHTML = `
      <h3>Types</h3>
      <ul>
        ${pokemon.type.map(type => `<li>${type}</li>`).join('')}
      </ul>
    `;
  
    const abilitiesElement = document.createElement('div');
    abilitiesElement.innerHTML = `
      <h3>Abilities</h3>
      <ul>
        ${pokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}
      </ul>
    `;
  
    const movesElement = document.createElement('div');
    movesElement.innerHTML = `
      <h3>Moves Learned</h3>
      <ul>
        ${pokemon.moves.map(move => `<li>${move}</li>`).join('')}
      </ul>
    `;
  
    // Append elements to the details container
    pokemonDetailsElement.appendChild(spriteElement);
    pokemonDetailsElement.appendChild(statsElement);
    pokemonDetailsElement.appendChild(typesElement);
    pokemonDetailsElement.appendChild(abilitiesElement);
    pokemonDetailsElement.appendChild(movesElement);
  }
  
  // Function to filter Pokemon based on search input and type filters
  function filterPokemon() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedTypes = Array.from(typeFilters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);
  
    const filteredPokemon = pokemonData.filter(pokemon => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchValue);
      const typeMatch = selectedTypes.length === 0 || pokemon.type.some(type => selectedTypes.includes(type));
      return nameMatch && typeMatch;
    });
  
    renderPokemonList(filteredPokemon);
  }
  
  // Event listeners
  searchInput.addEventListener('input', filterPokemon);
  typeFilters.forEach(filter => filter.addEventListener('change', filterPokemon));
  
  // Initial rendering of Pokemon list
  renderPokemonList(pokemonData);