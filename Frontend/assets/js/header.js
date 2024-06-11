const iconCloseHeaderSlider = document.getElementById('closeheaderIcon');

const globalIcon = document.querySelector('.icon-global')

const iconSearch = document.getElementById('searchIcon');
const iconSilderSearch = document.getElementById('sectionSearch');

const iconCompte = document.getElementById('accountIcon');
const iconSilderCompte = document.getElementById('sectionCompte');

const iconPanier = document.getElementById('cartIcon');
const iconSilderPanier = document.getElementById('sectionPanier');

const iconFav = document.getElementById('wishListIcon');
const iconSilderFav = document.getElementById('sectionFav');

iconCompte.addEventListener('click', () => {
    iconSilderCompte.classList.add('active');
    iconCloseHeaderSlider.classList.add('active');
    globalIcon.classList.add('active');
    iconSilderPanier.classList.remove('active');
    iconSilderFav.classList.remove('active');
    iconSilderSearch.classList.remove('active');
    document.body.classList.add("no-scroll");
});

iconPanier.addEventListener('click', () => {
    iconSilderPanier.classList.add('active');
    iconCloseHeaderSlider.classList.add('active');
    globalIcon.classList.add('active');
    iconSilderCompte.classList.remove('active');
    iconSilderFav.classList.remove('active');
    iconSilderSearch.classList.remove('active');
    document.body.classList.add("no-scroll");
});

iconFav.addEventListener('click', () => {
    iconSilderFav.classList.add('active');
    iconCloseHeaderSlider.classList.add('active');
    globalIcon.classList.add('active');
    iconSilderCompte.classList.remove('active');
    iconSilderPanier.classList.remove('active');
    iconSilderSearch.classList.remove('active');
    document.body.classList.add("no-scroll");
});

iconCloseHeaderSlider.addEventListener('click', () => {
    iconCloseHeaderSlider.classList.remove('active');
    iconSilderFav.classList.remove('active');
    iconSilderPanier.classList.remove('active');
    iconSilderCompte.classList.remove('active');
    iconSilderSearch.classList.remove('active');
    globalIcon.classList.remove('active');
    document.body.classList.remove("no-scroll");
});

iconSearch.addEventListener('click', () => {
    iconSilderSearch.classList.add('active');
    iconCloseHeaderSlider.classList.add('active');
    globalIcon.classList.add('active');
    iconSilderPanier.classList.remove('active');
    iconSilderCompte.classList.remove('active');
    iconSilderFav.classList.remove('active');
    document.body.classList.add("no-scroll");
});