let panier = JSON.parse(localStorage.getItem('cart'));
console.table(panier);

let infoPrice = [];
let infoQuantity = [];
let products = [];

let form = document.querySelector(".cart__order__form");

let btnOrder = document.getElementById("order");

let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
 
let prénomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,32}$', 'g');
let nomRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,42}$', 'g');
let villeRegExp =  new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,50}$', 'g');
let adresseRegExp = new RegExp ('^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]{2,60}$', 'g');
let emailRegExp =  new RegExp('^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,60}$','g');
/*let emailRegExp = RegExp("^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,60}$");*/

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function removeItemPanier(){
    let btnDelete = document.querySelectorAll('.deleteItem');

    for (let x = 0; x < btnDelete.length; x++ ) { 
        btnDelete[x].addEventListener("click", () => { 
            let deleteId = panier[x]._id;
            let deleteColor = panier[x].color;
            panier = panier.filter(pan => pan._id != deleteId || pan.color != deleteColor);
            localStorage.setItem('cart', JSON.stringify(panier));
            location.reload();       
        })
    }
}

function adjustQuantity() {
    let modifQuantity = document.querySelectorAll('.itemQuantity')

    for (let q = 0; q < modifQuantity.length; q++){
        modifQuantity[q].addEventListener("change", () => {
            let quantityId = panier[q]._id;
            let quantityColor = panier[q].color;
            let newQuantity = parseInt(modifQuantity[q].value);

            if(modifQuantity[q].value == 0) {
                panier = panier.filter(pan => pan._id != quantityId || pan.color != quantityColor);
                localStorage.setItem('cart', JSON.stringify(panier));
                location.reload(); 
            }
            else if (modifQuantity[q].value <= 100){
                let itemQtyAdjust = panier.find(iqa => iqa._id === quantityId && iqa.color === quantityColor);
                itemQtyAdjust.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(panier));
                location.reload();
            } else {
                window.alert("Quantitée invalide");
            }
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

form.firstName.addEventListener('change', () => {
    let errorMsg = document.getElementById("firstNameErrorMsg");
    if (prénomRegExp.test(this.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})

form.lastName.addEventListener('change', () => {
    let errorMsg = document.getElementById("lastNameErrorMsg");
    if (nomRegExp.test(this.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})

form.address.addEventListener('change', () => {
    let errorMsg = document.getElementById("addressErrorMsg");
    if (adresseRegExp.test(this.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})

form.city.addEventListener('change', () => {
    let errorMsg = document.getElementById("cityErrorMsg");
    if (villeRegExp.test(this.value)){
        errorMsg.innerText = "Valide";
        return true;
    } else {
        errorMsg.innerText = "Incorrect";
        return false;
    }
})

form.email.addEventListener('change', () => {
    let errorMsg = document.getElementById("emailErrorMsg");
    if (emailRegExp.test(this.value)){
        errorMsg.textContent = "Valide";
        return true;
    } else {
        errorMsg.textContent = "Incorrect";
        return false;
    }
})

///////////////////////////////////////////////////

btnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (prénomRegExp.test == true && 
        nomRegExp.test == true &&
        adresseRegExp.test == true &&
        villeRegExp.test == true &&
        emailRegExp.test == true) {
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
 































    












            
        
       
        
    
