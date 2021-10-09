// Your JavaScript goes here

/* La première variable — randomNumber — reçoit le nombre 
aléatoire entre 1 et 100, calculé en utilisant un algorithme mathématique */
let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
  /* La première ligne de la fonction (ligne 2) déclare une variable 
  nommée userGuess et définit sa valeur par celle qui vient d'être 
  saisie dans le champ de texte. Nous faisons passer aussi cette valeur 
  par la méthode  Number() , juste pour nous assurer que la valeur 
  stockée dans userGuess est bien un nombre */
  let userGuess = Number(guessField.value);
  /* Ensuite, nous rencontrons notre premier bloc de code conditionnel 
  (lignes 3-5). Il permet d'exécuter des instructions de manière sélective, 
  selon certaines conditions qui sont vraies ou non. Cela ressemble un peu 
  à une fonction, mais ce n'est pas le cas. La forme la plus simple du bloc 
  conditionnel commence par le mot clé if, puis parenthèses, puis des accolades { }.
  A l'intérieur de ces parenthèses, nous mettons le test. S'il renvoie true , 
  nous exécutons le code à l'intérieur des accolades. Sinon, nous ne le faisons pas, 
  et passons au morceau de code suivant. Dans ce cas, le test vérifie si la variable 
  guessCount est égale à 1 (c'est-à-dire s'il s'agit de la première supposition du joueur) : guessCount === 1 */
  if (guessCount === 1) {
    /* Si c'est le cas, nous faisons en sorte que le texte affiché soit « Propositions précédentes : ». 
  Sinon, nous ne le faisons pas */
    guesses.textContent = "Propositions précédentes : ";
  }
  guesses.textContent += userGuess + " ";
  /* La ligne 6 ajoute la valeur courante userGuess à la fin du paragraphe guesses , plus un espace 
  vide de sorte qu'il y aura un espace entre chaque supposition faite */
  if (userGuess === randomNumber) {
    lastResult.textContent = "Bravo, vous avez trouvé le nombre !";
    /* Le bloc suivant (lignes 8-24) effectue quelques vérifications : */

    /* Le premier if(){ } vérifie si la supposition de l'utilisateur est égale 
    au nombre aléatoire randomNumber situé en haut de notre code JavaScript. 
    Si c'est le cas, le joueur a deviné correctement et a gagné le jeu, nous 
    affichons donc un message de félicitations d'une belle couleur verte au joueur, 
    effaçons le contenu de la boîte d'information sur la position de l'estimation 
    et exécutons une fonction appelée setGameOver(), dont nous reparlerons plus tard */

    /* Ensuite, nous chaînons un autre test à la fin du précédent avec une structure 
    else if(){ }. Cette structure vérifie si l'utilisateur a épuisé toutes ses tentatives. 
    Si c'est le cas, le programme fait la même chose que dans le bloc précédent, mais 
    avec un message de fin de partie au lieu d'un message de félicitations */

    /* Le dernier bloc chaîné à la fin de ce code (else { }) contient du code qui n'est 
    exécuté que si aucun des deux autres tests n'a renvoyé vrai (c'est-à-dire que le 
    joueur n'a pas deviné juste, mais qu'il lui reste des possibilité de supposition). 
    Dans ce cas, nous lui disons que sa supposition est mauvaise, puis nous effectuons 
    un autre test conditionnel pour vérifier si elle est supérieure ou inférieure à la 
    valeur exacte et affichons un autre message approprié pour indiquer si sa supposition 
    est trop forte ou trop faible */
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!! PERDU !!!";
    setGameOver();
  } else {
    lastResult.textContent = "Faux !";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop petit !";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop grand !";
    }
  }
  /* Les trois dernières lignes de la fonction (ligne 26-28) préparent 
  à une nouvelle proposition. Nous ajoutons 1 à la variable guessCount 
  qui décompte les tours (++ est une opération d'incrémentation — ajout 
  de 1), puis effaçons le champ texte du formulaire et lui redonnons le 
  focus, pour être prêt pour la saisie suivante */
  guessCount++;
  guessField.value = "";
  guessField.focus();
}
/* Ici, nous ajoutons un écouteur d'événement au bouton guessSubmit. 
C'est une méthode qui prend deux valeurs d'entrée (appelées arguments) 
- le type d'événement que nous écoutons (dans ce cas, click) qui est une 
chaîne de caractères, et le code que nous voulons exécuter quand l'événement 
se produit (dans ce cas, la fonction checkGuess()  — notez que nous n'avons 
pas besoin de spécifier les parenthèses lors de l'écriture dans addEventListener()). */
guessSubmit.addEventListener("click", checkGuess);

/* Pour définir la fonction setGameOver() à la fin de notre programme, ajoutez le code ci-dessous tout en bas : */
function setGameOver() {
  /* Les deux premières lignes désactivent l'entrée de texte et le bouton en définissant 
  leurs propriétés désactivées à true.  Ceci est nécessaire, car si nous ne le faisons 
  pas, l'utilisateur pourrait soumettre plus de propositions après la fin du jeu, ce qui 
  gâcherait les choses */
  guessField.disabled = true;
  guessSubmit.disabled = true;
  /* Les trois lignes suivantes génèrent un nouvel <button> élément, avec le libellé 
  "Démarrer une nouvelle partie" et l'ajoute au bas du HTML existant */
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  /* La dernière ligne définit un écouteur d'événement sur ce nouveau bouton : un click 
  sur le bouton déclenchera un appel de la fonction  resetGame() */
  resetButton.addEventListener("click", resetGame);
}
/* Reste à définir cette fonction ! Ajoutez le code suivant, tout en bas de votre JavaScript : */

/* Ce bloc de code assez long réinitialise complètement les paramètres du jeu (le joueur pourra 
  commencer une nouvelle partie). Il permet de  : 
  Remettre le compteur guessCount à 1
  Effacer tous les paragraphes d'information
  Supprimer le bouton de réinitialisation de notre code
  Activer les éléments de formulaire, vide et met au point le champ de texte, prêt à entrer une nouvelle proposition
  Supprimer la couleur d'arrière-plan du paragraphe lastResult
  Génèrer un nouveau nombre aléatoire afin que vous ne deviniez plus le même nombre !*/

function resetGame() {
  guessCount = 1;

  let resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
/* À ce stade, vous devriez avoir un jeu (simple) entièrement fonctionnel — félicitations! */
