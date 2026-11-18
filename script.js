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
        name: "Hand tools",
        cost: 20,
        price: 35,
        stock: 10,
        minStock: 6
    },
    {
        name: "Power tools",
        cost: 40,
        price: 60,
        stock: 8,
        minStock: 5
    },
    {
        name: "Screws, nails, and fasteners",
        cost: 14,
        price: 20,
        stock: 18,
        minStock: 10
    },
    {
        name: "Paint",
        cost: 15,
        price: 27,
        stock: 10,
        minStock: 6
    },
    {
        name: "Plumbing/electrical supplies",
        cost: 35,
        price: 42,
        stock: 14,
        minStock: 5
    }
];


// product-list display using for...of & DOM manipulation
const productList = document.querySelector(".product-list");

for (const product of inventory) {
   const productCard = document.createElement("div");

    const productName = document.createElement("h3");
    productName.textContent = `Name: ${product.name}`;

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


// calculating total inventory cost
let totalInventoryCost = 0

for (const product of inventory) {
   totalInventoryCost += product.cost * product.stock;
}
    
    const totalCostContainer = document.querySelector(".total-inventory-cost");
    const totalCostCard = document.createElement("p");

    totalCostCard.textContent = `Total Inventory Cost: ${totalInventoryCost}`;
    totalCostContainer.append(totalCostCard);