async function loadGlossaryTerm() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const res = await fetch('data/glossary.json');
  const glossary = await res.json();
  const entry = glossary.find(e => e.id === id);
  const container = document.getElementById("glossary-term");

  if (entry) {
    document.title = `Glossary: ${entry.term}`;

    container.innerHTML = `
      <h1>${entry.term}</h1>
      ${entry.image ? `<img src="assets/glossary-images/${entry.image}" alt="${entry.term}" style="max-width:100%; border-radius:12px;">` : ''}
      <p>${entry.description}</p>
      ${entry.link ? `<p><a href="${entry.link}" target="_blank" class="glossary-link">More info ↗</a></p>` : ''}
    `;
  } else {
    container.innerHTML = '<p>Glossary term not found.</p>';
  }
}

loadGlossaryTerm();