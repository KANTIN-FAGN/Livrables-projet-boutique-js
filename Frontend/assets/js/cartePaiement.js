document.addEventListener('DOMContentLoaded', function () {
    const cardInput = document.getElementById('cardPay');

    cardInput.addEventListener('input', function () {
        let value = cardInput.value.replace(/\s+/g, ''); // Remove all spaces
        if (value.length > 16) {
            value = value.slice(0, 16); // Limit input to 16 digits
        }

        // Insert spaces every 4 digits
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        cardInput.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const expiryInput = document.getElementById('expiryDate');

    expiryInput.addEventListener('input', function () {
        let value = expiryInput.value.replace(/\s+/g, ''); // Remove all spaces
        value = value.replace(/\D/g, ''); // Remove all non-numeric characters

        if (value.length > 4) {
            value = value.slice(0, 4); // Limit input to 4 characters
        }

        // Insert a slash after the second character
        if (value.length > 2 && value.charAt(2) !== '/') {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        expiryInput.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cryptogramInput = document.getElementById('cryptogram');

    cryptogramInput.addEventListener('input', function () {
        let value = cryptogramInput.value.replace(/\D/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        cryptogramInput.value = value;
    });
});
