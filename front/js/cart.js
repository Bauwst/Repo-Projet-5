let page = JSON.parse(localStorage.getItem('cart'));
console.table(page);






/*
function displayPanier(){
    for (let product in page){
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('product-id', page[product].item_id);

        let productImgDiv = document.createElement('div');
        productArticle.appendChild(productImgDiv);
        productImgDiv.className = "cart__item__img";

        let productImg = document.createElement('img');
        productImgDiv.appendChild(productImg);
        productImg.src = page[product].imageUrl;
        productImg.alt = page[product].altTxt;
    }
}*/