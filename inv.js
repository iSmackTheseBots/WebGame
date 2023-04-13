// Function to add an item and amount to the inventory
function addToInventory(item, amount) {
  const existingItem = player.inventory.find((invItem) => invItem.name === item.name);
  if (existingItem) {
    existingItem.amountOwned += amount;
  } else {
    item.amountOwned = amount;
    player.inventory.push(item);
  }
    updateStats();
    savePlayer();
}
// Function to remove an item and amount from the inventory
function removeFromInventory(item, amount) {
    //checks if player have item to remove it or 1
  const existingItem = player.inventory.find((invItem) => invItem.name === item.name);
  if (existingItem) {
    if (existingItem.amountOwned <= amount) {
      player.inventory.splice(player.inventory.indexOf(existingItem), 1);
    } else {
      existingItem.amountOwned -= amount;
    }
      renderInventory();
  }
}
// Function to render the inventory grid
function renderInventory() {
  const inventoryContainer = document.getElementById("inventory-container");
  inventoryContainer.innerHTML = "";

  // Loop through each item in the inventory and create a grid container with buy/sell buttons
  player.inventory.forEach((item) => {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // Add item name and amount owned to the container
    const nameElement = document.createElement("div");
    nameElement.classList.add("invname");
    nameElement.textContent = item.name;
    gridContainer.appendChild(nameElement);

    const amountElement = document.createElement("div");
    amountElement.textContent = `Amount owned: ${item.amountOwned}`;
    gridContainer.appendChild(amountElement);

    // Add buy and sell buttons to the container
    const buyButton = document.createElement("button");
    buyButton.textContent = `Buy for $${item.buyPrice}`;
    buyButton.addEventListener("click", () => {
      if (player.money >= item.buyPrice) {
        player.money -= item.buyPrice;
        addToInventory(item, 1);
          updateStats();
        amountElement.textContent = `Amount owned: ${item.amountOwned}`;
      }
    });
    gridContainer.appendChild(buyButton);

    const sellButton = document.createElement("button");
    sellButton.textContent = `Sell for $${item.sellPrice}`;
    sellButton.addEventListener("click", () => {
      if (item.amountOwned > 0) {
        player.money += item.sellPrice;
        removeFromInventory(item, 1);
          updateStats();
        amountElement.textContent = `Amount owned: ${item.amountOwned}`;
      }
    });
    gridContainer.appendChild(sellButton);

    inventoryContainer.appendChild(gridContainer);
  });
}