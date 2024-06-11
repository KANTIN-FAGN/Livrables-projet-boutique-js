document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("filter-button");
    const dropdownMenus = {
        cat: document.getElementById("cat-menu"),
        mat: document.getElementById("mat-menu"),
        col: document.getElementById("col-menu"),
    };
    const selectedCounts = {
        cat: document.getElementById("cat-count"),
        mat: document.getElementById("mat-count"),
        col: document.getElementById("col-count"),
    };

    // Fonction pour mettre à jour le compteur de sélection
    const updateSelectedCount = () => {
        let totalSelected = 0;
        Object.keys(dropdownMenus).forEach(menuId => {
            const selectedItems = dropdownMenus[menuId].querySelectorAll("li.selected");
            totalSelected += selectedItems.length;
            if (selectedItems.length > 0) {
                selectedCounts[menuId].textContent = `(${selectedItems.length})`;
                selectedCounts[menuId].style.display = 'inline';
            } else {
                selectedCounts[menuId].style.display = 'none';
            }
        });
    };

    // Fonction pour gérer le clic sur un élément de filtre
    const handleItemClick = (e, menuId) => {
        e.target.classList.toggle("selected");
        updateSelectedCount();
        updateFilters();
    };

    // Ajout des gestionnaires d'événements pour chaque élément de filtre
    Object.keys(dropdownMenus).forEach(menuId => {
        const items = dropdownMenus[menuId].querySelectorAll("li");
        items.forEach(item => {
            item.addEventListener("click", (e) => handleItemClick(e, menuId));
        });
    });

    // Fonction pour récupérer les filtres sélectionnés
    const getSelectedFilters = () => {
        const selectedCategory = Array.from(document.querySelectorAll('#cat-menu li.selected')).map(li => li.textContent.trim()).join(',');
        const selectedMaterial = Array.from(document.querySelectorAll('#mat-menu li.selected')).map(li => li.textContent.trim()).join(',');
        const selectedColor = Array.from(document.querySelectorAll('#col-menu li.selected')).map(li => li.textContent.trim()).join(',');
        return { category: selectedCategory, material: selectedMaterial, color: selectedColor };
    };

    // Fonction pour mettre à jour l'URL avec les filtres sélectionnés
    const updateFilters = () => {
        const selectedFilters = getSelectedFilters();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('category', selectedFilters.category);
        urlParams.set('material', selectedFilters.material);
        urlParams.set('color', selectedFilters.color);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        location.reload();
    };


    // Gestionnaire d'événement pour le bouton de filtrage
    filterButton.addEventListener("click", updateFilters);
});
