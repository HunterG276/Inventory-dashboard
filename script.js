// products array
const defaultInventory = [
    {
        id: 1,
        name: "Lumber",
        cost: 10,
        price: 20,
        stock: 40,
        minStock: 10
    },
    {
        id: 2,
        name: "Plywood",
        cost: 20,
        price: 30,
        stock: 60,
        minStock: 15
    },
    {
        id: 3,
        name: "Hand-tools",
        cost: 20,
        price: 35,
        stock: 10,
        minStock: 15
    },
    {
        id: 4,
        name: "Power-tools",
        cost: 40,
        price: 60,
        stock: 18,
        minStock: 10
    },
    {
        id: 5,
        name: "Screws, Nails, & Fasteners",
        cost: 14,
        price: 20,
        stock: 30,
        minStock: 25
    },
    {
        id: 6,
        name: "Paint",
        cost: 15,
        price: 27,
        stock: 15,
        minStock: 10
    },
    {
        id: 7,
        name: "Plumbing/Electrical Supplies",
        cost: 35,
        price: 42,
        stock: 30,
        minStock: 20
    },
    {
        id: 8,
        name: "Boots/Gloves",
        cost: 60,
        price: 80,
        stock: 4,
        minStock: 5
    },
    {
        id: 9,
        name: "Safety Equipment",
        cost: 80,
        price: 100,
        stock: 18,
        minStock: 20
    }
];

// saving data
const savedInventory = localStorage.getItem("inventory");

let inventory;

if (savedInventory !== null) {
    inventory = JSON.parse(savedInventory);
} else {
    inventory = defaultInventory;
}

function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));

}
// product-list display using for...of & DOM manipulation
const productList = document.querySelector(".product-list");

function displayInventory(products) {
    productList.innerHTML = "";

    for (const product of products) {
        const productCard = document.createElement("div");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Product";
        editButton.dataset.id = product.id;
        editButton.classList.add("edit-button");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove Product";
        deleteButton.dataset.id = product.id;
        deleteButton.classList.add("delete-button");

        const productName = document.createElement("h3");
        productName.textContent = `Product: ${product.name}`;

        const cost = document.createElement("p");
        cost.textContent = `Cost: $${product.cost}`;

        const price = document.createElement("p");
        price.textContent = `Price $${product.price}`;

        const stock = document.createElement("p");
        stock.textContent = `Stock ${product.stock}`;

        const minStock = document.createElement("p");
        minStock.textContent = `Minimum Stock: ${product.minStock}`;

        productCard.append(productName, cost, price, stock, minStock, editButton, deleteButton);
        productList.append(productCard);
    }   
}

displayInventory(inventory); 


// delete button and edit button 
productList.addEventListener("click", function(event) {
 if (event.target.matches(".delete-button")) {
    const productId = event.target.dataset.id;
    const index = inventory.findIndex(product => product.id == productId);

    if (index !== -1) {
        inventory.splice(index, 1);

        saveInventory();

        displayInventory();
        calculateTotalInventory();
        calculatePotentialSales();
        findLowStockItems();
    }
}

   else if(event.target.matches(".edit-button")) {
        const productId = event.target.dataset.id;
        const product = inventory.find(product => product.id == productId);

        const newName = prompt("Enter the new product name", product.name);
        const newCost = Number(prompt("Enter the product's updated cost", product.cost));
        const newPrice = Number(prompt("Enter the product's updated price", product.price));
        const newStock = Number(prompt("Enter the product's updated stock quantity", product.stock));
        const newMinStock = Number(prompt("Enter the product's updated minimum stock", product.minStock));

        product.name = newName;
        product.cost = newCost;
        product.price = newPrice;
        product.stock = newStock;
        product.minStock = newMinStock;

        saveInventory();

        displayInventory(inventory);
        calculateTotalInventory();
        calculatePotentialSales();
        findLowStockItems();
    }
});


// calculating total inventory cost
function calculateTotalInventory() {
    let totalInventoryCost = 0;

    for (const product of inventory) {
        totalInventoryCost += product.cost * product.stock;
    }
    
    const totalCostContainer = document.querySelector(".total-inventory-cost");
    totalCostContainer.innerHTML = "";

    const totalCostCard = document.createElement("p");

    totalCostCard.textContent = `Total Inventory Cost: ${totalInventoryCost}`;
    totalCostContainer.append(totalCostCard);
}

calculateTotalInventory();


// potential sales calculations
function calculatePotentialSales() {
    let potentialSales = 0

    for (const product of inventory) {
        potentialSales += product.price * product.stock;
}

    const potentialSalesContainer = document.querySelector(".potential-sales");
    potentialSalesContainer.innerHTML = "";

    const potentialSalesCard = document.createElement("p");

    potentialSalesCard.textContent = `Potential Sales: ${potentialSales}`;
    potentialSalesContainer.append(potentialSalesCard);
}

calculatePotentialSales();


// low-stock items display/filter()'ed array
function findLowStockItems() {
    const lowStockItems = inventory.filter(product => product.stock <= product.minStock);

    const lowStockItemsContainer = document.querySelector(".low-stock-items");
    lowStockItemsContainer.innerHTML = "";
    const lowStockItemsCard = document.createElement("p");

    lowStockItemsCard.textContent = `Number of Low Stock Items: ${lowStockItems.length}`;
    lowStockItemsContainer.append(lowStockItemsCard);

    for (const product of lowStockItems) {
        const lowStockProduct = document.createElement("p");
        lowStockProduct.textContent = `Low Stock Item: ${product.name} || Total in Stock: ${product.stock}`;
        lowStockItemsContainer.append(lowStockProduct);
    }
}

findLowStockItems();


// add new product form
const addProductForm = document.querySelector(".add-new-product");

addProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const productName = document.querySelector("#product-name");
    const productCost = document.querySelector("#product-cost");
    const productPrice = document.querySelector("#product-price");
    const productStock = document.querySelector("#product-stock")
    const minimumStock = document.querySelector("#minimum-stock");

    const name = productName.value;
    const cost = Number(productCost.value);
    const price = Number(productPrice.value);
    const stock = Number(productStock.value);
    const minStock = Number(minimumStock.value);

    if (name === "") {
        alert("Please enter a product name.");
        return;
    }
    if (cost < 0) {
        alert("Cannot enter a negative amount");
        return;
    }
    if (price <= 0) {
        alert("Selling price must be greater than zero");
        return;
    }
    if (stock < 0 || !Number.isInteger(stock)) {
        alert("Stock must be a nonnegative whole number.");
        return
    }
    if (minStock < 0 || !Number.isInteger(minStock)) {
        alert("Minimum stock must be a nonnegative whole number");
        return;
    }

    const newProduct = {
        id: crypto.randomUUID(),
        name: name,
        cost: cost,
        price: price,
        stock: stock,
        minStock: minStock
    };

    inventory.push(newProduct);

    saveInventory();

    displayInventory(inventory);
    calculateTotalInventory();
    calculatePotentialSales();
    findLowStockItems();

    addProductForm.reset();
});


//search products
const searchInput = document.querySelector("#search-products");

searchInput.addEventListener('input', function(event) {
    const searchValue = searchInput.value;
    const filteredInventory = inventory.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    displayInventory(filteredInventory);
})