# Filmmaker Portfolio — J. Mercer

A multi-page static website for showcasing screenplays (with draft-by-draft progression) and short films. Built with plain HTML, CSS, and vanilla JavaScript — no build tools, no dependencies, no framework. Open a file in a browser and it works.

---

## File structure

```
filmmaker-portfolio/
├── index.html          ← Homepage
├── screenplays.html    ← Screenplays with draft timelines
├── films.html          ← Short films with video playback
├── about.html          ← Bio, credits, timeline, influences
├── contact.html        ← Contact form
├── css/
│   └── style.css       ← All shared styles (tokens, nav, cards, etc.)
├── js/
│   └── main.js         ← Nav behaviour, filmstrip sliders, video modal
├── images/             ← Create this folder — add your portrait + any stills
│   └── portrait.jpg    ← Your photo (swap in about.html)
├── videos/             ← Create this folder — for locally hosted films
│   └── night-bus.mp4   ← Example local video reference
└── pages/              ← Create this folder — for downloadable PDF drafts
    ├── fog-at-hartley-draft1.pdf
    └── saltburn-road-draft1.pdf
```

---

## Quick start

No installation needed. Just open `index.html` in a browser, or drop the whole folder into any static host.

For local development with live reload, run:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Customisation guide

### 1. Your name and branding

Search and replace `J. Mercer` across all HTML files with your own name. Also update:

- `<title>` tags on each page
- `<meta name="description">` tags
- `.nav__logo` text
- `.footer__name` text
- The `hero__eyebrow` location line on `index.html` and `about.html`

### 2. Your photo (about.html)

Find the placeholder `<div class="about-portrait">` in `about.html` and replace it with:

```html
<img src="images/portrait.jpg" alt="Your Name — filmmaker" class="about-portrait">
```

Add your image to the `/images/` folder. Portrait orientation (3:4 ratio) works best.

### 3. Adding a screenplay

Copy one of the `<article class="card screenplay-card">` blocks in `screenplays.html`. Each screenplay needs:

- A unique key (e.g. `fog`, `salt`, `shift`) — used for all element IDs
- A `data-genre` attribute (`drama` or `documentary`)
- A `data-type` attribute (`feature` or `short`)
- A matching entry in the JS `drafts` array at the bottom of the file

#### Draft data format

Each draft is an object in the array:

```javascript
{
  label: 'Draft 1',           // shown in the badge
  text:  `INT. ...`,          // screenplay excerpt (monospace, pre-wrap)
  notes: '<strong>Draft 1 — Jan 2024</strong>\nYour notes here.',
  pages: '89 pages',
  date:  'Jan 2024'
}
```

Then call `initScript('yourkey', yourDraftsArray)` inside the `DOMContentLoaded` listener.

### 4. Adding a film (films.html)

Copy an `<article class="card film-item">` block and update:

- `onclick` with the correct video URL and type (`'youtube'`, `'vimeo'`, or `'local'`)
- Background colour for the thumbnail (use a dark hex value — different per film for variety)
- Title, description, tags, year, and credits
- Duration badge

#### Video URL formats

| Type | Example |
|------|---------|
| YouTube | `openVideoModal('https://youtube.com/watch?v=dQw4w9WgXcQ', 'youtube')` |
| Vimeo | `openVideoModal('https://vimeo.com/123456789', 'vimeo')` |
| Local file | `openVideoModal('videos/my-film.mp4', 'local')` |

The modal extracts the video ID automatically from standard YouTube and Vimeo URLs.

### 5. Contact form — making it actually send email

The form currently simulates a successful submission. To make it live, choose one:

**Option A — Formspree (easiest)**
1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month)
2. Create a new form and copy your endpoint URL
3. In `contact.html`, change the `<form>` opening tag to:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Delete the `<script>` block at the bottom of `contact.html`

**Option B — Netlify Forms (if deploying to Netlify)**
1. Change the `<form>` tag to:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```
2. Add a hidden input inside the form:
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```
3. Delete the `<script>` block at the bottom of `contact.html`
4. Netlify handles the rest — submissions appear in your dashboard

**Option C — EmailJS (no backend, stays client-side)**
1. Sign up at [emailjs.com](https://emailjs.com)
2. Add their CDN script before `</body>`
3. Replace the `setTimeout` simulation in the form's submit handler with an `emailjs.send()` call

### 6. Your social links

Search for `YOUR_VIMEO`, `YOUR_HANDLE`, and `hello@yourname.com` across all files. Replace with your actual URLs and email address. These appear in the nav, footer, sidebar, and various link elements.

### 7. Downloadable script PDFs

Place your PDF files in the `/pages/` folder. The download links in `screenplays.html` use the `download` attribute:

```html
<a href="pages/fog-at-hartley-draft1.pdf" class="btn btn--ghost" download>
  Download draft
</a>
```

You can link one PDF per draft, or a single combined PDF per screenplay — your choice.

---

## Deployment

This is a static site. It deploys anywhere that serves HTML files.

### Netlify (recommended — free, fast)
1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the `filmmaker-portfolio/` folder into the Netlify dashboard
3. Done. You get a live URL instantly
4. Add a custom domain in Settings → Domain management

### GitHub Pages (free)
1. Push the folder to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, `/root`
3. Your site is live at `https://yourusername.github.io/your-repo-name/`

### Vercel (free)
```bash
npm i -g vercel
vercel
```

---

## Design tokens

All colours, fonts, and spacing are defined as CSS variables in `:root` inside `css/style.css`. Change them once and they propagate everywhere.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--parchment` | `#F5EFE0` | Card backgrounds |
| `--cream` | `#FBF7EE` | Page background |
| `--ink` | `#2C2416` | Primary text |
| `--ink-light` | `#6B5A3E` | Secondary text |
| `--amber` | `#C4821A` | Accent, highlights, CTAs |
| `--coral` | `#C45A38` | Section labels, tags |

Fonts are loaded from Google Fonts:
- **Playfair Display** — headings and titles
- **Courier Prime** — screenplay text and code
- **Inter** — body text, UI, labels

---

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills needed. The `aspect-ratio` property is used for film thumbnails — supported in all browsers released after 2021.

---

## Accessibility notes

- All interactive elements have `aria-label` attributes
- Film cards and modal have appropriate `role` attributes
- The video modal closes on `Escape` key
- Skip nav can be added above `.nav` if needed:
  ```html
  <a href="#main-content" class="sr-only">Skip to main content</a>
  ```
- Keyboard navigation works throughout — form elements, buttons, and links are all focusable

---

## Licence

This site is your personal portfolio. The code structure is yours to use, modify, and deploy freely. If you share it as a template, credit is appreciated but not required.
