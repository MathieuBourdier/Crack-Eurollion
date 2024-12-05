const resultsPerPage = 100; // Combinaisons par page
let currentPage = 0; // Page actuelle
let totalPages = 0; // Total des pages
let totalCombinations = 0; // Nombre total de combinaisons
let combinations = []; // Contiendra les combinaisons générées

// Génère toutes les combinaisons possibles
function generateCombinations() {
  const combinations = [];

  for (let a = 1; a <= 50; a++) {
    for (let b = a + 1; b <= 50; b++) {
      for (let c = b + 1; c <= 50; c++) {
        for (let d = c + 1; d <= 50; d++) {
          for (let e = d + 1; e <= 50; e++) {
            for (let f = 1; f <= 9; f++) {
              combinations.push([a, b, c, d, e, f]);
            }
          }
        }
      }
    }
  }

  return combinations;
}

// Affiche les combinaisons d'une page
function displayCombinations(page) {
  const container = document.getElementById('combinations-container');
  container.innerHTML = ''; // Efface le contenu précédent

  const start = page * resultsPerPage;
  const end = Math.min(start + resultsPerPage, combinations.length);

  for (let i = start; i < end; i++) {
    const combination = combinations[i];
    const combinationString = combination.join(' - ');
    const p = document.createElement('p');
    p.textContent = combinationString;
    container.appendChild(p);
  }

  // Met à jour les boutons de pagination
  document.getElementById('prev-btn').disabled = page === 0;
  document.getElementById('next-btn').disabled = page === totalPages - 1;
}

// Calcule et affiche le nombre total de combinaisons et le coût total
function updateSummary() {
  const totalCost = (totalCombinations * 2.5).toFixed(2); // Calcul du coût total (2.50€ par combinaison)

  document.getElementById('total-combinations').textContent = totalCombinations;
  document.getElementById('total-cost').textContent = `${totalCost}€`;
}

// Génération initiale des combinaisons (long processus)
function initialize() {
  combinations = generateCombinations();
  totalCombinations = combinations.length; // Nombre total de combinaisons
  totalPages = Math.ceil(totalCombinations / resultsPerPage);

  updateSummary(); // Met à jour le résumé
  displayCombinations(currentPage);
}

// Gestion des boutons de pagination
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    displayCombinations(currentPage);
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    displayCombinations(currentPage);
  }
});

// Initialise la génération au clic
document.getElementById('next-btn').disabled = false;
document.getElementById('next-btn').addEventListener('click', () => {
  if (combinations.length === 0) {
    initialize();
  }
});

