const data = {
    Birthday: {
        items: ["Balloons", "BalloonArch", "Banner", "Signs", "Centerpieces", "Backdrops", "Photo Booths"],
        services: ["Event Design", "Venue Decoration", "Balloon Arrangements"]
    },
    BabyShower: {
        items: ["Balloons", "BallonArch", "Banner", "Signs", "Photo Booths", "Backdrops", "Photo Booths"],
        services: ["Event Design", "Table & Chair Decorations"]
    },
    Graduation: {
        items: ["Balloons", "Signs", "Lights & Drapes", "Flowers & Props"],
        services: ["Event Design", "Event Cleanup"]
    },
    Wedding: {
        items: ["Balloons", "BalloonArch", "Signs", "Banner", "Flowers & Props", "Centerpieces", "Backdrops", "Photo Booths"],
        services: ["Event Design", "Balloon Arrangements", "Event Cleanup"]
    }
};

function updateItems() {
    // 1. Find the selected Event Type
    const selectedType = document.querySelector('input[name="eventGroup"]:checked');
    
    if (selectedType) {
        const typeValue = selectedType.value;
        const allItemCards = document.querySelectorAll('.item-card');

        allItemCards.forEach(card => {
            if (card.classList.contains(typeValue)) {
                card.style.display = "block"; 
                card.classList.add('active');
            } else {
                card.style.display = "none"; 
                card.classList.remove('active');
                
                const checkboxInside = card.querySelector('input[type="checkbox"]');
                if (checkboxInside) checkboxInside.checked = false;
            }
        });
    }

    // 2. CALCULATE TOTAL
    let totalPrice = 0;

    const checkedBoxes = document.querySelectorAll('.item-card.active input[type="checkbox"]:checked');
    checkedBoxes.forEach(box => {
        totalPrice += parseFloat(box.getAttribute('data-price')) || 0;
    });

    const selectedService = document.querySelector('input[name="serviceGroup"]:checked');
    if (selectedService) {
        totalPrice += parseFloat(selectedService.getAttribute('data-price')) || 0;
    }

    const display = document.getElementById('totalDisplay');
    if (display) {
        display.innerText = "$" + totalPrice.toLocaleString();
    }
}

/* ADD TO CART */
function addToCart() {
    const btn = document.getElementById('productBtn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        // Find the selected elements
        const selectedType = document.querySelector('input[name="eventGroup"]:checked');
        const selectedService = document.querySelector('input[name="serviceGroup"]:checked');
        const selectedItems = Array.from(document.querySelectorAll('.item-card.active input:checked'))
                                   .map(cb => cb.value);

        // --- SAFETY CHECK (Validation) ---
        // This prevents the error "Cannot read properties of null (reading 'value')"
        if (!selectedType || !selectedService || selectedItems.length === 0) {
            alert("Please pick an Event, at least one Item, and a Service!");
            return; // Stop the code here
        }

        // 1. Gather all the data into an object
        const cartData = {
            event: selectedType.value,
            service: selectedService.value,
            items: selectedItems,
            total: document.getElementById('totalDisplay').innerText
        };

        // 2. Push to storage
        localStorage.setItem('userCart', JSON.stringify(cartData));

        // 3. Jump to the next page
        window.location.href = "Cart.html"; 
    });
}

// 3. INITIALIZE (Merged the two listeners into one clean block)
window.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to all inputs so the price updates instantly
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', updateItems);
    });

    addToCart();
    updateItems(); // Initial run
});




/* LOAD CART */

document.addEventListener("DOMContentLoaded", loadCart);

function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart"));

let cartDisplay = document.getElementById("cartDisplay");

if(!cartDisplay) return;

if(!cart){
cartDisplay.innerHTML = "<p>Your cart is empty.</p>";
return;
}

cartDisplay.innerHTML = `
<p><strong>Event:</strong> ${cart.event}</p>
<p><strong>Item:</strong> ${cart.items}</p>
<p><strong>Service:</strong> ${cart.service}</p>

<div class="quantityBox">
<button onclick="decreaseQty()">-</button>
<span id="qty">${cart.quantity}</span>
<button onclick="increaseQty()">+</button>
</div>
`;

}



function clearCart(){

    localStorage.removeItem("cart");

    let cartDisplay = document.getElementById("cartDisplay");

    if(cartDisplay){
    cartDisplay.innerHTML = "<p>Your cart is empty.</p>";
    }

}