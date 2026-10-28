(function () {
  "use strict";
  const grid = document.getElementById("resourceGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  const resourceCount = document.getElementById("resourceCount");
  const emptyState = document.getElementById("emptyState");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const categoryNames = {
    urdu: "Urdu Designs",
    social: "Social Media",
    business: "Business & Print",
    events: "Events & Invitations"
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
  }

  function previewArt(item) {
    // Original inline SVG previews, not downloaded third-party artwork.
    const palettes = {
      mint: ["#d7f6e8", "#145d48", "#ffb899"],
      lilac: ["#eee8ff", "#4d3ac7", "#ffcbad"],
      peach: ["#ffe4d5", "#743d2c", "#fff7e9"],
      blue: ["#dceaff", "#234b91", "#c8f4df"],
      yellow: ["#fff0b8", "#473f1d", "#e7dfff"]
    };
    const p = palettes[item.palette] || palettes.lilac;
    const urdu = item.category === "urdu";
    const headline = item.artTitle || item.title.toUpperCase();
    const safeTitle = escapeHtml(headline).replace(/&amp;/g, "&amp;");
    const rtl = urdu ? 'direction="rtl" unicode-bidi="plaintext"' : "";
    return `<svg viewBox="0 0 280 190" role="img" aria-label="${escapeHtml(item.title)} preview" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="190" rx="12" fill="${p[0]}"/>
      <circle cx="236" cy="30" r="44" fill="${p[2]}" opacity=".85"/>
      <circle cx="22" cy="170" r="50" fill="${p[2]}" opacity=".5"/>
      <rect x="17" y="16" width="68" height="18" rx="9" fill="${p[1]}"/>
      <text x="51" y="28" text-anchor="middle" fill="#fff" font-size="7" font-family="Arial,sans-serif" font-weight="700">DFH / FREE</text>
      <text x="20" y="72" fill="${p[1]}" font-size="${headline.length > 19 ? 16 : 21}" font-family="Arial,sans-serif" font-weight="800">${safeTitle.slice(0, 27)}</text>
      <path d="M20 86 H155" stroke="${p[1]}" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 97 H125" stroke="${p[1]}" stroke-width="1.5" opacity=".55" stroke-linecap="round"/>
      <rect x="20" y="117" width="95" height="29" rx="6" fill="${p[1]}"/>
      <text x="67" y="135" text-anchor="middle" fill="#fff" font-size="9" font-family="Arial,sans-serif" font-weight="700">YOUR DESIGN</text>
      <rect x="174" y="74" width="83" height="83" rx="7" fill="${p[2]}" stroke="${p[1]}" stroke-width="2"/>
      <path d="M190 136 L211 102 L241 136 Z" fill="${p[1]}"/>
      <circle cx="226" cy="96" r="8" fill="#fff" opacity=".9"/>
      <text x="20" y="176" fill="${p[1]}" font-size="7" font-family="Arial,sans-serif" letter-spacing="1.4">DESIGNFREEHUB.COM</text>
    </svg>`;
  }

  function renderCard(item) {
    const category = categoryNames[item.category] || "Resource";
    const download = item.downloadUrl && item.downloadUrl !== "#"
      ? `<a class="download-link" href="${escapeHtml(item.downloadUrl)}" download>Download ↗</a>`
      : `<span class="download-link" title="Sample item; no downloadable file yet">Preview only</span>`;
    return `<article class="resource-card">
      <div class="resource-preview" style="background:${escapeHtml(item.previewBg || "#eee8ff")}">
        <span class="resource-tag">${item.isSample ? "SAMPLE PREVIEW" : "FREE RESOURCE"}</span>
        ${previewArt(item)}
      </div>
      <div class="resource-body">
        <p class="resource-category">${escapeHtml(category)}</p>
        <h3 class="resource-title">${escapeHtml(item.title)}</h3>
        <p class="resource-desc">${escapeHtml(item.description)}</p>
        <div class="resource-meta"><span>${escapeHtml(item.format || "Preview")} · ${escapeHtml(item.language || "English")}</span>${download}</div>
      </div>
    </article>`;
  }

  function render() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const category = categoryFilter.value;
    let results = window.DESIGNFREEHUB_RESOURCES.filter(item => {
      const searchable = [item.title, item.description, item.language, item.tags.join(" "), categoryNames[item.category]].join(" ").toLocaleLowerCase();
      return (!query || searchable.includes(query)) && (category === "all" || item.category === category);
    });
    if (sortSelect.value === "az") results.sort((a, b) => a.title.localeCompare(b.title));
    else results.sort((a, b) => (a.featured === b.featured ? a.title.localeCompare(b.title) : a.featured ? -1 : 1));
    grid.innerHTML = results.map(renderCard).join("");
    resourceCount.textContent = `${results.length} resource${results.length === 1 ? "" : "s"}`;
    emptyState.hidden = results.length !== 0;
    grid.hidden = results.length === 0;
  }

  [searchInput, categoryFilter, sortSelect].forEach(el => el.addEventListener("input", render));
  document.getElementById("clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    sortSelect.value = "featured";
    render();
  });
  document.querySelectorAll(".category-card").forEach(button => button.addEventListener("click", () => {
    categoryFilter.value = button.dataset.category;
    document.getElementById("resources").scrollIntoView({ behavior: "smooth" });
    render();
  }));
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
})();