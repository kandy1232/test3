// ===== AqwaGel Category Page JavaScript =====

let currentProducts = [];
let currentPage = 1;
const productsPerPage = 12;
let currentCategory = '';

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadCategory() {
    const catKey = getUrlParam('cat');
    if (!catKey || !categories[catKey]) {
        document.getElementById('categoryTitle').textContent = 'All Products';
        document.getElementById('categorySubtitle').textContent = 'Browse our complete collection';
        currentProducts = getProducts();
    } else {
        currentCategory = catKey;
        const cat = categories[catKey];
        document.getElementById('categoryTitle').textContent = cat.name;
        document.getElementById('categorySubtitle').textContent = cat.nameSi;
        document.getElementById('pageTitle').textContent = cat.name + ' - AqwaGel';

        const allProducts = getProducts();
        currentProducts = allProducts.filter(p => p.category === catKey);
    }

    currentPage = 1;
    displayProducts();
}

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');

    if (!grid) return;

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = currentProducts.slice(start, end);

    if (pageProducts.length === 0) {
        grid.innerHTML = '<div style="text-align:center; padding:40px; color:#6c757d;"><h3>No products found</h3></div>';
        pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = pageProducts.map(p => createProductCard(p)).join('');

    // Pagination
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    let paginationHtml = '';

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
        }
    }

    pagination.innerHTML = paginationHtml;
}

function goToPage(page) {
    currentPage = page;
    displayProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const allProducts = getProducts();

    if (!query) {
        if (currentCategory) {
            currentProducts = allProducts.filter(p => p.category === currentCategory);
        } else {
            currentProducts = allProducts;
        }
    } else {
        currentProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.nameSi.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    currentPage = 1;
    displayProducts();
}

function sortProducts() {
    const sort = document.getElementById('sortSelect').value;

    if (sort === 'price-low') {
        currentProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        currentProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        currentProducts.sort((a, b) => b.rating - a.rating);
    }

    currentPage = 1;
    displayProducts();
}

// Initialize category page
document.addEventListener('DOMContentLoaded', function() {
    loadCategory();
});
