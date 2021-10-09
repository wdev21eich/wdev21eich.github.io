/*Dans le fichier index.html, ajoutons la ligne suivante avant l'élément <script> */

let myImage = document.querySelector("img");

myImage.addEventListener("click", function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/firefox2.png");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
});

/*Dans le fichier main.js, ajoutons le code suivant à la fin du fichier. Cela fait référence au nouveau bouton ajouté et à l'élément de titre puis enregistrons ces références dans des variables*/
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

/*Ajoutons maintenant les fonctionnalités pour avoir ce message d'accueil personnalisé (cela ne servira pas immédiatement mais un peu plus tard) :*/
function setUserName() {
  let myName = prompt("Veuillez saisir votre nom.");
  localStorage.setItem("nom", myName);
  myHeading.textContent = "Mozilla est cool, " + myName;
}

/*Ajoutons ensuite ce bloc if ... else. Ce code correspond à l'étape d'initialisation car il sera utilisé la première fois que la page est chargée par l'utilisateur :*/
if (!localStorage.getItem("nom")) {
  setUserName();
} else {
  let storedName = localStorage.getItem("nom");
  myHeading.textContent = "Mozilla est cool, " + storedName;
}

/*Enfin, on associe le gestionnaire onclick au bouton. De cette façon, quand on clique sur le bouton, cela déclenchera l'exécution de la fonction setUserName(). Ce bouton permet à l'utilisateur de modifier la valeur s'il le souhaite:*/
myButton.addEventListener("click", function () {
  setUserName();
});
