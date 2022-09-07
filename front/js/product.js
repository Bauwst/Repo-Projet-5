
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
var itemClient = {};
itemClient._id = id;
let choiseColor = document.querySelector("#colors");
let colorItem = "";
let choiseQuantity = document.querySelector('input[id="quantity"]');
let quantityItem = 0 ;
let cartButton = document.querySelector("#addToCart");
cartButton.disable = false;
document.querySelector(".item__content__addButton").style.opacity = 0.2;
let cart = JSON.parse(localStorage.getItem('cart'));
if (cart == null){
    cart = [];
}



fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        return res.json();
    })
    .then(function(product) {
        displayProduct(product);
    })
    .catch(function(error) {
        document.querySelector(".titles").innerText = "Erreur";
        console.log(error);
    })


function displayProduct(item) {
    let titre = document.querySelector("#title");
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleur = document.querySelector("#colors");
    let image = document.querySelector(".item__img");

        if(id == item._id){
            titre.innerText = item.name;
            prix.innerText = item.price;
            description.innerText = item.description;
            let img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.altTxt;
            image.appendChild(img);
            

        for (let color of item.colors){
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            couleur.appendChild(option);
        }       
    }
    console.table(item);
}

function activateButton(){
    const button = document.querySelector('button');
    if((colorItem == null || colorItem == "") || (quantityItem == null || quantityItem < 1 || quantityItem > 100 )){
        button.disable = true;
        document.querySelector(".item__content__addButton").style.opacity = 0.2;    
    }
    else {
        document.querySelector(".item__content__addButton").style.opacity = 1;
        button.disable = false;
    }
}

choiseColor.addEventListener("input", (eventColor) => {
    colorItem = eventColor.target.value;
    itemClient.color = colorItem;
    activateButton();
    console.log(colorItem);
})

choiseQuantity.addEventListener("input", (eventQuantity) => {
    quantityItem = eventQuantity.target.value;
    itemClient.quantity = quantityItem;
    activateButton();
    console.log(quantityItem);
})


cartButton.addEventListener("click", () => {
    let searchItem = cart.find(si => si._id == itemClient._id && si.color == itemClient.color);
    if((colorItem == null || colorItem == "") || (quantityItem == null || quantityItem < 1 || quantityItem > 100 )){
        alert("Veuillez selectionner une couleur et une quantité entre 1 et 100."); 
    }
    else if(searchItem != undefined) {
        let totalQuantity = parseInt(itemClient.quantity) + parseInt(searchItem.quantity);
        searchItem.quantity = totalQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "cart.html";
        console.log(cart);
    }
    else{
        cart.push(itemClient);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "cart.html";
    }
})









