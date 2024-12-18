// get data from local storage
let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


// cart icon number
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    let total = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0)
    //console.log(total)
    cartIcon.innerHTML = total
}
calculate();

let generateCartItem = () => {
    if(basket.length !==0){
        shoppingCart.innerHTML = basket.map((x)=>{
            let {id,quantity}=x;
            // shopItemsdata is where we store all data in data.js
            let search = shopItemsData.find((e)=> e.id == id);
            return `
                <div class="cart-item">
            <img src="${search.img}" alt="">
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="fa-solid fa-xmark"></i>
                </div>
                <div class="buttons">
                        <i onclick="decreasement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">
                        ${quantity}
                        </div>
                        <i onclick="increasement(${id})" class="fa-solid fa-plus"></i>
                    </div>
                <h3>$ ${quantity * search.price}</h3>
            </div>
        </div>
            `
        }).join("");
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
            <h2>Cart is Empty</h2>
        <a href="index.html"><button class="backhome">Go Back Home</button></a>
        `
    }
}
generateCartItem();

let increasement = (id) => {
    let selectedItem = id;
    // search if item exist in basket
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            quantity: 1,
        })
    } else {
        search.quantity += 1
    }
    //console.log(basket)
    update(selectedItem)
    // store to local storage in browser
    localStorage.setItem("cartData", JSON.stringify(basket));
    generateCartItem();
    totalAmount();
};
// this code will decrease quantity
let decreasement = (id) => {
    let selectedItem = id;
    // search if item exist in basket
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        return
    }
    if (search.quantity === 0) {
        return
    } else {
        search.quantity -= 1
    }
    //console.log(basket)
    update(selectedItem)
    // this line of code will take only item in basket that have quantity>0
    basket = basket.filter((e) => e.quantity !== 0);
    // store to local storage in browser
    localStorage.setItem("cartData", JSON.stringify(basket));
    generateCartItem();
    totalAmount();
};
// this code will update quantity
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        document.getElementById(id).innerHTML = 0
    } else {
        document.getElementById(id).innerHTML = search.quantity
    }
    //console.log(search.quantity)
    calculate();
};

let removeItem = (id)=>{
    let selectItem = id;
    basket = basket.filter((x) =>x.id !== selectItem);
    // store to local storage in browser
    localStorage.setItem("cartData", JSON.stringify(basket));
    generateCartItem();
    calculate();
    totalAmount();
}

let clearCart = ()=>{
    basket = [];
    localStorage.setItem("cartData", JSON.stringify(basket));
    generateCartItem();
    calculate();
}

let totalAmount = ()=>{
    if(basket.lenght !==0){
        let amount = basket.map((x)=>{
            let {id, quantity} = x;
            let search = shopItemsData.find((e)=> e.id == id ) || [];
            return quantity * search.price
        }).reduce((x,y) => x+y,0)
        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <div>
                <button onclick="" class="btn-checkout">Checkout</button>
                <button onclick="clearCart()" class="btn-clear-cart">Clear Cart</button>
            </div>
        `
    }
    else return
}
totalAmount();