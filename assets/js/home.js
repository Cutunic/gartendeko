document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  intervalTitle();
  intervalSlideshow();
});

const intervalTitle = () => {
  let title = [
    "Heckenschneiden",
    "Rollrasen verlegen",
    "Rasen Vertikutieren",
    "Hochdruckreinigen",
    "Pflaster arbeiten",
    "Kleinreparaturen",
  ];

  let count = 0;
  let state = true;
  let i = 0;

  setInterval(() => {
    count = count + 100;
    if (count === 2400 && state) {
      count = 0;
      state = false;
      changeTitle(title, i);

      i = setCounter(i, title.length);
    } else if (count === 600 && !state) {
      count = 0;
      state = true;
    }
  }, 100);
};
changeTitle = (title, i) => {
  document.getElementById("title-change").innerText = title[i];
};

const setCounter = (i, l) => {
  i++;
  if (i < l) {
    return i;
  } else if (i < 0) {
    return l;
  } else {
    return 0;
  }
};

const intervalSlideshow = () => {
  let count = 0;
  let i = 0;

  let numberOfImages = 3;

  i = setCounter(i, numberOfImages);
  createImageElement(i);

  animateDisplayImageElement(0, numberOfImages);

  setInterval(() => {
    if (count === 0) {
    } else if (count === 3900) {
      i = setCounter(i, numberOfImages);

      createImageElement(i);
      animateDisplayImageElement(1, numberOfImages);
      deleteFirstImageElement();
      count = -100;
    }

    count += 100;
  }, 100);
};

const createImageElement = (i) => {
  const node = document.createElement("img");
  node.classList.add("landing-image", "landing-image-slip-in");
  node.setAttribute("id", `landing-image-display-${i}`);
  node.src = `./assets/img/land${i}.jpeg`;

  document.getElementById("img-container").appendChild(node);
};

const deleteFirstImageElement = () => {
  const el = document.getElementById("img-container").childNodes[0];
  el.remove();
};

const animateDisplayImageElement = (i, l) => {
  const el = document.getElementById("img-container").childNodes[i];
  el.classList.add("landing-image-slip-out");
};
