const BASE_URL = 'https://fakestoreapi.com';

async function fetchProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayProducts(products) {
    const tableBody = document.getElementById('productBody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => showDetails(product));
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
            <td><img src="${product.image}" alt="thumb" width="30"></td>
        `;
        tableBody.appendChild(row);
    });
}

function showDetails(product) {
    const modal = document.getElementById('productModal');
    const details = document.getElementById('modalDetails');
    
    details.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" style="max-width:200px;">
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} reviews)</p>
        <p>${product.description}</p>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('productModal').style.display = "none";
};

window.onclick = (event) => {
    if (event.target == document.getElementById('productModal')) {
        document.getElementById('productModal').style.display = "none";
    }
};

fetchProducts();