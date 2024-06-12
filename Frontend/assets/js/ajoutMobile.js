document.addEventListener('DOMContentLoaded', () => {
    const sizeButtons = document.querySelectorAll('.SizeSpot_button__dZsg8');
    const addToCartButton = document.getElementById('btn-article-panier');
    const addToCartButtonSpan = addToCartButton.getElementById('span');
    const addToCartButtonP = addToCartButtonSpan.querySelector('p');

    sizeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const selectedSize = event.target.innerText;
            addToCartButton.setAttribute('data-id-size', selectedSize);
            addToCartButtonSpan.setAttribute('data-id-size', selectedSize);
            addToCartButtonP.setAttribute('data-id-size', selectedSize);
        });
    });
});
