document.addEventListener("DOMContentLoaded", () => {
    const resetFilters = document.getElementById("reset-filters");
    const resetFiltersBar = document.getElementById("reset-filters-bar"); // Ajout de cette ligne
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
        resetFilters.style.display = totalSelected > 0 ? 'inline' : 'none';
        resetFiltersBar.style.display = totalSelected > 0 ? 'block' : 'none'; // Ajout de cette ligne
    };

    const handleItemClick = (e, menuId) => {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    };

    Object.keys(dropdownMenus).forEach(menuId => {
        const items = dropdownMenus[menuId].querySelectorAll("li");
        items.forEach(item => {
            item.addEventListener("click", (e) => handleItemClick(e, menuId));
        });
    });

    resetFilters.addEventListener("click", (e) => {
        e.preventDefault();
        Object.keys(dropdownMenus).forEach(menuId => {
            const items = dropdownMenus[menuId].querySelectorAll("li");
            items.forEach(item => item.classList.remove("selected"));
        });
        updateSelectedCount();
    });
    updateSelectedCount();
});
