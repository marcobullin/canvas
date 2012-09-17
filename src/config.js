var BATTLEFIELD_WIDTH = 1500,
	BATTLEFIELD_HEIGHT = 900,

	VEHICLE_FACTORY_PRICE = 1200,
	VEHICLE_FACTORY_ENERGY_USE = 400,
	VEHICLE_FACTORY_PROTECTION = 800,
	VEHICLE_FACTORY_WIDTH = 2,
	VEHICLE_FACTORY_HEIGHT = 2,

	VEHICLE_WIDTH = 1,
	VEHICLE_HEIGHT = 1,

	// UNITS
	SCOUT_PROTECTION = 100,
	SCOUT_SHIELD = 100,
	SCOUT_PRICE = 300,
	SCOUT_SPEED = 78,
	SCOUT_FIREPOWER = 2,
	SCOUT_FIRERANGE = 350,
	SCOUT_FIRESPEED = 700,
	SCOUT_WIDTH = 50,
	SCOUT_HEIGHT = 50,

	TANK_PROTECTION = 100,
	TANK_SHIELD = 100,
	TANK_PRICE = 600,
	TANK_SPEED = 48,
	TANK_FIREPOWER = 10,
	TANK_FIRERANGE = 400,
	TANK_FIRESPEED = 512,
	TANK_WIDTH = 50,
	TANK_HEIGHT = 50,

	GRID_SIZE = 50,

	LEVEL = {
		1: {
			goal: 'destroy_all',
			desc: 'Vernichten Sie die feindlichen Fighter!',
			user: ['lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter']
		},
		2: {
			goal: 'destroy_all',
			desc: 'Vernichten Sie alle feindlichen Einheiten!',
			user: ['lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter']
		},
		3: {
			goal: 'destroy_destroyer',
			desc: 'Vernichten Sie den feindlichen Zerstörer!',
			user: ['lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienDestroyer']
		},
		4: {
			goal: 'destroy_frigate',
			desc: 'Vernichten Sie die feindliche Fregatte!',
			user: ['heavyFighter', 'heavyFighter', 'destroyer', 'destroyer'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienFrigate']
		},
		5: {
			goal: 'destroy_all',
			desc: 'Vernichten Sie alle feindlichen Einheiten!',
			user: ['mothership', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'frigate', 'destroyer'],
			enemy: ['alienMothership', 'alienHeavyFighter', 'alienDestroyer', 'alienFrigate', 'alienFrigate']
		},
		6: {
			goal: 'destroy_all',
			desc: 'Vernichten Sie alle feindlichen Einheiten!',
			user: ['mothership', 'destroyer', 'destroyer', 'destroyer', 'frigate'],
			enemy: ['alienMothership', 'alienHeavyFighter', 'alienHeavyFighter', 'alienFrigate', 'alienDestroyer']
		},
		7: {
			goal: 'destroy_all',
			desc: 'Vernichten Sie alle feindlichen Einheiten!',
			user: ['mothership', 'destroyer', 'destroyer', 'destroyer', 'frigate', 'frigate'],
			enemy: ['alienMothership', 'alienMothership', 'alienHeavyFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienFrigate', 'alienDestroyer', 'alienFrigate']
		}
	};