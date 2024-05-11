// fonction menu burger
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.nav');
let menuItem = document.querySelectorAll('.nav__link');
let overlay = document.getElementById('overlay');

// Ajouter une variable pour suivre l'état du menu
let isMenuOpen = false;

menuBtn.addEventListener('click', function (event) {
  // Inverser l'état du menu
  isMenuOpen = !isMenuOpen;

  // Mettre à jour l'apparence en fonction de l'état du menu
  if (isMenuOpen) {
    menuBtn.classList.add('active');
    menu.classList.add('active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  } else {
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Autoriser le défilement
  }
});


// fonction changement de sexe menu burger 
const homme = document.getElementById('homme');
const femme = document.getElementById('femme');
const listHomme = document.getElementById('list-homme');
const listFemme = document.getElementById('list-femme');

homme.addEventListener('click', function () {
  homme.classList.add('select-sex');
  femme.classList.remove('select-sex');
  homme.classList.remove('not-select-sex');
  femme.classList.add('not-select-sex');
  listHomme.classList.remove('masque-sex');
  listFemme.classList.add('masque-sex');
});

femme.addEventListener('click', function () {
  femme.classList.add('select-sex');
  homme.classList.remove('select-sex');
  femme.classList.remove('not-select-sex');
  homme.classList.add('not-select-sex');
  listHomme.classList.add('masque-sex');
  listFemme.classList.remove('masque-sex');
});

 // Sélectionner tous les éléments de sous-menu du pied de page
const subMenusFooter = document.querySelectorAll('footer .sousMenu');

// Parcourir tous les éléments de sous-menu et ajouter un gestionnaire d'événement de clic
subMenusFooter.forEach(subMenu => {
    subMenu.previousElementSibling.addEventListener('click', (event) => {
        // Empêcher le comportement par défaut du lien
        event.preventDefault();
        // Basculer la classe active pour activer ou désactiver l'animation
        subMenu.nextElementSibling.classList.toggle('active');
        // Tourner le SVG
        event.currentTarget.querySelector('.arrow-svg').classList.toggle('rotate');
    });
});