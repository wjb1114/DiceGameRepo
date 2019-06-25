"use strict";

let defaultVisitedZones = [];
let defaultNewPlayerArgs = new Map();
defaultNewPlayerArgs.set("currentLevel", 1);
defaultNewPlayerArgs.set("currentXP", 0);
defaultNewPlayerArgs.set("currentStrength", 10);
defaultNewPlayerArgs.set("currentAccuracy", 20);
defaultNewPlayerArgs.set("currentMaxHealth", 1000);
defaultNewPlayerArgs.set("currentDefense", 20);
defaultNewPlayerArgs.set("currentUnlockedAreas", defaultVisitedZones);
defaultNewPlayerArgs.set("currentDayCount", 1);
defaultNewPlayerArgs.set("currentHealth", defaultNewPlayerArgs.get("currentMaxHealth"));

let PlayerObj = class {
	constructor (strength, accuracy, maxHealth, defence, currentHealth, level, exp, dayCountTotal, unlockedAreas) {
		this.strength = strength;
		this.accuracy = accuracy;
		this.maxHealth = maxHealth;
		this.defence = defence;
		this.currentHealth = currentHealth;
		this.level = level;
		this.exp = exp;
		this.dayCountTotal = dayCountTotal;
		this.unlockedAreas = unlockedAreas;
	}
}

let playerStatus = new PlayerObj(
	defaultNewPlayerArgs.get("currentStrength"),
	defaultNewPlayerArgs.get("currentAccuracy"),
	defaultNewPlayerArgs.get("currentMaxHealth"),
	defaultNewPlayerArgs.get("currentDefense"),
	defaultNewPlayerArgs.get("currentHealth"),
	defaultNewPlayerArgs.get("currentLevel"),
	defaultNewPlayerArgs.get("currentXP"),
	defaultNewPlayerArgs.get("currentDayCount"),
	defaultNewPlayerArgs.get("currentUnlockedAreas")
);

let currentPath;
let currentZone;
let currentHealth;
let timeCounter;
let travelCounter;
let isSleeping = false;

let wolfEncounter;
let rockSlideEncounter;
let emptyEncounter;

let testTable = [];
let emptyTable = [];
let finalEncounterTable = [];

let mountainTables = [];
let islandTables = [];
let plainsTables = [];
let swampTables = [];
let forestTables = [];

let homeZone;

let mountainZoneOne;
let mountainZoneTwo;
let mountainZoneThree;
let mountainZoneFour;
let mountainZoneFive;

let islandZoneOne;
let islandZoneTwo;
let islandZoneThree;
let islandZoneFour;
let islandZoneFive;

let plainsZoneOne;
let plainsZoneTwo;
let plainsZoneThree;
let plainsZoneFour;
let plainsZoneFive;

let swampZoneOne;
let swampZoneTwo;
let swampZoneThree;
let swampZoneFour;
let swampZoneFive;

let forestZoneOne;
let forestZoneTwo;
let forestZoneThree;
let forestZoneFour;
let forestZoneFive;

let finalZone;

let zonePathOne;
let zonePathTwo;
let zonePathThree;
let zonePathFour;
let zonePathFive;
let zonePaths;

let currentEnemy;
let currentEnemyHealth;

let Zone = class {
	constructor (name, encounterTable, timeToTravel, chanceOfEncounter) {
		this.name = name;
		this.encounterTable = encounterTable;
		this.timeToTravel = timeToTravel;
		this.chanceOfEncounter = chanceOfEncounter;
	}
}
let Enemy = class {
	constructor (name, pluralName, strength, accuracy, maxHealth, defence, specialMoveName, specialMoveDamage, expGiven, currentHealth) {
		this.name = name;
		this.pluralName = pluralName;
		this.strength = strength;
		this.accuracy = accuracy;
		this.maxHealth = maxHealth;
		this.defence = defence;
		this.specialMoveName = specialMoveName;
		this.specialMoveDamage = specialMoveDamage;
		this.expGiven = expGiven;
		this.currentHealth = currentHealth;
	}
}

let CombatEncounter = class {
	constructor (enemy) {
		this.enemy = enemy;
	}
}

let NonCombatEncounter = class {
	constructor (textDescription, statToAffect, affectNumber) {
		this.textDescription = textDescription;
		this.statToAffect = statToAffect;
		this.affectNumber = affectNumber;
	}
}
let wolfEnemy = new Enemy ("Wolf", "Wolves", 10, 10, 150, 10, "Bite", 20, 25, 150);

