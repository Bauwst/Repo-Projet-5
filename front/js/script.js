// Requête à l'API pour obtenir la liste des produits
fetch("http://localhost:3000/api/products")

    // Renvoi des informations en format JSON
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    
    // Insertion et affichage des élements reçus
    .then(function(productlist) {
        displayProducts(productlist);
        console.table(productlist);
    })

    // Message d'erreur en cas de non-réponse de l'API
    .catch(function(error) {
        document.querySelector(".titles").innerText = "Erreur";
        console.log(error);     
    })
    

/**  Création du DOM pour l'affichage de la liste des produits 
* @param { Array.<{ _id: String, name: String, price: Integer , imageUrl: String, altTxt:String, description: String }> } articles Array des différents produits
*/

function displayProducts(articles) {

    // Variable de la zone des articles
    let itemZone = document.querySelector("#items");

    // Création d'une boucle pour chaques élements des articles
    for (let element of articles){

        // Création d'une balise 'a'
        let a = document.createElement('a');
        // Définition du lien en fonction de l'ID de l'élement
        a.href = './product.html?id=' + element._id;

        // Création d'une div de type 'article'
        let article = document.createElement('article');

        // Création de la balise 'img'
        let img = document.createElement('img');
        // Définition des élements de la balise 'img' associés aux produits
        img.src = element.imageUrl;
        img.alt = element.altTxt;

        // Création d'une balise 'h3'
        let h3 = document.createElement("h3");
        // Définition de la classe et du contenu de la balise 'h3' associés aux produits
        h3.className = 'productName';
        h3.textContent = element.name;

        // Création d'une balise 'p'
        let p = document.createElement("p");
        // Définition de la classe et du contenu de la balise 'p' associés aux produits
        p.className = 'productDescription';
        p.textContent = element.description;

        // Définition des balises 'img', 'h3' et 'p' comme étant les enfants de 'article'
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);

        // Définition de 'article' comme étant l'enfant de 'a'
        a.appendChild(article);

        // Définition de 'a' comme étant l'enfant de 'itemZone' (div avec ID = #items)
        itemZone.appendChild(a);
    }
} 

 


