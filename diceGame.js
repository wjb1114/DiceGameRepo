"use strict";

// Default values, used for a new game
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

// Defines Player Object
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

// Instantiates player, starts at defined new player values
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
let wolvesEncounter;
let lionEncounter;
let lionsEncounter;
let crabEncounter;
let crabsEncounter;
let alligatorEncounter;
let alligatorsEncounter;
let spiderEncounter;
let spidersEncounter;

let giantWolfEncounter;
let giantWolvesEncounter;
let giantLionEncounter;
let giantLionsEncounter;
let giantCrabEncounter;
let giantCrabsEncounter;
let giantAlligatorEncounter;
let giantAlligatorsEncounter;
let giantSpiderEncounter;
let giantSpidersEncounter;

let demonQueenEncounter;
let demonPrinceEncounter;
let demonPrincesEncounter;
let demonPrincessEncounter;
let demonPrincessesEncounter;

let demonKingEncounter;

let rockSlideEncounter;
let emptyEncounter;
let healEncounter;

let emptyTable = [];

let mountainOneTable = [];
let mountainTwoTable = [];
let mountainThreeTable = [];
let mountainFourTable = [];
let mountainFiveTable = [];

let islandOneTable = [];
let islandTwoTable = [];
let islandThreeTable = [];
let islandFourTable = [];
let islandFiveTable = [];

let plainsOneTable = [];
let plainsTwoTable = [];
let plainsThreeTable = [];
let plainsFourTable = [];
let plainsFiveTable = [];

let swampOneTable = [];
let swampTwoTable = [];
let swampThreeTable = [];
let swampFourTable = [];
let swampFiveTable = [];

let forestOneTable = [];
let forestTwoTable = [];
let forestThreeTable = [];
let forestFourTable = [];
let forestFiveTable = [];

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

// Defines zones that player will progress through
let Zone = class {
	constructor (name, encounterTable, timeToTravel, chanceOfEncounter) {
		this.name = name;
		this.encounterTable = encounterTable;
		this.timeToTravel = timeToTravel;
		this.chanceOfEncounter = chanceOfEncounter;
	}
}

// Defines enemies for comat encounters
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

// Defines combat encounters using existing enemies
let CombatEncounter = class {
	constructor (enemy) {
		this.enemy = enemy;
	}
}

// Defines encounters that change stats instead of initiating combat
let NonCombatEncounter = class {
	constructor (textDescription, statToAffect, affectNumber) {
		this.textDescription = textDescription;
		this.statToAffect = statToAffect;
		this.affectNumber = affectNumber;
	}
}
let wolfEnemy = new Enemy ("Wolf", "", 10, 10, 150, 10, "Bite", 20, 100, 150);
let wolvesEnemy = new Enemy ("Wolf", "Wolves", 10, 10, 150, 10, "Bite", 20, 100, 150);
let lionEnemy = new Enemy ("Lion", "", 10, 10, 150, 10, "Bite", 20, 100, 150);
let lionsEnemy = new Enemy ("Lion", "Lions", 10, 10, 150, 10, "Bite", 20, 100, 150);
let crabEnemy = new Enemy ("Crab", "", 10, 10, 150, 10, "Bite", 20, 100, 150);
let crabsEnemy = new Enemy ("Crab", "Crabs", 10, 10, 150, 10, "Bite", 20, 100, 150);
let alligatorEnemy = new Enemy ("Alligator", "", 10, 10, 150, 10, "Bite", 20, 100, 150);
let alligatorsEnemy = new Enemy ("Alligator", "Alligators", 10, 10, 150, 10, "Bite", 20, 100, 150);
let spiderEnemy = new Enemy ("Spider", "", 10, 10, 150, 10, "Bite", 20, 100, 150);
let spidersEnemy = new Enemy ("Spider", "Spiders", 10, 10, 150, 10, "Bite", 20, 100, 150);

