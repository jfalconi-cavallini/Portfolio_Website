/* navbar icon toggle for reduced screen size*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
  };
}

/* diff text color for different tabs*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const current = document.querySelector('header nav a[href*="' + id + '"]');
      if (current) current.classList.add('active');
    }
  });

  /* sticky navbar */
  const header = document.querySelector('header');
  if (header) header.classList.toggle('sticky', window.scrollY > 100);

  /* remove toggle icon and navbar */
  if (menuIcon) menuIcon.classList.remove('fa-xmark');
  if (navbar) navbar.classList.remove('active');
};

/* scroll reveal */
// Guard against missing lib + fix selectors/origins
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
  });

  sr.reveal('.home-content, .heading', { origin: 'top' });
  sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
  sr.reveal('.home-content h1, .about-img', { origin: 'left' });
  sr.reveal('.home-content p, .about-content', { origin: 'right' });
}

/* Typed JS */
const typed = new Typed('.multiple-text', {
  strings: [
    'Frontend Developer!',
    'Web Designer!',
    'Robotics/Programming Instructor!',
    'Blockchain Enthusiast!',
    'Software Developer!',
  ],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// CONTACT FORM (Formspree)
(function () {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formStatus) {
      formStatus.textContent = 'Sending...';
      formStatus.className = 'form-status';
    }
    try {
      const data = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        if (formStatus) {
          formStatus.textContent = 'Thanks! Your message has been sent.';
          formStatus.classList.add('success');
        }
        contactForm.reset();
      } else {
        let errMsg = 'Oops, something went wrong. Please try again.';
        try {
          const json = await res.json();
          if (json && json.errors && json.errors[0] && json.errors[0].message) {
            errMsg = json.errors[0].message;
          }
        } catch {}
        if (formStatus) {
          formStatus.textContent = errMsg;
          formStatus.classList.add('error');
        }
      }
    } catch (err) {
      if (formStatus) {
        formStatus.textContent = 'Network error. Please try again.';
        formStatus.classList.add('error');
      }
    }
  });
})();
