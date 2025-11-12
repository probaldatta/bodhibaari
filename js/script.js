document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.navbar .dropdown-toggle');

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

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
      document.querySelectorAll('.navbar .dropdown-menu').forEach(m => m.removeAttribute('style'));
    }
  });
});

let fixedVh;

function adjustHeroSection() {
  const hero = document.getElementById('hero');
  const header = document.getElementById('header');
  const heroContent = document.getElementById('hero-content');
  const heroSlider = document.getElementById('hero-slider');

  if (!hero || !header || !heroContent || !heroSlider) return;

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
}

window.addEventListener('load', adjustHeroSection);
window.addEventListener('resize', adjustHeroSection);

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  heroCarousel.addEventListener('slid.bs.carousel', adjustHeroSection);
}
