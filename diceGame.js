"use strict";

let defaultVisitedZones = ["Home"];
let defaultNewPlayerArgs = new Map();
defaultNewPlayerArgs.set("currentLevel", 1);
defaultNewPlayerArgs.set("currentXP", 0);
defaultNewPlayerArgs.set("currentStrength", 10);
defaultNewPlayerArgs.set("currentAccuracy", 20);
defaultNewPlayerArgs.set("currentMaxHealth", 1000);
defaultNewPlayerArgs.set("currentDefense", 20);
defaultNewPlayerArgs.set("currentUnlockedAreas", defaultVisitedZones);
defaultNewPlayerArgs.set("currentDayCount", 1);
defaultNewPlayerArgs.set("currentHealth", defaultNewPlayerArgs.currentMaxHealth);

let playerStatus = new Map();
playerStatus = defaultNewPlayerArgs;

let currentPath;
let currentZone;
let currentHealth;
let timeCounter;
let travelCounter;

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

function initEncounters() {
	wolfEncounter = new CombatEncounter(wolfEnemy);
	rockSlideEncounter = new NonCombatEncounter("You are hit by a rockslide!", currentHealth, -100);
	emptyEncounter = new NonCombatEncounter("You weren't attacked and manage to gain some health back.", currentHealth, 20);

	testTable = [wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, rockSlideEncounter, rockSlideEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
	emptyTable = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
	finalEncounterTable = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];

	mountainTables = [testTable, testTable, testTable, testTable, testTable];
	islandTables = [testTable, testTable, testTable, testTable, testTable];
	plainsTables = [testTable, testTable, testTable, testTable, testTable];
	swampTables = [testTable, testTable, testTable, testTable, testTable];
	forestTables = [testTable, testTable, testTable, testTable, testTable];

	homeZone = new Zone ("Home", emptyTable, 0, 0);

	mountainZoneOne = new Zone ("Mountain1", mountainTables[0], 1, 3);
	mountainZoneTwo = new Zone ("Mountain2", mountainTables[1], 2, 4);
	mountainZoneThree = new Zone ("Mountain3", mountainTables[2], 3, 5);
	mountainZoneFour = new Zone ("Mountain4", mountainTables[3], 4, 8);
	mountainZoneFive = new Zone ("Mountain5", mountainTables[4], 5, 9);

	islandZoneOne = new Zone ("Island1", islandTables[0], 1, 3);
	islandZoneTwo = new Zone ("Island2", islandTables[1], 2, 4);
	islandZoneThree = new Zone ("Island3", islandTables[2], 3, 5);
	islandZoneFour = new Zone ("Island4", islandTables[3], 4, 8);
	islandZoneFive = new Zone ("Island5", islandTables[4], 5, 9);

	plainsZoneOne = new Zone ("Plains1", plainsTables[0], 1, 3);
	plainsZoneTwo = new Zone ("Plains2", plainsTables[1], 2, 4);
	plainsZoneThree = new Zone ("Plains3", plainsTables[2], 3, 5);
	plainsZoneFour = new Zone ("Plains4", plainsTables[3], 4, 8);
	plainsZoneFive = new Zone ("Plains5", plainsTables[4], 5, 9);

	swampZoneOne = new Zone ("Swamp1", swampTables[0], 1, 3);
	swampZoneTwo = new Zone ("Swamp2", swampTables[1], 2, 4);
	swampZoneThree = new Zone ("Swamp3", swampTables[2], 3, 5);
	swampZoneFour = new Zone ("Swamp4", swampTables[3], 4, 8);
	swampZoneFive = new Zone ("Swamp5", swampTables[4], 5, 9);

	forestZoneOne = new Zone ("Forest1", forestTables[0], 1, 3);
	forestZoneTwo = new Zone ("Forest2", forestTables[1], 2, 4);
	forestZoneThree = new Zone ("Forest3", forestTables[2], 3, 5);
	forestZoneFour = new Zone ("Forest4", forestTables[3], 4, 8);
	forestZoneFive = new Zone ("Forest5", forestTables[4], 5, 9);

	finalZone = new Zone ("Castle", finalEncounterTable, 8, 12);

	zonePathOne = [homeZone, mountainZoneOne, mountainZoneTwo, mountainZoneThree, mountainZoneFour, mountainZoneFive, finalZone];
	zonePathTwo = [homeZone, islandZoneOne, islandZoneTwo, islandZoneThree, islandZoneFour, islandZoneFive, finalZone];
	zonePathThree = [homeZone, plainsZoneOne, plainsZoneTwo, plainsZoneThree, plainsZoneFour, plainsZoneFive, finalZone];
	zonePathFour = [homeZone, swampZoneOne, swampZoneTwo, swampZoneThree, swampZoneFour, swampZoneFive, finalZone];
	zonePathFive = [homeZone, forestZoneOne, forestZoneTwo, forestZoneThree, forestZoneFour, forestZoneFive, finalZone];
	zonePaths = [zonePathOne, zonePathTwo, zonePathThree, zonePathFour, zonePathFive];
}

