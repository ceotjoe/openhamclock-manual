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

    <div class="translate-widget">
      <div class="translate-label">🌐 Translate page</div>
      <select class="translate-select" id="ohc-lang-select" aria-label="Select language for translation">
        <option value="">English (original)</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="it">Italiano</option>
        <option value="pt">Português</option>
        <option value="nl">Nederlands</option>
        <option value="pl">Polski</option>
        <option value="sv">Svenska</option>
        <option value="ja">日本語</option>
        <option value="zh-CN">中文（简体）</option>
        <option value="ar">العربية</option>
        <option value="ru">Русский</option>
      </select>
    </div>
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
    setupTranslate();
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

  // ── Google Translate ──────────────────────────────────────

  function setupTranslate() {
    // Hidden target div required by the Google Translate Element script
    const gtEl = document.createElement('div');
    gtEl.id = 'google_translate_element';
    document.body.appendChild(gtEl);

    const select = document.getElementById('ohc-lang-select');
    if (!select) return;

    // Restore saved language choice on every page load
    const saved = localStorage.getItem('ohc-lang');
    if (saved) {
      select.value = saved;
      triggerTranslate(saved);
    }

    select.addEventListener('change', function () {
      const lang = this.value;
      if (!lang) {
        localStorage.removeItem('ohc-lang');
        resetTranslation();
      } else {
        localStorage.setItem('ohc-lang', lang);
        triggerTranslate(lang);
      }
    });
  }

  function triggerTranslate(lang) {
    // (Re-)define the callback before injecting / re-using the script
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
      waitForCombo(lang, 0);
    };

    if (!document.getElementById('gt-script')) {
      // First call on this page — lazy-load the GT script
      var s = document.createElement('script');
      s.id  = 'gt-script';
      s.src = '//translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(s);
    } else {
      // Script already loaded and widget already initialised — just switch language
      waitForCombo(lang, 0);
    }
  }

  // Polls until the hidden <select class="goog-te-combo"> appears, then sets the language
  function waitForCombo(lang, attempts) {
    var combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    } else if (attempts < 30) {
      setTimeout(function () { waitForCombo(lang, attempts + 1); }, 200);
    }
  }

  function resetTranslation() {
    var combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
