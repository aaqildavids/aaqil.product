/* ============================================
   AAQIL DAVIDS — Personal Website
   script.js
   ============================================ */

// ---------- Nav scroll effect ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---------- Hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---------- Typed text animation ----------
const typedEl = document.getElementById('typed');
const words = ['Product Manager', 'Innovator', 'Strategist', 'Builder'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

// Start after page load delay
setTimeout(type, 1200);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger items in the same parent
      const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 120;
      });
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Smooth nav link scroll (offset for fixed nav) ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
