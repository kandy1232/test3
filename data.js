// ===== AqwaGel Data Management =====

const categories = {
    'world-map': { name: 'World Map Poster', nameSi: 'ලෝක සිතියම් පෝස්ටර්', icon: '🌍' },
    'sri-lanka-map': { name: 'Sri Lankan Map', nameSi: 'ශ්‍රී ලංකා සිතියම', icon: '🇱🇰' },
    'solar-system': { name: 'Solar System', nameSi: 'සෞරග්‍රහ මණ්ඩලය', icon: '🪐' },
    'human-body': { name: 'Human Body Chart', nameSi: 'මිනිස් ශරීරයේ අවයව පටිගත', icon: '🫀' },
    'coloring-poster': { name: 'Giant Coloring Poster', nameSi: 'යෝධ පැහැ දැමීමේ පෝස්ටර්', icon: '🖍️' },
    'sinhala-alphabet': { name: 'Sinhala Alphabet Chart', nameSi: 'සිංහල අක්ෂර', icon: 'අ' },
    'multiplication': { name: 'Multiplication Table', nameSi: 'ගුණ කිරීමේ වගුව', icon: '✖️' },
    'national-symbols': { name: 'Sri Lanka National Symbols', nameSi: 'ශ්‍රී ලංකාවේ ජාතික සංකේත', icon: '🏛️' },
    'history': { name: 'History of Sri Lanka', nameSi: 'ලංකාවේ ඉතිහාසය', icon: '📜' },
    'insects': { name: 'World of Insects', nameSi: 'කීට සත්වයන්ගේ ලෝකය', icon: '🦋' },
    'animals': { name: 'World of Animals', nameSi: 'සත්වයන්ගේ ලෝකය', icon: '🦁' },
    'stationery': { name: 'Educational Stationery Set', nameSi: 'අධ්‍යාපනික ලිපි උපකරණ කට්ටලය', icon: '✏️' }
};

function generateProducts() {
    const products = [];
    const catKeys = Object.keys(categories);

    catKeys.forEach(catKey => {
        const cat = categories[catKey];
        const count = 12; // Generate 12 products per category for demo

        for (let i = 1; i <= count; i++) {
            const prices = [450, 650, 850, 1200, 1500, 1800, 2200, 2800, 3500, 4200];
            const price = prices[Math.floor(Math.random() * prices.length)];
            const stockOptions = ['In Stock', 'In Stock', 'In Stock', 'Low Stock', 'Out of Stock'];
            const stock = stockOptions[Math.floor(Math.random() * stockOptions.length)];
            const rating = (3.5 + Math.random() * 1.5).toFixed(1);
            const reviews = Math.floor(Math.random() * 50) + 5;

            products.push({
                id: catKey + '-' + i,
                name: cat.name + ' - Design ' + i,
                nameSi: cat.nameSi + ' - නිර්මාණ ' + i,
                category: catKey,
                price: price,
                stock: stock,
                rating: parseFloat(rating),
                reviews: reviews,
                image: '',
                description: 'High quality ' + cat.name.toLowerCase() + ' for children. Printed on premium material with vibrant colors.',
                metaTitle: cat.name + ' - Design ' + i + ' | AqwaGel',
                metaDesc: 'Buy ' + cat.name + ' Design ' + i + ' from AqwaGel. Premium educational posters by Artyhomes Pvt Ltd.',
                metaTitleSi: cat.nameSi + ' - නිර්මාණ ' + i + ' | AqwaGel',
                metaDescSi: 'AqwaGel වෙතින් ' + cat.nameSi + ' නිර්මාණ ' + i + ' මිලදී ගන්න. Artyhomes Pvt Ltd හි ප්‍රීමියම් අධ්‍යාපනික පෝස්ටර්.'
            });
        }
    });

    return products;
}

function getProducts() {
    const stored = localStorage.getItem('aqwagel_products');
    if (stored) {
        return JSON.parse(stored);
    }
    const defaultProducts = generateProducts();
    localStorage.setItem('aqwagel_products', JSON.stringify(defaultProducts));
    return defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem('aqwagel_products', JSON.stringify(products));
}

function getSettings() {
    const stored = localStorage.getItem('aqwagel_settings');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        businessName: 'AqwaGel by Artyhomes Pvt Ltd',
        address: 'No 17, Wikramasinghepura, Battaramulla',
        phone: '+94 71 729 9504',
        email: 'info@aqwagel.com',
        whatsapp: '94717299504'
    };
}

function saveSettings(settings) {
    localStorage.setItem('aqwagel_settings', JSON.stringify(settings));
}

function resetData() {
    localStorage.removeItem('aqwagel_products');
    localStorage.removeItem('aqwagel_settings');
    location.reload();
}

function exportData() {
    const data = {
        products: getProducts(),
        settings: getSettings(),
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aqwagel-data-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
}
