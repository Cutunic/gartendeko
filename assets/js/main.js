let lineHeight = 40;
let normalDist = 8;

let menuWidth = 20 * normalDist;

onBurgerClick = (event) => {
  let navMenu = document.getElementById("nav-menu");
  let content = document.getElementById("content");
  let circle = document.getElementById("bg-circle-box");
  let circle1 = document.getElementById("bg-circle-box-1");
  let circle2 = document.getElementById("bg-circle-box-2");

  let hammer = document.getElementById("bg-hammer-box-tr");

  let checked = document.getElementById("burgerInput");

  let transValue = `translateX(${menuWidth})`;
  console.log(transValue);

  if (checked.checked) {
    navMenu.style.transform = "translateX(0)";
    content.style.transform = `translateX(${menuWidth}px)`;
    circle.style.transform = `translateX(${menuWidth}px)`;
    hammer.style.transform = `translateX(${menuWidth}px)`;
    if (circle1) {
      circle1.style.transform = `translateX(${menuWidth}px)`;
    }
    if (circle2) {
      circle2.style.transform = `translateX(calc(-50% + ${menuWidth}px))`;
    }
  } else {
    navMenu.style.transform = "translateX(-100%)";
    content.style.transform = "translateX(0)";
    circle.style.transform = "translateX(0)";
    hammer.style.transform = "translateX(0)";
    if (circle1) {
      circle1.style.transform = "translateX(0)";
    }
    if (circle2) {
      circle2.style.transform = `translateX(-50%)`;
    }
  }
};
