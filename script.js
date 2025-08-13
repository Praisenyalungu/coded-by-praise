// ===========================
// DYNAMIC GRACE NUGGETS
// ===========================
const nuggetThemes = {
  html: [
    "You are laying the foundation — every tag matters. 🧱",
    "Structure brings clarity, just like your purpose. 🏗️"
  ],
  css: [
    "You’re adding beauty to function — just like grace. 🎨",
    "Every style reflects your unique touch. 💫"
  ],
  javascript: [
    "You’re learning to make things move — keep going! ⚡",
    "Logic is your superpower. Use it with love. 🧠"
  ],
  ux: [
    "Empathy is your design tool. 💛",
    "You’re building for hearts, not just screens. 🖥️❤️"
  ],
  default: [
    "You are not behind. You are right on time. 💖",
    "This season is preparing you for something sacred. 🌱"
  ]
};

// Current focus category
let currentFocus = "javascript"; // Default focus

// Show daily nugget based on day of the month
function showDailyNugget() {
  const today = new Date().getDate();
  const nuggets = nuggetThemes[currentFocus] || nuggetThemes.default;
  const nugget = nuggets[today % nuggets.length];
  const nuggetElement = document.getElementById('nugget');
  if (nuggetElement) {
    nuggetElement.textContent = nugget;
  }
}

// Dynamically change focus category
function setFocus(newFocus) {
  if (nuggetThemes[newFocus]) {
    currentFocus = newFocus;
    showDailyNugget();
  }
}

// ===========================
// EXTRA NUGGETS MODAL
// ===========================
const extraNuggets = [
  "Even Jesus paused for prayer – don’t skip your breaks!",
  "Debugging: the tech version of faith-proofing.",
  "Your code is like worship—in it, you create.",
  "Faith + code = miracles in logic and life!",
  "Commit your code and your plans to God.",
  "Every error is a lesson in patience.",
  "404: Motivation not found? Try prayer and coffee.",
  "You’re not just debugging code — you’re refining character."
];

const modal = document.getElementById('nugget-modal');
const modalText = document.getElementById('modal-text');

function showPopup(index) {
  modalText.textContent = extraNuggets[index] || "Here's a blessing for you! ✨";
  if (modal) modal.style.display = 'flex';
}

function closePopup() {
  if (modal) modal.style.display = 'none';
}

// ===========================
// RANDOM NUGGET BUTTON
// ===========================
const newNuggetBtn = document.getElementById('new-nugget');
if (newNuggetBtn) {
  newNuggetBtn.addEventListener('click', () => {
    const nuggets = nuggetThemes[currentFocus] || nuggetThemes.default;
    const random = nuggets[Math.floor(Math.random() * nuggets.length)];
    const nuggetElement = document.getElementById('nugget');
    if (nuggetElement) {
      nuggetElement.style.opacity = 0;
      setTimeout(() => {
        nuggetElement.textContent = random;
        nuggetElement.style.opacity = 1;
      }, 200);
    }
  });
}

// ===========================
// CONTACT FORM USING EMAILJS
// ===========================
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button');
    submitBtn.disabled = true;

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        if (formStatus) {
          formStatus.textContent = "Message sent! ✅";
          formStatus.classList.add('text-success');
          formStatus.classList.remove('text-danger');
        }
        contactForm.reset();
        submitBtn.disabled = false;
      })
      .catch((error) => {
        if (formStatus) {
          formStatus.textContent = "Failed to send message. ❌";
          formStatus.classList.add('text-danger');
          formStatus.classList.remove('text-success');
        }
        console.error(error);
        submitBtn.disabled = false;
      });
  });
}

// ===========================
// SMOOTH SCROLL FOR NAVBAR & FLOATING NAV
// ===========================
function enableSmoothScroll(selector) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

enableSmoothScroll('a.nav-link');
enableSmoothScroll('#floating-nav .float-tab');

// ===========================
// FLOATING NAV ACTIVE HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section');
const floatTabs = document.querySelectorAll('#floating-nav .float-tab');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  floatTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('href') === '#' + current) tab.classList.add('active');
  });
});

// ===========================
// OPTIONAL: AOS ANIMATIONS INIT
// ===========================
if (window.AOS) {
  AOS.init({ duration: 800, once: true });
}

// ===========================
// INITIAL PAGE LOAD
// ===========================
document.addEventListener("DOMContentLoaded", showDailyNugget);
