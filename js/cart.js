let links = document.querySelector(".header-links");
let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let allProducts = document.querySelector(".addedItems");
let totalPriceElement = document.querySelector(".totalPrice");
let favoriteItemsContainer = document.querySelector('.favoriteItems');

// Check for user login state and update UI accordingly
if (localStorage.getItem("firstName")) {
    links.remove();
    userInfo.style.display = "flex";
    document.querySelector(".welcome").innerHTML= "Welcome " + localStorage.getItem("firstName");
    user.style.marginRight = "520px";
} else {
    userInfo.style.display = "none";
}

// Logout functionality
let logOut = document.querySelector("#logout");
logOut.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "Login.html";
    }, 500);
});

let chosenProducts = localStorage.getItem("chosenProducts") ? JSON.parse(localStorage.getItem("chosenProducts")) : [];
let addedItems = localStorage.getItem("addedItems") ? JSON.parse(localStorage.getItem("addedItems")) : {};

function drawAddedProducts() {
    let productHTML = "";
    for (const id in addedItems) {
        const addedItem = addedItems[id];
        const item = addedItem.item;
        const count = addedItem.count;
        productHTML += `
            <div class="addedItem">
                <img src="${item.imgURL}" alt="${item.alt}" class="addedItem-img">
                <div class="addedItemInfo col-sm-12 col-lg-6">
                    <p class="addedItemData">Product: ${item.name}</p>
                    <p class="addedItemData">Price: ${item.price} EGP</p>
                    <p class="addedItemData">Category: ${item.category}</p>
                    <div class="button-container">  
                      <span class="count">${count}</span>
                      <div class="plusMinus">
                        <i class="fas fa-minus minus" onclick="minus('${id}')"></i>
                        <i class="fas fa-plus plus" onclick="plus('${id}')"></i>
                      </div> 
                      <button id="removeBtn" onclick="removeFromCart('${id}')">Remove</button>
                    </div> 
                </div><!-- /addedItemInfo -->
            </div>`;
    }

    allProducts.innerHTML = productHTML;
    allProducts.style.transform = "translateY(20px)";

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    for (const id in addedItems) {
        const addedItem = addedItems[id];
        totalPrice += addedItem.item.price * addedItem.count;
    }
    totalPriceElement.innerHTML = `Total Price: ${totalPrice} EGP`;
}

function removeFromCart(id) {
    if (addedItems[id]) {
        delete addedItems[id];
        updateLocalStorage();
        drawAddedProducts();
    }
}

// Function to increase item count
function plus(id) {
    if (addedItems[id]) {
        addedItems[id].count++;
        updateLocalStorage();
        drawAddedProducts();
    }
}

function minus(id) {
    if (addedItems[id] && addedItems[id].count > 1) {
        addedItems[id].count--;
        updateLocalStorage();
        drawAddedProducts();
    }
}

function updateLocalStorage() {
    chosenProducts = [];
    for (const id in addedItems) {
        for (let i = 0; i < addedItems[id].count; i++) {
            chosenProducts.push(addedItems[id].item);
        }
    }
    localStorage.setItem("chosenProducts", JSON.stringify(chosenProducts));
    localStorage.setItem("addedItems", JSON.stringify(addedItems));
}

drawAddedProducts();

let favoriteItems = localStorage.getItem("favoriteItems") ? JSON.parse(localStorage.getItem("favoriteItems")) : {};

function drawFavoriteItems() {
    let favoriteHTML = "";
    for (const id in favoriteItems) {
        let item = favoriteItems[id];
        favoriteHTML += `
            <div class="favoriteItem">
                <img src="${item.imgURL}" alt="${item.alt}" class="favoriteItem-img">
                <div class="favoriteItemInfo">
                    <p class="favoriteItemData">Product: ${item.name}</p>
                    <p class="favoriteItemData">Category: ${item.category}</p>
                    <i class="fas fa-heart heart" onclick="removeFav(${item.id})"></i>
                </div>
            </div>`;
    }
    favoriteItemsContainer.innerHTML = favoriteHTML;
    document.querySelectorAll(".heart").forEach(heart => {
        heart.style.color = "red";
    });
}

function removeFav(id) {
    if (favoriteItems[id]) {
        delete favoriteItems[id];
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
        drawFavoriteItems();
    }
}

drawFavoriteItems();
