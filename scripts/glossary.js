let glossaryData = [];

function renderGlossary(entries) {
  const list = document.getElementById("glossary-list");
  list.innerHTML = '';

  // Sort entries alphabetically by term
  const sorted = entries.slice().sort((a, b) => a.term.localeCompare(b.term));

  sorted.forEach(entry => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3><a href="glossary-term.html?id=${entry.id}">${entry.term}</a></h3>
      <p>${entry.excerpt}</p>
    `;
    list.appendChild(div);
  });
}

fetch('data/glossary.json')
  .then(res => res.json())
  .then(data => {
    glossaryData = data;
    renderGlossary(glossaryData);
  });

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-glossary");
  if (input) {
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      const filtered = glossaryData.filter(entry =>
        entry.term.toLowerCase().includes(query)
      );
      renderGlossary(filtered);
    });
  }
});
