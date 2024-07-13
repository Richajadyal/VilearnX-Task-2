// Add event listeners to search bar and filter bar
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[type="search"]');
    const searchButton = document.querySelector('button[type="submit"]');
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const productList = document.querySelector('.product-grid');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        // Perform search query
        fetch(`https://example.com/api/search?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const products = data.products;
                productList.innerHTML = '';
                products.forEach(product => {
                    const productHTML = `
                        <li>
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                            <button>Add to Cart</button>
                        </li>
                    `;
                    productList.innerHTML += productHTML;
                });
            })
            .catch(error => console.error(error));
    });

    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const filterValue = checkbox.id;
            const products = productList.children;
            products.forEach(product => {
                if (filterValue === 'price-asc') {
                    product.style.order = product.querySelector('p').textContent;
                } else if (filterValue === 'price-desc') {
                    product.style.order = -product.querySelector('p').textContent;
                } else if (filterValue === 'brand') {
                    if (product.querySelector('h3').textContent.includes(checkbox.value)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                }
            });
        });
    });
});