let infoArmy = document.querySelector('.infoArmy');
let elitesold = document.querySelector('.elitesold');
let allSoldiers = [];
let mainDiv = document.querySelector('.box');
let infoBattle2 = document.getElementsByClassName('infoBattle2')[0]

let infoOrc = document.querySelector('.infoOrc');
let allOrcs = [];
let mainDiv2 = document.querySelector('.box2');

let infoBattle = document.getElementsByClassName('infoBattle')[0];
let attackBtn = document.getElementsByClassName('btn1')[0];
let attackBtn2 = document.getElementsByClassName('btn2')[0];
let winner = document.getElementsByClassName('winner')[0];

winner.style.background = "transparent";
winner.style.display = "none";
infoBattle2.style.display = "none"

//Constructor function for creating soldiers
function CreateSoldier() {
  this.hp = 1000;
  this.damage = Math.floor(Math.random() * (150 - 100) + 100);
  this.weapon = ["Machine Gun", "Gun", "Sniper"][Math.floor(Math.random() * 3)];
  this.eliteWeapon = ["Machine Gun", "Sniper", "Bomb", "Knife"];
}

let remainHealthOrc;
let remainHealthSold;
let divArmy = document.getElementsByClassName('army')[0];
let arrayOrcs = [];
let arraySoldiers = [];

//attack function for all soldiers
CreateSoldier.prototype.attack = function () {
  attackBtn.style.display = "none";
  divArmy.style.transition = "left 1s";
  divArmy.style.left = "60%";

  battle()

  let textBox = "***Army Attacking...Battle in Progress*** Orcs Turn";
  let textArray = textBox.split("");
  let counter = 0;

  infoBattle.innerHTML = "";

  //writing battle info in info tab
  function write() {
    infoBattle.innerHTML += textArray[counter];
    counter++;
    if (counter == textArray.length) {
      clearInterval(loop)
    }
  }
  let loop = setInterval(write, 20);

  setTimeout(displayButton.bind(null, attackBtn2), 3800)

  function moveDivArmy() {
    divArmy.style.left = "20%";
    divArmy.style.transition = "left 2s";
  }
  setTimeout(moveDivArmy, 1500)

};

//Creating Army and Army Grid
createArmy(800);
createGrid();

//executing  the attack function from all generated Soldiers, at click Event.
for (var i = 0; i < allSoldiers.length; i++) {
  attackBtn.addEventListener('click', allSoldiers[i].attack);
}

//Constructor function for creating Orcs
function CreateOrc() {
  this.hp = 1000;
  this.damage = Math.floor(Math.random() * (150 - 100) + 100);
  this.weapon = ["Knife", "Axe", "Arrow"][Math.floor(Math.random() * 3)];
}

let divOrcs = document.getElementsByClassName('orcs')[0];

//attack function for all Orcs
CreateOrc.prototype.attack = function () {

  divOrcs.style.right = "60%";
  divOrcs.style.transition = "right 1s";

  battle()
  let textBoxOrc = "***Orcs Attacking...Battle in Progress*** Army Turn";

  let textArrayOrc = textBoxOrc.split("");
  let counter = 0;
  infoBattle.innerHTML = "";

  //writing battle info in info tab
  function writeOrc() {
    infoBattle.innerHTML += textArrayOrc[counter];
    counter++;
    if (counter == textArrayOrc.length) {
      clearInterval(loop)
    }
  }

  let loop = setInterval(writeOrc, 20);

  function moveDivOrc() {
    divOrcs.style.right = "20%";
    divOrcs.style.transition = "right 2s";
  }
  setTimeout(moveDivOrc, 1500)

  attackBtn2.style.display = "none";

  setTimeout(displayButton.bind(null, attackBtn), 3800)
};

//Creating Orcs and Orcs Grid
createArmyOrcs(800);
createGrid2();

//executing  the attack function from all generated Orcs, at click Event.
for (var j = 0; j < allOrcs.length; j++) {
  attackBtn2.addEventListener('click', allOrcs[j].attack);
}

//Creating Army, as instances of Constructor function
function createArmy(num) {
  for (var i = 0; i < num; i++) {
    allSoldiers.push(new CreateSoldier())
  }
}

//Creating Orcs Army, as instances of Constructor function
function createArmyOrcs(num) {
  for (var i = 0; i < num; i++) {
    allOrcs.push(new CreateOrc())
  }
}

//Creating Army Grid
function createGrid() {
  let text = "";
  for (var i = 0; i < allSoldiers.length; i++) {
    if (allSoldiers[i].damage > 130) {
      text += '<div id = "' + i + '" class ="soldier elite"></div>';
    } else {
      text += '<div id = "' + i + '" class ="soldier"></div>';
    }
  }
  mainDiv.innerHTML = text;

  soldierDivs = document.querySelectorAll('.soldier');
  for (var i = 0; i < soldierDivs.length; i++) {
    soldierDivs[i].addEventListener('click', displayInfoArmy);
    soldierDivs[i].addEventListener('mouseout', hideInfoArmy);
  }
}

//Creating Orcs Grid
function createGrid2() {
  let text = "";
  for (var i = 0; i < allOrcs.length; i++) {
    text += '<div id = "' + i + '" class ="orc"></div>';
  }
  mainDiv2.innerHTML = text;

  orcDivs = document.querySelectorAll('.orc');

  for (var i = 0; i < orcDivs.length; i++) {
    orcDivs[i].addEventListener('click', displayInfoOrcs);
    orcDivs[i].addEventListener('mouseout', hideInfoOrcs);
  }
}

