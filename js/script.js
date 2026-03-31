
// ================= NAVBAR SCROLL =================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// ================= DARK MODE TOGGLE =================
const toggle = document.getElementById("darkToggle");

// لو المستخدم كان مختار دارك قبل كدا
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark");
  toggle.classList.add("fa-sun");
  toggle.classList.remove("fa-moon");
}

toggle.addEventListener("click", () => {

  // تغيير المود
  document.body.classList.toggle("dark");

  // 🔥 تغيير الأيقونة بسهولة
  toggle.classList.toggle("fa-moon");
  toggle.classList.toggle("fa-sun");

  // حفظ الحالة
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }

});
// ================= SMOOTH SCROLL =================
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener("click", function (e) {
    const sectionId = this.getAttribute("href");

    if (!sectionId || !sectionId.startsWith("#")) return;

    const section = document.querySelector(sectionId);
    if (!section) return;

    e.preventDefault();

    const navHeight = document.querySelector(".navbar").offsetHeight;

    const sectionTop =
      section.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth"
    });
  });
});

// ================= Scroll Animations =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(el => observer.observe(el));

// ================= Back to Top Button =================
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ================= Lightbox Gallery =================
const lightbox = document.getElementById("lightbox");
const lightImg = lightbox.querySelector("img");

document.querySelectorAll(".card img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
});

// ================= Animated Counters =================
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };

  update();
});

// ================= Testimonials Carousel =================
const slides = document.querySelectorAll(".testimonial");
const slidesContainer = document.querySelector(".slides");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;

/* Dots */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* Update */
function updateSlider() {
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

/* Buttons */
nextBtn.onclick = () => {
  index = (index + 1) % slides.length;
  updateSlider();
};

prevBtn.onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
};

/* Auto */
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 4000);

/* Swipe */
let startX = 0;

slidesContainer.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    index = (index + 1) % slides.length;
  } else if (endX - startX > 50) {
    index = (index - 1 + slides.length) % slides.length;
  }

  updateSlider();
});

// ================= Contact Form Validation =================
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function(e){
  e.preventDefault();

  let valid = true;

  // reset errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // Name validation
  if(nameInput.value.trim() === ""){
    nameInput.nextElementSibling.textContent = "Name is required";
    valid = false;
  }

  // Email validation
  if(!emailInput.value.includes("@")){
    emailInput.nextElementSibling.textContent = "Enter valid email";
    valid = false;
  }

  // Message validation
  if(messageInput.value.trim().length < 10){
    messageInput.nextElementSibling.textContent = "Message must be at least 10 characters";
    valid = false;
  }

  // success
  if(valid){
    successMsg.classList.remove("d-none");
    form.reset();

    setTimeout(() => {
      successMsg.classList.add("d-none");
    }, 3000);
  }
});