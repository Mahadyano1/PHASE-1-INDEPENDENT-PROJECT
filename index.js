document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.status.pizza/status.json';
    const pizzaStatusSection = document.getElementById('pizzaStatusSection');

    if (!pizzaStatusSection) {
        console.error('Element with ID "pizzaStatusSection" not found.');
        return; // Stop further execution if element not found
    }

    // Fetch pizza status data from API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if the response data contains the expected format
            if (!Array.isArray(data.status)) {
                throw new Error('Invalid data format: "status" array not found');
            }

            // Update pizzas array with status items
            const pizzas = data.status;

            // Display pizza status information with cover images
            renderPizzaStatus(pizzas);
        })
        .catch(error => {
            console.error('Error fetching pizza status:', error);
            pizzaStatusSection.innerHTML = '<p>Failed to fetch pizza status. Please try again later.</p>';
        });

    // Function to render pizza status information with cover images
    function renderPizzaStatus(pizzaArray) {
        pizzaStatusSection.innerHTML = ''; // Clear existing content

        // Loop through each pizza item
        pizzaArray.forEach(pizza => {
            // Create a div element for each pizza item
            const pizzaDiv = document.createElement('div');
            pizzaDiv.classList.add('pizza-item');
            pizzaDiv.dataset.pizzaId = pizza.id; // Set the pizza ID as a data attribute for identification

            // Create an image element for the cover image
            const imgElement = document.createElement('img');
            imgElement.src = pizza.cover_image; // Set the image source
            imgElement.alt = pizza.name; // Set the alt text for accessibility
            imgElement.classList.add('pizza-cover-image');

            // Create a strong element for pizza name and append cover image
            const nameElement = document.createElement('strong');
            nameElement.textContent = pizza.name;

            // Append the image and name elements to the pizza div
            pizzaDiv.appendChild(imgElement);
            pizzaDiv.appendChild(nameElement);

            // Append the pizza div to the pizza status section
            pizzaStatusSection.appendChild(pizzaDiv);
        });
    }
});