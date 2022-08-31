fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(productlist) {
        displayProducts(productlist);
        console.table(productlist);
    })
    .catch(function(error) {
        document.querySelector(".titles").innerText = "Erreur";
        console.log(error);
    })


function displayProducts(articles) {
    let itemzone = document.querySelector("#items");
    for (let element of articles){
        let a = document.createElement('a');
        a.href = './product.html?id=' + element._id;
        let article = document.createElement('article');
        let img = document.createElement('img');
        img.src = element.imageUrl;
        img.alt = element.altTxt;
        let h3 = document.createElement("h3");
        h3.className = 'productName';
        h3.textContent = element.name;
        let p = document.createElement("p");
        p.className = 'productDescription';
        p.textContent = element.description;
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
        a.appendChild(article);
        itemzone.appendChild(a);
    }
} 

 


