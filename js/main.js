/* navbar icon toggle for reduced screen size*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}


/* diff text color for different tabs*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                

            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        };
    });

    /* sticky navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 100);

    /* remove toggle icon and navbar */

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');


};

/* scroll reveal */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', {origin: 'top' });
ScrollReveal().reveal('home-img, .services-container, .portfolio-box, .contact form', {origin: 'button' });
ScrollReveal().reveal('.home-contact h1, .about-img', {origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', {origin: 'right' });

/* Typed JS */

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer!', 'Web Designer!', 'Robotics/Programming Instructor!', 'Blockchain Enthusiast!', "Software Developer!"],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});

// CONTACT FORM (Formspree)
(function(){
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
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          if (formStatus) { formStatus.textContent = 'Thanks! Your message has been sent.'; formStatus.classList.add('success'); }
          contactForm.reset();
        } else {
          let errMsg = 'Oops, something went wrong. Please try again.';
          try {
            const json = await res.json();
            if (json && json.errors && json.errors[0] && json.errors[0].message) errMsg = json.errors[0].message;
          } catch {}
          if (formStatus) { formStatus.textContent = errMsg; formStatus.classList.add('error'); }
        }
      } catch (err) {
        if (formStatus) { formStatus.textContent = 'Network error. Please try again.'; formStatus.classList.add('error'); }
      }
    });
  })();
  