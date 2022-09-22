
// Récupération de l'id via l'Url
const params = new URLSearchParams(document.location.search);
// Déclaration de "id" comme étant l'id récupérée via l'Url
const id = params.get("id");

// Récupération des informations de l'article via le localStorage
let cart = JSON.parse(localStorage.getItem('cart'));
// Création d'un panier si celui-ci n'existe pas
if (cart == null){
    cart = [];
}

// Définition des variables globales
var itemClient = {};
itemClient._id = id;
let choiseColor = document.querySelector("#colors");
let choiseQuantity = document.querySelector('input[id="quantity"]');
let colorItem = "";
let quantityItem = 0 ;
let cartButton = document.querySelector("#addToCart");
cartButton.disable = false;
document.querySelector(".item__content__addButton").style.opacity = 0.2;


///////////////////////////////////////////////////////////////////////////----- REQUETE API ------//////////////////////////////////////////////////////////////////////////////////////////////


// Requête à l'API pour obtenir les informations du produit sélectionné via son id
fetch("http://localhost:3000/api/products/" + id)

    // Renvoi des informations en format JSON
    .then((res) => {
        return res.json();
    })

    // Insertion et affichage des informations du produit sélectionné
    .then(function(product) {
        itemClient.price = product.price;
        itemClient.imageUrl = product.imageUrl;
        itemClient.altTxt = product.altTxt;
        displayProduct(product);
    })

    // Message d'erreur en cas d'échec de la requête
    .catch(function(error) {
        document.querySelector(".titles").innerText = "Erreur";
        console.log(error);
    })


/////////////////////////////////////////////////////////////////////----- AFFICHAGE DE L'ARTICLE-----////////////////////////////////////////////////////////////////////////////////////////////////////////


/**  Création du DOM pour l'affichage du produit sélectionné
* @param { Array.<{_id:String, name:String, price:Integer , imageUrl: String, altTxt:String, description:String}>  } item Array du produit choisi
*/
function displayProduct(item) {

    // Récupération des élements/classes
    let titre = document.querySelector("#title");
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleur = document.querySelector("#colors");
    let image = document.querySelector(".item__img");

        // Si l'id de notre produit correspond à l'id de notre requête:
        if(id == item._id){

            // Ajout du nom associé au produit
            titre.innerText = item.name;

            // Ajout du prix associé au produit
            prix.innerText = item.price;

            // Ajout de la description associée au produit
            description.innerText = item.description;

            // Création de la balise 'img'
            let img = document.createElement('img');
            // Définition des élements de la balise 'img' associé au produit
            img.src = item.imageUrl;
            img.alt = item.altTxt;

            // Définition de 'img' comme étant l'enfant de 'image' (".item__img")
            image.appendChild(img);
            
        // Récupération de l'élément avec l'id colors et ajout des couleurs associées    
        for (let color of item.colors){
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            couleur.appendChild(option);
        }       
    }

    // Affichage des informations du produit dans la console
    console.table(item);
}


/**  Création d'une fonction permettant l'activation du bouton "Commander"
 * */
function activateButton(){
    const button = document.querySelector('button');

    // Si les champs requis sont mal renseignés, le boutton est transparent et n'est pas utilisable
    if((colorItem == null || colorItem == "") || (quantityItem == null || quantityItem < 1 || quantityItem > 100 )){
        document.querySelector(".item__content__addButton").style.opacity = 0.2;
        button.disable = true;    
    }

    // Si les champs sont correctement renseignés, le bouton devient opaque et utilisable
    else {
        document.querySelector(".item__content__addButton").style.opacity = 1;
        button.disable = false;
    }
}


/////////////////////////////////////////////////////////////////////----- EVENTS LISTENERS-----//////////////////////////////////////////////////////////////////////////////////////////////


// On écoute les évenements du bouton "couleur" 
choiseColor.addEventListener("input", (eventColor) => {

    // Définition de la couleur sélectionnée comme étant la couleur souhaitée par le client
    colorItem = eventColor.target.value;
    itemClient.color = colorItem;

    // Appel de la fonction d'activation du bouton "Ajouter au panier"
    activateButton();

    // Affichage de la couleur dans le console
    console.log(colorItem);
})


// On écoute les évenements du bouton "quantité" 
choiseQuantity.addEventListener("input", (eventQuantity) => {

    //Définition la quantitée sélectionnée comme étant la quantitée souhaitée par le client
    quantityItem = eventQuantity.target.value;
    itemClient.quantity = quantityItem;

    // Appel de la fonction d'activation du bouton "Ajouter au panier"
    activateButton();

    // Affichage de la quantité dans la console
    console.log(quantityItem);
})


// Ecoute du bouton "Ajouter au panier"
cartButton.addEventListener("click", () => {

    // Création d'une variable pour vérifier si l'article est déjà présent ou non dans le panier
    let searchItem = cart.find(si => si._id == itemClient._id && si.color == itemClient.color);
    //let searchItem = Array.from(cart).find(si => si._id == itemClient._id && si.color == itemClient.color);

    // Vérification des champs remplis par le client
    // Si au moins un des champs est mal renseigné, affichage d'un message d'erreur
    if((colorItem == null || colorItem == "") || (quantityItem == null || quantityItem < 1 || quantityItem > 100 )){
        alert("Veuillez selectionner une couleur et une quantité entre 1 et 100."); 
    }

    // Recherche de la présence d'un article identique dans le panier
    else if(searchItem != undefined) {

        //Ajout de la quantitée sélectionnée à la quantité existante
        let totalQuantity = parseInt(itemClient.quantity) + parseInt(searchItem.quantity);
        searchItem.quantity = totalQuantity;

        // Sauvegarde du panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Renvoi vers la page "Panier"
        window.location.href = "cart.html";

        //Affichage du panier dans la console
        console.log(cart);
    }

    // Envois des informations SI le produit n'est pas déjà présent dans le panier
    else{

        // Ajout de l'article au panier
        cart.push(itemClient);
        //Array.from(cart).push(itemClient);

        // Sauvegarde du panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Renvoi vers la page "Panier"
        window.location.href = "cart.html";
    }
})









