let allDreams = [];
let selectedTags = new Set();

function renderDreams(dreams) {
  const list = document.getElementById("dream-list");
  list.innerHTML = '';

  if (dreams.length === 0) {
    list.innerHTML = "<p>No dreams match your search.</p>";
    return;
  }

  dreams.forEach(dream => {
    const entry = document.createElement("div");
    entry.innerHTML = `
      <h3><a href="dream.html?id=${dream.id}">${dream.title}</a></h3>
      <p>${dream.excerpt}</p>
      <p><strong>Rating:</strong> ${dream.rating}/10</p>
      ${dream.tags ? `<p class="dream-tags">${dream.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>` : ''}
    `;
    list.appendChild(entry);
  });
}

function renderTagFilter(tags) {
  const tagFilter = document.getElementById("tag-filter");
  tagFilter.innerHTML = '';

  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.className = "tag-filter-btn";
    btn.dataset.tag = tag;
    btn.onclick = () => {
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        btn.classList.remove("active");
      } else {
        selectedTags.add(tag);
        btn.classList.add("active");
      }
      updateFilteredResults();
    };
    tagFilter.appendChild(btn);
  });
}

function updateFilteredResults() {
  const query = document.getElementById("search-box").value.toLowerCase();
  const filtered = allDreams.filter(dream => {
    const matchesQuery =
      dream.title.toLowerCase().includes(query) ||
      (dream.excerpt && dream.excerpt.toLowerCase().includes(query)) ||
      (dream.tags && dream.tags.some(tag => tag.toLowerCase().includes(query)));

    const matchesTags =
      selectedTags.size === 0 || (dream.tags && dream.tags.some(tag => selectedTags.has(tag)));

    return matchesQuery && matchesTags;
  });

  renderDreams(filtered);
}

fetch("data/dreams.json")
  .then(res => res.json())
  .then(dreams => {
    allDreams = dreams;

    const tagSet = new Set();
    dreams.forEach(d => {
      if (Array.isArray(d.tags)) {
        d.tags.forEach(t => tagSet.add(t));
      }
    });

    renderTagFilter(Array.from(tagSet).sort());
    renderDreams(allDreams);
  });

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  if (searchBox) {
    searchBox.addEventListener("input", updateFilteredResults);
  }
});
