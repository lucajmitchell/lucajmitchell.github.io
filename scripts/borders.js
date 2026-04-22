const fancyEls = document.querySelectorAll(".fancy-border");

document.addEventListener("mousemove", (event) => {
  fancyEls.forEach((el) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const elX = el.getBoundingClientRect().left
    const elY = el.getBoundingClientRect().top

    const relativeX = mouseX - elX
    const relativeY = mouseY - elY

    el.style.setProperty('--x', `${relativeX}px`)
    el.style.setProperty('--y', `${relativeY}px`)
  });
});
