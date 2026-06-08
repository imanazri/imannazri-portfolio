// Item 1: individual elements observed (already in viewport on load path)
const soloItems = document.querySelectorAll('.media-fade:not([data-portfolio-group] .media-fade)');
const soloObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const stagger = parseInt(el.dataset.stagger || '0', 10);
      el.style.transitionDelay = `${stagger * 150}ms`;
      el.classList.add('is-visible');
      soloObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });
soloItems.forEach((el) => soloObserver.observe(el));

// Items 2–4: observe the group container, fire all children together
const groups = document.querySelectorAll('[data-portfolio-group]');
const groupObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.media-fade');
      children.forEach((el) => {
        const stagger = parseInt(el.dataset.stagger || '0', 10);
        el.style.transitionDelay = `${stagger * 150}ms`;
        el.classList.add('is-visible');
      });
      groupObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
groups.forEach((el) => groupObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 48;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  (function () {
    const tag = document.getElementById('crypto-tag');
    const card = document.getElementById('crypto-hover-card');
    const img = document.getElementById('crypto-hover-img');

    const images = [
      './assets/images/opt/memes/cmeme1-opt.webp',
      './assets/images/opt/memes/cmeme2-opt.png',
      './assets/images/opt/memes/cmeme3-opt.jpg',
      './assets/images/opt/memes/cmeme4-opt.webp',
    ];

    let currentIndex = 0;
    let rotateInterval = null;
    const CARD_HEIGHT = 138;
    const OFFSET = { x: 20, y: 20 };

    function showCard() {
      img.src = images[currentIndex];
      card.classList.add('is-visible');
      rotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
      }, 1000);
    }

    function hideCard() {
      card.classList.remove('is-visible');
      clearInterval(rotateInterval);
      rotateInterval = null;
    }

    function moveCard(e) {
      card.style.left = e.clientX + OFFSET.x + 'px';
      card.style.top = e.clientY - CARD_HEIGHT - OFFSET.y + 'px';
    }

    tag.addEventListener('mouseenter', showCard);
    tag.addEventListener('mouseleave', hideCard);
    tag.addEventListener('mousemove', moveCard);
  })();

  (function () {
    const tag = document.getElementById('ai-tag');
    const card = document.getElementById('ai-hover-card');
    const img = document.getElementById('ai-hover-img');

    const images = [
      './assets/images/opt/memes/aimeme1-opt.jpeg',
      './assets/images/opt/memes/aimeme2-opt.jpg',
      './assets/images/opt/memes/aimeme3-opt.avif',
      './assets/images/opt/memes/aimeme4-opt.jpg',
    ];

    let currentIndex = 0;
    let rotateInterval = null;
    const CARD_HEIGHT = 138;
    const OFFSET = { x: 20, y: 20 };

    function showCard() {
      img.src = images[currentIndex];
      card.classList.add('is-visible');
      rotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
      }, 1000);
    }

    function hideCard() {
      card.classList.remove('is-visible');
      clearInterval(rotateInterval);
      rotateInterval = null;
    }

    function moveCard(e) {
      card.style.left = e.clientX + OFFSET.x + 'px';
      card.style.top = e.clientY - CARD_HEIGHT - OFFSET.y + 'px';
    }

    tag.addEventListener('mouseenter', showCard);
    tag.addEventListener('mouseleave', hideCard);
    tag.addEventListener('mousemove', moveCard);
  })();
}
