let pizzas = []; // Array to store pizza objects

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.status.pizza/status.json';
    const pizzaStatusSection = document.getElementById('pizzaStatusSection');

    // Fetch pizza status data from API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update pizzas array with status items
            pizzas = data.status;

            // Display pizza status information with cover images
            renderPizzaStatus(pizzas);
        })
        .catch(error => {
            console.error('Error fetching pizza status:', error);
            pizzaStatusSection.innerHTML = '<p>Failed to fetch pizza status. Please try again later.</p>';
        });

    // Event listener for section click
    pizzaStatusSection.addEventListener('click', () => {
        alert('You clicked the pizza status section!');
    });

    // Event listener for pizza item click
    pizzaStatusSection.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('pizza-item')) {
            const pizzaId = target.dataset.pizzaId;
            const selectedPizza = pizzas.find(item => item.id === pizzaId);
            if (selectedPizza) {
                alert(`SelectedPizza: ${selectedPizza.name} - Status: ${selectedPizza.status}`);
            }
        }
    });

    // More event listeners can be added based on requirements
});

// Function to render pizza status information with cover images
function renderPizzaStatus(pizzaArray) {
    const pizzaStatusSection = document.getElementById('pizzaStatusSection');
    pizzaStatusSection.innerHTML = ''; // Clear existing content

    // Loop through each pizza item
    pizzaArray.forEach(pizza => {
        // Create a div element for each pizza item
        const pizzaDiv = document.createElement('div');
        pizzaDiv.classList.add('pizza-item');

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