const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    products.forEach((product) => {
      product.classList.toggle('hidden', selected !== 'all' && product.dataset.type !== selected);
    });
  });
});

const phone = '5522981428395';
document.querySelectorAll('.reserve-link').forEach((button) => {
  button.addEventListener('click', () => {
    const message = `Oi! Tenho interesse em reservar a chuteira ${button.dataset.model}. Pode me informar os tamanhos e a disponibilidade?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

function playVideo(video, { poster = false } = {}) {
  const source = video.querySelector('source[data-src]');
  if (!source) return;
  if (poster && video.dataset.poster) video.poster = video.dataset.poster;
  source.src = source.dataset.src;
  video.preload = 'auto';
  video.load();
  video.play().catch(() => {});
  source.removeAttribute('data-src');
}


const reserveVideo = document.querySelector('.reserve-photo video');
if ('IntersectionObserver' in window) {
  const reserveObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      playVideo(reserveVideo, { poster: true });
      reserveObserver.disconnect();
    }
  }, { rootMargin: '240px' });
  reserveObserver.observe(reserveVideo);
} else {
  reserveVideo.dataset.poster && (reserveVideo.poster = reserveVideo.dataset.poster);
  window.setTimeout(() => playVideo(reserveVideo, { poster: true }), 1800);
}