emptyTable = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
homeZone = new Zone ("Home", emptyTable, 1, 0);

if (!playerStatus.unlockedAreas.includes(homeZone.name)) {
	playerStatus.unlockedAreas.push(homeZone.name);
}

function initEncounters() {
	wolfEncounter = new CombatEncounter(wolfEnemy);
	rockSlideEncounter = new NonCombatEncounter("You are hit by a rockslide!", "health", -100);
	emptyEncounter = new NonCombatEncounter("You weren't attacked and manage to gain some health back.", "health", 20);

	testTable = [wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, rockSlideEncounter, rockSlideEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
	finalEncounterTable = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];

	mountainTables = [testTable, testTable, testTable, testTable, testTable];
	islandTables = [testTable, testTable, testTable, testTable, testTable];
	plainsTables = [testTable, testTable, testTable, testTable, testTable];
	swampTables = [testTable, testTable, testTable, testTable, testTable];
	forestTables = [testTable, testTable, testTable, testTable, testTable];

	mountainZoneOne = new Zone ("Mountain1", mountainTables[0], 1, 7);
	mountainZoneTwo = new Zone ("Mountain2", mountainTables[1], 2, 8);
	mountainZoneThree = new Zone ("Mountain3", mountainTables[2], 3, 9);
	mountainZoneFour = new Zone ("Mountain4", mountainTables[3], 4, 10);
	mountainZoneFive = new Zone ("Mountain5", mountainTables[4], 5, 11);

	islandZoneOne = new Zone ("Island1", islandTables[0], 1, 7);
	islandZoneTwo = new Zone ("Island2", islandTables[1], 2, 8);
	islandZoneThree = new Zone ("Island3", islandTables[2], 3, 9);
	islandZoneFour = new Zone ("Island4", islandTables[3], 4, 10);
	islandZoneFive = new Zone ("Island5", islandTables[4], 5, 11);

	plainsZoneOne = new Zone ("Plains1", plainsTables[0], 1, 7);
	plainsZoneTwo = new Zone ("Plains2", plainsTables[1], 2, 8);
	plainsZoneThree = new Zone ("Plains3", plainsTables[2], 3, 9);
	plainsZoneFour = new Zone ("Plains4", plainsTables[3], 4, 10);
	plainsZoneFive = new Zone ("Plains5", plainsTables[4], 5, 11);

	swampZoneOne = new Zone ("Swamp1", swampTables[0], 1, 7);
	swampZoneTwo = new Zone ("Swamp2", swampTables[1], 2, 8);
	swampZoneThree = new Zone ("Swamp3", swampTables[2], 3, 9);
	swampZoneFour = new Zone ("Swamp4", swampTables[3], 4, 10);
	swampZoneFive = new Zone ("Swamp5", swampTables[4], 5, 11);

	forestZoneOne = new Zone ("Forest1", forestTables[0], 1, 7);
	forestZoneTwo = new Zone ("Forest2", forestTables[1], 2, 8);
	forestZoneThree = new Zone ("Forest3", forestTables[2], 3, 9);
	forestZoneFour = new Zone ("Forest4", forestTables[3], 4, 10);
	forestZoneFive = new Zone ("Forest5", forestTables[4], 5, 11);

	finalZone = new Zone ("Castle", finalEncounterTable, 8, 12);

	zonePathOne = [homeZone, mountainZoneOne, mountainZoneTwo, mountainZoneThree, mountainZoneFour, mountainZoneFive, finalZone];
	zonePathTwo = [homeZone, islandZoneOne, islandZoneTwo, islandZoneThree, islandZoneFour, islandZoneFive, finalZone];
	zonePathThree = [homeZone, plainsZoneOne, plainsZoneTwo, plainsZoneThree, plainsZoneFour, plainsZoneFive, finalZone];
	zonePathFour = [homeZone, swampZoneOne, swampZoneTwo, swampZoneThree, swampZoneFour, swampZoneFive, finalZone];
	zonePathFive = [homeZone, forestZoneOne, forestZoneTwo, forestZoneThree, forestZoneFour, forestZoneFive, finalZone];
	zonePaths = [zonePathOne, zonePathTwo, zonePathThree, zonePathFour, zonePathFive];
}

