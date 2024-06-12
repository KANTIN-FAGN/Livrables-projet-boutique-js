const btnCart = document.getElementById('btn-article-panier');

btnCart.addEventListener('click', (e) => {
    const articleId = e.target.getAttribute('data-id');
    console.log(articleId);

    let add = {
        id: parseInt(articleId),
        nb: 1,
    };

    let liste = JSON.parse(localStorage.getItem("cart")) || [];

    for (const elem of liste) {
        if (elem.id === add.id) {
            elem.nb++;
            localStorage.setItem('cart', JSON.stringify(liste));
            return;
        }
    }

    liste.push(add);
    localStorage.setItem('cart', JSON.stringify(liste));
    window.location.reload();
});
