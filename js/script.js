let links = document.querySelector(".header-links");
let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");

if (localStorage.getItem("firstName")) {  
    links.remove();
    userInfo.style.display = "flex";
    // user.innerHTML = "Welcome " + localStorage.getItem("firstName");
    document.querySelector(".welcome").innerHTML= "Welcome " + localStorage.getItem("firstName");
} else {
    userInfo.style.display = "none";
}



let logOut = document.querySelector("#logout");

logOut.addEventListener("click", function() {
    addedItems = {};
    displayItems();

    setTimeout(() => {
        window.location = "Login.html";
    }, 500);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let items = document.querySelector(".items");
let items2 = document.querySelector(".items2");
let items3 = document.querySelector(".items3");

let products1 = [
    {
        id: 1,
        imgURL: "images/Screenshot_2-5-2024_18588_.jpeg",
        name: "Linin Skirt",
        price: 1200,
        category: "Skirts",
        alt: "linin Skirt",
    },
    {
        id: 2,
        imgURL: "images/Screenshot_2-5-2024_185630_.jpeg",
        name: "Gasmine Dress",
        price: 1100,
        category: "Dresses",
        alt: "Gasmin Dress",
    },
    {
        id: 3,
        imgURL: "images/Screenshot_2-5-2024_185942_.jpeg",
        name: "Classic Cardigan",
        price: 1600,
        category: "Cardigans",
        alt: "Classic Cardigan",
    }
];

let products2 = [
    {
        id: 4,
        imgURL: "images/Flory Dress.jpg",
        name: "Flory Dress",
        price: 1300,
        category: "Dresses",
        alt: "Flory Dress",
    },
    {
        id: 5,
        imgURL: "images/Cardigan Abaya.webp",
        name: "Cardigan Abaya",
        price: 1500,
        category: "Cardigans",
        alt: "Cardigan Abaya ",
    },
    {
        id: 6,
        imgURL: "images/Satin Set.webp",
        name: "Satin Set",
        price: 2000,
        category: "Sets",
        alt: "Satin Set",
    }
];

let products3 = [
    {
        id: 7,
        imgURL: "images/Modest Ednaa.jpg",
        name: "Modest Ednaa",
        price: 1500,
        category: "Ednaa",
        alt: "Ednaa",
    },
    {
        id: 8,
        imgURL: "images/Pink dress.jpg",
        name: "Pink Dress",
        price: 1200,
        category: "Dresses",
        alt: "Pink Dress",
    },
    {
        id: 9,
        imgURL: "images/Jean dress.jpg",
        name: "Jean Dress",
        price: 2000,
        category: "Dresses",
        alt: "Jean Dress",
    }
];

function drawProducts(products1, products2, products3) {
    let productHTML = products1.map((item) => {
        return `<div class="product-item">
            <img src="${item.imgURL}" alt="${item.alt}" class="item-img">
            <div class="item-info">
                <p class="product-name">Product: ${item.name}</p>
                <p class="product-name">Price: ${item.price} EGP</p>
                <p class="product-name">Category: ${item.category}</p>
                <div class="favBtn">
                    <button onclick="addItem(${item.id}, products1, this)" data-id="${item.id}" id="cartBtn">Add To Cart</button>
                    <i class="fas fa-heart heart" onclick="toggleFavorite(${item.id}, 'products1')" fav-id="${item.id}" data-array="products1"></i>
                </div>
            </div><!-- /item-info -->
        </div>`;
    }).join('');

    let product2HTML = products2.map((item) => {
        return `<div class="product-item">
            <img src="${item.imgURL}" alt="${item.alt}" class="item-img">
            <div class="item-info">
                <p class="product-name">Product: ${item.name}</p>
                <p class="product-name">Price: ${item.price} EGP</p>
                <p class="product-name">Category: ${item.category}</p>
                <div class="favBtn">
                    <button onclick="addItem(${item.id}, products2, this)" data-id="${item.id}" id="cartBtn">Add To Cart</button>
                    <i class="fas fa-heart heart" onclick="toggleFavorite(${item.id}, 'products2')" fav-id="${item.id}" data-array="products2"></i>
                </div>
            </div><!-- /item-info -->
        </div>`;
    }).join('');

    let product3HTML = products3.map((item) => {
        return `<div class="product-item">
            <img src="${item.imgURL}" alt="${item.alt}" class="item-img">
            <div class="item-info">
                <p class="product-name">Product: ${item.name}</p>
                <p class="product-name">Price: ${item.price} EGP</p>
                <p class="product-name">Category: ${item.category}</p>
                <div class="favBtn">
                    <button onclick="addItem(${item.id}, products3, this)" data-id="${item.id}" id="cartBtn">Add To Cart</button>
                    <i class="fas fa-heart heart" onclick="toggleFavorite(${item.id}, 'products3')" fav-id="${item.id}" data-array="products3"></i>
                </div>
            </div><!-- /item-info -->
        </div>`;
    }).join('');

    items.innerHTML = productHTML;
    items2.innerHTML = product2HTML;
    items3.innerHTML = product3HTML;
}

drawProducts(products1, products2, products3);

//////////////////////////////////////////////////////////////////////////////////////////////////////

cartBtn = document.querySelector("#cartBtn");
cartDiv = document.querySelector(".cart-products div");
let badge = document.querySelector(".badge");

let addedItems = localStorage.getItem("addedItems") ? JSON.parse(localStorage.getItem("addedItems")) : {};

if (localStorage.getItem("emailLabel")) {
    cartDiv.innerHTML = '';
    function addItem(id, Products, button) {
        let chosenItem = Products.find((item) => item.id === id);

        // Update localStorage
        let storedItems = localStorage.getItem("chosenProducts") ? JSON.parse(localStorage.getItem("chosenProducts")) : [];
        storedItems.push(chosenItem);
        localStorage.setItem("chosenProducts", JSON.stringify(storedItems));

        // Update addedItems
        if (!addedItems[id]) {
            addedItems[id] = {
                item: chosenItem,
                count: 1
            };
        }
        localStorage.setItem("addedItems", JSON.stringify(addedItems));

        displayItems();
        button.style.backgroundColor = "rgb(145, 32, 32)";
        button.style.cursor = "auto";
        button.innerHTML = "Remove";
       
    }
}else{
    window.location="register.html"
}



// Update the display
displayItems();

function displayItems() {
    cartDiv.innerHTML = '';
    let totalCount = 0;
    for (const id in addedItems) {
        const { item, count } = addedItems[id]; 
        cartDiv.innerHTML += `<p class="added-p">${item.name} <span class="count">${count}</span> <i class="fas fa-plus plus" onclick="plus('${id}')"></i> <i onclick="minus('${id}')" class="fas fa-minus minus"></i></p>`;
        totalCount += count; 
    }
    if (totalCount < 9 && totalCount > 0) {
        badge.style.display = "block"; 
        badge.innerHTML = totalCount;
        badge.style.textIndent = "-4px";
    } else if(totalCount>8){
        badge.style.display = "block"; 
        badge.innerHTML = "9+";
        badge.style.width = "20px";
        badge.style.textIndent = "-7px";
    }
    else{
        badge.style.display = "none"; 
    }
}

function plus(id) {
    if (addedItems[id]) {
        addedItems[id].count++;
        localStorage.setItem("addedItems", JSON.stringify(addedItems)); 
        displayItems();
    }
}

function minus(id) {
    if (addedItems[id] && addedItems[id].count > 1) {
        addedItems[id].count--;
        localStorage.setItem("addedItems", JSON.stringify(addedItems)); // Store updated addedItems
        displayItems();
    }
}

cartIcon = document.querySelector(".cart");
cartDivParent = document.querySelector(".cart-products");

cartIcon.addEventListener("click", function() {
    if (cartDivParent.style.display === "block") {
        cartDivParent.style.display = "none";
    } else {
        cartDivParent.style.display = "block";
    }
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const selectDropdown = document.querySelector('.form-select');
const searchInput = document.querySelector('.search-input');

// Add event listener to the select dropdown and search input
selectDropdown.addEventListener('change', searchProducts);
searchInput.addEventListener('input', searchProducts);



function filterProducts(inputValue, selectedCategory) {
    const allProducts = products1.concat(products2, products3);
    const filteredProducts = allProducts.filter(product => {
        if (selectedCategory === 'name') {
            return product.name.toLowerCase().includes(inputValue);
        } else if (selectedCategory === 'category') {
            return product.category.toLowerCase().includes(inputValue);
        } else {
            return (
             (product.name.toLowerCase().includes(inputValue) || product.category.toLowerCase().includes(inputValue))
            );
        }
    });
    return filteredProducts;
}


function searchProducts() {
    const selectedCategory = selectDropdown.value; 
    const inputValue = searchInput.value.trim().toLowerCase();

    if (inputValue === '') {
        drawProducts(products1, products2, products3);
    } else {
        const filteredProducts = filterProducts(inputValue, selectedCategory);
        drawFilteredProducts(filteredProducts);
    }
}

function drawFilteredProducts(filteredProducts) {

    items.innerHTML='';
    items2.innerHTML='';
    items3.innerHTML='';
    let productHTML = filteredProducts.map((item) => {
        let productArray = products1.some(p => p.id === item.id) ? 'products1' : products2.some(p => p.id === item.id) ? 'products2' : 'products3';
        return `
            <div class="product-item">
                <img src="${item.imgURL}" alt="${item.alt}" class="item-img">
                <div class="item-info">
                    <p class="product-name">Product: ${item.name}</p>
                    <p class="product-name">Price: ${item.price} EGP</p>
                    <p class="product-name">Category: ${item.category}</p>
                    <div class="favBtn">
                        <button onclick="addItem(${item.id}, ${productArray}, this)" data-id="${item.id}" id="cartBtn">Add To Cart</button>
                        <i class="fas fa-heart heart" onclick="toggleFavorite(${item.id}, '${productArray}')" fav-id="${item.id}" data-array="${productArray}"></i>
                    </div>
                </div><!-- /item-info -->
            </div>
        `;

    }).join('');

        items.innerHTML = productHTML;

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let favoriteItems = localStorage.getItem("favoriteItems") ? JSON.parse(localStorage.getItem("favoriteItems")) : {};

document.addEventListener("DOMContentLoaded", function() {
    for (const id in favoriteItems) {
        const heartIcon = document.querySelector(`[fav-id="${id}"]`);
        if (heartIcon) {
            heartIcon.classList.add('favorite');
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    for (const id in addedItems) {
        const button = document.querySelector(`[data-id="${id}"]`);
        if (button) {
            button.style.backgroundColor = "rgb(145, 32, 32)";
            button.style.cursor = "auto";
            button.innerHTML = "Remove";        }
    }
});

function toggleFavorite(id, productArrayName) {
    let productsArray = (productArrayName === 'products1') ? products1 : (productArrayName === 'products2') ? products2 : products3;
    let item = productsArray.find(product => product.id === id);

    if (!favoriteItems[id]) {
        favoriteItems[id] = item;
        document.querySelector(`[fav-id="${id}"]`).classList.add('favorite'); // Add a class to change the color to red
    } else {
        delete favoriteItems[id]; //will remove it from favorites and remove the favorite class to return to be grey again
        document.querySelector(`[fav-id="${id}"]`).classList.remove('favorite'); 
    }

    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems)); // Save favorite items in local storage
}