function startGameLoop (gameState = defaultNewPlayerArgs) {
	initEncounters();
	currentZone = homeZone;
	currentPath = zonePathOne;
	initializeGameWindow();
	startDay();
}

function initializeGameWindow () {
	let gameWindowDiv = document.createElement("div");
	let gameWindowForm = document.createElement("form");
	let gameWindowText = document.createElement("p");
	gameWindowDiv.setAttribute("id", "game-window");
	gameWindowForm.setAttribute("id", "game-form");
	gameWindowText.setAttribute("id", "game-text");
	document.body.appendChild(gameWindowDiv);
	gameWindowDiv.appendChild(gameWindowText);
	gameWindowDiv.appendChild(gameWindowForm);
}

function addButton (buttonText, buttonType, buttonFunction, buttonClass) {
	let newButton = document.createElement("button");
	newButton.setAttribute("type", buttonType);
	newButton.setAttribute("onclick", buttonFunction);
	newButton.setAttribute("class", buttonClass);
	let newButtonText = document.createTextNode(buttonText);
	let gameWindowDiv = document.getElementById("game-form");
	newButton.appendChild(newButtonText);
	gameWindowDiv.appendChild(newButton);
}

function startDay (startZone) {
	removeElementsByClassName ("game-elements");
	if (isSleeping === true) {
		isSleeping = false;
		playerStatus.dayCountTotal++;
	}
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You wake up at " + currentZone.name + ".";
	addButton("Go Out", "button", "selectArea()", "game-elements");
	if (currentZone !== homeZone) {
		addButton("Stay and Train", "button", "stayAndTrain()", "game-elements");
	}
	currentHealth = playerStatus.maxHealth;
	timeCounter = 0;
	initEncounters();
}

function removeElementsByClassName (className) {
	let toRemove = document.getElementsByClassName(className);
	while (toRemove.length > 0) {
		toRemove[0].parentNode.removeChild(toRemove[0]);
	}
}

function selectArea() {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	if (currentZone.name === homeZone.name) {
		textArea.innerHTML = "Which area would you like to explore?";
		addButton("Mountains", "button", "selectPath('mountain')", "game-elements");
		addButton("Islands", "button", "selectPath('island')", "game-elements");
		addButton("Plains", "button", "selectPath('plain')", "game-elements");
		addButton("Swamp", "button", "selectPath('swamp')", "game-elements");
		addButton("Forest", "button", "selectPath('forest')", "game-elements");
	}
	else {
		textArea.innerHTML = "Will you move forward or head back?";
		addButton("Foreward", "button", "travelPath('" + currentPath + "')", "game-elements");
		addButton("Backward", "button", "travelPathBack('" + currentPath + "')", "game-elements");
	}
}

function selectPath (pathToSelect) {
	removeElementsByClassName ("game-elements");
	let currentVisitedZone = currentZone;
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You start heading towards the " + pathToSelect;
	addButton("Okay", "button", "travelPath('" + pathToSelect + "')", "game-elements");
}

function travelPath(currentPathOption) {
	if (currentZone === homeZone) {
		if (currentPathOption === 'mountain') {
			currentPath = zonePathOne;
		}
		else if (currentPathOption === 'island') {
			currentPath = zonePathTwo;
		}
		else if (currentPathOption === 'plain') {
			currentPath = zonePathThree;
		}
		else if (currentPathOption === 'swamp') {
			currentPath = zonePathFour;
		}
		else if (currentPathOption === 'forest') {
			currentPath = zonePathFive;
		}
	}
	let pathIndex = currentPath.indexOf(currentZone);
	beginTravelTime (currentPath[pathIndex + 1]);
}

function travelPathBack (currentPathOption) {
	let pathIndex = currentPath.indexOf(currentZone);
	beginTravelTime (currentPath[pathIndex - 1]);
}

function beginTravelTime(areaGoal) {
	removeElementsByClassName ("game-elements");
	currentZone = areaGoal;
	travelCounter = 0;
	let gotEncounter = false;
	let nothingHappened = false;
	while (travelCounter < areaGoal.timeToTravel) {
		timeCounter++;
		travelCounter++;
		if (rollDie(12) <= currentZone.chanceOfEncounter) {
			gotEncounter = true;
			let encounterNum = rollDie(currentZone.encounterTable.length);
			encounterNum -= 1;
			performEncounter(currentZone.encounterTable[encounterNum]);
			break;
		}
		let textArea = document.getElementById("game-text");
		nothingHappened = true;
		textArea.innerHTML = "Nothing Happened. You have " + (12 - timeCounter) + " hours left in the day. You will arrive at " + areaGoal.name + " in " + (areaGoal.timeToTravel - travelCounter) + " hours.";
		addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
		break;
	}
	if (gotEncounter === false && nothingHappened === false) {
		newZoneArrival();
	}
}

