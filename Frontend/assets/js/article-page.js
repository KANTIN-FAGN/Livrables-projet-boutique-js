window.addEventListener('scroll', function () {
    var section = document.querySelector('.section-infos-article');
    var sectionContainer = document.querySelector('.section-infos-article-ctn');
    var sectionOffset = sectionContainer.offsetTop + sectionContainer.offsetHeight;
    var windowScroll = window.scrollY + window.innerHeight;

    if (windowScroll >= sectionOffset) {
        section.classList.add('sticky');
    } else {
        section.classList.remove('sticky');
    }
});

function changeText(select) {
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value !== "") {
        var chooseOption = select.querySelector('option[value=""]');
        if (chooseOption) {
            chooseOption.remove();
        }
    }

    // Vérifie si l'option sélectionnée a la classe "out-of-stock"
    if (selectedOption.classList.contains('out-of-stock')) {
        // Empêche la sélection de l'option si elle a la classe "out-of-stock"
        select.selectedIndex = -1;
    }
}

function toggleDropdown(select) {
    const dropdown = select.parentNode;
    dropdown.classList.toggle('active');
}

function toggleDropdown(element) {
    element.parentElement.classList.toggle('dropdown-open');
}

document.addEventListener('DOMContentLoaded', function () {
    var options = document.querySelectorAll('.drop-taille option');
    options.forEach(function (option) {
        if (option.classList.contains('out-of-stock')) {
            option.disabled = true;
        }
    });
});

function displayCaroussel() {
    const caroussel = document.querySelector(".caroussel-desktop");
    const mainCtn = document.querySelector(".main-ctn");
    mainCtn.classList.toggle("none-carousel")
    caroussel.classList.toggle("carousel-display");
}
function closeCaroussel() {
    const caroussel = document.querySelector(".caroussel-desktop");
    const mainCtn = document.querySelector(".main-ctn");
    mainCtn.classList.toggle("none-carousel")
    caroussel.classList.toggle("carousel-display");
}

toggleTabSlider(0, 'description-tab-content');

function toggleTabSlider(index, contentId) {
    const tabListSlider = document.querySelector('.tab-list-slider');
    const tabList = document.querySelectorAll('.tab-list li');
    const selectedTab = tabList[index];
    const selectedTabWidth = selectedTab.offsetWidth;
    const selectedTabLeft = selectedTab.offsetLeft;

    // Supprimer la classe .tab-label--selected de tous les onglets
    tabList.forEach(tab => {
        tab.querySelector('.tab-label').classList.remove('tab-label--selected');
    });

    // Ajouter la classe .tab-label--selected à l'onglet actif
    selectedTab.querySelector('.tab-label').classList.add('tab-label--selected');

    tabListSlider.style.width = `${selectedTabWidth}px`;
    tabListSlider.style.left = `${selectedTabLeft}px`; // Positionne le slider à gauche de l'onglet sélectionné

    // Afficher le contenu correspondant à l'onglet sélectionné
    const tabContent = document.querySelectorAll('.tab-panel');
    tabContent.forEach(content => {
        content.style.display = 'none'; // Masquer tous les contenus d'onglet
    });
    const selectedTabContent = document.getElementById(contentId);
    selectedTabContent.style.display = 'block'; // Afficher le contenu de l'onglet sélectionné
}

$(".text-wrapper").each(function() {
    var $wrapper = $(this);
    var $paragraph = $wrapper.find("p");
    var text = $paragraph.text().trim();
    var words = text.split(" ");
    var visibleText = words.slice(0, 50).join(" ");

    // Vérifier si le texte a plus de 50 mots
    if (words.length > 50) {
        var hiddenText = words.slice(50).join(" ");
        // Mettre à jour le contenu de la balise <p> avec le texte visible et caché
        $paragraph.html(visibleText + '<span class="dots">...</span> <span class="full-text" style="display:none;">' + hiddenText + '</span>');
    }
});

$('.readmore-btn').click(function(event) {
    event.preventDefault();
    var fullText = $(this).prev().find('.full-text');
    fullText.slideToggle('100');
    $(this).text(function(i, text) {
        return text === 'Voir plus' ? 'Voir moins' : 'Voir plus';
    });
    // Supprimer les points de suspension uniquement lorsque "Voir moins" est cliqué
    var dots = $wrapper.find('.dots');
    dots.toggleClass('hidden');
});


// Swipper
var swiperThumbs = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    direction: 'vertical',
    freeMode: true,
    watchSlidesProgress: true,
    loop: true
});

var swiperMain = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiperThumbs,
    },
});
