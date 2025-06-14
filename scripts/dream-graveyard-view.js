async function loadGraveyardDream() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const res = await fetch('data/graveyard.json');
    const dreams = await res.json();
    const dream = dreams.find(d => d.id === id);

    const container = document.getElementById('graveyard-dream');
    if (dream) {
    document.title = `Graveyard Dream: ${dream.title}`;
    container.innerHTML = `
        <h1>${dream.title}</h1>
        <small>${dream.date || "Unknown Date"}</small>
        <p>${dream.content}</p>
    `;
    } else {
    container.innerHTML = "<p>Dream not found.</p>";
    }
}

loadGraveyardDream();