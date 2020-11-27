let testimonials = [
  {
    name: "matej",
    fullName: "Matej Ćutunić",
    company: "Freelancer",
    text:
      '"Ivan hat die Arbeit sehr schnell und professionell erledigt. Das Laminat sieht ordentlich aus und die Leisten sind präzise verlegt. Er akzeptierte meine Meinung und respektierte alle meine Wünsche. Nachdem die Arbeit erledigt war, bekam meine Wohnung eine andere Dimension. Ich bin sehr zufrieden und würde ihm auf jeden Fall empfehlen."',
  },
];

window.addEventListener("load", () => {
  // DOMContentLoaded

  addTestimonials();
});

// rendering testimonials page
addTestimonials = () => {
  let testimonialsList = "";

  for (let i = 0; i < testimonials.length; i++) {
    testimonialsList += `
        <div class="testimonial-box">
            <div class="tes-img">
                <img src="./assets/img/testimonials/${testimonials[i].name}.jpeg" alt="${testimonials[i].fullName} Picture">
            </div>
            <div class="tes-name">
                <h4>${testimonials[i].fullName}</h4>
            </div>
           
            <div class="tes-company">
                <p>${testimonials[i].company}</p>
            
            </div>
            <div class="tes-star">
                <div class="star-icon"><i class="fas fa-star"></i></div>
                <div class="star-icon"><i class="fas fa-star"></i></div>
                <div class="star-icon"><i class="fas fa-star"></i></div>
                <div class="star-icon"><i class="fas fa-star"></i></div>
                <div class="star-icon"><i class="fas fa-star"></i></div>
            </div>
            <div class="tes-text">
                <p>${testimonials[i].text}</p>
            </div>
        </div>
        `;
  }

  document.getElementById("testimonial-container").innerHTML = testimonialsList;
};
