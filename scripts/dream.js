async function loadDream() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const [dreamsRes, glossaryRes] = await Promise.all([
        fetch('data/dreams.json'),
        fetch('data/glossary.json')
    ]);
    const dreams = await dreamsRes.json();
    const glossary = await glossaryRes.json();
    const dream = dreams.find(d => d.id === id);
    const container = document.getElementById('dream-page');

    if (!dream) {
        container.innerHTML = '<p>Dream not found.</p>';
        document.title = `Dream Not Found`;
        return;
    }

    document.title = `${dream.title}`;
    let linkedContent = dream.content;
    linkedContent = linkedContent.replace(/\[\[(.+?)(?:\|(.+?))?\]\]/g, (match, label, target) => {
        const display = target ? label : label;
        const lookup = target || label
        const glossaryEntry = glossary.find(e => e.term.toLowerCase() === lookup.toLowerCase());
        
        if (glossaryEntry) {
            return `<a href="glossary-term.html?id=${glossaryEntry.id}" class="glossary-inline-link">${display}</a>`;
        }

        const linkedDream = dreams.find(d => d.title.toLowerCase() === lookup.toLowerCase());
        
        if (linkedDream) {
            return `<a href="dream.html?id=${linkedDream.id}" class="dream-inline-link">${display}</a>`;
        }
        
        return display;
    });
    
    container.innerHTML = `
        <h1>${dream.title}</h1>
        <p><strong>Rating:</strong> ${dream.rating}/10</p>
        <p>${linkedContent}</p>
        <div class="carousel" id="carousel"></div>
    `;
    
    if (Array.isArray(dream.images) && dream.images.length > 0) {
        const carousel = document.getElementById("carousel");
        carousel.innerHTML = `
        <div class="carousel-container">
            ${dream.images.map((img, i) => `
            <img src="${img}" class="carousel-img ${i === 0 ? 'active' : ''}" alt="Dream Image ${i + 1}">
            `).join('')}
            <button class="carousel-btn prev">❮</button>
            <button class="carousel-btn next">❯</button>
        </div>
        `;

        const images = document.querySelectorAll(".carousel-img");
        let current = 0;

        document.querySelector(".prev").onclick = () => {
            images[current].classList.remove("active");
            current = (current - 1 + images.length) % images.length;
            images[current].classList.add("active");
        };

        document.querySelector(".next").onclick = () => {
            images[current].classList.remove("active");
            current = (current + 1) % images.length;
            images[current].classList.add("active");
        };
    }
}

loadDream();