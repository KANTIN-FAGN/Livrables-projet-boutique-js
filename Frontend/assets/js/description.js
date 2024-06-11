document.addEventListener('DOMContentLoaded', function () {
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