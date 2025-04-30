// Load the JSON file
fetch('spells.json')
  .then(response => response.json()) // Convert file to JS object
  .then(spells => {
    // Get the HTML elements
    const list = document.querySelector('#spell-list');
    const searchBox = document.querySelector('#search-input');

    // Show spells based on a search filter
    function showSpells(filterText) {
      list.innerHTML = ''; // Clear previous results

      for (let spell of spells) {
        const matchesSearch = !filterText || spell.name.toLowerCase().includes(filterText.toLowerCase());

        if (matchesSearch) {
          // Create HTML for the spell
          const item = document.createElement('div');
          item.innerHTML = `
            <h3><strong>${spell.name}</strong><span class="symbol">${spell.actions || ''}</span></h3>
            <em>${spell.school}</em><br>
            <strong>Range:</strong> ${spell.range}<br>
            <strong>Duration:</strong> ${spell.duration}
            <p>${spell.description}</p>
          `;
          list.appendChild(item);
        }
      }
    }

    // Initial display
    showSpells('');

    // Update list on typing
    searchBox.addEventListener('input', () => {
      showSpells(searchBox.value);
    });
  })

  // Handle load errors (e.g., missing or broken JSON)
  .catch(error => {
    const list = document.querySelector('#spell-list');
    if (list) {
      list.innerHTML = '<li>Error loading spells. Please check your JSON or file path.</li>';
    }
    console.error('Failed to load spell data:', error);
  });