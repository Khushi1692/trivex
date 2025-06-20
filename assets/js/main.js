/**
 * Template Name: FlexStart
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Updated: Nov 01 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 60
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    const isSubmenuToggle = navLink.classList.contains("toggle-submenu");
    const href = navLink.getAttribute("href");

    // Only toggle mobile nav if it's not a submenu toggle and has a valid href
    if (!isSubmenuToggle && href && href !== "#") {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    }
  });
});


  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      document.querySelectorAll(".mobile-service").forEach((el) => {
        el.classList.toggle("show");
      });
      e.stopImmediatePropagation();
    });
  });
 document.querySelectorAll('.mobile-service .toggle-submenu').forEach(toggle => {
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const parent = this.closest('.mobile-service');

    // Toggle current submenu
    const isActive = parent.classList.contains('active');
    parent.classList.toggle('active');

    // Close all other submenus
    document.querySelectorAll('.mobile-service').forEach(item => {
      if (item !== parent) {
        item.classList.remove('active');
      }
    });
  });
});


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

function sendMail(event) {
  event.preventDefault(); // Stop default form submit

  // Get the message value
  const message = document.getElementById("message").value.trim();

  // Validate that the message is not empty
  if (message === "") {
    document.querySelector(".sent-message").style.display = "none";
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".error-message").innerText =
      "Message field cannot be empty.";
    document.querySelector(".error-message").style.display = "block";
    return; // Stop further execution
  }

  // Hide all messages first
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".sent-message").style.display = "none";
  document.querySelector(".error-message").style.display = "none";

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: message, // use the trimmed message here
  };

  emailjs.send("service_xvq8ogg", "template_ova583j", params).then(
    function (response) {
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".sent-message").style.display = "block";
      document.querySelector("form").reset();
    },
    function (error) {
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".error-message").innerText =
        "Failed to send email: " + error.text;
      document.querySelector(".error-message").style.display = "block";
    }
  );
}
document.addEventListener("DOMContentLoaded", function () {
  const data = {
    cheapo: {
      category: "Logo design",
      client: "Cheapo Shopping",
      url: "https://drive.google.com/drive/folders/10aZtvvglNKrGahgHnk3WkLx0IIC1-DMB",
      title: "Cheapo Logo Project",
      description:
        "Creative logo design for Cheapo Shopping to enhance brand visibility.",
      images: [
        "assets/img/portfolio-details/cheapo/logo-3.jpg",
        "assets/img/portfolio-details/cheapo/logo-4.jpg",
      ],
    },
    workwave: {
      category: "Logo design",
      client: "Workwave",
      url: "#",
      title: "Workwave Identity Design",
      description:
        "A branding identity for Workwave. Clean, modern, and impactful.",
      images: [
        "assets/img/portfolio-details/workware/WorkWave.png",
        "assets/img/portfolio-details/workware/logo-1.png",
        "assets/img/portfolio-details/workware/workwave 2.png",
      ],
    },
    chitra: {
      category: "Logo design",
      client: "Chitra Holidays",
      url: "#",
      title: "Chirta Holiday – Visual Identity & Logo Creation",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: [
        "assets/img/portfolio-details/workware/WorkWave.png",
        "assets/img/portfolio-details/workware/logo-1.png",
        "assets/img/portfolio-details/workware/workwave 2.png",
      ],
    },
    farmer: {
      category: "UI /UX  design",
      client: "Farmer 360",
      url: "#",
      title: "Farmer 360",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: Array.from(
        { length: 18 },
        (_, i) => `assets/img/portfolio-details/farmer/${i + 1}.png`
      ),
    },
    printme: {
      category: "UI /UX  design",
      client: "Print Me ",
      url: "#",
      title: "PrintMe",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: Array.from(
        { length: 10 },
        (_, i) => `assets/img/portfolio-details/printme/${i + 1}.png`
      ),
    },
    expomate: {
      category: "UI /UX  design",
      client: "ExpoMate",
      url: "#",
      title: "ExpoMate",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: Array.from(
        { length: 11 },
        (_, i) => `assets/img/portfolio-details/expomate/${i + 1}.png`
      ),
    },
    media: {
      category: "Social Media Post",
      client: "Mumbai Cutting Chai",
      url: "#",
      title: "Mumbai Cutting",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: [
        "assets/img/portfolio-details/media/post-1.jpeg",
        "assets/img/portfolio-details/media/post-2.jpeg",
      ],
    },
    mumbai_poster: {
      category: "Poster Design",
      client: "Mumbai Cutting Chai",
      url: "#",
      title: "Mumbai Cutting",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: [
        "assets/img/portfolio-details/Mumbai cutting Poster/1.png",
        "assets/img/portfolio-details/Mumbai cutting Poster/2.png",
        "assets/img/portfolio-details/Mumbai cutting Poster/3.png",
        "assets/img/portfolio-details/Mumbai cutting Poster/4.png",
      ],
    },
    dahoo: {
      category: "Poster Design",
      client: "Dahoo",
      url: "#",
      title: "Dahoo",
      description:
        "We designed a clean and modern logo for Chirta Holiday, a travel company focused on delivering unforgettable holiday experiences. The logo captures the spirit of adventure and relaxation, using vibrant colors and sleek typography to reflect the brand’s dynamic personality. The visual identity is crafted to be versatile across print and digital platforms, helping Chirta Holiday stand out in the competitive travel market.",
      images: Array.from(
        { length: 2 },
        (_, i) => `assets/img/portfolio-details/dahoo/${i + 1}.png`
      ),
    },
    farmerblockchain: {
      category: "UI / UX ",
      client: "Farmer 360",
      url: "#",
      title: "Farmer 360 – Empowering Agriculture Through Blockchain",
      description:
        "Farmer 360 is a blockchain-powered solution designed to bring transparency, security, and efficiency to the agricultural supply chain. The platform allows farmers, distributors, and consumers to track the journey of agricultural products from seed to shelf with tamper-proof records. By leveraging blockchain technology, Farmer 360 ensures data integrity, improves trust among stakeholders, and reduces fraud or misinformation.",

      images: [
        "assets/img/portfolio-details/farmer_360/Frame 6.png",
        "assets/img/portfolio-details/farmer_360/Frame 7.png",
        "assets/img/portfolio-details/farmer_360/Frame 8.png",
        "assets/img/portfolio-details/farmer_360/Frame 9.png",
        "assets/img/portfolio-details/farmer_360/Frame 10.png",
        "assets/img/portfolio-details/farmer_360/Frame 11.png",
        "assets/img/portfolio-details/farmer_360/Frame 12.png",
        "assets/img/portfolio-details/farmer_360/Frame 13.png",
      ],
    },
    fruite: {
      category: "UI / UX ",
      client: "Lavanya's",
      url: "#",
      title: "Lavanya's Menu",
      description:
        "We designed a sophisticated and easy-to-navigate menu for Lavanya’s, blending traditional charm with modern aesthetics. The layout highlights the brand’s rich culinary offerings, using elegant typography and a warm color palette to enhance the overall dining experience.",

      images: ["assets/img/portfolio-details/fruite/poster-1.jpg"],
    },
    tiles: {
      category: "Branding",
      client: "Nexces Granito",
      url: "#",
      title: "Nexces Granito – Premium Tiles Branding",
      description:
        "We created a bold and professional branding identity for Nexces Granito, a premium tiles business. Our visuals showcase the elegance and durability of their products through high-quality imagery and modern design, helping the brand make a strong impression in the competitive tiles market.",
      images: Array.from(
        { length: 10 },
        (_, i) => `assets/img/portfolio-details/tiles/${i + 1}.jpg`
      ),
    },
  };

  const params = new URLSearchParams(window.location.search);
  const projectKey = params.get("project");

  const project = data[projectKey];
  if (!project) {
    document.getElementById("portfolio-details").innerHTML =
      "<p>Project not found.</p>";
    return;
  }

  document.getElementById("project-category").innerText = project.category;
  document.getElementById("project-client").innerText = project.client;
  document.getElementById("project-url").href = project.url;
  document.getElementById("project-url").innerText = "www.example.com";
  document.getElementById("project-title").innerText = project.title;
  document.getElementById("project-description").innerText =
    project.description;

  const imageWrapper = document.getElementById("portfolio-images");
  imageWrapper.innerHTML = project.images
    .map(
      (src) =>
        `<div class="swiper-slide"><img src="${src}" alt="" class="img-fluid"/></div>`
    )
    .join("");

  // Initialize Swiper AFTER DOM is updated
  new Swiper(".swiper", {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});






  

