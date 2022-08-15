fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(productlist) {
        Canapes(productlist);
        console.table(productlist);
    })
    .catch(function(error) {
        document.querySelector(".titles").innerHTML = "<p> Erreur </p>";
        console.log(error);
    })

function Canapes(index) {
    let itemzone = document.querySelector("#items");
    for (let article of index){
        itemzone.innerHTML += `<a href="./product.html?_id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a>`;
    }
    } 

