const dishList = document.querySelector(".dishlist");
const closeNavigation = document.querySelector(".close-nav");
const closeNavContainer = document.querySelector(".sm-navigation");
const menuHamburger = document.querySelector(".menu-hamburger");
let cartIcon = document.querySelector(".cart-icon");
let dropDown = document.querySelector(".drop-down");


let cart =[];

document.addEventListener("DOMContentLoaded", () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
        cart = savedCart; 
        updateCartContent(); 
        updateCartCount(); 
    }
});

menuHamburger.addEventListener("click", ()=> {
    const visibility = closeNavContainer.getAttribute("data-visible");
    if(visibility === "false") {
        closeNavContainer.setAttribute("data-visible", true);
    }else {
        closeNavContainer.setAttribute("data-visible", false)
    }
});

closeNavigation.addEventListener("click", ()=> {
    const visibility = closeNavContainer.getAttribute("data-visible");
    if(visibility === "true") {
        closeNavContainer.setAttribute("data-visible", false);
    }else {
        closeNavContainer.setAttribute("data-visible", true)
    }
});

cartIcon.addEventListener("click", ()=>{
    let dropDownmenu = document.querySelector(".drop-down")
    const visibility = dropDownmenu.getAttribute("data-visible");
    if (visibility === "false") {
       dropDownmenu.setAttribute("data-visible", true);
    } else {
        dropDownmenu.setAttribute("data-visible", false);
    }
});



fetch("food.json")
.then(response => response.json())
.then(data =>{
    data.forEach(food => {
        let foodMainContainer = document.createElement("div");
        let foodMainHeader = document.createElement("h3");
        let foodMainImg = document.createElement("img");
        let foodDescription = document.createElement("p");
        let btnAlt = document.createElement("div");
        let foodMainPrice = document.createElement("h5");
        let addBtn = document.createElement("button");

        foodMainContainer.setAttribute("class", "food-list");
        btnAlt.setAttribute("class", "price");
        addBtn.innerHTML = "Add To Cart";
        addBtn.setAttribute("class", "btn-add");
        foodMainPrice.setAttribute("class", "btnprice")

        foodMainHeader.textContent = food.name;
        foodMainImg.src = food.image;
        foodDescription.textContent = food.description;
        foodMainPrice.textContent = `$${food.price}`;
        
        foodMainContainer.appendChild(foodMainHeader);
        foodMainContainer.appendChild(foodMainImg);
        foodMainContainer.appendChild(foodDescription);

        btnAlt.appendChild(foodMainPrice);
        btnAlt.appendChild(addBtn);

        foodMainContainer.appendChild(btnAlt);

        dishList.appendChild(foodMainContainer);

        addBtn.addEventListener("click", ()=>{
            addToCart(food)
        });


    });
});

function addToCart(food){
    console.log(cart.push(food));
    saveCartToLocalStorage();
    updateCartContent();
    updateCartCount();
}

function updateCartContent(){
    dropDown.innerHTML = '';

    let dropDownHeader = document.createElement("p");
    dropDownHeader.setAttribute("class", "drop-header");
    dropDownHeader.innerHTML = "Cart";
    dropDown.appendChild(dropDownHeader);

    cart.forEach((item, index) => {
        
        let cartContainer = document.createElement("div");
        cartContainer.setAttribute("class", "cartcontent");
        let cartConImage = document.createElement("img");
        let cartConText = document.createElement("h3");
        let cartConPrice = document.createElement("p");
        let deleteBtn = document.createElement("span");
        
        deleteBtn.setAttribute("class", "delete-btn");
        cartConText.setAttribute("class", "cart-container-text");
        

        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#d11a2a" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>`;

        deleteBtn.addEventListener("click", () => {
            removeFromCart(index)
        });

        cartConImage.src = item.image;
        cartConText.textContent = item.name;
        cartConPrice.textContent = `$${item.price}`;

        cartContainer.appendChild(cartConImage);
        cartContainer.appendChild(cartConText);
        cartContainer.appendChild(cartConPrice);
        cartContainer.appendChild(deleteBtn);
        dropDown.appendChild(cartContainer);
        



    });

    let totalContainer = document.createElement("div");
    let totalText = document.createElement("h3");
    let totalTextValue = document.createElement("h6");
    totalContainer.setAttribute("class", "total-container");
    
    let checkOutContainer = document.createElement("div");
    checkOutContainer.setAttribute("class", "check-out-container");
    let checkOutBtn = document.createElement("button");
    checkOutBtn.setAttribute("class", "check-out");
    checkOutBtn.innerHTML="CHECKOUT"

    totalText.innerHTML ="Total";
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalTextValue.innerHTML=`$${totalPrice}`
    totalContainer.appendChild(totalText);
    totalContainer.appendChild(totalTextValue);
    dropDown.appendChild(totalContainer);
    checkOutContainer.appendChild(checkOutBtn)
    dropDown.appendChild(checkOutContainer);
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    saveCartToLocalStorage();
    updateCartContent(); // Update the dropdown to reflect changes
    updateCartCount(); // Update the cart item count
    
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save the cart array to localStorage
}




function updateCartCount() {
    let totalItems = cart.length;  // Get the total number of items in the cart

    // Create or update the element that shows the total item count
    let itemCountElement = document.querySelector(".cartnum");

    if (!itemCountElement) {
        itemCountElement = document.createElement("div");
        itemCountElement.setAttribute("class", "cart-item-count");
        dropDown.appendChild(itemCountElement);
    }

    itemCountElement.textContent = `${totalItems}`; 
}

