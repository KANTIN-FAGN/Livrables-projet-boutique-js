const menuHamburger = document.querySelector(".menu-hamburger");
const navLinks = document.querySelector(".nav-links");
const closeHeaderSlider = document.getElementById("close-nav-header");
const html = document.querySelector("html");

menuHamburger.addEventListener('click', () => {
  navLinks.classList.add('mobile-menu');
  menuHamburger.classList.add('active');
  html.classList.add('overflow')
});
closeHeaderSlider.addEventListener('click', () => {
  navLinks.classList.remove('mobile-menu');
  menuHamburger.classList.remove('active');
  html.classList.remove('overflow')
});

// fonction changement de sexe menu burger
const homme = document.getElementById('homme');
const femme = document.getElementById('femme');
const listHomme = document.getElementById('list-homme');
const listFemme = document.getElementById('list-femme');

const toggleGender = (selected, notSelected, showList, hideList) => {
  selected.classList.add('select-sex');
  notSelected.classList.remove('select-sex');
  selected.classList.remove('not-select-sex');
  notSelected.classList.add('not-select-sex');
  showList.classList.add('display-block');
  hideList.classList.remove('display-block');
  hideList.classList.add('masque-sex');
};

homme.addEventListener('click', () => toggleGender(homme, femme, listHomme, listFemme));
femme.addEventListener('click', () => toggleGender(femme, homme, listFemme, listHomme));

// Initial state setup
listHomme.classList.add('display-block');
listFemme.classList.add('masque-sex');
