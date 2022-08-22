
const params = new URLSearchParams(document.location.search);

const id = params.get("id");

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


let itemClient = {};
itemClient._id = id;


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


let choiseColor = document.querySelector("#colors");
let colorItem;

choiseColor.addEventListener("input", (eventColor) => {
    colorItem = eventColor.target.value;
    itemClient.color = colorItem;
    console.log(colorItem);
})


let choiseQuantity = document.querySelector('input[id="quantity"]');
let quantityItem;

choiseQuantity.addEventListener("input", (eventQuantity) => {
    quantityItem = eventQuantity.target.value;
    itemClient.quantity = quantityItem;
    console.log(quantityItem);
})


function checkItem(color, quantity){
    if(color == null || (quantity < 1 || quantity > 100 ))
        alert("Veuillez selectionner une couleur et une quantité entre 1 et 100."); 
}

let cartButton = document.querySelector("#addToCart");

cartButton.addEventListener("click", () => {
    console.log(colorItem, quantityItem);
    checkItem(colorItem, quantityItem);
})


