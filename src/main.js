let shop = document.getElementById("shop");



// make it to store item when click increase or decrease
// let basket =[];
let basket = JSON.parse(localStorage.getItem("cartData")) || [];

// this code will generate item to sale with data from shomItemData
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        // if you dont want to write x we can use this method
        let { id, name, price, desc, img } = x;
        let search = basket.find((e) => e.id == x.id) || [];
        return `
        <div id="product-id-${id}" class="item">
            <img width="200" src="${img}" alt="">
            <div class="details">
                <h3>${x.name}</h3>
                <p>${x.desc}</p>
                <div class="price-quantity">
                    <h2>$ ${x.price}</h2>
                    <div class="buttons">
                        <i onclick="decreasement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">
                        ${search.quantity === undefined ? 0 : search.quantity}
                        </div>
                        <i onclick="increasement(${id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join(""));
};

generateShop();
// this code will increase quantity
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

let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    let total = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0)
    //console.log(total)
    cartIcon.innerHTML = total
}
calculate();