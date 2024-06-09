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

const backToConnect = document.querySelector('.backToConnect');
const forgotPwd = document.querySelector('.forget-pwd');

const connect = document.querySelector('.connexion-input-global');
const forgot = document.querySelector('.forgot-pwd-global');

forgotPwd.addEventListener('click', () => {
    forgot.classList.add('active');
    connect.classList.add('remove');
})
backToConnect.addEventListener('click', () => {
    forgot.classList.remove('active');
    connect.classList.remove('remove');
})

document.addEventListener('DOMContentLoaded', function () {
    const connexionMobile = document.getElementById('connexion-mobile');
    const svgConnexionMobile = document.getElementById('svg-connexion-mobile');
    const connexionInputGlobal = document.getElementById('connexion-input-global');

    connexionMobile.addEventListener('click', () => {
        if (connexionInputGlobal.classList.contains('active')) {
            connexionInputGlobal.style.height = `${connexionInputGlobal.scrollHeight}px`;
            connexionInputGlobal.offsetHeight;
            connexionInputGlobal.style.height = '0';
            connexionInputGlobal.classList.remove('active');
        } else {
            connexionInputGlobal.style.height = `${connexionInputGlobal.scrollHeight}px`;
            connexionInputGlobal.classList.add('active');
            setTimeout(() => {
                connexionInputGlobal.style.height = 'auto';
            }, 500);
        }
        svgConnexionMobile.classList.toggle('active');
    });


    const inscriptionMobile = document.getElementById('inscription-mobile');
    const svgInscriptionMobile = document.getElementById('svg-inscription-mobile');
    const InscriptionInputGlobal = document.getElementById('inscription-btn-global');

    inscriptionMobile.addEventListener('click', () => {
        if (InscriptionInputGlobal.classList.contains('active')) {
            InscriptionInputGlobal.style.height = `${InscriptionInputGlobal.scrollHeight}px`;
            InscriptionInputGlobal.offsetHeight;
            InscriptionInputGlobal.style.height = '0';
            InscriptionInputGlobal.classList.remove('active');
        } else {
            InscriptionInputGlobal.style.height = `${InscriptionInputGlobal.scrollHeight}px`;
            InscriptionInputGlobal.classList.add('active');
            setTimeout(() => {
                InscriptionInputGlobal.style.height = 'auto';
            }, 500);
        }
        svgInscriptionMobile.classList.toggle('active');
    });

    const descriptionMobileMenu = document.getElementById('titre_desciption');
    const descriptionGlobalSlider = document.getElementById('Description_mobile_global');
    const svgDescription = document.getElementById('svgDesciption');
    const btnVoirPlusDescription = document.getElementById('btnVoirPlusDescription');
    const descriptionDetail = document.getElementById('descriptionDetail');

    descriptionMobileMenu.addEventListener('click', () => {
        if (descriptionGlobalSlider.classList.contains('active')) {
            descriptionGlobalSlider.style.height = `${descriptionGlobalSlider.scrollHeight}px`;
            descriptionGlobalSlider.offsetHeight;
            descriptionGlobalSlider.style.height = '0';
            descriptionGlobalSlider.classList.remove('active');
        } else {
            descriptionGlobalSlider.style.height = `${descriptionGlobalSlider.scrollHeight}px`;
            descriptionGlobalSlider.classList.add('active');
            setTimeout(() => {
                descriptionGlobalSlider.style.height = 'auto';
            }, 500);
        }
        svgDescription.classList.toggle('active');
    });
    btnVoirPlusDescription.addEventListener('click', () => {
        if (descriptionDetail.classList.contains('active')) {
            descriptionDetail.style.height = `${descriptionDetail.scrollHeight}px`;
            descriptionDetail.offsetHeight;
            descriptionDetail.style.height = '50px';
            descriptionDetail.classList.remove('active');
            btnVoirPlusDescription.innerHTML = 'Voir plus';
        } else {
            descriptionDetail.style.height = `${descriptionDetail.scrollHeight}px`;
            descriptionDetail.classList.add('active');
            btnVoirPlusDescription.innerHTML = 'Voir moins';
            setTimeout(() => {
                descriptionDetail.style.height = 'auto';
            }, 500);
        }
    });

    const livraisonMobileMenu = document.querySelector('.titre_livraison');
    const livraisonGlobalSlider = document.getElementById('Livraison_mobile_global');
    const svgLivraison = document.getElementById('svgLivraison');
    const btnVoirPlusLivraison = document.getElementById('btnVoirPlusLivraison');
    const livraisonDetail = document.querySelector('.livraison-detail-global');

    livraisonMobileMenu.addEventListener('click', () => {
        if (livraisonGlobalSlider.classList.contains('active')) {
            livraisonGlobalSlider.style.height = `${livraisonGlobalSlider.scrollHeight}px`;
            livraisonGlobalSlider.offsetHeight;
            livraisonGlobalSlider.style.height = '0';
            livraisonGlobalSlider.classList.remove('active');
        } else {
            livraisonGlobalSlider.style.height = `${livraisonGlobalSlider.scrollHeight}px`;
            livraisonGlobalSlider.classList.add('active');
            setTimeout(() => {
                livraisonGlobalSlider.style.height = 'auto';
            }, 500);
        }
        svgLivraison.classList.toggle('active');
    });
    btnVoirPlusLivraison.addEventListener('click', () => {
        if (livraisonDetail.classList.contains('active')) {
            livraisonDetail.style.height = `${livraisonDetail.scrollHeight}px`;
            livraisonDetail.offsetHeight;
            livraisonDetail.style.height = '50px';
            livraisonDetail.classList.remove('active');
            btnVoirPlusLivraison.innerHTML = 'Voir plus';
        } else {
            livraisonDetail.style.height = `${livraisonDetail.scrollHeight}px`;
            livraisonDetail.classList.add('active');
            btnVoirPlusLivraison.innerHTML = 'Voir moins';
            setTimeout(() => {
                livraisonDetail.style.height = 'auto';
            }, 500);
        }
    });
});