let giantWolfEnemy = new Enemy ("Giant Wolf", "", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantWolvesEnemy = new Enemy ("Giant Wolf", "Giant Wolves", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantLionEnemy = new Enemy ("Giant Lion", "", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantLionsEnemy = new Enemy ("Giant Lion", "Giant Lions", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantCrabEnemy = new Enemy ("Giant Crab", "", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantCrabsEnemy = new Enemy ("Giant Crab", "Giant Crabs", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantAlligatorEnemy = new Enemy ("Giant Alligator", "", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantAlligatorsEnemy = new Enemy ("Giant Alligator", "Giant Alligators", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantSpiderEnemy = new Enemy ("Giant Spider", "", 50, 30, 750, 30, "Bite", 20, 100, 750);
let giantSpidersEnemy = new Enemy ("Giant Spider", "Giant Spiders", 50, 30, 750, 30, "Bite", 20, 100, 750);

let demonQueenEnemy = new Enemy ("Demon Queen", "", 120, 65, 1750, 65, "Bite", 20, 100, 1750);
let demonPrinceEnemy = new Enemy ("Demon Prince", "", 100, 50, 1500, 50, "Bite", 20, 100, 1500);
let demonPrincesEnemy = new Enemy ("Demon Prince", "Demon Princes", 100, 50, 1500, 50, "Bite", 20, 100, 1500);
let demonPrincessEnemy = new Enemy ("Demon Princess", "", 100, 50, 1500, 50, "Bite", 20, 100, 1500);
let demonPrincessesEnemy = new Enemy ("Demon Princess", "Demon Princesses", 100, 50, 1500, 50, "Bite", 20, 100, 1500);

let demonKingEnemy = new Enemy ("Demon King", "", 10, 10, 150, 10, "Bite", 20, 100, 150);

emptyTable = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
homeZone = new Zone ("Home", emptyTable, 1, 0);

if (!playerStatus.unlockedAreas.includes(homeZone.name)) {
	playerStatus.unlockedAreas.push(homeZone.name);
}

// Initializes Encounter tables when an encounter is being rolled
function initEncounters() {
	wolfEncounter = new CombatEncounter(wolfEnemy);
	wolvesEncounter = new CombatEncounter(wolvesEnemy);
	lionEncounter = new CombatEncounter(wolfEnemy);
	lionsEncounter = new CombatEncounter(lionsEnemy);
	crabEncounter = new CombatEncounter(crabEnemy);
	crabsEncounter = new CombatEncounter(crabsEnemy);
	alligatorEncounter = new CombatEncounter(alligatorEnemy);
	alligatorsEncounter = new CombatEncounter(alligatorsEnemy);
	spiderEncounter = new CombatEncounter(spiderEnemy);
	spidersEncounter = new CombatEncounter(spidersEnemy);

	giantWolfEncounter = new CombatEncounter(giantWolfEnemy);
	giantWolvesEncounter = new CombatEncounter(giantWolvesEnemy);
	giantLionEncounter = new CombatEncounter(giantLionEnemy);
	giantLionsEncounter = new CombatEncounter(giantLionsEnemy);
	giantCrabEncounter = new CombatEncounter(giantCrabEnemy);
	giantCrabsEncounter = new CombatEncounter(giantCrabsEnemy);
	giantAlligatorEncounter = new CombatEncounter(giantAlligatorEnemy);
	giantAlligatorsEncounter = new CombatEncounter(giantAlligatorsEnemy);
	giantSpiderEncounter = new CombatEncounter(giantSpiderEnemy);
	giantSpidersEncounter = new CombatEncounter(giantSpidersEnemy);

	demonQueenEncounter = new CombatEncounter(demonQueenEnemy);
	demonPrinceEncounter = new CombatEncounter(demonPrinceEnemy);
	demonPrincesEncounter = new CombatEncounter(demonPrincesEnemy);
	demonPrincessEncounter = new CombatEncounter(demonPrincessEnemy);
	demonPrincessesEncounter = new CombatEncounter(demonPrincessesEnemy);

	demonKingEncounter = new CombatEncounter(demonKingEnemy);

	rockSlideEncounter = new NonCombatEncounter("You are hit by a rockslide!", "health", -100);
	healEncounter = new NonCombatEncounter("You manage to heal yourself.", "health", 100);
	emptyEncounter = new NonCombatEncounter("You weren't attacked and manage to gain some health back.", "health", 1);

	mountainOneTable = [wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	mountainTwoTable = [wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	mountainThreeTable = [wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, wolvesEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	mountainFourTable = [giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, giantWolfEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	mountainFiveTable = [giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, giantWolvesEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrinceEncounter, emptyEncounter, emptyEncounter, rockSlideEncounter, healEncounter];

	islandOneTable = [crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	islandTwoTable = [crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, crabEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	islandThreeTable = [crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, crabsEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	islandFourTable = [giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, giantCrabEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	islandFiveTable = [giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, giantCrabsEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrinceEncounter, emptyEncounter, emptyEncounter, rockSlideEncounter, healEncounter];

	plainsOneTable = [lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	plainsTwoTable = [lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, lionEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	plainsThreeTable = [lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, lionsEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	plainsFourTable = [giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, giantLionEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	plainsFiveTable = [giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, giantLionsEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrinceEncounter, emptyEncounter, emptyEncounter, rockSlideEncounter, healEncounter];

	swampOneTable = [alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	swampTwoTable = [alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, alligatorEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	swampThreeTable = [alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, alligatorsEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	swampFourTable = [giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, giantAlligatorEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	swampFiveTable = [giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, giantAlligatorsEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrinceEncounter, emptyEncounter, emptyEncounter, rockSlideEncounter, healEncounter];

	forestOneTable = [spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	forestTwoTable = [spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, spiderEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	forestThreeTable = [spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, spidersEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	forestFourTable = [giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, giantSpiderEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, healEncounter, healEncounter];
	forestFiveTable = [giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, giantSpidersEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrinceEncounter, emptyEncounter, emptyEncounter, rockSlideEncounter, healEncounter];


	finalEncounterTable = [demonQueenEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrinceEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincessEncounter, demonPrincesEncounter, demonPrincesEncounter, demonPrincesEncounter, demonPrincessesEncounter, demonPrincessesEncounter, demonPrincessesEncounter, giantWolvesEncounter, giantSpidersEncounter, giantLionsEncounter, giantAlligatorsEncounter, giantCrabsEncounter];

	mountainTables = [mountainOneTable, mountainTwoTable, mountainThreeTable, mountainFourTable, mountainFiveTable];
	islandTables = [islandOneTable, islandTwoTable, islandThreeTable, islandFourTable, islandFiveTable];
	plainsTables = [plainsOneTable, plainsTwoTable, plainsThreeTable, plainsFourTable, plainsFiveTable];
	swampTables = [swampOneTable, swampTwoTable, swampThreeTable, swampFourTable, swampFiveTable];
	forestTables = [forestOneTable, forestTwoTable, forestThreeTable, forestFourTable, forestFiveTable];

	mountainZoneOne = new Zone ("The Red Cliffs", mountainTables[0], 1, 7);
	mountainZoneTwo = new Zone ("Mount Cieve", mountainTables[1], 2, 8);
	mountainZoneThree = new Zone ("The Perilous Peak", mountainTables[2], 3, 9);
	mountainZoneFour = new Zone ("The Caves of Cieve", mountainTables[3], 4, 10);
	mountainZoneFive = new Zone ("The Demon's Peak", mountainTables[4], 5, 11);

	islandZoneOne = new Zone ("The Blue Depths", islandTables[0], 1, 7);
	islandZoneTwo = new Zone ("Pirate's Cove", islandTables[1], 2, 8);
	islandZoneThree = new Zone ("Where Men Shan't Return", islandTables[2], 3, 9);
	islandZoneFour = new Zone ("The True Depths", islandTables[3], 4, 10);
	islandZoneFive = new Zone ("The Demon's Peninsula", islandTables[4], 5, 11);

	plainsZoneOne = new Zone ("The White Expanse", plainsTables[0], 1, 7);
	plainsZoneTwo = new Zone ("Cieve's Rest", plainsTables[1], 2, 8);
	plainsZoneThree = new Zone ("The Muddied Reprieve", plainsTables[2], 3, 9);
	plainsZoneFour = new Zone ("The Ashen Plains", plainsTables[3], 4, 10);
	plainsZoneFive = new Zone ("The Demon's Battleground", plainsTables[4], 5, 11);

	swampZoneOne = new Zone ("The Black Moors", swampTables[0], 1, 7);
	swampZoneTwo = new Zone ("Compost Bay", swampTables[1], 2, 8);
	swampZoneThree = new Zone ("The Flame Seas", swampTables[2], 3, 9);
	swampZoneFour = new Zone ("The Red Waters", swampTables[3], 4, 10);
	swampZoneFive = new Zone ("The Demon's Reprieve", swampTables[4], 5, 11);

	forestZoneOne = new Zone ("The Green Canopy", forestTables[0], 1, 7);
	forestZoneTwo = new Zone ("The Maze of Pines", forestTables[1], 2, 8);
	forestZoneThree = new Zone ("Where None May Hear", forestTables[2], 3, 9);
	forestZoneFour = new Zone ("The Strangling Roots", forestTables[3], 4, 10);
	forestZoneFive = new Zone ("The Demon's Greatwood", forestTables[4], 5, 11);

	finalZone = new Zone ("The Demon's Fortress", finalEncounterTable, 8, 12);

	zonePathOne = [homeZone, mountainZoneOne, mountainZoneTwo, mountainZoneThree, mountainZoneFour, mountainZoneFive, finalZone];
	zonePathTwo = [homeZone, islandZoneOne, islandZoneTwo, islandZoneThree, islandZoneFour, islandZoneFive, finalZone];
	zonePathThree = [homeZone, plainsZoneOne, plainsZoneTwo, plainsZoneThree, plainsZoneFour, plainsZoneFive, finalZone];
	zonePathFour = [homeZone, swampZoneOne, swampZoneTwo, swampZoneThree, swampZoneFour, swampZoneFive, finalZone];
	zonePathFive = [homeZone, forestZoneOne, forestZoneTwo, forestZoneThree, forestZoneFour, forestZoneFive, finalZone];
	zonePaths = [zonePathOne, zonePathTwo, zonePathThree, zonePathFour, zonePathFive];
}

// Sets up base game window values
function startGameLoop (gameState = defaultNewPlayerArgs) {
	removeElementsByClassName("start-game");
	initEncounters();
	currentZone = homeZone;
	currentPath = zonePathOne;
	initializeGameWindow();
	startDay();
}

// Creates HTML elements used as containers for gameplay interaction elements
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

// Adds a button, assigns a class, and assigns an onclick function
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

// Starts new day
function startDay (startZone) {
	removeElementsByClassName ("game-elements");
	if (isSleeping === true) {
		isSleeping = false;
		playerStatus.dayCountTotal++;
	}
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You wake up at " + currentZone.name + ".";
	addButton("Go Out", "button", "selectArea()", "game-elements");
	if (currentZone.name !== homeZone.name && currentZone.name!== finalZone.name) {
		addButton("Stay and Train", "button", "stayAndTrain()", "game-elements");
	}
	else if (currentZone.name === finalZone.name) {
		addButton("Hunt the Demon King", "button", "finalEncounter()", "game-elements");
	}
	currentHealth = playerStatus.maxHealth;
	timeCounter = 0;
	initEncounters();
}

// Removes all elements with chosen class name, used for resetting buttons
function removeElementsByClassName (className) {
	let toRemove = document.getElementsByClassName(className);
	while (toRemove.length > 0) {
		toRemove[0].parentNode.removeChild(toRemove[0]);
	}
}

// Creates buttons for traversing the game world
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
		if (currentZone.name === currentPath[5].name) {
			if (playerStatus.unlockedAreas.length >= 26) {
				textArea.innerHTML = "The Demon's Fortress is now unlocked. Will you move forward or head back?";
				addButton("Forward", "button", "travelPath('" + currentPath + "')", "game-elements");
				addButton("Backward", "button", "travelPathBack('" + currentPath + "')", "game-elements");
			}
			else {
				textArea.innerHTML = "The Demon's Fortresss is locked. You will need to head back.";
				addButton("Backward", "button", "travelPathBack('" + currentPath + "')", "game-elements");
			}
		}
		else if (currentZone.name === currentPath[6].name) {
			textArea.innerHTML = "You are in the Demon's Fortress and cannot go forward. You will need to retreat.";
			addButton("Backward", "button", "travelPathBack('" + currentPath + "')", "game-elements");
		}
		else {
			textArea.innerHTML = "Will you move forward or head back?";
			addButton("Forward", "button", "travelPath('" + currentPath + "')", "game-elements");
			addButton("Backward", "button", "travelPathBack('" + currentPath + "')", "game-elements");
		}
	}
}

// Once path is selected, text and button before travel commences
function selectPath (pathToSelect) {
	removeElementsByClassName ("game-elements");
	let currentVisitedZone = currentZone;
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You start heading towards the " + pathToSelect;
	addButton("Okay", "button", "travelPath('" + pathToSelect + "')", "game-elements");
}

// Sets path to travel if starting at origin point, and travels to next node along the chosen path
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

// USed for traversing down the path instead of up
function travelPathBack (currentPathOption) {
	let pathIndex = currentPath.indexOf(currentZone);
	beginTravelTime (currentPath[pathIndex - 1]);
}

// Resets travel counter and then rolls for encounters once per game hour until arrival
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

// Same as above, but does not reset goal zone or travel counter
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

// Once an encounter appears, rolls to decide what encounter, and handles based on encounter type
function performEncounter(encounter) {
	if (encounter.constructor.name === "CombatEncounter")	{
		removeElementsByClassName ("game-elements");
		let textArea = document.getElementById("game-text");
		currentEnemy = new Enemy(encounter.enemy.name, encounter.enemy.pluralName, encounter.enemy.strength, encounter.enemy.accuracy, encounter.enemy.maxHealth, encounter.enemy.defence, encounter.enemy.specialMoveName, encounter.enemy.specialMoveDamage, encounter.enemy.expGiven, encounter.enemy.currentHealth);
		let numEnemies;
		if (currentEnemy.pluralName === "") {
			numEnemies = 1;
		}
		else {
			numEnemies = rollDie(4) + 1;
		}
		if (numEnemies > 1) {
			currentEnemy.maxHealth *= numEnemies;
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
		if (encounter.statToAffect === 'health') {
			playerStatus.currentHealth += encounter.affectNumber;
			if (playerStatus.currentHealth > playerStatus.maxHealth) {
				playerStatus.currentHealth = playerStatus.maxHealth;
			}
			else if (playerStatus.currentHealth <= 0) {
				textArea.innerHTML = "You managed to escape with your life, head home, and rest. Be more careful!";
				currentZone = homeZone;
				startDay();
			}
		}
		if (isSleeping === false) {
			addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
		}
		else if (isSleeping === true) {
			addButton("Okay", "button", "startDay(currentZone)", "game-elements");
		}
		playerStatus.exp += 10;
	}
}

// Plauer's turn in combat encounter
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
		if (isSleeping === false && currentEnemy.name !== "Demon King") {
			addButton("Run Away", "button", "runFromBattle(playerStatus, currentEnemy, 'enemyAttack()')", "game-elements");
		}
	}
}

// Enemy's turn in combat encounter
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

// Returns random value between 1 and given number
function rollDie (numSides) {
	return Math.floor(Math.random() * numSides) + 1;
}

// Result of clicking "Attack" button, damages other combat entity
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

// Attacks 0 to 4 times based on die roll
function specialAttack(attackingEntity, receivingEntity, turnModifier) {
	let damageTotal = 0;
	let textArea = document.getElementById("game-text");
	let attacker = "";
	let numAttacks = rollDie(5) - 1;
	if (attackingEntity === playerStatus) {
		attacker = "You";
	}
	else {
		attacker = "The enemy";
	}
	if (numAttacks === 0) {
		removeElementsByClassName ("game-elements");
		textArea.innerHTML = attacker + " failed the special attack!";
		addButton("Okay", "button", turnModifier, "game-elements");
	}
	else {
		for (let i = 0; i < numAttacks; i++) {
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
}

// Generated damage values for normal and special attacks
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

// Heals entity calling the function based on the creature's maximum health
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

// Entity rund from battle if it has a higher accuracy than it's opponent
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

// Handles post-combat state, including giving XP and handling player death
function endCombat (isPlayerDead, expGained) {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	if (isPlayerDead === true) {
		textArea.innerHTML = "You managed to escape with your life, head home, and rest. Be more careful!";
		currentZone = homeZone;
	}
	else if (expGained !== 0) {
		textArea.innerHTML = "You win! You gained " + expGained + " EXP!";
		playerStatus.exp += expGained;
		if (playerStatus.exp >= 1000) {
			levelUp();
			textArea.innerHTML += " You gained a level!";
		}
		if (currentEnemy.name === "Demon King") {
			textArea.innerHTML += " You defeated the Demon King!";
		}
	}
	else {
		textArea.innerHTML = "You gained 0 EXP.";
	}
	playerStatus.currentHealth = playerStatus.maxHealth;
	if (isSleeping === false && currentEnemy.name !== "Demon King") {
		addButton("Okay", "button", "continueTravelTime(currentZone)", "game-elements");
	}
	else if (isSleeping === true && currentEnemy.name !== "Demon King") {
		addButton("Okay", "button", "startDay(currentZone)", "game-elements");
	}
	else if (currentEnemy.name === "Demon King") {
		addButton("Okay", "button", "endGame()", "game-elements");
	}
}

// Increments player's stats on level up
function levelUp() {
	while (playerStatus.exp >= 1000) {
		playerStatus.exp -= 1000;
		playerStatus.level += 1;
		playerStatus.strength += 10;
		playerStatus.defence += 10;
		playerStatus.maxHealth += 200;
		if (playerStatus.level % 2 === 0) {
			playerStatus.accuracy += 10;
		}
		playerStatus.currentHealth = playerStatus.maxHealth;
	}
}

// Once you arrive in a new zone, make sure the zone is in the array of visited zones and gve options to grind or move forward
function newZoneArrival() {
	removeElementsByClassName ("game-elements");
	if (!playerStatus.unlockedAreas.includes(currentZone.name)) {
		playerStatus.unlockedAreas.push(currentZone.name);
		if (currentZone.name === currentPath[5].name) {
			alert("You find a magical-looking lever and pull it. One of the Demon's Fortress gates is now open!");
			if (playerStatus.unlockedAreas.length === 26) {
				alert("You feel a chill in the air. The last Demon's Fortress gate has been unlocked, and the Demon King is waiting for you!");
			}
		}
	}
	let textArea = document.getElementById("game-text");
	let pathIndex = currentPath.indexOf(currentZone);
	if (currentZone.name !== currentPath[6].name) {
		if ((12 - timeCounter) >= currentPath[pathIndex + 1].timeToTravel) {
			textArea.innerHTML = "You have arrived at " + currentZone.name + ". You have " + (12 - timeCounter) + " hours left in the day. What will you do?";
			addButton("Go Out", "button", "selectArea()", "game-elements");
		}
		else {
			textArea.innerHTML = "You have arrived at " + currentZone.name + ". You have " + (12 - timeCounter) + " hours left in the day, which is not enough to go forward.";
			if (currentZone !== currentPath[0]) {
				if ((12 - timeCounter) >= currentPath[pathIndex - 1].timeToTravel) {
					textArea.innerHTML += " However, there is still time to go backwards.";
					addButton("Head Back", "button", "travelPathBack('" + currentPath + "')", "game-elements");
				}
			}
		}
	}
	else {
		if ((12 - timeCounter) >= currentPath[pathIndex - 1].timeToTravel) {
			textArea.innerHTML = "You have reached the Demon's Fortress. Hunt the Demon King!";
			addButton("Hunt the Demon King", "button", "finalEncounter()", "game-elements");
			addButton("Retreat", "button", "travelPathBack('" + currentPath + "')", "game-elements");
		}
		else if (timeCounter < 12){
			textArea.innerHTML = "You have reached the Demon's Fortress. There is not enough time to retreat.";
			addButton("Hunt the Demon King", "button", "finalEncounter()", "game-elements");
		}
		else {
			textArea.innerHTML = "You have reached the Demon's Fortress. There is not enough time to retreat or hunt today.";
		}
	}
	if (currentZone.name !== homeZone.name && timeCounter < 12 && currentZone.name !== currentPath[6].name) {
		addButton("Stay and Train", "button", "stayAndTrain()", "game-elements");
	}
	addButton("Rest for the Night", "button", "restForTheNight()", "game-elements");
}

// Handles player choosing to grind instead of moving to another zone
function stayAndTrain() {
	timeCounter++;
	let encounterNum = (rollDie(currentZone.encounterTable.length) - 1);
	performEncounter(currentZone.encounterTable[encounterNum]);
}

// Once all 12 day hours elapse, player must rest and start a new day
function restForTheNight() {
	isSleeping = true;
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "You rest at " + currentZone.name + " for the night."
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

// Handles successfully defeating the final boss
function endGame() {
	removeElementsByClassName ("game-elements");
	let textArea = document.getElementById("game-text");
	textArea.innerHTML = "The Demon King is dead, and you are the new hero of the realm!";
	addButton("Play Again", "button", "newGame()", "game-elements");
}

// Regenerates values so a player can start over once they beat the game
function newGame() {
	removeElementsByClassName ("game-elements");
	let gameWindowText = document.getElementById("game-text");
	gameWindowText.innerHTML = "";
	playerStatus = new PlayerObj(
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
	let gameWindowDiv = document.getElementById("game-window");
	let gameWindowForm = document.getElementById("game-form");
  gameWindowForm.parentNode.removeChild(gameWindowForm);
	gameWindowText.parentNode.removeChild(gameWindowText);
	gameWindowDiv.parentNode.removeChild(gameWindowDiv);
	while (playerStatus.unlockedAreas.length > 0) {
		playerStatus.unlockedAreas.pop();
	}
	if (!playerStatus.unlockedAreas.includes("Home")) {
		playerStatus.unlockedAreas.push("Home");
	}
	startGameLoop();
}

// Spawns custom encounter with final boss
function finalEncounter() {
	performEncounter(demonKingEncounter);
}

function initialGameButton() {
	let newButton = document.createElement("button");
	newButton.setAttribute("type", "button");
	newButton.setAttribute("onclick", "startGameLoop()");
	newButton.setAttribute("class", "start-game");
	let newButtonText = document.createTextNode("Start Game");
	newButton.appendChild(newButtonText);
	document.body.appendChild(newButton);
}

initialGameButton();

// TODO: Seed encounter tables
