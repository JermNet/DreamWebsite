let allDreams = [];

function renderDreams(dreams) {
  const list = document.getElementById('dream-list');
  list.innerHTML = '';
  dreams.forEach(dream => {
    const entry = document.createElement('div');
    entry.innerHTML = `
      <h3><a href="dream.html?id=${dream.id}">${dream.title}</a></h3>
      <p>${dream.excerpt}</p>
      <p><strong>Rating:</strong> ${dream.rating}/10</p>
    `;
    list.appendChild(entry);
  });
}

fetch('data/dreams.json')
  .then(res => res.json())
  .then(dreams => {
    allDreams = dreams;
    renderDreams(allDreams);
  });

document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      const query = searchBox.value.toLowerCase();
      const filtered = allDreams.filter(d => d.title.toLowerCase().includes(query));
      renderDreams(filtered);
    });
  }
});
