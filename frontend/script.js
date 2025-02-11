const API_URL = "http://localhost:5000/items"; // Backend API URL

// Function to fetch and display items
function fetchItems() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const itemsList = document.getElementById("items-list");
      itemsList.innerHTML = ""; // Clear existing items
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        itemsList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching items:", error));
}

// Function to add a new item
function addItem() {
  const itemInput = document.getElementById("item-input");
  const newItem = { text: itemInput.value };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then(response => response.json())
    .then(() => {
      itemInput.value = ""; // Clear input field
      fetchItems(); // Refresh item list
    })
    .catch(error => console.error("Error adding item:", error));
}