// currentLevel, currentXP, str, acc, hp, def, unlockedAreas, dayCounter

function startGameLoop (gameState = defaultNewPlayerArgs) {
	initEncounters();
	currentZone = homeZone;
	currentPath = zonePathOne;
	initializeGameWindow();
	startDay();
	//console.log(playerStatus);
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
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "Test text";
	addButton("Go Out", "button", "selectArea()", "game-elements");
	if (currentZone !== homeZone) {
		addButton("Stay and Train", "button", "testAlert('stay')", "game-elements");
	}
	currentHealth = playerStatus.maxHealth;
	timeCounter = 0;
	initEncounters();
}

function testAlert(val) {
	alert(val);
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "";
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
	textArea.innerHTML = "Which area would you like to explore?";
	addButton("Mountains", "button", "selectPath('mountain')", "game-elements");
	addButton("Islands", "button", "selectPath('island')", "game-elements");
	addButton("Plains", "button", "selectPath('plain')", "game-elements");
	addButton("Swamp", "button", "selectPath('swamp')", "game-elements");
	addButton("Forest", "button", "selectPath('forest')", "game-elements");
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

function beginTravelTime(areaGoal) {
	removeElementsByClassName ("game-elements");
	currentZone = areaGoal;
	travelCounter = 0;
	while (travelCounter < areaGoal.timeToTravel) {
		if (rollDie(12) <= currentZone.chanceOfEncounter) {
			initEncounters();
			performEncounter(currentZone.encounterTable[rollDie(20)]);
			break;
		}
		timeCounter++;
		travelCounter++;
	}
}

function continueTravelTime(areaGoal) {
	removeElementsByClassName ("game-elements");
	currentZone = areaGoal;
	while (travelCounter < areaGoal.timeToTravel) {
		timeCounter++;
		travelCounter++;
		if (rollDie(12) <= currentZone.chanceOfEncounter) {
			initEncounters();
			performEncounter(currentZone.encounterTable[rollDie(20)]);
			break;
		}
	}
}

function performEncounter(encounter) {
	if (encounter.constructor.name === "CombatEncounter")	{
		//name, strength, accuracy, maxHealth, defence, specialMoveName, specialMoveDamage, expGiven
		removeElementsByClassName ("game-elements");
		let textArea = document.getElementById("game-text");
		currentEnemy = new Enemy(encounter.enemy.name, encounter.enemy.pluralName, encounter.enemy.strength, encounter.enemy.accuracy, encounter.enemy.maxHealth, encounter.enemy.defence, encounter.enemy.specialMoveName, encounter.enemy.specialMoveDamage, encounter.enemy.expGiven);
		let numEnemies = rollDie(4);
		if (numEnemies > 1) {
			currentEnemy.maxHealth *= numEnemies;
			currentEnemy.expGiven *= numEnemies;
			currentEnemyHealth = currentEnemy.maxHealth;
			alert("You are attacked by " + numEnemies + " " + currentEnemy.pluralName + "!");
			textArea.innerHTML = "The " + numEnemies + " " + currentEnemy.pluralName + " are staring you down.";
		}
		else {
			currentEnemyHealth = currentEnemy.maxHealth;
			alert("You are attacked by a " + currentEnemyName + "!");
			textArea.innerHTML = "The " + currentEnemy.name + " is staring you down.";
		}

		playerAttack();
	}
	else if (encounter.constructor.name === "NonCombatEncounter") {
		//textDescription, statToAffect, affectNumber
	}
}

function playerAttack () {
	addButton("Attack", "button", "standardAttack(playerStatus, currentEnemy)", "game-elements");
	addButton("Special Attack", "button", "specialAttack(playerStatus, currentEnemy)", "game-elements");
	addButton("Heal", "button", "healEntity(" + playerStatus.strength + ")", "game-elements");
	addButton("Run Away", "button", "runFromBattle(" + playerStatus.strength + ")", "game-elements");
}

function enemyAttack () {

}

function rollDie (numSides) {
	return Math.floor(Math.random() * numSides) + 1;
}

function standardAttack(attackingEntity, receivingEntity) {
	let damageVal = processDamage(attackingEntity, receivingEntity);
	let textArea = document.getElementById("game-text");
	if (damageVal > 0) {
		textArea.innerHTML = "You hit for " + damageVal + " damage!";
		addButton("Okay", "button", "enemyAttack()", "game-elements");
	}
	else {
		textArea.innerHTML = "You missed the attack!";
		addButton("Okay", "button", "enemyAttack()", "game-elements");
	}
}

function specialAttack(attackingEntity, receivingEntity) {
	let damageTotal = 0;
	let textArea = document.getElementById("game-text");
	for (let i = 0; i < rolLDie(4); i++) {
		damageTotal += processDamage(attackingEntity, receivingEntity);
	}
	if (damageTotal > 0) {
		textArea.innerHTML = "You attacked for a total of " + damageTotal + " damage!";
		addButton("Okay", "button", "enemyAttack()", "game-elements");
	}
	else {
		testArea.innerHTML = "You missed every attack!";
		addButton("Okay", "button", "enemyAttack()", "game-elements");
	}
}

function processDamage(attackingEntity, receivingEntity) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	let accuracyRollOne = rollDie(8);
	let accuracyRollTwo = rollDie(8);
	let damageRoll = rollDie(10);
	let damageVal = attackingEntity.strength * damageRoll;
	let largerRoll;
	if (accuracyRollOne > accuracyRollTwo) {
		largerRoll = accuracyRollOne;
	}
	else {
		largerRoll = accuracyRollTwo;
	}

	if (largerRoll === 8 || largerRoll * attackingEntity.accuracy > 125) {
		return damageVal;
	}
	else {
		return 0;
	}
}

function healEntity(healVal) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
}

function runFromBattle() {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
}

startGameLoop();

// get current location, default is home
// prompt to travel or stay and grind (grind option not available from home location)
// once travelling or staying, begin incrementing hours timer
// each increment, roll D12 to get encounter chance
// if encounter is triggered, roll D20 to get encounter from location's map
// perform combat loop or other encounter logic
// if combat encounter, restore player health afterwards
// once location increment ends, prompt to either stay or travel
// once hours timer hits 8, prompt reminder for 4 hours remaining
// once hours timer hits 12, prompt travel or stay, travel locations within 4 hours travel time
// once resting, check if player is home or not
// if home, increment day counter and reset hour counter
// if not home, roll D20 to get encounter from location's map, and do not allow player to run
// once encounter ends, increment day counter and reset hour counter
