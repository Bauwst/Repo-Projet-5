const page = document.location.href;

if (page.match("cart")){
    fetch("http://localhost:3000/api/products")
    .then((res) => {
        return res.json();
    })
    .then(function(productlist) {
        displayPanier(productlist);
        console.table(productlist);
    })
    .catch(function(error) {
        document.querySelector("#cartAndFormContainer").innerText = "Erreur";
        console.log(error);
    })
}

function displayPanier(){
    let panier = window.localStorage.getItem('product');
    console.log(panier);
}