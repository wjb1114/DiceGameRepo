let Zone = class {
	constructor (name, encounterTable, timeToTravel) {
		this.name = name;
		this.encounterTable = encounterTable;
		this.timeToTravel = timeToTravel;
	}
}
let Enemy = class {
	constructor (name, strength, accuracy, maxHealth, defence, specialMoveName, specialMoveDamage, expGiven) {
		this.name = name;
		this.strength = strength;
		this.accuracy = accuracy;
		this.maxHealth = maxHealth;
		this.defence = defence;
		this.specialMoveName = specialMoveName;
		this.specialMoveDamage = specialMoveDamage;
		this.expGiven = expGiven;
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
let wolfEnemy = new Enemy ("Wolf", 10, 10, 150, 10, "Bite", 20, 25);

let wolfEncounter = new CombatEncounter(wolfEnemy);
let rockSlideEncounter = new NonCombatEncounter("You are hit by a rockslide!", currentHealth, -100);
let emptyEncounter = new NonCombatEncounter("You weren't attacked and manage to gain some health back.", currentHealth, 20);

let testTable = [wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, wolfEncounter, rockSlideEncounter, rockSlideEncounter, rockSlideEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];
let emptyTale = [emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter, emptyEncounter];

let mountainTables = [testTable, testTable, testTable, testTable, testTable];
let islandTables = [testTable, testTable, testTable, testTable, testTable];
let plainsTables = [testTable, testTable, testTable, testTable, testTable];
let swampTables = [testTable, testTable, testTable, testTable, testTable];
let forestTables = [testTable, testTable, testTable, testTable, testTable];

let homeZone = new Zone ("Home", emptyTable, 0);

let mountainZoneOne = new Zone ("Mountain1", mountainTables[0], 1);
let mountainZoneTwo = new Zone ("Mountain2", mountainTables[1], 2);
let mountainZoneThree = new Zone ("Mountain3", mountainTables[2], 3);
let mountainZoneFour = new Zone ("Mountain4", mountainTables[3], 4);
let mountainZoneFive = new Zone ("Mountain5", mountainTables[4], 5);

let islandZoneOne = new Zone ("Island1", islandTables[0], 1);
let islandZoneTwo = new Zone ("Island2", islandTables[1], 2);
let islandZoneThree = new Zone ("Island3", islandTables[2], 3);
let islandZoneFour = new Zone ("Island4", islandTables[3], 4);
let islandZoneFive = new Zone ("Island5", islandTables[4], 5);

let plainsZoneOne = new Zone ("Plains1", plainsTables[0], 1);
let plainsZoneTwo = new Zone ("Plains2", plainsTables[1], 2);
let plainsZoneThree = new Zone ("Plains3", plainsTables[2], 3);
let plainsZoneFour = new Zone ("Plains4", plainsTables[3], 4);
let plainsZoneFive = new Zone ("Plains5", plainsTables[4], 5);

let swampZoneOne = new Zone ("Swamp1", swampTables[0], 1);
let swampZoneTwo = new Zone ("Swamp2", swampTables[1], 2);
let swampZoneThree = new Zone ("Swamp3", swampTables[2], 3);
let swampZoneFour = new Zone ("Swamp4", swampTables[3], 4);
let swampZoneFive = new Zone ("Swamp5", swampTables[4], 5);

let forestZoneOne = new Zone ("Forest1", forestTables[0], 1);
let forestZoneTwo = new Zone ("Forest2", forestTables[1], 2);
let forestZoneThree = new Zone ("Forest3", forestTables[2], 3);
let forestZoneFour = new Zone ("Forest4", forestTables[3], 4);
let forestZoneFive = new Zone ("Forest5", forestTables[4], 5);

let finalZone = new Zone ("Castle", finalEncounterTable, 8);

let zonePathOne = [homeZone, mountainZoneOne, mountainZoneTwo, mountainZoneThree, mountainZoneFour, mountainZoneFive, finalZone];
let zonePathTwo = [homeZone, islandZoneOne, islandZoneTwo, islandZoneThree, islandZoneFour, islandZoneFive, finalZone];
let zonePathThree = [homeZone, plainsZoneOne, plainsZoneTwo, plainsZoneThree, plainsZoneFour, plainsZoneFive, finalZone];
let zonePathFour = [homeZone, swampZoneOne, swampZoneTwo, swampZoneThree, swampZoneFour, swampZoneFive, finalZone];
let zonePathFive = [homeZone, forestZoneOne, forestZoneTwo, forestZoneThree, forestZoneFour, forestZoneFive, finalZone];
let zonePaths = [zonePathOne, zonePathTwo, zonePathThree, zonePathFour, zonePathFive];

let globalArgs = [zonePaths];
