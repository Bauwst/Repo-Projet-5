// Récupération de l'ID de la commande à afficher via l'Url de la page
let orderId = (new URL(document.location)).searchParams.get("orderId");

//Insertion de l'ID de la commande dans le DOM
document.getElementById("orderId").textContent = orderId;