// START BUTTON SCROLL EFFECT

document.querySelector(".start-btn").addEventListener("click", function () {

    document.querySelector(".techniques").scrollIntoView({
        behavior: "smooth"
    });

});



// TECHNIQUE CARD CLICK EFFECT

const cards = document.querySelectorAll(".tech-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        alert("This technique page will open here in the future.");

    });

});



// FLOATING PARTICLES BACKGROUND

function createParticle() {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * window.innerWidth + "px";

    particle.style.animationDuration = Math.random() * 5 + 5 + "s";

    document.body.appendChild(particle);


    setTimeout(() => {
        particle.remove();
    }, 10000);

}



// CREATE PARTICLES CONTINUOUSLY

setInterval(createParticle, 800);
/* FLOATING PARTICLES */

.particle {

  position: fixed;
  bottom: -10px;
  width: 6px;
  height: 6px;
  background: rgba(108, 99, 255, 0.3);
  border-radius: 50%;
  animation: floatUp linear forwards;

}

@keyframes floatUp {

  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-100vh);
    opacity: 0;
  }

}
