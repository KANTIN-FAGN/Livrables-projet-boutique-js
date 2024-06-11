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
});