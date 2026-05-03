// ===== AqwaGel Main JavaScript =====

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '⭐';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '⭐';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

function getStockClass(stock) {
    if (stock === 'In Stock') return 'stock-in';
    if (stock === 'Low Stock') return 'stock-low';
    return 'stock-out';
}

function createProductCard(product) {
    const cat = categories[product.category] || { icon: '📦' };
    const imageHtml = product.image 
        ? '<img src="' + product.image + '" alt="' + product.name + '" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">'
        : '';

    return '<div class="product-card">' +
        imageHtml +
        '<div class="product-image-placeholder" style="display:' + (product.image ? 'none' : 'flex') + '">' +
            '<span>' + cat.icon + '</span>' +
        '</div>' +
        '<div class="product-info">' +
            '<div class="product-name">' + product.name + '</div>' +
            '<div class="product-name-si">' + product.nameSi + '</div>' +
            '<div class="product-price">LKR ' + product.price.toLocaleString() + '</div>' +
            '<span class="product-stock ' + getStockClass(product.stock) + '">' + product.stock + '</span>' +
            '<div class="product-rating">' +
                '<span class="stars">' + getStars(product.rating) + '</span>' +
                '<span>(' + product.reviews + ')</span>' +
            '</div>' +
            '<div class="product-actions">' +
                '<a href="https://wa.me/94717299504?text=I want to customize: ' + encodeURIComponent(product.name) + '" class="btn btn-primary btn-small" target="_blank">Customize</a>' +
                '<a href="https://wa.me/94717299504?text=I want to order: ' + encodeURIComponent(product.name) + ' (LKR ' + product.price + ')" class="btn btn-whatsapp btn-small" target="_blank">Order</a>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const products = getProducts();
    const featured = products.slice(0, 8);

    container.innerHTML = featured.map(p => createProductCard(p)).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.getElementById('navLinks');
        const toggle = document.querySelector('.mobile-toggle');
        if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
});