function continueTravelTime(areaGoal) {
	removeElementsByClassName ("game-elements");
	let gotEncounter = false;
	let nothingHappened = false;
	while (travelCounter < areaGoal.timeToTravel) {
		timeCounter++;
		travelCounter++;
		if (rollDie(12) <= currentZone.chanceOfEncounter) {
			gotEncounter = true;
			let encounterNum = (rollDie(currentZone.encounterTable.length) - 1);
			performEncounter(currentZone.encounterTable[encounterNum]);
			break;
		}
		let textArea = document.getElementById("game-text");
		nothingHappened = true;
		textArea.innerHTML = "Nothing Happened. You have " + (12 - timeCounter) + " hours left in the day. You will arrive at " + areaGoal.name + " in " + (areaGoal.timeToTravel - travelCounter) + " hours.";
		addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
		break;
	}
	if (gotEncounter === false && nothingHappened === false) {
		newZoneArrival();
	}
}

function performEncounter(encounter) {
	if (encounter.constructor.name === "CombatEncounter")	{
		removeElementsByClassName ("game-elements");
		let textArea = document.getElementById("game-text");
		currentEnemy = new Enemy(encounter.enemy.name, encounter.enemy.pluralName, encounter.enemy.strength, encounter.enemy.accuracy, encounter.enemy.maxHealth, encounter.enemy.defence, encounter.enemy.specialMoveName, encounter.enemy.specialMoveDamage, encounter.enemy.expGiven, encounter.enemy.currentHealth);
		let numEnemies = rollDie(4);
		if (numEnemies > 1) {
			currentEnemy.maxHealth *= numEnemies;
			currentEnemy.expGiven *= numEnemies;
			currentEnemy.currentHealth = currentEnemy.maxHealth;
			alert("You are attacked by " + numEnemies + " " + currentEnemy.pluralName + "!");
			textArea.innerHTML = "The " + numEnemies + " " + currentEnemy.pluralName + " are staring you down.";
		}
		else {
			currentEnemyHealth = currentEnemy.maxHealth;
			alert("You are attacked by a " + currentEnemy.name + "!");
			textArea.innerHTML = "The " + currentEnemy.name + " is staring you down.";
		}

		playerAttack();
	}
	else if (encounter.constructor.name === "NonCombatEncounter") {
		removeElementsByClassName ("game-elements");
		let textArea = document.getElementById("game-text");
		if (encounter.affectNumber > 0) {
			textArea.innerHTML = encounter.textDescription + " Your " + encounter.statToAffect + " is boosted by " + encounter.affectNumber + "!";
		}
		else if (encounter.affectNumber < 0) {
			textArea.innerHTML = encounter.textDescription + " Your " + encounter.statToAffect + " takes " + (-1 * encounter.affectNumber) + " in damage!";
		}
		if (isSleeping === false) {
			addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
		}
		else if (isSleeping === true) {
			addButton("Okay", "button", "startDay(currentZone)", "game-elements");
		}
	}
}

function playerAttack () {
	removeElementsByClassName ("game-elements");
	console.log("Enemy Health: " + currentEnemy.currentHealth);
	console.log("Player Health: " + playerStatus.currentHealth);
	if (playerStatus.currentHealth <= 0) {
		endCombat (true, 0);
	}
	else if (currentEnemy.currentHealth <= 0) {
		endCombat (false, currentEnemy.expGiven);
	}
	else {
		let textArea = document.getElementById("game-text");
		textArea.innerHTML = "What do you do?";
		addButton("Attack", "button", "standardAttack(playerStatus, currentEnemy, 'enemyAttack()')", "game-elements");
		addButton("Special Attack", "button", "specialAttack(playerStatus, currentEnemy, 'enemyAttack()')", "game-elements");
		addButton("Heal", "button", "healEntity(playerStatus, 'enemyAttack()')", "game-elements");
		addButton("Run Away", "button", "runFromBattle(playerStatus, currentEnemy, 'enemyAttack()')", "game-elements");
	}
}

