// Récupération des articles dans le panier via le localStorage
let panier = JSON.parse(localStorage.getItem('cart'));
// Affichage des informations du panier dans la console
console.table(panier);

//Définition des variables globales
let infoPrice = [];
let infoQuantity = [];
let form = document.querySelector(".cart__order__form");
let btnOrder = document.getElementById("order");
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');

// Définition des Regex pour la validation des champs du formulaire
let prenomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,32}$', 'g');
let nomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,42}$', 'g');
let villeRegExp =  new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,50}$', 'g');
let adresseRegExp = new RegExp ('^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]{2,60}$', 'g');
let emailRegExp =  new RegExp('^[a-zA-Z0-9.-_-]+@[a-zA-Z0-9.-_]+.[a-z]{2,}$','g');


/////////////////////////////////////////////////////////////////////////----- AFFICHAGE PANIER -----//////////////////////////////////////////////////////////////////////////////////


function displayPanier(index) {  
    let cartZone = document.getElementById("cart__items");
    for (let panier of index) {

        fetch("http://localhost:3000/api/products/" + panier._id)

        .then((res) => res.json()

        .then((article) => {

            var quantity = panier.quantity;
            var price = article.price;

            let articleZone = document.createElement('article');
            articleZone.className = 'cart__item';
            articleZone.setAttribute('data-id', panier._id);
            articleZone.setAttribute('data-color', panier.color);

            let imgDiv = document.createElement('div');
            imgDiv.className ='cart__item__img';
            
            let img = document.createElement('img');
            img.src = article.imageUrl;
            img.alt = article.altTxt;
            
            let divContent = document.createElement('div');
            divContent.className = 'cart__item__content';
            
            let divDescription = document.createElement('div');
            divDescription.className ='cart__item__content__description';
            
            let h2 = document.createElement('h2');
            h2.textContent = article.name;

            let pColor = document.createElement('p');
            pColor.textContent = panier.color;

            let pPrice = document.createElement('p');
            pPrice.textContent = price*quantity + '€';

            let settings = document.createElement('div');
            settings.className = 'cart__item__content__settings';
            
            let settingQuantity = document.createElement('div');
            settingQuantity.className = 'cart__item__content__settings__quantity';
            
            let pQuantity = document.createElement('p');
            pQuantity.textContent = 'Qté :';

            let inputQuantity = document.createElement('input');
            inputQuantity.setAttribute('type','number');
            inputQuantity.className ='itemQuantity';
            inputQuantity.setAttribute('name', 'itemQuantity');
            inputQuantity.setAttribute('min', '0');
            inputQuantity.setAttribute('max', '100');
            inputQuantity.value = panier.quantity;

            let settingDelete = document.createElement('div');
            settingDelete.className = 'cart__item__content__settings__delete';
            
            let pDelete = document.createElement('p');
            pDelete.className = 'deleteItem';
            pDelete.textContent = 'Supprimer';
            
            articleZone.appendChild(imgDiv);
            imgDiv.appendChild(img);
            articleZone.appendChild(divContent);
            divContent.appendChild(divDescription);
            divDescription.appendChild(h2);
            divDescription.appendChild(pColor);
            divDescription.appendChild(pPrice);
            divContent.appendChild(settings);
            settings.appendChild(settingQuantity);
            settingQuantity.appendChild(inputQuantity);
            settingQuantity.appendChild(pQuantity);
            settings.appendChild(settingDelete);
            settingDelete.appendChild(pDelete);
            cartZone.appendChild(articleZone);

            totalPanier(quantity,price);
            removeItemPanier();
            adjustQuantity();
        }))
    }
}

displayPanier(panier);

////////////////////////////////////////////////////////////////////////////----- FONCTIONS -----/////////////////////////////////////////////////////////////////////////////////////////////

// Création d'une fonction qui permet l'affichage du prix total du panier en fonction des prix et de la quantité des articles
function totalPanier(quantity, price){
    let totalQuantity = document.getElementById('totalQuantity');
    let totalPrice = document.getElementById('totalPrice');
    let quantitéTotale = 0;
    let prixTotal = 0;
    let nombreQuantité = parseInt(quantity);

    infoQuantity.push({nombreQuantité});
    infoPrice.push({price});

    for(let info in infoPrice) {
        quantitéTotale += infoQuantity[info].nombreQuantité;
        prixTotal += (infoQuantity[info].nombreQuantité * infoPrice[info].price);
    }
    totalQuantity.innerText = quantitéTotale;
    totalPrice.innerText = prixTotal;
}

// Création d'une fonction permettant de supprimer un article du panier
function removeItemPanier(){

    // Définition du/des bouton(s) 'Supprimer'
    let btnDelete = document.querySelectorAll('.deleteItem');

    // Boucle itérant les occurences du bouton 'Supprimer'
    for (let x = 0; x < btnDelete.length; x++ ) { 

        // Ecoute du bouton 'Supprimer'
        btnDelete[x].addEventListener("click", () => { 
            
            // Récupération de l'Id et de la couleur du produit dans le panier
            let deleteId = panier[x]._id;
            let deleteColor = panier[x].color;

            // Conserve les produits ne correspondant pas aux caractéristiques du produit récupéré 
            panier = panier.filter(pan => !(pan._id == deleteId && pan.color == deleteColor));

            // Sauvegarde de la modification du panier
            localStorage.setItem('cart', JSON.stringify(panier));

            // Rechargement de la page
            location.reload();       
        })
    }
}

