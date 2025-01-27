let navbarko = document.querySelector('.navbarko');

    document.querySelector('#menu-btn').onclick = () =>{
        navbarko.classList.toggle('active');
        
    }

let cartStuff = document.querySelector('.cart-container');

    document.querySelector('#cart-btn').onclick = () =>{
        cartStuff.classList.toggle('active');
        navbarko.classList.remove('active');
        searchbarthing.classList.remove('active');
    }

let searchbarthing = document.querySelector('.searchbarthing');

    document.querySelector('#search-btn').onclick = () =>{
        searchbarthing.classList.toggle('active');
        navbarko.classList.remove('active');
        cartStuff.classList.remove('active');
    }

window.onscroll = () =>{
    navbarko.classList.remove('active');
    searchbarthing.classList.remove('active');
    cartStuff.classList.remove('active');
}

// Selectors
const addToCartButtons = document.querySelectorAll('.menu .boton');
const cartContainer = document.querySelector('.cart-container');
const cartContent = document.querySelector('.cart-container'); // Reference the container of cart items
const cartTotal = document.createElement('div'); // For total price display
cartTotal.className = 'cart-total'; // Style for total display
const emptyMessage = document.createElement('div'); // For "empty cart" message
emptyMessage.className = 'empty-message';
emptyMessage.innerText = 'Your cart is empty.';
cartContent.appendChild(emptyMessage);


let cart = [];

// add to cart function
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // get stuff details
        const itemName = button.parentElement.querySelector('h3').innerText;
        const itemPrice = button.parentElement.querySelector('.price').innerText;

        // add item to cart
        const item = { name: itemName, price: itemPrice };
        cart.push(item);
        renderCart();
    });
});

// render cart items
function renderCart() {
    cartContent.innerHTML = ''; // clear previous cart content for placeholder

    if (cart.length === 0) {
        // show "empty cart" message if no items
        cartContent.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cartstuff';

            cartItem.innerHTML = `
                <span class="fas fa-times" onclick="removeItem(${index})"></span>
                <img src="images/pizza1.jpg" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">${item.price}</div>
                </div>
            `;
            cartContent.appendChild(cartItem);
        });

        // proceed to payment button
        const paymentButton = document.createElement('button');
        paymentButton.className = 'boton';
        paymentButton.innerText = 'Proceed to Payment';
        paymentButton.onclick = showPaymentPopup;
        cartContent.appendChild(paymentButton);
    }
    updateCartTotal();
}

// remove item from cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item from cart array
    renderCart();
}

// ppdate total price
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);
    if (cart.length > 0) {
        cartTotal.innerText = `Total: ₱${total.toFixed(2)}`;
        cartContent.appendChild(cartTotal);
    } else {
        cartTotal.innerText = '';
    }
}

// show payment popup
function showPaymentPopup() {
    const paymentPopup = `
        <div class="payment-popup">
            <div class="popup-content">
                <h1>Payment</h1>
                <p>Your total is <strong>${cartTotal.innerText}</strong></p>
                <form class="payment-form">
                    <div class="input-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" required>
                    </div>
                    <div class="input-group">
                        <label for="address">Address:</label>
                        <input type="text" id="address" placeholder="Enter your address" required>
                    </div>
                    <div class="input-group">
                        <label for="phone">Phone Number:</label>
                        <input type="tel" id="phone" placeholder="Enter your phone number" required>
                    </div>
                    <div class="input-group">
                        <label>Payment Method:</label>
                        <div>
                            <input type="radio" id="cod" name="payment-method" value="COD" required>
                            <label for="cod">Cash on Delivery</label>
                        </div>
                        <div>
                            <input type="radio" id="card" name="payment-method" value="Card">
                            <label for="card">Card Payment</label>
                        </div>
                    </div>
                    <button type="button" class="boton" onclick="submitPayment()">Proceed</button>
                </form>
                <button class="boton" onclick="closePaymentPopup()">Close</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', paymentPopup);
}

// submit payment
function submitPayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

    if (!name || !address || !phone || !paymentMethod) {
        alert("Please fill in all fields.");
        return;
    }

    alert(`Thank you, ${name}! Your order will be delivered to ${address}. Payment Method: ${paymentMethod}`);
    closePaymentPopup();
}

// close payment popup
function closePaymentPopup() {
    const popup = document.querySelector('.payment-popup');
    if (popup) popup.remove();
}

renderCart();


// searchbarthing below

// selector for the search bar
const searchInput = document.querySelector('#searchbox');
const menuSection = document.querySelector('.menu'); // The section to search within

// search functionality
searchInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        const searchText = searchInput.value.trim().toLowerCase();

        // clear previous highlights
        clearHighlights(menuSection);

        if (searchText) {
            // highlight matches
            const firstMatch = highlightText(menuSection, searchText);

            if (firstMatch) {
                // scroll to the first match
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('No matches found!');
            }
        }
    }
});

// highlight matching text
function highlightText(container, text) {
    const regex = new RegExp(`(${text})`, 'gi');
    let firstMatch = null;

    container.querySelectorAll('*').forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.children.length === 0) {
            const originalText = node.innerHTML;
            if (regex.test(originalText)) {
                const highlightedText = originalText.replace(
                    regex,
                    '<span class="highlight">$1</span>'
                );
                node.innerHTML = highlightedText;

                // save the first match
                if (!firstMatch) {
                    firstMatch = node.querySelector('.highlight');
                }
            }
        }
    });

    return firstMatch;
}

// clear all highlights
function clearHighlights(container) {
    container.querySelectorAll('.highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}
