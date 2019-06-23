"use strict";
// currentLevel, currentXP, str, acc, hp, def, unlockedAreas, dayCounter
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

function startGameLoop (gameState = defaultNewPlayerArgs) {
	let playerStatus = new Map();
	playerStatus = defaultNewPlayerArgs;
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
	addButton("Go Out", "button", "testAlert('leave')", "game-elements");
	addButton("Stay and Train", "button", "testAlert('stay')", "game-elements");
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

// function initialText(zone) {
// 	let gameWindowDiv = document.getElementById("gameWindow");
// 	let description = document.createElement("p");
// 	let inputForm = document.createElement("form");
// 	let radioInput = document.createElement("input");
// 	radioInput.setAttribute("type", "radio");
// 	radioInput.setAttribute("name", "radio");
// 	radioInput.setAttribute("value", "radio");
// 	let textArea = document.createTextNode("Go Out");
// 	let descText = document.createTextNode("You wake up. You are at " + zone + ". What will you do?");
// 	description.appendChild(descText);
// 	gameWindowDiv.appendChild(description);
// 	gameWindowDiv.appendChild(inputForm);
// 	inputForm.appendChild(radioInput);
// 	inputForm.appendChild(textArea);
// }

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
