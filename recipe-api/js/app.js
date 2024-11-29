const apiKey = "e0f808d4b5ac4970a0dd9c9236ef67a3";

// Función para obtener recetas aleatorias
async function fetchRandomRecipes() {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${apiKey}`);
    const data = await response.json();
    const recipes = data.recipes;
    const container = document.getElementById('recetas-aleatorias');
    container.innerHTML = ''; // Limpiar contenido previo

    if (recipes.length === 0) {
      container.innerHTML = '<p>No se encontraron recetas aleatorias.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <a href="recipe-details.html?id=${recipe.id}" class="btn">Ver Detalles</a>
        <a href="nutrition.html?id=${recipe.id}" class="btn">Ver Nutrición</a>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error al obtener recetas aleatorias:', error);
    document.getElementById('recetas-aleatorias').innerHTML = '<p>Error al cargar las recetas aleatorias.</p>';
  }
}

// Función para buscar recetas por nombre o ingrediente
async function searchRecipes(query) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
    const data = await response.json();
    const results = data.results;
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = '<p>No se encontraron recetas.</p>';
      return;
    }

    results.forEach(recipe => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <a href="recipe-details.html?id=${recipe.id}" class="btn">Ver Detalles</a>
        <a href="nutrition.html?id=${recipe.id}" class="btn">Ver Nutrición</a>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error al buscar recetas:', error);
    document.getElementById('search-results').innerHTML = '<p>Error al realizar la búsqueda.</p>';
  }
}

// Función para obtener detalles de una receta
async function getRecipeDetails(id) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const recipe = await response.json();
    const container = document.getElementById('recipe-details');
    
    container.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p><strong>Tiempo de preparación:</strong> ${recipe.readyInMinutes} minutos</p>
      <p><strong>Porciones:</strong> ${recipe.servings}</p>
      <p><strong>Ingredientes:</strong></p>
      <ul>
        ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
      </ul>
      <p><strong>Instrucciones:</strong></p>
      <p>${recipe.instructions}</p>
    `;
  } catch (error) {
    console.error('Error al obtener detalles de la receta:', error);
    document.getElementById('recipe-details').innerHTML = '<p>Error al cargar los detalles de la receta.</p>';
  }
}

// Función para obtener información nutricional de una receta
async function getNutritionDetails(id) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`);
    const data = await response.json();
    const container = document.getElementById('nutrition-details');
    
    container.innerHTML = `
      <h2>Información Nutricional</h2>
      <ul>
        <li><strong>Calorías:</strong> ${data.calories}</li>
        <li><strong>Grasas:</strong> ${data.fat}g</li>
        <li><strong>Proteínas:</strong> ${data.protein}g</li>
        <li><strong>Carbohidratos:</strong> ${data.carbs}g</li>
      </ul>
    `;
  } catch (error) {
    console.error('Error al obtener detalles nutricionales:', error);
    document.getElementById('nutrition-details').innerHTML = '<p>Error al cargar los detalles nutricionales.</p>';
  }
}

// Función para buscar recetas por ingredientes
async function searchRecipesByIngredients(ingredients) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`);
    const recipes = await response.json();
    const container = document.getElementById('pantry-recipes');
    container.innerHTML = '';

    if (recipes.length === 0) {
      container.innerHTML = '<p>No se encontraron recetas con esos ingredientes.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <a href="recipe-details.html?id=${recipe.id}" class="btn">Ver Detalles</a>
        <a href="nutrition.html?id=${recipe.id}" class="btn">Ver Nutrición</a>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error al buscar recetas por ingredientes:', error);
    document.getElementById('pantry-recipes').innerHTML = '<p>Error al realizar la búsqueda por ingredientes.</p>';
  }
}

// Detectar y obtener ID de receta al cargar `nutrition.html`
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  if (recipeId && document.getElementById('nutrition-details')) {
    getNutritionDetails(recipeId);
  }
});
