document.addEventListener('DOMContentLoaded', () => {
    const sortOptions = document.getElementById('sort-options');

    // Récupérer la valeur du paramètre de tri de la route
    const urlParams = new URLSearchParams(window.location.search);
    const sortOrder = urlParams.get('sortOrder');

    // Définir la valeur sélectionnée en fonction de la valeur du paramètre de la route
    if (sortOrder === 'desc') {
        sortOptions.value = 'desc';
    } else {
        sortOptions.value = 'asc';
    };

    sortOptions.addEventListener('change', () => {
        const sortOrder = sortOptions.value;
        const currentUrl = new URL(window.location.href);

        // Update URL parameters
        currentUrl.searchParams.set('sortOrder', sortOrder);

        // Reload page with new sort order
        window.location.href = currentUrl.toString();
    });
});
