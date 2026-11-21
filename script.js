
// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});

// Shopping Cart
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to your cart!");
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.getElementById("cartCount").textContent = count;
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some delicious food!");
        return;
    }

    let message = "YOUR FOOD CART\n\n";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += `${item.name} x ${item.quantity} = ₹${subtotal}\n`;
    });

    message += `\nTotal Amount: ₹${total}`;
    alert(message);
}

// Food Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");
const searchInput = document.getElementById("searchInput");

let activeCategory = "All";

function filterFood() {
    const searchValue = searchInput.value.toLowerCase();
    let visibleCount = 0;

    foodCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const matchesCategory =
            activeCategory === "All" || category === activeCategory;

        const matchesSearch = name.includes(searchValue);

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResults").hidden = visibleCount !== 0;
}

// Filter button events
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
        activeCategory = button.dataset.filter;

        filterFood();
    });
});

// Search functionality
searchInput.addEventListener("input", filterFood);

// Category card click
document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        activeCategory = card.dataset.category;

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === activeCategory
            );
        });

        filterFood();

        document.getElementById("menu").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Newsletter Subscription
const subscribeForm = document.getElementById("subscribeForm");

subscribeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;

    document.getElementById("subscribeMessage").textContent =
        "Thank you! " + email + " has been subscribed successfully.";

    subscribeForm.reset();
});
