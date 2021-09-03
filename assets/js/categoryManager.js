/**
 * Manage the categories
 */
 let categoryManager = {
    categories: [],
    /**
     * Load all categories from the API
     */
    loadCategories: function() {
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
    
        fetch('https://benoclock.github.io/S07-todolist/categories.json', config)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let headerSelect = document.getElementById('header-select-category');
                categoryManager.addOptionsToSelect(data, headerSelect);

                let formAddSelect = document.getElementById('form-add-select-category');
                categoryManager.addOptionsToSelect(data, formAddSelect);

                for (category of data) {
                    categoryManager.categories[category.id] = category;
                }
            
                taskManager.loadTasks();
            }
        );
    },

    /**
     * Add options to a select item
     * @param categoriesArray Categories to add as options
     * @param selectElement Select element into which add the options
     */
    addOptionsToSelect: function(categoriesArray, selectElement) {
    
        for (const currentCategory of categoriesArray) {
            let optionElement = document.createElement('option');
            optionElement.textContent = currentCategory.name;
            optionElement.value = currentCategory.id;
            
            selectElement.appendChild(optionElement);
        }
    },

    /**
     * Get the name of a category from its id
     * @param categoryId 
     */
    getCategoryName(categoryId) {
        let category = categoryManager.categories[categoryId];
        return category.name;
    }
}
