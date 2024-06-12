document.addEventListener('DOMContentLoaded', () => {
    const sizeSelectDesktop = document.querySelector('.drop-taille');
    const addToCartButton = document.getElementById('btn-article-panier');
    const addToCartButtonSpan = addToCartButton.querySelector('span');
    const addToCartButtonP = addToCartButtonSpan.querySelector('p');

    sizeSelectDesktop.addEventListener('change', (event) => {
        const selectedSize = event.target.value;
        addToCartButton.setAttribute('data-id-size', selectedSize);
        addToCartButtonSpan.setAttribute('data-id-size', selectedSize);
        addToCartButtonP.setAttribute('data-id-size', selectedSize);
    });

});