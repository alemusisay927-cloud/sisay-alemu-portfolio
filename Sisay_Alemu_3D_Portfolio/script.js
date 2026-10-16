document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const typingText = document.getElementById("typingText");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const modalImage = document.getElementById("modalImage");
  const glow = document.querySelector(".cursor-glow");

  year.textContent = new Date().getFullYear();

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.innerHTML = document.body.classList.contains("light")
      ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  });

  const words = ["Website Developer", "Electronic Maintenance", "Embedded Systems", "Cybersecurity Professional"];
  let wordIndex = 0, charIndex = 0, deleting = false;
  function typeLoop() {
    const word = words[wordIndex];
    typingText.textContent = deleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);
    if (!deleting && charIndex === word.length + 1) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
    if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
    setTimeout(typeLoop, deleting ? 45 : 75);
  }
  typeLoop();

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      modalImage.src = item.dataset.image;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const body = `Hello Sisay,%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0DEmail: ${encodeURIComponent(email)}%0D%0A%0D${encodeURIComponent(message)}`;
    window.location.href = `mailto:alemusisay927@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    formNote.textContent = "Opening your email application...";
  });

  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
});


  // Subtle 3D tilt for the profile portrait (disabled on touch/reduced-motion devices).
  const profileCard = document.querySelector(".profile-card");
  const profileWrap = document.querySelector(".profile-wrap");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (profileCard && profileWrap && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    profileWrap.addEventListener("mousemove", (event) => {
      const rect = profileWrap.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      profileCard.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
    });
    profileWrap.addEventListener("mouseleave", () => {
      profileCard.style.transform = "";
    });
  }
