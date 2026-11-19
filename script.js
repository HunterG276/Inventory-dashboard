// products array
const inventory = [
    {
        name: "Lumber",
        cost: 10,
        price: 20,
        stock: 40,
        minStock: 10
    },
    {
        name: "Plywood",
        cost: 20,
        price: 30,
        stock: 60,
        minStock: 15
    },
    {
        name: "Hand-tools",
        cost: 20,
        price: 35,
        stock: 10,
        minStock: 15
    },
    {
        name: "Power-tools",
        cost: 40,
        price: 60,
        stock: 18,
        minStock: 10
    },
    {
        name: "Screws, Nails, & Fasteners",
        cost: 14,
        price: 20,
        stock: 30,
        minStock: 25
    },
    {
        name: "Paint",
        cost: 15,
        price: 27,
        stock: 15,
        minStock: 10
    },
    {
        name: "Plumbing/Electrical Supplies",
        cost: 35,
        price: 42,
        stock: 30,
        minStock: 20
    },
    {
        name: "Boots/Gloves",
        cost: 60,
        price: 80,
        stock: 4,
        minStock: 5
    },
    {
        name: "Safety Equipment",
        cost: 80,
        price: 100,
        stock: 18,
        minStock: 20
    }
];


// product-list display using for...of & DOM manipulation
const productList = document.querySelector(".product-list");

function displayInventory() {
    productList.innerHTML = "";

    for (const product of inventory) {
        const productCard = document.createElement("div");

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

        productCard.append(productName, cost, price, stock, minStock);
        productList.append(productCard);
    }   
}

displayInventory(); 


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

    const newProduct = {
        name: name,
        cost: cost,
        price: price,
        stock: stock,
        minStock: minStock
    };

    inventory.push(newProduct);

    displayInventory();
    calculateTotalInventory();
    calculatePotentialSales();
    findLowStockItems();

    addProductForm.reset();
});