//battle logic and checking progress
function battle() {

  for (var i = 0; i < allOrcs.length; i++) {
    let f = Math.floor(Math.random() * 800);

    if (allOrcs[f].hp > 0) {
      orcDivs[f].style.background = "tomato";
      orcDivs[f].style.opacity = "0.4";

      remainHealthOrc = (allOrcs[f].hp - Math.floor(Math.random() * 850));
      allOrcs[f].hp = remainHealthOrc;
      if (allOrcs[f].hp <= 0) {
        orcDivs[f].style.opacity = "0";
        arrayOrcs.push(allOrcs[f]);
        if (arrayOrcs.length == 800) {
          winner.style.display = "block";
          divOrcs.style.opacity = "0.2"
          winner.innerHTML = "winner army";
          infoBattle.style.display = "none";
          attackBtn.style.display = "none";
          attackBtn2.style.display = "none";
        }
      }
    }
  }

  for (var j = 0; j < allSoldiers.length; j++) {

    let f = Math.floor(Math.random() * 800);
    if (allSoldiers[f].hp > 0) {
      remainHealthSold = (allSoldiers[f].hp - Math.floor(Math.random() * 850));
      allSoldiers[f].hp = remainHealthSold;
      soldierDivs[f].style.background = "tomato";
      soldierDivs[f].style.opacity = "0.4";

      if (allSoldiers[f].hp <= 0) {
        soldierDivs[f].style.opacity = "0";
        arraySoldiers.push(allSoldiers[f]);
        if (arraySoldiers.length == 800) {
          winner.style.display = "block";
          divArmy.style.opacity = "0.2"
          winner.innerHTML = "winner orcs";
          attackBtn.style.display = "none";
          attackBtn2.style.display = "none";
          infoBattle.style.display = "none";
        }
      }
    }
  }
}

function displayInfoArmy(e) {

  let currentSoldier = allSoldiers[this.id];
  if (currentSoldier.damage > 130) {
    elitesold.innerHTML = `<p>Health:${currentSoldier.hp}</p>`;
    elitesold.innerHTML += `<p>Weapon :${currentSoldier.eliteWeapon}</p>`;
    elitesold.innerHTML += `<p>Damage :${currentSoldier.damage}</p>`;

    elitesold.style.display = "block";
    elitesold.style.top = (e.pageY + 10) + "px";
    elitesold.style.left = (e.pageX + 10) + "px";
  } else {
    if (currentSoldier.weapon == "Machine Gun") {
      infoArmy.style.background = "url(img/mgun.jpg)"
    }
    if (currentSoldier.weapon == "Gun") {
      infoArmy.style.background = "url(img/gun.jpg)"
    }
    if (currentSoldier.weapon == "Sniper") {
      infoArmy.style.background = "url(img/sniper.jpg)"
    }
    infoArmy.innerHTML = `<p>Health :${currentSoldier.hp}</p>`;
    infoArmy.innerHTML += `<p>Weapon :${currentSoldier.weapon}</p>`;
    infoArmy.innerHTML += `<p>Damage :${currentSoldier.damage}</p>`;
    infoArmy.style.display = "block";
    infoArmy.style.top = (e.pageY + 10) + "px";
    infoArmy.style.left = (e.pageX + 10) + "px";

  }
}

function hideInfoArmy() {
  infoArmy.style.display = "none";
  elitesold.style.display = "none";
}

function displayInfoOrcs(e) {
  //console.log(this);
  let currentOrc = allOrcs[this.id];
  infoOrc.innerHTML = `<p>Health :${currentOrc.hp}</p>`;
  infoOrc.innerHTML += `<p>Weapon :${currentOrc.weapon}</p>`;
  infoOrc.innerHTML += `<p>Damage :${currentOrc.damage}</p>`;
  infoOrc.style.display = "block";
  infoOrc.style.background = "url(img/orc.jpg)"
  infoOrc.style.top = (e.pageY + 10) + "px";
  infoOrc.style.left = (e.pageX + 10) + "px";
}

function hideInfoOrcs() {
  infoOrc.style.display = "none";
}

/*
  Restarting a Game
  Setting default values
*/
function startOver() {

  winner.style.display = "none";
  winner.innerHTML = "";

  infoBattle.innerHTML = ""
  infoBattle.style.display = "block"
  arraySoldiers.length = []
  arrayOrcs.length = []

  divArmy.style.opacity = "1"
  divOrcs.style.opacity = "1"

  infoBattle2.innerHTML = ""
  infoBattle2.style.display = "none"

  allSoldiers = [];
  mainDiv.innerHTML = "";
  createArmy(800);
  createGrid();

  allOrcs = [];
  mainDiv2.innerHTML = ""
  createArmyOrcs(800);
  createGrid2();

  attackBtn.style.display = "block";
}

//displaying Attack button based on game progress
function displayButton(disBtn) {
  if (arraySoldiers.length == 800 || arrayOrcs.length == 800) {
    attackBtn.style.display = "none";
    attackBtn2.style.display = "none";
    infoBattle2.style.display = "block";
    infoBattle2.innerHTML = "GAME OVER<br> <button class='start'>start</button>";
    let startBtn = document.getElementsByClassName('start')[0]

    startBtn.addEventListener('click', startOver)

  } else {
    disBtn.style.display = "block";
  }
}
