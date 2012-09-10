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
			user: ['mothership', 'lightFighter', 'lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['mothership', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienHeavyFighter', 'alienFrigate']
		},
		2: {
			user: ['mothership', 'lightFighter', 'lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter', 'destroyer'],
			enemy: ['mothership', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienHeavyFighter', 'alienHeavyFighter']
		},
		3: {
			user: ['mothership', 'lightFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter', 'destroyer'],
			enemy: ['mothership', 'alienLightFighter', 'alienLightFighter', 'frigate']
		},
		4: {
			user: ['mothership', 'heavyFighter', 'heavyFighter', 'frigate', 'destroyer'],
			enemy: ['mothership', 'alienLightFighter', 'alienLightFighter', 'frigate', 'frigate']
		},
		5: {
			user: ['mothership', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'destroyer'],
			enemy: ['mothership', 'alienHeavyFighter', 'frigate', 'frigate']
		},
		6: {
			user: ['mothership', 'destroyer', 'destroyer', 'destroyer', 'destroyer'],
			enemy: ['mothership', 'alienHeavyFighter', 'alienHeavyFighter', 'frigate', 'frigate']
		}
	};