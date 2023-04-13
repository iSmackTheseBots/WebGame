const dbtn = document.getElementById('donate-menu'), hbtn = document.getElementById('heal-menu'), sbtn = document.getElementById('shop-menu'), dmenu = document.getElementById('dmenu'), hmenu = document.getElementById('hmenu'), smenu = document.getElementById('smenu'), ds = document.getElementById('ds'), dialog = document.getElementById('dialog'), hs = document.getElementById('hs');

function toggleMenu(button, menu) {
  button.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
}
toggleMenu(dbtn, dmenu),toggleMenu(sbtn, smenu),toggleMenu(hbtn, hmenu);

function toggleAlert(button, dis) {
  button.addEventListener('click', () => {
  dialog.style.display = dis;
})};
toggleAlert(hs, 'none');
toggleAlert(ds, 'block');

function beg() {
  if (player.energy < 5) {
    alert("You need at least 5 energy to beg.");
    return;
  }
  const MAX_MONEY_FOR_BEGGING = 9001;
  if (player.money > MAX_MONEY_FOR_BEGGING) {
    alert("You shouldn't be begging!");
    return;
  }
  player.energy -= 5;
  let amount = Math.floor(Math.random() * 64) + 1;
  player.money += amount;
  updateStats();
}

function fight() {
  const MIN_ENERGY_TO_FIGHT = 20 , MIN_COURAGE_TO_FIGHT = 1 , MIN_HEALTH_TO_FIGHT = 10;
  if (player.energy < MIN_ENERGY_TO_FIGHT || player.courage < MIN_COURAGE_TO_FIGHT || player.health < MIN_HEALTH_TO_FIGHT) {
    alert(`You need at least ${MIN_ENERGY_TO_FIGHT} energy, ${MIN_COURAGE_TO_FIGHT} courage, and ${MIN_HEALTH_TO_FIGHT} health to fight!`);
    return;
  }
  player.energy -= MIN_ENERGY_TO_FIGHT;
  player.courage -= MIN_COURAGE_TO_FIGHT;
  const WIN_CHANCE = 0.8 , winChance = Math.random() < WIN_CHANCE;
  if (winChance) {
    const MAX_MONEY_FROM_FIGHT = 666;
    const amount = Math.floor(Math.random() * MAX_MONEY_FROM_FIGHT);
    player.money += amount;
    alert(`You won the fight and earned $${amount}!`);
    updateStats();
    const DAMAGE_CHANCE = 0.75;
    const damageChance = Math.random() < DAMAGE_CHANCE;
    if (damageChance) {
      const MAX_DAMAGE_FROM_FIGHT = 44;
      const damage = Math.floor(Math.random() * MAX_DAMAGE_FROM_FIGHT) + 1;
      player.health -= damage;
      if (player.health < 0) {
        player.health = 1;
      }
      alert(`You took ${damage} damage in the fight.`);
      updateStats();
    }
  } else {
    const MAX_DAMAGE_FROM_FIGHT = 45;
    const MIN_DAMAGE_FROM_FIGHT = 22;
    const damage = Math.floor(Math.random() * (MAX_DAMAGE_FROM_FIGHT - MIN_DAMAGE_FROM_FIGHT) + MIN_DAMAGE_FROM_FIGHT);
    player.health -= damage;
    if (player.health < MIN_HEALTH_TO_FIGHT) {
      player.health = 1;
    }
    alert(`You lost the fight and took ${damage} damage.`);
    updateStats();
  }
}
function heal(healAmount) {
  const HEALING_LEVELS = {
    1: { cost: 100, amount: 10 },
    2: { cost: 190, amount: 20 },
    3: { cost: 270, amount: 30 }
  };

  const healingLevel = HEALING_LEVELS[healAmount];
  if (!healingLevel) {
    alert("Invalid healing level.");
    return;
  }

  if (player.money < healingLevel.cost) {
    alert(`You need at least $${healingLevel.cost} to heal.`);
    return;
  }
  if (player.health == player.healthCap) {
      alert("You are at max health.");
      return;
  }

  player.money -= healingLevel.cost;
  player.health += healingLevel.amount;
  if (player.health > player.healthCap) {
    player.health = player.healthCap;
  }
  updateStats();
}
function rest() {
  const MAX_ENERGY_TO_REST = 90;
  if (player.energy > MAX_ENERGY_TO_REST) {
    alert("You already have enough energy to rest.");
    return;
  }
  const MIN_MORALITY_TO_REST = 5;
  if (player.morality < MIN_MORALITY_TO_REST) {
    alert("Your morality is too low to rest.");
    return;
  }
  player.morality -= MIN_MORALITY_TO_REST;
  player.energy += 10;
  updateStats();
}

function train(addHealth) {
  const TRAINING_LEVELS = {
    1: { cost: 1000, increase: 1 },
    2: { cost: 1900, increase: 2 },
    3: { cost: 2800, increase: 3 }
  };

  const trainingLevel = TRAINING_LEVELS[addHealth];
  if (!trainingLevel) {
    alert("Invalid training level.");
    return;
  }

  if (player.money < trainingLevel.cost) {
    alert(`You need at least $${trainingLevel.cost} to train.`);
    return;
  }

  player.healthCap += trainingLevel.increase;
  alert(`Your max health is now ${player.healthCap}.`);
  player.money -= trainingLevel.cost;
  updateStats();
}
function donate(amount){
if (amount > player.money){
alert('not enough money!');
return;
}
if (player.morality > 92){
alert('You Do not need morality');
return;
}
player.money-= amount;
if (amount == 10){
player.morality+= 2;
updateStats();
} else if (amount == 20){
player.morality+= 5;
updateStats();
} else {
player.morality+= 8
updateStats();
}
}