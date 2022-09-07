let orderId = (new URL(document.location)).searchParams.get("orderId");

document.getElementById("orderId").textContent = orderId;