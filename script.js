// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Example interactive popup message for Donate buttons
  const donateButtons = document.querySelectorAll('.donate-btn');
  donateButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Thank you for your interest in donating! We will reach out soon.');
    });
  });

  // Toggle navigation for mobile view (if needed)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
