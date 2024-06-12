const btnCart = document.getElementById('btn-article-panier');

btnCart.addEventListener('click', (e) => {
    const articleId = parseInt(e.target.getAttribute('data-id'));
    const selectedSize = e.target.getAttribute('data-id-size');

    if (!selectedSize) {
        alert('Veuillez sélectionner une taille.');
        return;
    }

    let add = {
        id: articleId,
        size: selectedSize,
        nb: 1,
    };

    let liste = JSON.parse(localStorage.getItem("cart")) || [];

    for (const elem of liste) {
        if (elem.id === add.id && elem.size === add.size) {
            if (elem.nb < 2) {
                elem.nb++;
                localStorage.setItem('cart', JSON.stringify(liste));
                window.location.reload();
                return;
            } else {
                alert("La quantité maximale est de 2.");
                return;
            }
        }
    }

    liste.push(add);
    localStorage.setItem('cart', JSON.stringify(liste));
    window.location.reload();
});
