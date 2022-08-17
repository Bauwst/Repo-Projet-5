
const params = new URLSearchParams(document.location.search);

const id = params.get("_id");

fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(productlist) {
        products(productlist);
    })
    .catch(function(error) {
        document.querySelector(".titles").innerHTML = "<p> Erreur </p>";
        console.log(error);
    })


function products(item) {
    let titre = document.querySelector("#title");
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleur = document.querySelector("#colors");
    let image = document.querySelector("article div.item__img");

    for (let choise of item ){
        if(id == choise._id){
            titre.innerHTML = `${choise.name}`;
            prix.innerHTML = `${choise.price}`;
            description.innerHTML = `${choise.description}`;
            image.innerHTML =`<img src="${choise.imageUrl}" alt="${choise.altTxt}">`;

            for (let color of choise.colors){
                couleur.innerHTML = `<option value="${color}">${color}</option>`;
            }
        }
    }
}