function enemyAttack () {
	removeElementsByClassName ("game-elements");
	if (playerStatus.currentHealth <= 0) {
		endCombat (true, 0);
	}
	else if (currentEnemy.currentHealth <= 0) {
		endCombat (false, currentEnemy.expGiven);
	}
	else {
		let textArea = document.getElementById("game-text");
		let aiRoll = rollDie(6);
		if (aiRoll === 1 || aiRoll === 2) {
			standardAttack (currentEnemy, playerStatus, "playerAttack()");
		}
		else if (aiRoll === 3) {
			specialAttack (currentEnemy, playerStatus, "playerAttack()");
		}
		else if (aiRoll === 4) {
			healEntity(currentEnemy, "playerAttack()");
		}
		else if (aiRoll === 5) {
			let flinchRoll = rollDie(6);
			if (flinchRoll % 2 === 0) {
				textArea.innerHTML = "The enemy flinches!";
				addButton("Okay", "button", "playerAttack()", "game-elements");
			}
			else {
				enemyAttack();
			}
		}
		else {
			let fleeRoll = rollDie(6);
			if (fleeRoll === 6) {
				runFromBattle(currentEnemy, playerStatus, "playerAttack()");
			}
			else {
				textArea.innerHTML = "The enemy tries to run, but fails!";
				addButton("Okay", "button", "playerAttack()", "game-elements");
			}
		}
	}
}

function rollDie (numSides) {
	return Math.floor(Math.random() * numSides) + 1;
}

function standardAttack(attackingEntity, receivingEntity, turnModifier) {
	let damageVal = processDamage(attackingEntity, receivingEntity);
	let textArea = document.getElementById("game-text");
	let attacker = "";
	if (attackingEntity === playerStatus) {
		attacker = "You";
	}
	else {
		attacker = "The enemy";
	}
	if (damageVal > 0) {
		textArea.innerHTML = attacker + " hit for " + damageVal + " damage!";
		receivingEntity.currentHealth -= damageVal;
		addButton("Okay", "button", turnModifier, "game-elements");
	}
	else {
		textArea.innerHTML = attacker + " missed the attack!";
		addButton("Okay", "button", turnModifier, "game-elements");
	}
}

function specialAttack(attackingEntity, receivingEntity, turnModifier) {
	let damageTotal = 0;
	let textArea = document.getElementById("game-text");
	let attacker = "";
	if (attackingEntity === playerStatus) {
		attacker = "You";
	}
	else {
		attacker = "The enemy";
	}
	for (let i = 0; i < rollDie(4); i++) {
		damageTotal += processDamage(attackingEntity, receivingEntity);
	}
	if (damageTotal > 0) {
		textArea.innerHTML = attacker + " attacked for a total of " + damageTotal + " damage!";
		receivingEntity.currentHealth -= damageTotal;
		addButton("Okay", "button", turnModifier, "game-elements");
	}
	else {
		textArea.innerHTML = attacker + " missed every attack!";
		addButton("Okay", "button", turnModifier, "game-elements");
	}
}

function processDamage(attackingEntity, receivingEntity) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	let accuracyRollOne = rollDie(8);
	let accuracyRollTwo = rollDie(8);
	let damageRoll = rollDie(10);
	let damageVal = attackingEntity.strength * damageRoll;
	if (damageRoll !== 10) {
		damageVal -= (receivingEntity.defence * .1 * (10 - damageRoll));
	}
	let largerRoll;
	if (accuracyRollOne > accuracyRollTwo) {
		largerRoll = accuracyRollOne;
	}
	else {
		largerRoll = accuracyRollTwo;
	}

	if ((largerRoll === 8 || largerRoll * attackingEntity.accuracy > 125) && damageVal > 0) {
		return damageVal;
	}
	else {
		return 0;
	}
}

function healEntity(healingEntity, turnModifier) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	let healRoll = rollDie(5);
	let healAmount = (healingEntity.maxHealth * .1 * healRoll);
	healingEntity.currentHealth += healAmount;
	if (healingEntity.currentHealth > healingEntity.maxHealth) {
		healingEntity.currentHealth = healingEntity.maxHealth
	}
	let healer = "";
	if (healingEntity === playerStatus) {
		healer = "You";
	}
	else {
		healer = "The enemy";
	}
	textArea.innerHTML = healer + " healed for " + healAmount + " points of health!";
	addButton("Okay", "button", turnModifier, "game-elements");
}

