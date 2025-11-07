// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class when scrolling down
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ==========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simple validation
  if (!name || !email || !message) {
    showNotification('Per favore, compila tutti i campi!', 'error');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Per favore, inserisci un indirizzo email valido!', 'error');
    return;
  }

  // Simulate form submission (replace with actual form handling)
  showNotification('Messaggio inviato con successo! Ti risponderò presto.', 'success');

  // Reset form
  contactForm.reset();

  // In a real application, you would send the data to a server here
  // For example, using fetch API or emailjs
  console.log('Form submitted:', { name, email, message });
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
    color: 'white',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    animation: 'slideInRight 0.3s ease',
    maxWidth: '400px'
  });

  // Add animation keyframes
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add to document
  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// ==========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project-card, .cv-card');

  animatedElements.forEach(element => {
    observer.observe(element);
  });
});

// ==========================================
// TYPING EFFECT FOR SUBTITLE (OPTIONAL)
// ==========================================

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Optional: Activate typing effect on page load
// Uncomment the following lines if you want the typing effect on the subtitle
/*
window.addEventListener('load', () => {
  const subtitle = document.querySelector('.subtitle');
  const originalText = subtitle.textContent;
  typeWriter(subtitle, originalText, 80);
});
*/

// ==========================================
// SMOOTH REVEAL ON SCROLL
// ==========================================

// Add smooth reveal to sections
const revealSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

revealSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(section);
});

// Set home section to be visible immediately
document.querySelector('.home-section').style.opacity = '1';
document.querySelector('.home-section').style.transform = 'translateY(0)';

// ==========================================
// PARALLAX EFFECT (OPTIONAL)
// ==========================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const homeSection = document.querySelector('.home-section');

  if (homeSection && scrolled < window.innerHeight) {
    homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ==========================================
// PROJECT CARD TILT EFFECT (OPTIONAL)
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Add a subtle entrance animation to the main elements
  setTimeout(() => {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const description = document.querySelector('.description');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (mainTitle) mainTitle.style.opacity = '1';
    if (subtitle) subtitle.style.opacity = '1';
    if (description) description.style.opacity = '1';
    if (ctaButtons) ctaButtons.style.opacity = '1';
  }, 200);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(highlightNavigation, 10));

// ==========================================
// CONSOLE MESSAGE (EASTER EGG)
// ==========================================

console.log('%c👋 Ciao! Benvenuto nel mio sito web!', 'font-size: 20px; font-weight: bold; color: #1a1a2e;');
console.log('%cSe stai curiosando nel codice, ti piace davvero la tecnologia! 🚀', 'font-size: 14px; color: #0f3460;');
console.log('%cContattami se hai un progetto interessante da realizzare insieme!', 'font-size: 12px; color: #6b7280;');
