fetch("data/graveyard.json")
  .then(res => res.json())
  .then(graves => {
    const list = document.getElementById("graveyard-list");

    if (graves.length === 0) {
      list.innerHTML = "<p>No forgotten dreams to show... yet.</p>";
      return;
    }

    graves.forEach(dream => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3><a href="dream-graveyard-view.html?id=${dream.id}">${dream.title}</a></h3>
        <p>${dream.excerpt}</p>
      `;
      list.appendChild(div);
    });
  });
