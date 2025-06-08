document.addEventListener("DOMContentLoaded", () => {
  const footerHTML = `
    <footer>
      <section id="more-sites">
        <h2>More of My Sites</h2>
        <div class="site-links">
          <a href="https://jermnet.github.io/WebsitePortfolio/" target="_blank" class="site-card">
            <img src="assets/images/web_portfolio.png" alt="Website Portfolio">
            <span>Website Portfolio</span>
          </a>
        </div>
      </section>
      <p>Made by JermNet @<a href="https://github.com/jermnet" target="_blank">GitHub</a> 2025</p>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);
});
