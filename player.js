let player = JSON.parse(localStorage.getItem('player'));

if (!player) {
  // If no player object is found in local storage, create a new one
  player = {
  name: 'john',
  courage: 10,
  money: 0,
  xp: 0,
  inventory: [],
  energy: 100, 
  courage: 20, 
  morality: 100, 
  money: 0, 
  health: 100, 
  healthCap: 100
  };
} else {
  // Otherwise, update the UI with the loaded player stats
  updateStats();
}

function savePlayer() {
  localStorage.setItem('player', JSON.stringify(player));
}
function updateStats() {
    savePlayer();
  const stats = {
    health: `${player.health}/${player.healthCap}`,
    morality: player.morality,
    energy: player.energy,
    courage: player.courage,
    money: `$${player.money}`
  };
  for (const [key, value] of Object.entries(stats)) {
    document.getElementById(key).innerHTML = value;
  }
}
// Define the tool objects
const crowbar = {
  name: "Crowbar",
  sellPrice: 2,
  buyPrice: 5,
  cityIn: "Home",
  amountOwned: 0,
};

const knife = {
  name: "Knife",
  sellPrice: 15,
  buyPrice: 30,
  cityIn: "O Town",
  amountOwned: 0,
};