let projects = [
  {
    name: "rollrasenKleinauheim",
    title: "Rollrasen verlegen in Kleinauheim",
    numberOfImages: 7,
    text: `In diesem Garten habe ich Rollrasen verlegt. 
            Ich habe erstmal restrasen entfernt und bestehende Hecke entfernt. 
            Dann musste ich obere Erdeschicht lickern bzw. Umgraben. Auch war notig verbleibende Würzeln zu entfernen.  Dabai war wichtig die Baumwürzel nicht zu beschädigen. 

            Nächste Schritt 
            war gesamte Erdefläche zu nivelieren sonst bei Rollrasen  merkt man jede grossere Unebenheit. 
            Paar Säcke Pflanzerde würde  über gesamte Fläche verteilt. 
            Genauso auch 1 Sack Bodendünger ist verteilt. 

            Rollrasen ist online bestellt und an Lieferungstag gleich verlegt. 

            Verlegung: Rasenrolle ist 40 cm breit.  Bei verlegung ist wichtig Erde mit Rechen leicht zu lockern, damit Rasen besser 'haftet'. 
            Verbindung zwichen 2 Rollen musste man etwas zussamendrucken damit keine Spalte ensteht. 
            Am ende Fläche muss man mit Rasenwalzen walzen. 
            Erste 2 Wochen darf mann Rollrasen nicht betreten. 

            Mehrmals täglich bewäsern ist genauso wichtig.`,
  },
  {
    name: "alatnicaBrod",
    title: "Gartenhaus aus Holz",
    numberOfImages: 7,
    text: "",
  },
  {
    name: "terrasseFundament",
    title: "Fundament für die Terrasse",
    numberOfImages: 5,
    text: "",
  },
  {
    name: "holzweg",
    title: "Holzweg",
    numberOfImages: 3,
    text: "",
  },
];
window.addEventListener("load", () => {
  // DOMContentLoaded

  addProjects();
});

// rendering testimonials page
addProjects = () => {
  let projectsList = "";
  let subStringNumber = "";

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].text) {
      subStringNumber =
        projects[i].text.length > 200 ? 200 : projects[i].text.length;
    }
    projectsList += `
        <div class="project-box">
            <div id="project-img-${projects[i].name}" class="project-img">
                <div id="arrow-left-${projects[i].name}"
                    class="arrow-left"
                    onclick="onClickProjectSlide(event)"
                    data-project="${projects[i].name}"
                    data-image-i="0">
                    <img src="./assets/img/arrow.svg"
                        alt="arrow left"
                    >
                </div>
                <div id="arrow-right-${projects[i].name}"
                    class="arrow-right"
                    onclick="onClickProjectSlide(event)"
                    data-project="${projects[i].name}"
                    data-image-i="0">
                    <img src="./assets/img/arrow.svg"
                        alt="arrow right"
                    >
                </div>
                <img id="project-${projects[i].name}-img" src="./assets/img/projects/${projects[i].name}/${projects[i].name}-0.jpeg">
            </div>
            <div class="project-title">
                <h4>${projects[i].title}</h4>
            </div>
            <div class="project-desc">
                <p>${projects[i].text}</p>
                
            </div>
        </div>
        `;
  }

  document.getElementById("projects-container").innerHTML = projectsList;
};

const onClickProjectSlide = (event) => {
  let el;
  let projectName = "";
  let imageNumber = 0;
  let arrowId = "";
  let actionId;
  let projectIndex = 0;
  if (!event.srcElement.id) {
    el = event.srcElement.parentNode;
    projectName = el.getAttribute("data-project");
    imageNumber = el.getAttribute("data-image-i");

    arrowId = el.id;
  } else {
    el = event.srcElement;
    projectName = el.getAttribute("data-project");
    imageNumber = el.getAttribute("data-image-i");

    arrowId = el.id;
  }
  actionId = arrowId.includes("arrow-right");

  projectIndex = findProjectIndex(projectName);
  imageNumber = setCounter(imageNumber, projectIndex, actionId);

  console.log("sljedeca slika je : ", imageNumber);

  document.getElementById(
    `project-${projects[projectIndex].name}-img`
  ).src = `./assets/img/projects/${projects[projectIndex].name}/${projects[projectIndex].name}-${imageNumber}.jpeg`;

  //id="arrow-left-${projects[i].name}"
  //id="arrow-right-${projects[i].name}"
  document
    .getElementById(`arrow-left-${projects[projectIndex].name}`)
    .setAttribute("data-image-i", `${imageNumber}`);
  document
    .getElementById(`arrow-right-${projects[projectIndex].name}`)
    .setAttribute("data-image-i", `${imageNumber}`);
};

const setCounter = (i, projectIndex, actionId) => {
  i = Number(i);

  let l = projects[projectIndex].numberOfImages;
  console.log("asdas :", i, " : ", l);
  if (actionId) {
    i++;
  } else {
    i--;
  }
  if (i > 0 && i < l) {
    return i;
  } else if (i < 0) {
    return l - 1;
  } else if (i >= l) {
    return 0;
  } else {
    return 0;
  }
};

const findProjectIndex = (projectName) => {
  let index = 0;
  projects.forEach((el, i) => {
    if (el.name === projectName) {
      index = i;
    }
  });
  return index;
};
