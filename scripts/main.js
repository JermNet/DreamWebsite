async function fetchJSON(path) {
  const res = await fetch(path);
  return await res.json();
}

async function showFeaturedDream() {
  const dreams = await fetchJSON('data/dreams.json');
  const featured = dreams[dreams.length - 1];
  const container = document.getElementById('dream-container');
  container.innerHTML = `
        <h3><a href="dream.html?id=${featured.id}">${featured.title}</a></h3>
        <p>${featured.excerpt}</p>
        <p><strong>Rating:</strong> ${featured.rating}/10</p>
        `;
}

if (document.getElementById('dream-container')) {
  showFeaturedDream();
}
