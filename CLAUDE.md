# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static HTML manual for [OpenHamClock](https://openhamclock.com), served via GitHub Pages. There is **no build step, no package manager, no framework** — plain HTML files that GitHub Pages serves directly from the `main` branch root.

The companion app source lives in a separate repo (`../openhamclock`). This repo is documentation only — never modify the app source here.

## Local preview

Any static file server works:

```bash
python3 -m http.server 8080     # then open http://localhost:8080
# or
npx serve .
```

GitHub Pages deploys automatically on push to `main`.

## Architecture

### Page structure

Every HTML page follows an identical shell — copy from any existing page when creating a new one:

```html
<div class="mobile-header"></div>   <!-- populated by nav.js -->
<div id="sidebar"></div>             <!-- populated by nav.js -->
<main id="main">
  <div class="content-wrap">
    <!-- breadcrumb, page-header, content sections, page-nav -->
  </div>
</main>
<script src="assets/js/nav.js"></script>
```

### Shared navigation (`assets/js/nav.js`)

An IIFE that runs on every page. It:
- Injects `NAV_HTML` into `#sidebar` and `MOBILE_HEADER_HTML` into `.mobile-header`
- Sets the `.active` class on the current page's nav link by matching `location.pathname`
- Wires copy buttons (`.copy-btn` inside `.code-block`) to `navigator.clipboard`
- Appends the mobile sidebar overlay to `<body>`

**When adding a new page**, add a link to `NAV_HTML` in `nav.js` in addition to creating the HTML file.

### Design system (`assets/css/style.css`)

All styling is in one file using CSS custom properties defined on `:root`. Key component classes:

| Class | Purpose |
|---|---|
| `.badge-intro/install/config/feature/advanced/ref` | Coloured pill badges in page headers |
| `.callout-tip/note/warn/danger` | Callout boxes — wrap in `.callout` with `.callout-icon` + `.callout-body` |
| `.code-block` | Dark code block with optional `.code-block-header` (lang label + copy button) |
| `.figure` / `.figure-placeholder` | Screenshot container — placeholder until real screenshot is added |
| `.step-list` | Auto-numbered step list (CSS counter, no `<ol>` markers) |
| `.two-col` | Responsive two-column grid, collapses to one column at 680 px |
| `.info-box` / `.info-row` | Key-value information boxes |
| `.page-nav` | Prev/next navigation at page bottom |
| `.annotation` / `.annotation-list` | Numbered red circles for screenshot callouts |

Syntax highlighting inside `<pre>`: use `<span class="comment">`, `<span class="key">`, `<span class="value">`, `<span class="prompt">`, `<span class="output">` — these are styled in `style.css`, no JS highlighter.

### Screenshots

Placeholder divs (`.figure-placeholder`) reference the expected filename in `assets/img/screenshots/`. Replace the entire `.figure-placeholder` block with `<img src="assets/img/screenshots/filename.png" alt="…">` when a real screenshot is available. The `.figure-caption` below the image stays unchanged.

### `_config.yml`

Minimal GitHub Pages metadata only (`title`, `description`, `theme: null`). No Jekyll theme is active — GitHub Pages serves the files as raw static HTML.

## Content conventions

- **Audience**: licensed and unlicensed amateur radio operators, including newcomers. Explain ham-specific terms on first use or add them to the glossary in `reference.html`.
- **Tone**: clear, direct, helpful. No filler phrases. Active voice.
- **Code blocks**: always include a `.code-block-header` with a descriptive `code-block-lang` label. Add a copy button for anything a user would paste into a terminal or file.
- **Callouts**: use `callout-tip` for helpful hints, `callout-note` for neutral information, `callout-warn` for things that need care, `callout-danger` for destructive or irreversible actions.
- **Section numbers**: follow the existing `Section 01`–`Section 14` numbering. New pages beyond 14 continue the sequence.
- **Page nav**: every page ends with a `.page-nav` block linking to the previous and next page in section order.
