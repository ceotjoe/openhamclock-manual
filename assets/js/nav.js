/* OpenHamClock Manual — Shared Navigation */

(function () {
  const NAV_HTML = `
    <a href="index.html" class="sidebar-logo">
      <div class="logo-mark">📡</div>
      <div class="logo-text">
        <span class="logo-name">OpenHamClock</span>
        <span class="logo-sub">User Manual</span>
      </div>
    </a>
    <nav class="sidebar-nav">
      <div class="nav-section">Getting Started</div>
      <a href="index.html"><span class="nav-icon">🏠</span> Introduction</a>
      <a href="quickstart.html"><span class="nav-icon">⚡</span> Quick Start</a>
      <a href="installation.html"><span class="nav-icon">🖥️</span> Installation</a>
      <a href="configuration.html"><span class="nav-icon">⚙️</span> Configuration</a>

      <div class="nav-section">Features</div>
      <a href="world-map.html"><span class="nav-icon">🗺️</span> World Map</a>
      <a href="dx-cluster.html"><span class="nav-icon">📶</span> DX Cluster</a>
      <a href="space-weather.html"><span class="nav-icon">🌤️</span> Space Weather</a>
      <a href="satellites.html"><span class="nav-icon">🛰️</span> Satellites</a>
      <a href="pota-sota.html"><span class="nav-icon">🏔️</span> POTA / SOTA</a>
      <a href="rig-bridge.html"><span class="nav-icon">🎛️</span> Rig Bridge</a>
      <a href="wsjt-ft8.html"><span class="nav-icon">📻</span> WSJT-X / FT8</a>

      <div class="nav-section">Advanced</div>
      <a href="themes-profiles.html"><span class="nav-icon">🎨</span> Themes &amp; Profiles</a>
      <a href="troubleshooting.html"><span class="nav-icon">🔧</span> Troubleshooting</a>
      <a href="reference.html"><span class="nav-icon">📖</span> Reference</a>
    </nav>
  `;

  const MOBILE_HEADER_HTML = `
    <div class="logo-mark" style="width:32px;height:32px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">📡</div>
    <span class="logo-name">OpenHamClock Manual</span>
    <button class="burger" id="burger" aria-label="Toggle menu">☰</button>
  `;

  function init() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = NAV_HTML;

    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader) mobileHeader.innerHTML = MOBILE_HEADER_HTML;

    setActiveLink();
    setupMobileMenu();
    setupCopyButtons();
  }

  function setActiveLink() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('#sidebar a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function setupMobileMenu() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);

    document.addEventListener('click', e => {
      const burger = document.getElementById('burger');
      const sidebar = document.getElementById('sidebar');
      if (!burger || !sidebar) return;

      if (e.target === burger || burger.contains(e.target)) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
      } else if (overlay.classList.contains('show') &&
                 !sidebar.contains(e.target)) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      }
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.code-block');
        const pre = block && block.querySelector('pre');
        if (!pre) return;
        navigator.clipboard.writeText(pre.innerText).then(() => {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
