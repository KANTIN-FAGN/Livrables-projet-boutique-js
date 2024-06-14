document.getElementById('checkout-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les données du panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Récupère les informations de livraison et de paiement depuis le formulaire
    const shippingForm = document.getElementById('shipping-form');
    const shippingAddress = shippingForm.querySelector('input[name="shipping_address"]').value;
    const postalCode = shippingForm.querySelector('input[name="postal_code"]').value;
    const city = shippingForm.querySelector('input[name="city"]').value;

    const cardNumber = document.getElementById('cardPay').value;
    const cardHolder = document.getElementById('card_holder').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cryptogram = document.getElementById('cryptogram').value;

    if (!cart) {
        alert('Panier vide ou non trouvé');
        return;
    }

    // Création de l'objet à envoyer au serveur
    const orderData = {
        cart,
        paymentDetails: {
            cardNumber,
            cardHolder,
            expiryDate,
            cryptogram
        },
        paymentAdress : {
            shippingAddress,
            postalCode,
            city
        }
    };

    console.log(orderData);

    try {
        const response = await fetch('/Roid/treatment/paid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            alert('Paiement traité et commande validée avec succès');
            localStorage.removeItem('cart'); // Supprime le panier du localStorage après la validation
        } else {
            const error = await response.text();
            alert(`Erreur: ${error}`);
        }
    } catch (err) {
        console.error('Erreur de requête:', err);
        alert('Erreur lors du traitement du paiement');
    }
});