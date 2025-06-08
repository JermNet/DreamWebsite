document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    <nav class="navbar">
      <a href="index.html">Home</a>
      <a href="all-dreams.html">All Dreams</a>
      <a href="glossary.html">Glossary</a>
      <a href="#" id="random-dream">Random Dream</a>
    </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navHTML);

  
  const randomButton = document.getElementById("random-dream");
  if (randomButton) {
    randomButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const res = await fetch("data/dreams.json");
      const dreams = await res.json();
      const random = Math.floor(Math.random() * dreams.length);
      window.location.href = `dream.html?id=${dreams[random].id}`;
    });
  }
});
