// Récupération des articles dans le panier via le localStorage
let panier = JSON.parse(localStorage.getItem('cart'));
// Affichage des informations du panier dans la console
console.table(panier);

//Définition des variables globales
let form = document.querySelector(".cart__order__form");
let btnOrder = document.getElementById("order");


// Définition des Regex pour la validation des champs du formulaire
let prenomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,32}$');
let nomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,42}$');
let villeRegExp =  new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,50}$');
let adresseRegExp = new RegExp ('^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]{2,60}$');
let emailRegExp =  new RegExp('^[a-zA-Z0-9.-_-]+@[a-zA-Z0-9.-_]+.[a-z]{2,}$');


/////////////////////////////////////////////////////////////////////////----- AFFICHAGE PANIER -----//////////////////////////////////////////////////////////////////////////////////

/**  Affichage des produits sélectionnés dans le panier 
* @param {  Array.<{_id:String, name:String, price:Integer , imageUrl: String, altTxt:String, description:String}> } products Array contenant l'ensemble des informations du panier
*/
function displayPanier(products) {  

    // Selection de la zone d'affichage du panier
    let cartZone = document.getElementById("cart__items");
    cartZone.innerHTML = "";

    // Boucle pour une création par ensemble d'article différents dans le panier
    for (let i in products) {
        
        let article = products[i];
        console.log(products[i]);

        // Récupération des valeurs de prix et de quantité 
        var quantity = article.quantity;
        var price = article.price;

        // Création du DOM de la zone d'article
        let articleZone = document.createElement('article');
        articleZone.className = 'cart__item';

        articleZone.setAttribute('data-id', article._id);
        articleZone.setAttribute('data-color', article.color);

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
        pColor.textContent = article.color;

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
        inputQuantity.value = article.quantity;

        // Appel de la fonction qui concerne l'ajustement de la quantité
        adjustQuantity(inputQuantity, i);

        let settingDelete = document.createElement('div');
        settingDelete.className = 'cart__item__content__settings__delete';
        
        let pDelete = document.createElement('p');
        pDelete.className = 'deleteItem';
        pDelete.textContent = 'Supprimer';
        
        // Appel de la fonction qui concerne la suppréssion d'un item directement dans le panier
        removeItemPanier(pDelete, i);

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

        // Appel de la fonction qui calcule le prix total du panier
        totalPanier(panier);
           
        }
    }

displayPanier(panier);

////////////////////////////////////////////////////////////////////////////----- FONCTIONS -----/////////////////////////////////////////////////////////////////////////////////////////////

/**  Création d'une fonction qui permet l'affichage du prix total du panier en fonction des prix et de la quantité des articles
* @param { Object } cart 
*/

function totalPanier(cart){

    //Récupération des balises via leur ID pour l'affichage des infos
    let totalQuantity = document.getElementById('totalQuantity');
    let totalPrice = document.getElementById('totalPrice');

    // Déclaration des variable de prix total et quantité totale
    let quantitéTotale = 0;
    let prixTotal = 0;

    // Boucle servant à récupérer les infos des produits
    for(let i in cart) {

        // Calculs de la quantité et du prix total
        quantitéTotale += parseInt(cart[i].quantity);
        prixTotal += parseInt(cart[i].quantity) * cart[i].price;
    }

    // Insertion des infos dans le DOM
    totalQuantity.innerText = quantitéTotale;
    totalPrice.innerText = prixTotal;
}

/** Création d'une fonction permettant de supprimer un article du panier
 * @param { Object } btnDelete Correspond au bouton "supprimer" de l'article ciblé
 * @param { Number } x Correspond à l'article ciblé dans notre panier
 * */
function removeItemPanier(btnDelete,x){

    // Ecoute du bouton 'Supprimer'
    btnDelete.addEventListener("click", () => { 
        
        // Récupération de l'Id et de la couleur du produit dans le panier
        let deleteId = panier[x]._id;
        let deleteColor = panier[x].color;
        console.log(deleteId);
        console.log(deleteColor);

        // Conserve les produits ne correspondant pas aux caractéristiques du produit récupéré 
        panier = panier.filter(pan => {
            return !(pan._id == deleteId && pan.color == deleteColor) 
        });
        
        // Sauvegarde de la modification du panier
        localStorage.setItem('cart', JSON.stringify(panier));

        displayPanier(panier);    
    })
}

/**  Création d'une fonction permettant d'ajuster la quantité d'un article dans la panier
 * @param { HTMLInputElement } inputQuantity Correspond à l'input "quantité" de l'article ciblé
 * @param { Number } x Correspond à l'article ciblé dans notre panier
 * */
function adjustQuantity(inputQuantity ,x) {

        // Ecoute du/des champ(s) "quantité"
        inputQuantity.addEventListener("change", () => {

            // Récupération de l'Id et de la couleur du produit dans le panier
            let quantityId = panier[x]._id;
            let quantityColor = panier[x].color;

            // Réupération de la quantité du champ écouté
            let newQuantity = parseInt(inputQuantity.value);

            // Si la quantitée modifiée est = 0 , l'article est supprimer du panier
            if(inputQuantity.value == 0) {

                // Conserve les détails des produits ne correspondant pas aux caractéristiques du produit récupéré 
                panier = panier.filter(pan => pan._id != quantityId || pan.color != quantityColor);

                // Sauvegarde de la modification du panier
                localStorage.setItem('cart', JSON.stringify(panier));

                displayPanier(panier);
            }

            // Si la quantité est inférieure à 100 , modification de la quantité
            else if (inputQuantity.value <= 100){

                // Conserve les détails des produits ne correspondant pas aux caractéristiques du produit récupéré 
                let itemQtyAdjust = panier.find(iqa => iqa._id === quantityId && iqa.color === quantityColor);

                // Modification de la valeur de 'quantity'
                itemQtyAdjust.quantity = newQuantity;

                // Sauvegarde de la modification du panier
                localStorage.setItem('cart', JSON.stringify(panier));

                displayPanier(panier);
            }

            // Si la quantitée est donc supérieure à 100, envoie d'un message d'erreur 
            else {
                window.alert("Quantitée invalide");
            }
        })
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

    // Prévention du comportement par default du formulaire
    e.preventDefault();

        // Vérification du formulaire
        if (prenomRegExp.test(form.firstName.value) && 
            nomRegExp.test(form.lastName.value)  &&
            adresseRegExp.test(form.address.value) &&
            villeRegExp.test(form.city.value) &&
            emailRegExp.test(form.email.value)) {        

        // Création d'un Array à envoyer à l'API    
        let products = [];
            
            // Boucle itérant les articles dans le panier pour récupérer leur id
            for (let pr = 0; pr < panier.length; pr++) {
                products.push(panier[pr]._id);

            }

            // Création d'un objet "clientOrder" qui contient le tableau de produits et les informations du contact
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


            // Envois des informations à l'API
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(clientOrder),
                headers: {
                    "content-Type": "application/json"
                }
            })

            // Renvoi de la réponse de l'API
            .then((res) => res.json())

            // Définition de "data", suppression du localStorage et redirection vers la page de confirmation
            .then((data) => {
                console.log(data);
                localStorage.clear();
                window.location.href = `confirmation.html?orderId=${data.orderId}`;
            })
            .catch((error) => {

                // Insertion d'un message "Erreur" sur la page
                document.getElementById("cartAndFormContainer").textContent = "Erreur"; 
                console.log("Erreur:" + error) 
           });
        } else {
            // Message d'erreur si le formulaire est mal remplis
            window.alert("Veuillez correctement completer et vérifier le formulaire svp");
    }
})
 































    












            
        
       
        
    
