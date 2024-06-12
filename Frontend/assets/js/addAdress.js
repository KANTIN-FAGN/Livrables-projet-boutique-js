document.addEventListener('DOMContentLoaded', function () {
    const addressInput = document.getElementById('shipping_address');
    const suggestionsContainer = document.getElementById('address-suggestions');
    const postalCodeInput = document.getElementById('postal_code');
    const cityInput = document.getElementById('city');

    addressInput.addEventListener('input', function () {
        const query = addressInput.value;

        if (query.length < 3) {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if the input is too short
            return;
        }

        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                suggestionsContainer.innerHTML = '';
                if (data && data.features && data.features.length > 0) {
                    const limitedFeatures = data.features.slice(0, 5); // Limit to 5 suggestions
                    limitedFeatures.forEach(feature => {
                        const suggestion = document.createElement('div');
                        suggestion.classList.add('suggestion-item');
                        suggestion.innerText = feature.properties.label;
                        suggestion.addEventListener('click', () => {
                            const properties = feature.properties;
                            const address = properties.name ? `${properties.name} ${properties.street}` : properties.label.split(',')[0]; // Extract street address
                            const postalCode = properties.postcode;
                            const city = properties.city || properties.context.split(',').filter(part => part.includes(postalCode))[0].split(' ')[1];

                            addressInput.value = address;
                            postalCodeInput.value = postalCode;
                            cityInput.value = city;

                            suggestionsContainer.innerHTML = '';
                        });
                        suggestionsContainer.appendChild(suggestion);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching address suggestions:', error);
            });
    });
});