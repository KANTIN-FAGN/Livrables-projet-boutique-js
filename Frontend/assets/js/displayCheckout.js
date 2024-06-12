async function getArticlesLstCheckout(lst) {
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

async function affectEventCheckout() {
  const listBtnDelete = document.querySelectorAll('.delete-btn-cart');

  listBtnDelete.forEach((button) => {
    button.addEventListener('click', cartDeleteCheckout);
  });

  console.log("Event listeners for plus, minus, and delete buttons are set up.");
}

async function displayCheckout() {
  let checkoutItems = localStorage.getItem('cart');
  checkoutItems = checkoutItems ? JSON.parse(checkoutItems) : [];

  const articles = await getArticlesLstCheckout(checkoutItems.map(item => item.id));

  const cartContainerCheckout = document.getElementById('info-chekout-global');
  const totalContainerCheckout = document.getElementById('total-global');


  if (checkoutItems.length === 0) {
    document.getElementById('info-paiement-global').innerHTML = `
        <div class="info-compte-global-ctn">
            <div class="titre-info-global">
              <span style="font-weight: bold;">VOTRE PANIER EST ACTUELLEMENT VIDE</span>
            </div>
            <div class="info-compte-global">
              <div style="
              font-size: .8125rem;
              line-height: 1.25rem;
              margin-bottom: 2.5rem;">
                <p>Votre panier d'achat ne contient pas d'article.</p>
              </div>
              <div>
                <a href="/Roid" style="">
                  <button style="justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    height: 3rem;
    border-radius: 1.5rem;
    font-size: .8125rem;
    line-height: 1.25rem;
    padding: 0 2rem;">
                    <span>Continuer mes achats</span>
                  </button>
                </a>
              </div>
            </div>
          </div>`;
    return;
  }

  cartContainerCheckout.innerHTML = '';
  totalContainerCheckout.innerHTML = '';

  let totalPrice = 0;
  let cartHtml = '';

  articles.articles.forEach(article => {
    const cartItem = checkoutItems.find(item => item.id === article.id_article);
    let quantity = cartItem ? cartItem.nb : 1;
    let size = cartItem ? cartItem.size : '';
    let price = article.price * quantity;

    totalPrice += price;

    cartHtml += `
    <div id="info-chekout-global" class="cart-checkout">
      <div class="article-checkout-global">
        <div class="article-checkout-img">
          <img src="${article.img}" alt="${article.img}">
        </div>
        <div class="article-checkout-info">
          <p class="name-article-checkout">${article.name}</p>
          <p>${article.detail}</p>
          <p>${price} €</p>
          <p>Taille : ${size}</p>
          <div class="qte-btn-checkout">
            <p class="qte-article-checkout">Qté : ${quantity}</p>
            <button class="delete-btn-cart" data-id="${article.id_article}" data-id-size="${size}">Supprimer</button>
          </div>
        </div>
      </div>
    </div>`;
  });

  cartContainerCheckout.innerHTML = cartHtml;

  totalContainerCheckout.innerHTML = `
    <div>
        <p>TOTAL</p>
    </div>
    <div>
        <div class="sous-total-global">
            <span>Sous-total</span>
            <span>${totalPrice} €</span>
        </div>
        <div class="sous-total-global">
            <span>Livraison</span>
            <span>Offert</span>
        </div>
        <div class="sous-total-global">
            <span>Taxes incluses</span>
            <span>0,00 €</span>
        </div>
    </div>
    <div class="total-global-price">
        <span>Total</span>
        <span>${totalPrice} €</span>
    </div>`;

  affectEventCheckout()
}

function updateCheckout(cartItems) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCheckout();
}

function cartDeleteCheckout(event) {
  const articleId = parseInt(event.target.getAttribute('data-id'));
  const size = event.target.getAttribute('data-id-size');
  let checkoutItems = JSON.parse(localStorage.getItem('cart')) || [];

  checkoutItems = checkoutItems.filter(item => !(item.id === articleId && item.size === size));

  updateCheckout(checkoutItems);
  location.reload();
}

document.addEventListener('DOMContentLoaded', displayCheckout);
