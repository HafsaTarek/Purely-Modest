// Add event listeners to the category select dropdown and the search input field
const categorySelect = document.querySelector('.form-select');
const searchInput = document.querySelector('.search-input');

categorySelect.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Define a function to filter products based on category and input value
function filterProducts() {
    const selectedCategory = categorySelect.value.toLowerCase();
    const inputValue = searchInput.value.trim().toLowerCase();

    // Filter products based on category and input value
    const filteredProducts = products1.concat(products2).filter(product => {
        // Check if the product category matches the selected category
        if (selectedCategory !== 'search by category' && product.category.toLowerCase() !== selectedCategory) {
            return false;
        }
        // Check if the product name contains the input value
        return product.name.toLowerCase().includes(inputValue);
    });

    // Display filtered products
    drawFilteredProducts(filteredProducts);
}

// Define a function to display filtered products
function drawFilteredProducts(filteredProducts) {
    let productHTML = filteredProducts.map(item => {
        return `<div class="product-item">
            <img src="${item.imgURL}" alt="${item.alt}" class="item-img">
            <div class="item-info">
                <p class="product-name">Product: ${item.name}</p>
                <p class="product-name">Price: ${item.price} EGP</p>
                <p class="product-name">Category: ${item.category}</p>
                <button onclick="addItem(${item.id}, ${item.category === 'Dresses' ? 'products1' : 'products2'})" id="cartBtn">Add To Cart</button> 
            </div><!-- /item-info -->
        </div>`;
    }).join(' ');

    // Update the HTML content of the product container
    items.innerHTML = productHTML;
}

// Initially draw products without filtering
drawProducts(products1, products2);