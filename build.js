const fs = require('fs');
const path = require('path');

// Read meals data
function loadMealsData() {
  const mealsPath = path.join(__dirname, 'data/meals.json');
  const mealsData = JSON.parse(fs.readFileSync(mealsPath, 'utf8'));
  return mealsData;
}

// Utility function to capitalize strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate HTML for a single ingredient
function generateIngredientHTML(ingredient) {
  const notesHTML = ingredient.notes ?
    `<div class="ingredient-notes">${ingredient.notes}</div>` : '';

  return `
        <div class="ingredient">
            <div>
                <div class="ingredient-name">${capitalize(ingredient.name)}</div>
                <span class="ingredient-category">${ingredient.category}</span>
                ${notesHTML}
            </div>
            <div class="ingredient-amount">${ingredient.amount} ${ingredient.unit}</div>
        </div>
    `;
}

// Generate HTML for a single meal
function generateMealHTML(meal) {
  const ingredientsHTML = meal.ingredients
    .map(generateIngredientHTML)
    .join('');

  const tagsHTML = meal.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  return `
        <div class="meal">
            <div class="meal-header">
                <div class="meal-title">${capitalize(meal.name)}</div>
                <div class="meal-description">${meal.description}</div>
                <div class="meal-info">
                    <span>👥 ${meal.servings} portioner</span>
                    <span>⏱️ Forberedelse: ${meal.times.preparation_minutes} min</span>
                    <span>🔥 Tilberedning: ${meal.times.cooking_minutes} min</span>
                    <span>⏰ Total tid: ${meal.times.total_minutes} min</span>
                </div>
            </div>
            <div class="meal-content">
                <div class="ingredients">
                    <h3>Ingredienser</h3>
                    <div class="ingredient-grid">
                        ${ingredientsHTML}
                    </div>
                </div>
                <div class="tags">
                    ${tagsHTML}
                    <span class="difficulty">${meal.difficulty}</span>
                </div>
            </div>
        </div>
    `;
}

// Generate complete HTML document using template
function generateHTML(mealsData) {
  const templatePath = path.join(__dirname, 'src/template.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Shuffle meals array to randomize order
  const shuffledMeals = [...mealsData.meals].sort(() => Math.random() - 0.5);

  //const mealsHTML = mealsData.meals
  const mealsHTML = shuffledMeals
    .map(generateMealHTML)
    .join('');

  return template.replace('{{MEALS_CONTENT}}', mealsHTML);
}

// Build function
function build() {
  try {
    console.log('🔧 Starting build process...');

    // Create dist directory if it doesn't exist
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }

    // Load meals data
    console.log('📊 Loading meals data...');
    const mealsData = loadMealsData();
    console.log(`✅ Loaded ${mealsData.meals.length} meals`);

    // Copy CSS file to dist
    console.log('🎨 Copying CSS...');
    const cssSource = path.join(__dirname, 'src/styles.css');
    const cssDestination = path.join(distDir, 'styles.css');
    if (fs.existsSync(cssSource)) {
      fs.copyFileSync(cssSource, cssDestination);
      console.log(`✅ CSS copied to ${cssDestination}`);
    } else {
      console.warn('⚠️  styles.css not found, skipping CSS copy');
    }

    // Generate HTML from template
    console.log('🏗️  Generating HTML from template...');
    const html = generateHTML(mealsData);

    // Write to dist/index.html
    const outputPath = path.join(distDir, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`✅ Build complete!`);
    console.log(`📦 Generated: ${outputPath}`);
    console.log(`📦 HTML size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

    if (fs.existsSync(cssDestination)) {
      console.log(`📦 CSS size: ${(fs.statSync(cssDestination).size / 1024).toFixed(2)} KB`);
    }

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  build();
}

module.exports = { build };

