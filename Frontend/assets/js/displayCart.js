async function getArticlesLst(lst) {
    try {
        const joinedIds = lst.join();
        const response = await fetch(`http://localhost:4000/articles-by-id?Ids=${joinedIds}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return null;
    }
}

async function affectEvent() {
    const listBtnPlus = document.querySelectorAll('.plus');
    const listBtnMoins = document.querySelectorAll('.moins');
    const listBtnDelete = document.querySelectorAll('.delete-btn-cart');

    listBtnPlus.forEach((button) => {
        button.addEventListener('click', cartIncrement);
    });

    listBtnMoins.forEach((button) => {
        button.addEventListener('click', cartDeincrement);
    });

    listBtnDelete.forEach((button) => {
        button.addEventListener('click', cartDelete);
    });

    console.log("Event listeners for plus, minus, and delete buttons are set up.");
}

async function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        document.getElementById('cart').innerHTML = `
            <div class="fav-article-global-vide">
                <div class="message-fav-vide" style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 3rem;
                font-size: 13px;
            ">
                    <span>Vous n'avez pas de produit dans votre panier</span>
                </div>
            </div>`;
        return;
    }

    const articles = await getArticlesLst(cartItems.map(item => item.id));

    if (!articles || !articles.articles) {
        document.getElementById('cart').innerHTML =`
            <div class="fav-article-global-vide">
                <div class="message-fav-vide" style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 3rem;
                font-size: 13px;
            ">
                    <span>Impossible de charger le panier</span>
                </div>
            </div>`;
        return;
    }

    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    
    let totalPrice = 0; // Initialiser le prix total

    articles.articles.forEach(article => {
        const cartItem = cartItems.find(item => item.id === article.id_article);
        let quantity = cartItem ? cartItem.nb : 1;
        let price = article.price * quantity; // Calculer le prix total de cet article

        totalPrice += price; // Ajouter le prix de cet article au prix total

        const articleElement = document.createElement('div');
        articleElement.className = 'cart-item';

        articleElement.innerHTML = `
            <div class="img-cart">
                <img src="${article.img}" alt="${article.name}">
            </div>
            <div class="info-article-cart-ctn">
                <div class="info-article-cart-global">
                    <div class="info-cart-name">
                        <p>${article.name}</p>
                        <p>${article.detail}</p>
                    </div>
                    <div class="info-cart-price">
                        <p>${price} €</p>
                    </div>
                </div>
                <div class="btn-article-cart">
                    <div class="btn-cart-quantity">
                        <div>
                            <p>Qté : </p>
                        </div>
                        <div>
                            <button class="moins" data-id="${article.id_article}">
                                <svg data-id="${article.id_article}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black">
                                    <path data-id="${article.id_article}" d="M12 12h16"/>
                                </svg>
                            </button>
                            <p class="quantity">${quantity}</p>
                            <button class="plus" data-id="${article.id_article}">
                                <svg data-id="${article.id_article}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black">
                                    <path data-id="${article.id_article}" d="M12 4v16M4 12h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="btn-cart-delete">
                        <button class="delete-btn-cart" data-id="${article.id_article}">Supprimer</button>
                    </div>
                </div>
            </div>
        `;

        cartContainer.appendChild(articleElement);
    });

    // Ajouter le bouton de finalisation de commande avec le prix total
    const checkoutButton = document.createElement('div');
    checkoutButton.innerHTML = `
    <a href="/Roid/..." class="checkout-a-cart">
        <button class="checkout-btn-cart">
            <span class="span-btn-chekout-cart">
                <span>FINALISER MA COMMANDE </span>
                <span>${totalPrice} €</span>
            </span>
        </button>
    </a>`;
    checkoutButton.className = 'checkout-button-cart-global';
    cartContainer.appendChild(checkoutButton);

    affectEvent();
}


function updateCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

function cartIncrement(event) {
    const articleId = parseInt(event.target.getAttribute('data-id'));
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItem = cartItems.find(item => item.id === articleId);
    if (cartItem) {
        if (cartItem.nb < 2) { // Limiter la quantité à 2
            cartItem.nb += 1;
        } else {
            alert("La quantité maximale est de 2."); // Afficher un message d'alerte si la quantité est déjà à 2
        }
    } else {
        cartItems.push({ id: articleId, nb: 1 });
    }

    updateCart(cartItems);
}

function cartDeincrement(event) {
    const articleId = parseInt(event.target.getAttribute('data-id'));
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItem = cartItems.find(item => item.id === articleId);
    if (cartItem) {
        cartItem.nb = Math.max(1, cartItem.nb - 1);
    }
    
    updateCart(cartItems);
}

function cartDelete(event) {
    const articleId = parseInt(event.target.getAttribute('data-id'));
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems = cartItems.filter(item => item.id !== articleId);

    updateCart(cartItems);
}

document.addEventListener('DOMContentLoaded', displayCart);
