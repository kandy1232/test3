// ===== AqwaGel Admin Panel JavaScript =====

const ADMIN_PASSWORD = 'admin123';
let isLoggedIn = false;

// ===== AqwaGel Admin Panel JavaScript =====

const ADMIN_PASSWORD = 'admin123';
let isLoggedIn = false;

function login() {
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) return;
    const password = passwordInput.value;
    if (password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        localStorage.setItem('aqwagel_admin', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
    } else {
        alert('Incorrect password! Try: admin123');
    }
}

// Allow Enter key to login
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') login();
        });
    }
    checkLogin();

    // Load settings into form
    const settings = getSettings();
    const businessNameInput = document.getElementById('settingBusinessName');
    const addressInput = document.getElementById('settingAddress');
    const phoneInput = document.getElementById('settingPhone');

    if (businessNameInput) businessNameInput.value = settings.businessName;
    if (addressInput) addressInput.value = settings.address;
    if (phoneInput) phoneInput.value = settings.phone;
});
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        localStorage.setItem('aqwagel_admin', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
    } else {
        alert('Incorrect password!');
    }
}

function logout() {
    isLoggedIn = false;
    localStorage.removeItem('aqwagel_admin');
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

function checkLogin() {
    const loggedIn = localStorage.getItem('aqwagel_admin');
    if (loggedIn === 'true') {
        isLoggedIn = true;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
    }
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');

    if (tabName === 'products') {
        loadAdminProducts();
    }
}

function loadAdminProducts() {
    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;

    const products = getProducts();
    const filter = document.getElementById('adminCategoryFilter')?.value || 'all';

    let filtered = products;
    if (filter !== 'all') {
        filtered = products.filter(p => p.category === filter);
    }

    tbody.innerHTML = filtered.map(p => {
        const cat = categories[p.category] || { name: p.category };
        return '<tr>' +
            '<td><img src="' + (p.image || '') + '" alt="" onerror="this.src=''; this.style.display='none'"></td>' +
            '<td>' + p.name + '</td>' +
            '<td>' + cat.name + '</td>' +
            '<td>LKR ' + p.price.toLocaleString() + '</td>' +
            '<td>' +
                '<select onchange="updateStock('' + p.id + '', this.value)">' +
                    '<option value="In Stock" ' + (p.stock === 'In Stock' ? 'selected' : '') + '>In Stock</option>' +
                    '<option value="Low Stock" ' + (p.stock === 'Low Stock' ? 'selected' : '') + '>Low Stock</option>' +
                    '<option value="Out of Stock" ' + (p.stock === 'Out of Stock' ? 'selected' : '') + '>Out of Stock</option>' +
                '</select>' +
            '</td>' +
            '<td>' + p.rating + ' ⭐ (' + p.reviews + ')</td>' +
            '<td>' +
                '<button onclick="editProduct('' + p.id + '')" class="btn btn-small btn-secondary">Edit</button> ' +
                '<button onclick="deleteProduct('' + p.id + '')" class="btn btn-small btn-danger">Delete</button>' +
            '</td>' +
        '</tr>';
    }).join('');
}

function filterAdminProducts() {
    loadAdminProducts();
}

function updateStock(productId, stock) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = stock;
        saveProducts(products);
    }
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    let products = getProducts();
    products = products.filter(p => p.id !== productId);
    saveProducts(products);
    loadAdminProducts();
}

function addProduct() {
    const name = document.getElementById('newProductName').value;
    const nameSi = document.getElementById('newProductNameSi').value;
    const category = document.getElementById('newProductCategory').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const stock = document.getElementById('newProductStock').value;
    const image = document.getElementById('newProductImage').value;
    const description = document.getElementById('newProductDesc').value;
    const metaTitle = document.getElementById('newMetaTitle').value;
    const metaDesc = document.getElementById('newMetaDesc').value;
    const metaTitleSi = document.getElementById('newMetaTitleSi').value;
    const metaDescSi = document.getElementById('newMetaDescSi').value;

    if (!name || !price) {
        alert('Please fill in product name and price!');
        return;
    }

    const products = getProducts();
    const newId = category + '-' + (Date.now());

    products.push({
        id: newId,
        name: name,
        nameSi: nameSi || name,
        category: category,
        price: price,
        stock: stock,
        rating: 0,
        reviews: 0,
        image: image,
        description: description,
        metaTitle: metaTitle || name + ' | AqwaGel',
        metaDesc: metaDesc || description,
        metaTitleSi: metaTitleSi || nameSi + ' | AqwaGel',
        metaDescSi: metaDescSi || description
    });

    saveProducts(products);
    alert('Product added successfully!');
    document.getElementById('addProductForm').reset();
    showTab('products');
}

function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newName = prompt('Product Name:', product.name);
    if (newName === null) return;

    const newPrice = prompt('Price (LKR):', product.price);
    if (newPrice === null) return;

    product.name = newName;
    product.price = parseFloat(newPrice);

    saveProducts(products);
    loadAdminProducts();
}

function saveSiteSettings() {
    const settings = {
        businessName: document.getElementById('settingBusinessName').value,
        address: document.getElementById('settingAddress').value,
        phone: document.getElementById('settingPhone').value,
        email: 'info@aqwagel.com',
        whatsapp: document.getElementById('settingPhone').value.replace(/\D/g, '')
    };

    localStorage.setItem('aqwagel_settings', JSON.stringify(settings));
    alert('Settings saved!');
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();

    // Load settings into form
    const settings = getSettings();
    const businessNameInput = document.getElementById('settingBusinessName');
    const addressInput = document.getElementById('settingAddress');
    const phoneInput = document.getElementById('settingPhone');

    if (businessNameInput) businessNameInput.value = settings.businessName;
    if (addressInput) addressInput.value = settings.address;
    if (phoneInput) phoneInput.value = settings.phone;
});
