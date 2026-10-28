const el = document.getElementById('parallax');

document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  el.style.transform = `translateY(-${scrollY * 0.5}px)`;
});