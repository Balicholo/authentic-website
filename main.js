document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    if (hamburger && navLinks) {
        // Toggle the menu on hamburger click
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked (for better UX on mobile)
        navItems.forEach(item => {
            item.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });

        // Close the menu when clicking outside of it
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });

        // Improve accessibility by allowing "Esc" key to close the menu
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
            }
        });
    }
});

// CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 45,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
  });
});

// PRODUCTS-AUTO SCROLL GALLERY
// Select the container to be scrolled
const scrollWrapper = document.querySelector('.scroll-wrapper');
const container = document.querySelector('.container');

// Function to smoothly scroll the container
function startAutoScroll() {
    let scrollPosition = 0;

    function scroll() {
        // Increase the scroll position by 1 pixel
        scrollPosition += 1;
        scrollWrapper.scrollTop = scrollPosition;

        // Check if we've reached the bottom of the container
        if (scrollWrapper.scrollTop >= container.scrollHeight - scrollWrapper.clientHeight) {
            // Reset scroll position to create an infinite effect
            scrollPosition = 0;
            scrollWrapper.scrollTop = scrollPosition;
        }

        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(scroll);
    }

    scroll();
}

// Start the auto-scroll effect
window.onload = startAutoScroll;

// TESTIMONIAL CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".swiper", {
      loop: true, // Allows continuous scrolling
      autoplay: {
        delay: 3000, // Time between slides (in ms)
        disableOnInteraction: false, // Autoplay continues even after interaction
      },
      pagination: {
        el: ".swiper-pagination", // Enable pagination bullets
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next", // Next button
        prevEl: ".swiper-button-prev", // Previous button
      },
      slidesPerView: 1, // Number of slides visible at a time
      spaceBetween: 20, // Space between slides
      breakpoints: {
        768: {
          slidesPerView: 2, // Show 2 slides on tablet
        },
        1024: {
          slidesPerView: 3, // Show 3 slides on desktop
        },
      },
    });
  });