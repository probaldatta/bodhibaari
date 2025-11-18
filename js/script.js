document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.navbar .dropdown-toggle');

  // Mobile dropdown behavior
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const menu = this.nextElementSibling;
        const isVisible = menu.style.display === 'block';
        document.querySelectorAll('.navbar .dropdown-menu').forEach(m => m.style.display = 'none');
        menu.style.display = isVisible ? 'none' : 'block';
      }
    });
  });

  // Reset dropdown on desktop resize
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
      document.querySelectorAll('.navbar .dropdown-menu').forEach(m => m.removeAttribute('style'));
    }
  });
});

let fixedVh;

/* ============================================================
   MAIN FUNCTION — FIRST DETECT DESKTOP OR MOBILE
   ============================================================ */
function adjustHeroSection() {
  const isDesktop = window.innerWidth >= 992;
  const hero = document.getElementById('hero');
  const header = document.getElementById('header');
  const heroContent = document.getElementById('hero-content');
  const heroSlider = document.getElementById('hero-slider');

  if (!hero || !header || !heroContent || !heroSlider) return;

  /* -------------------------------
      DESKTOP VIEW (≥ 992px)
     ------------------------------- */
  if (isDesktop) {
    if (!fixedVh) fixedVh = window.innerHeight;

    const headerHeight = header.offsetHeight;
    const heroHeight = fixedVh - headerHeight;

    hero.style.height = `${heroHeight}px`;
    heroSlider.style.height = `${heroHeight}px`;

    const viewportWidth = window.innerWidth;
    const container = heroContent.closest('.container');
    const containerGap = (viewportWidth - container.offsetWidth) / 2;
    const heroWidth = heroContent.offsetWidth;

    const carouselWidth = viewportWidth - (heroWidth + containerGap);

    heroSlider.style.width = `${carouselWidth}px`;
    heroSlider.style.marginLeft = `${heroWidth + containerGap}px`;

    const carouselItems = heroSlider.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
      item.style.width = `${carouselWidth}px`;
      item.style.height = `${heroHeight}px`;
      const img = item.querySelector('img');
      if (img) {
        img.style.width = '100%';
        img.style.height = `${heroHeight}px`;
        img.style.objectFit = 'cover';
      }
    });

    return;
  }

  /* -------------------------------
      MOBILE / TABLET (< 992px)
      — Set height by IMAGE RATIO
     ------------------------------- */
  const slideImage = heroSlider.querySelector('.carousel-item img');
  if (slideImage) {
    const ratio = slideImage.naturalHeight / slideImage.naturalWidth; // image ratio
    const newHeight = window.innerWidth * ratio;

    hero.style.height = `${newHeight}px`;
    heroSlider.style.height = `${newHeight}px`;

    heroSlider.querySelectorAll('.carousel-item img').forEach(img => {
      img.style.height = `${newHeight}px`;
      img.style.objectFit = 'cover';
    });
  }
}

/* Run on load, resize, and after sliding */
window.addEventListener('load', adjustHeroSection);
window.addEventListener('resize', adjustHeroSection);

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  heroCarousel.addEventListener('slid.bs.carousel', adjustHeroSection);
}

document.addEventListener("DOMContentLoaded", function () {
  const popupImage = document.getElementById("popupImage");

  document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", function () {
      popupImage.src = this.src;
    });
  });
});
