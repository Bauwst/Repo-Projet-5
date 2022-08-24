
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const redirectToCart = () => {
    window.location.href = "cart.html"
}
let itemClient = {};
itemClient._id = id;
let choiseColor = document.querySelector("#colors");
let colorItem;
let choiseQuantity = document.querySelector('input[id="quantity"]');
let quantityItem;
let cartButton = document.querySelector("#addToCart");


fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
            return res.json();
    })
    .then(function(productlist) {
        displayProduct(productlist);
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
}

function activateButton(colorItem, quantityItem){
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
    activateButton(colorItem,quantityItem);
    console.log(colorItem);
})

choiseQuantity.addEventListener("input", (eventQuantity) => {
    quantityItem = eventQuantity.target.value;
    itemClient.quantity = quantityItem;
    activateButton(colorItem,quantityItem);
    console.log(quantityItem);
})


cartButton.addEventListener("click", () => {
    if((colorItem == null || colorItem == "") || (quantityItem == null || quantityItem < 1 || quantityItem > 100 )){
        alert("Veuillez selectionner une couleur et une quantité entre 1 et 100.");
        console.log(colorItem);
        console.log(quantityItem); 
    }
    else{
        window.localStorage.setItem('product' , JSON.stringify(itemClient));
        redirectToCart();
    }
})









