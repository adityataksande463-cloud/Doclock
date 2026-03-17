// ===============================
// SMOOTH SCROLL NAVIGATION
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});

});

});



// ===============================
// SHOOTING STARS EFFECT
// ===============================

function createShootingStar(){

const star = document.createElement("div");

star.classList.add("shooting-star");

star.style.top = Math.random()*window.innerHeight+"px";
star.style.left = Math.random()*window.innerWidth+"px";

document.body.appendChild(star);

setTimeout(()=>{
star.remove();
},3000);

}

setInterval(createShootingStar,4000);



// ===============================
// PATH SELECTION INTERACTION
// ===============================

const pathCards = document.querySelectorAll(".path-card");

pathCards.forEach(card=>{

card.addEventListener("click",()=>{

const path = card.innerText;

alert("You selected the "+path+" path. Recommended meditation techniques will appear here.");

});

});



// ===============================
// TECHNIQUE PRACTICE BUTTONS
// ===============================

const techButtons = document.querySelectorAll(".tech-btn");

techButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const technique = btn.parentElement.querySelector("h3").innerText;

alert("Starting practice: "+technique);

});

});



// ===============================
// MEDITATION TIMER
// ===============================

const practiceButtons = document.querySelectorAll(".practice-btn");

practiceButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

let minutes = parseInt(btn.innerText);

startMeditation(minutes);

});

});



function startMeditation(minutes){

let seconds = minutes * 60;

alert("Meditation started for "+minutes+" minutes");

const timer = setInterval(()=>{

seconds--;

if(seconds<=0){

clearInterval(timer);

alert("Meditation complete. Take a deep breath.");

}

},1000);

}



// ===============================
// COSMIC FLOATING PARTICLES
// ===============================

function createParticle(){

const particle = document.createElement("div");

particle.classList.add("cosmic-particle");

particle.style.left = Math.random()*window.innerWidth+"px";

particle.style.animationDuration = (Math.random()*10+10)+"s";

document.body.appendChild(particle);

setTimeout(()=>{
particle.remove();
},20000);

}

setInterval(createParticle,2000);



// ===============================
// HERO BUTTON INTERACTION
// ===============================

const startButton = document.querySelector(".primary-btn");

if(startButton){

startButton.addEventListener("click",()=>{

document.querySelector("#paths").scrollIntoView({
behavior:"smooth"
});

});

}



// ===============================
// SECONDARY BUTTON
// ===============================

const exploreButton = document.querySelector(".secondary-btn");

if(exploreButton){

exploreButton.addEventListener("click",()=>{

document.querySelector("#techniques").scrollIntoView({
behavior:"smooth"
});

});

}
