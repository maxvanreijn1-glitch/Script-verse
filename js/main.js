/* =============================================
   nav.js — active link highlighting + hamburger
============================================= */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  const ham = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__links');
  if (ham && menu) {
    ham.addEventListener('click', () => menu.classList.toggle('is-open'));
  }
})();

/* =============================================
   filmstrip.js — draft timeline sliders
============================================= */
function initFilmstrip(config) {
  /*
    config = {
      sliderId: 'slider-fog',
      fillId:   'fill-fog',
      badgeId:  'badge-fog',
      statId:   'stat-fog',
      contentId:'content-fog',
      dotPrefix:'dot-fog-',     // dots are dot-fog-1 … dot-fog-N
      drafts: [
        { label:'Draft 1', text:'...', pages:'89 pages', date:'Jan 2024' },
        ...
      ]
    }
  */
  const slider  = document.getElementById(config.sliderId);
  const fill    = document.getElementById(config.fillId);
  const badge   = document.getElementById(config.badgeId);
  const stat    = document.getElementById(config.statId);
  const content = document.getElementById(config.contentId);
  const total   = config.drafts.length;

  if (!slider) return;

  function render(n) {
    const d = config.drafts[n - 1];
    if (content) content.textContent = d.text;
    if (stat)    stat.textContent    = `${d.pages} · ${d.date}`;
    if (badge)   badge.textContent   = d.label;
    if (fill)    fill.style.width    = `${((n - 1) / Math.max(total - 1, 1)) * 100}%`;

    for (let i = 1; i <= total; i++) {
      const dot = document.getElementById(config.dotPrefix + i);
      if (!dot) continue;
      dot.className = 'draft-node__dot';
      if (i < n)  dot.classList.add('is-past');
      if (i === n) dot.classList.add('is-active');
    }
  }

  slider.addEventListener('input', () => render(parseInt(slider.value)));

  // dot clicks
  for (let i = 1; i <= total; i++) {
    const dot = document.getElementById(config.dotPrefix + i);
    if (dot) {
      dot.parentElement.addEventListener('click', () => {
        slider.value = i;
        render(i);
      });
    }
  }

  render(parseInt(slider.value));
}

/* =============================================
   modal.js — video modal
============================================= */
function openVideoModal(src, type) {
  /* type: 'youtube' | 'vimeo' | 'local' */
  const backdrop = document.getElementById('video-modal');
  const wrap     = document.getElementById('modal-video-wrap');
  if (!backdrop || !wrap) return;

  wrap.innerHTML = '';

  if (type === 'local') {
    wrap.innerHTML = `<video controls autoplay src="${src}"></video>`;
  } else {
    let embedSrc = src;
    if (type === 'youtube') {
      const id = src.match(/(?:v=|youtu\.be\/)([^&?]+)/)?.[1] || src;
      embedSrc  = `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (type === 'vimeo') {
      const id = src.match(/vimeo\.com\/(\d+)/)?.[1] || src;
      embedSrc  = `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    wrap.innerHTML = `<iframe src="${embedSrc}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }

  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const backdrop = document.getElementById('video-modal');
  const wrap     = document.getElementById('modal-video-wrap');
  if (backdrop) backdrop.classList.remove('is-open');
  if (wrap)     wrap.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('video-modal');
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeVideoModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeVideoModal();
    });
  }
});