function runFromBattle(attackingEntity, receivingEntity, turnModifier) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	let runner = "";
	if (attackingEntity === playerStatus) {
		runner = "You";
	}
	else {
		runner = "The enemy";
	}
	if (attackingEntity.accuracy >= receivingEntity.accuracy) {
		textArea.innerHTML = runner + " successfully ran away!";
		addButton("Okay", "button", "endCombat(false, 0)", "game-elements");
	}
	else {
		textArea.innerHTML = runner + " failed to run away!";
		addButton("Okay", "button", turnModifier, "game-elements");
	}
}

function endCombat (isPlayerDead, expGained) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	if (isPlayerDead === true) {
		textArea.innerHTML = "You managed to escape with your life, head home, and heal your wounds. Be more careful!";
		currentZone = homeZone;
	}
	else if (expGained !== 0) {
		textArea.innerHTML = "You win! You gained " + expGained + " EXP!";
		playerStatus.exp += expGained;
		if (playerStatus.exp > 1000) {
			levelUp();
			textArea.innerHTML += " You gained a level!";
		}
	}
	else {
		textArea.innerHTML = "You gained 0 EXP.";
	}
	playerStatus.currentHealth = playerStatus.maxHealth;
	if (isSleeping === false) {
		addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
	}
	else if (isSleeping === true) {
		addButton("Okay", "button", "startDay(currentZone)", "game-elements");
	}
}

function levelUp() {
	playerStatus.exp -= 1000;
	playerStatus.level += 1;
	playerStatus.strength += 1;
	playerStatus.defence += 1;
	playerStatus.maxHealth += 20;
	if (level % 2 === 0) {
		playerStatus.accuracy += 1;
	}
}

function newZoneArrival() {
	removeElementsByClassName ("game-elements");
	if (!playerStatus.unlockedAreas.includes(currentZone.name)) {
		playerStatus.unlockedAreas.push(currentZone.name);
	}
	let textArea = document.getElementById("game-text");
	let pathIndex = currentPath.indexOf(currentZone);
	if ((12 - timeCounter) >= currentPath[pathIndex + 1].timeToTravel) {
		textArea.innerHTML = "You have arrived at " + currentZone.name + ". You have " + (12 - timeCounter) + " hours left in the day. What will you do?";
		addButton("Go Out", "button", "selectArea()", "game-elements");
	}
	else {
		textArea.innerHTML = "You have arrived at " + currentZone.name + ". You have " + (12 - timeCounter) + " hours left in the day, which is not enough to go forward.";
		addButton("Rest for the Night", "button", "restForTheNight()", "game-elements");
		if (currentZone !== currentPath[0]) {
			if ((12 - timeCounter) >= currentPath[pathIndex - 1].timeToTravel) {
				textArea.innerHTML += " However, there is still time to go backwards.";
				addButton("Head Back", "button", "travelPathBack('" + currentPath + "')", "game-elements");
			}
		}
	}
	if (currentZone.name !== homeZone.name && timeCounter < 12) {
		addButton("Stay and Train", "button", "stayAndTrain()", "game-elements");
	}
}

function stayAndTrain() {
	timeCounter++;
	let encounterNum = (rollDie(currentZone.encounterTable.length) - 1);
	performEncounter(currentZone.encounterTable[encounterNum]);
}

function restForTheNight() {
	isSleeping = true;
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You rest at " + currentZone.name + "for the night."
	if (currentZone.name === homeZone.name) {
		removeElementsByClassName ("game-elements");
		textArea.innerHTML += " Since you are home, you will sleep safely.";
		playerStatus.currentHealth = playerStatus.maxHealth;
		addButton("Okay", "button", "startDay(currentZone)", "game-elements");
	}
	else {
		removeElementsByClassName ("game-elements");
		textArea.innerHTML += " Since you are not home, you may be attacked!";
		let encounterNum = (rollDie(currentZone.encounterTable.length) - 1);
		addButton("Okay", "button", "performEncounter(currentZone.encounterTable[" + encounterNum + "])", "game-elements");
	}
}

startGameLoop();

// TODO: Lock Castle until visited locations length of 26
// TODO: Prevent forward movement from Castle
// TODO: Special Logic for Boss enemy, including WIn State
// TODO: Seed encounter tables, more creative zone names