// Création d'une fonction permettant d'ajuster la quantité d'un article dans la panier
function adjustQuantity() {

    // Définition du/des champ(s) 'quantité'
    let modifQuantity = document.querySelectorAll('.itemQuantity')

    // Boucle itérant les occurences du champ "quantité"
    for (let q = 0; q < modifQuantity.length; q++){

        // Ecoute du/des champ(s) "quantité"
        modifQuantity[q].addEventListener("change", () => {

            // Récupération de l'Id et de la couleur du produit dans le panier
            let quantityId = panier[q]._id;
            let quantityColor = panier[q].color;

            // Réupération de la quantité du champ écouté
            let newQuantity = parseInt(modifQuantity[q].value);

            // Si la quantitée modifiée est = 0 , l'article est supprimer du panier
            if(modifQuantity[q].value == 0) {

                // Conserve les détails des produits ne correspondant pas aux caractéristiques du produit récupéré 
                panier = panier.filter(pan => pan._id != quantityId || pan.color != quantityColor);

                // Sauvegarde de la modification du panier
                localStorage.setItem('cart', JSON.stringify(panier));

                // Rechargement de la page
                location.reload(); 
            }

            // Si la quantité est inférieure à 100 , modification de la quantité
            else if (modifQuantity[q].value <= 100){

                // Conserve les détails des produits ne correspondant pas aux caractéristiques du produit récupéré 
                let itemQtyAdjust = panier.find(iqa => iqa._id === quantityId && iqa.color === quantityColor);

                // Modification de la valeur de 'quantity'
                itemQtyAdjust.quantity = newQuantity;

                // Sauvegarde de la modification du panier
                localStorage.setItem('cart', JSON.stringify(panier));

                // Rechargement de la page
                location.reload();
            }

            // Si la quantitée est donc supérieure à 100, envoie d'un message d'erreur 
            else {
                window.alert("Quantitée invalide");
            }
        })
    }
}

///////////////////////////////////////////////////////////////////////////////----- EVENTS LISTENERS -----/////////////////////////////////////////////////////////////////////////////////////////////////

// Ecoute du champ "prénom"
form.firstName.addEventListener('change', (e) => {

    // Définition du champ de message d'erreur
    let errorMsg = document.getElementById("firstNameErrorMsg");

    // Affichage de l'évenement dans la console
    console.log(e);

    // Test de la validité du champ via la regex
    if (prenomRegExp.test(e.target.value)){

        // Indication que le champ est 'Valide'
        errorMsg.innerText = "Valide";

        // Retourne la valeur 'true'
        return true;
    } 
    // Si le test échoue, 
    else {

        // Indication que le champ est 'Incorrect'
        errorMsg.innerText = "Incorrect";

        // Retourne la valeur 'false'
        return false;
    }
})


// Ecoute du champ "nom"
form.lastName.addEventListener('change', (e) => {
    let errorMsg = document.getElementById("lastNameErrorMsg");
    console.log(e);
    if (nomRegExp.test(e.target.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})


// Ecoute du champ "adresse"
form.address.addEventListener('change', (e) => {
    let errorMsg = document.getElementById("addressErrorMsg");
    console.log(e);
    if (adresseRegExp.test(e.target.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})


// Ecoute du champ "ville"
form.city.addEventListener('change', (e) => {
    let errorMsg = document.getElementById("cityErrorMsg");
    console.log(e);
    if (villeRegExp.test(e.target.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})


// Ecoute du champ "email"
form.email.addEventListener('change', (e) => {
    let errorMsg = document.getElementById("emailErrorMsg");
    console.log(e);
    if (emailRegExp.test(e.target.value)){
        errorMsg.textContent = "Valide";
        return true;
    } else {
        errorMsg.textContent = "Incorrect";
        return false;  
    }
    
})


// Ecoute du bouton "Commander"
btnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (prenomRegExp.test(form.firstName.value) && 
        nomRegExp.test(form.lastName.value) &&
        villeRegExp.test(form.city.value) &&
        adresseRegExp.test(form.address.value) &&
        emailRegExp.test(form.email.value)) {
        let products = [];
            for (let pr = 0; pr < panier.length; pr++) {
                products.push(panier[pr]._id);

            }
            let clientOrder = {
                contact : {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    email: document.getElementById('email').value,
                },
                products
            }

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(clientOrder),
                headers: {
                    "content-Type": "application/json"
                }
            })
            .then((res) => res.json())

            .then((data) => {
                console.log(data);
                localStorage.clear();
                window.location.href = `confirmation.html?orderId=${data.orderId}`;
            })
            .catch((error) => {
                document.getElementById("cartAndFormContainer").textContent = "Erreur"; 
                console.log("Erreur:" + error) 
           });
        } else {
            window.alert("Veuillez correctement completer et vérifier le formulaire svp");
    }
})
 































    












            
        
       
        
    
