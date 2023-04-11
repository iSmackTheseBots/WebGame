let energy = 100; 
let courage = 20;
let morality = 100;
let money = 0;
let health = 100;
let healthCap = 100;
const donateButton = document.getElementById('donate-menu');
const healButton = document.getElementById('heal-menu');
const shopButton = document.getElementById('shop-menu');
const dmenu = document.getElementById('dmenu');
const hmemu = document.getElementById('hmenu');
const smenu = document.getElementById('smenu');
donateButton.addEventListener('click', () => {
  dmenu.style.display = dmenu.style.display === 'block' ? 'none' : 'block';
});
shopButton.addEventListener('click', () => {
  smenu.style.display = smenu.style.display === 'block' ? 'none' : 'block';
});
healButton.addEventListener('click', () => {
  hmenu.style.display = hmenu.style.display === 'block' ? 'none' : 'block';
});
function updateStats(){
document.getElementById("health").innerHTML = `${health}/${healthCap}`;
document.getElementById("morality").innerHTML = morality;
document.getElementById("energy").innerHTML = energy;
document.getElementById("courage").innerHTML = courage;
document.getElementById("money").innerHTML = `$${money}`;
}
function beg() {
  if (energy < 5) {
    alert("You don't have enough energy to beg!");
    return;
  }
  if (money > 9001) {
    alert("You shouldn't be begging!");
    return;
  }
  energy -= 5;
  let amount = Math.floor(Math.random() * 64) + 1;
  money += amount;
  updateStats();
}
function fight() {
  if (energy < 20 || courage < 1 || health < 11) {
    alert("You need at least 20 energy, 1 courage and 10 health!");
    return;
  }

  energy -= 20; 
  courage -= 1; 

  let winChance = Math.random() < 0.8; 
  if (winChance) {
    let amount = Math.floor(Math.random() * 666); 
    money += amount; 
    alert(`You won the fight and earned $${amount}!`);
updateStats();
    let damageChance = Math.random() < 0.75; 
    if (damageChance) {
      let damage = Math.floor(Math.random() * 44) + 1; 
      health -= damage; 
      if (health < 0) {
        health = 1;
      }
      alert(`You took ${damage} damage in the fight.`); 
updateStats();
    }
  } else {
    let damage = Math.floor(Math.random() * 45) + 22;
    health -= damage;
    if (health < 10) {
      health = 1; 
    }
    alert(`You lost the fight and took ${damage} damage.`);
    updateStats();
  }
}
function heal(heal) {
  if (heal == 10){
if (money < 100){
  alert("You need medical fees of atleast $100");
return;
}
if (health > 90){ 
  alert("You Dont Need Health!");
return;
}
  money-=100;
  health+=10;
  updateStats();
} else if (heal == 20){
  if(money < 190){
alert("you need atleast $190!");
return;
}
if (health > 80){
alert("You Dont Need This Much Health!");
return;
}
  money-=190;
  health+=20;
  updateStats();
} else {
if(money < 270){
alert("you need atleast $270!");
return;
}
if(health > 70){
alert("You dont need this much health!");
return;
}
  money-=270;
  health+=30;
  updateStats();
}
}
function rest(){
 if (energy > 90){
alert("You don't need energy!");
return;
}
if (morality < 5){
alert("you neex atleast 5 moral to sleep at night");
return;
}
morality-=5;
energy+=10
updateStats();
}
function train(addhealth){
if (addhealth == 1){
if(money < 1000){
alert("You need atleast $1000 to increase your max health!");
return;
}
healthCap+=1;
alert(`Your max health is now ${healthCap}`);
money-=1000;
updateStats();
} else if (addhealth == 2){
if(money < 1900){
alert("You need atleast $1900!");
return;
}
healthCap+=2;
alert(`Your max health is now ${healthCap}`);
money-=1900;
updateStats();
} else {
if (money < 2800){
alert("You need atleast $2800!");
return;
}
healthCap+=3;
alert(`Your max health is now ${healthCap}`);
money-=2800;
updateStats();
}
}
function donate(amount){
if (amount > money){
alert('not enough money!');
return;
}
if (morality > 92){
alert('You Do not need morality');
return;
}
money-= amount;
if (amount == 10){
morality+= 2;
updateStats();
} else if (amount == 20){
morality+= 5;
updateStats();
} else {
morality+= 8
updateStats();
}
}
