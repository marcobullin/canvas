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
			desc: {
				main: 'Guten Morgen Kommandant. Unsere Sateliten zeichneten unbekannte Flugobjekte im Sektor Sieben auf. Ich werde Ihnen ein kleines Geschwader an Abfangjägern zur Verfügung stellen um der Sache auf den Grund zu gehen. Sollten Sie angegriffen werden, dann sind Sie befugt mit allen militärischen Mitteln zurückzuschlagen. Alles verstanden?',
				goals: [
					'- Nähern Sie sich den Flugobjekten',
					'- Feuer erwiedern falls Sie angegriffen werden'
				],
				hints: [
					'- Sie können Verteidigungstürme bauen (rechts unten) um den Feind auf abstand zu halten.',
					'- Einheiten die sich nicht bewegen sind leichte Ziele.'
				] 
			},
			user: ['lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter']
		},
		2: {
			goal: 'destroy_all',
			desc: {
				main: 'Dem Anschein nach sind die Alien nicht auf frieden aus, aber damit können wir umgehen! Wir konnten ein kleines Geschwader der Alien auswindig machen und werden Ihnen jetzt mal richtig einheizen. Ich denke ein paar Abfängjäger sollten hierfür ausreichen. Enttäuschen Sie mich nicht!',
				goals: [
					'- überfallen Sie das Aliengeschwader'
				],
				hints: [
					'- jede zerstörte feindlich Einheit bringt Rescourcen um Verteidigungstürme zu bauen',
					'- gehen Sie sparsam mit dem Bau von Verteidigungstürmen um. In kommenden Schlachten werden Sie dringender benötigt.'
				] 
			},
			user: ['lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter']
		},
		3: {
			goal: 'destroy_destroyer',
			desc: {
				main: 'Der Überfall hat den Aliens überhaupt nicht gefallen. Sie verstärken nun Ihre Flotte in diesem Sektor. Leider sind das noch nicht alle schlechten Nachrichten. Eine Art Zerstörer nährt sich Ihrem Sektor und wie ich sehe haben Sie nur ein paar Abfangjäger in der Nähe. Ich hoffe Sie haben noch ein paar Rescourcen übrig um Verteidigungstürme zur Unterstützung zu bauen. Der Zerstörer muss um jeden Preis aufgehalten werden. Viel Glück!',
				goals: [
					'- vernichten Sie den Zerstörer'
				],
				hints: [
					'- bauen Sie Raketen-Verteidigungstürme - diese haben Lenkraketen',
					'- Lenkraketen können abgeschossen werden',
					'- Abfangjäger lenken die feindlichen Geschütze auf sich, so schaffen Sie Freiraum für die Lenkraketen'
				] 
			},
			user: ['lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienDestroyer']
		},
		4: {
			goal: 'destroy_frigate',
			desc: {
				main: 'Die Alien rüsten sich für einen Vergeltungsschlag auf eines unserer Kommandosschiffe im Sektor 9. Wir können diesen Angriff mit den momentanen Rescourcen nicht verhindern aber wir können die Alien zumindest schwächen. Wir haben ein feindliches Geschwader in der Nähe auswindig gemacht. Dieses wird jedoch von einer stark bewaffneten Fregatte bewacht. Vernichten Sie diese um die Alien zu schwächen.',
				goals: [
					'- vernichten Sie die Fregatte'
				],
				hints: [
					'- kleine Gruppen sind effektiver in der Abwehr von Lenkraketen und anderen Einheiten',
					'- schützen Sie wichtige Einheiten mit unwichtigeren'
				] 
			},
			user: ['heavyFighter', 'heavyFighter', 'destroyer', 'destroyer'],
			enemy: ['alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienFrigate']
		},
		5: {
			goal: 'destroy_all',
			desc: {
				main: 'Das unvermeidbare ist passiert. Die Alien sind in den Sektor 9 vorgedrungen und attakieren eines unserer Kommandosschiffe. Wir dürfen dieses Schiff nicht verlieren sonst verlieren wir diesen Sektor und das hat schwerwiegende konsequenzen. Schlagen Sie mit aller Härte die Alien zurück!',
				goals: [
					'- vernichten Sie alle feindlichen Einheiten',
					'- schützen Sie das Kommandosschiff um jeden Preis'
				],
				hints: [
					'- manchmal ist nicht der Angriff die beste Verteidigung'
				] 
			},
			user: ['mothership', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'lightFighter', 'frigate', 'destroyer'],
			enemy: ['alienHeavyFighter', 'alienHeavyFighter', 'alienDestroyer', 'alienDestroyer', 'alienFrigate', 'alienFrigate']
		},
		6: {
			goal: 'destroy_all',
			desc: {
				main: 'Die Alien haben sich aus diesem Sektor ersteinmal zurückgezogen. Doch kein Grund für Luftsprünge Kommandant! Wir haben viele gute Männer und Schiffe in dieser Schlacht verloren. Scheinbar unbeeindruckt versuchen die Alien nun den vorstoß auf einen anderen Sektor dafür ziehen Sie vier Fregatten aus diesem Sektor ab um Ihre Einheiten in Sektor 5 zu verstärken. Kümmern Sie sich um diese Fregatten!',
				goals: [
					'- zerstören Sie die feindlichen Fregatten'
				],
				hints: [
					'- Schiffe die sich vom Verbund gelöst haben sind leichter Ziele'
				] 
			},
			user: ['heavyFighter', 'heavyFighter', 'destroyer', 'destroyer', 'destroyer', 'frigate'],
			enemy: ['alienFrigate', 'alienFrigate', 'alienFrigate', 'alienFrigate']
		},
		7: {
			goal: 'destroy_all',
			desc: {
				main: 'Wir hatten Glück! Bei einem Erkundungsflug haben wir ein feindliches Kommandoschiff endeckt. Es ist stark beschützt, aber ein Sieg könnte die Motivation unserer Kämpfer deutlich erhöhen und die Alien stecken diesen Verlust garantiert nicht so einfach weg.',
				goals: [
					'- zerstören Sie den feindlichen Stützpunkt'
				],
				hints: [
					'- feindlich Fregatten haben im hinteren Bereich Ihre Schwachstelle'
				] 
			},
			user: ['destroyer', 'destroyer', 'frigate', 'frigate', 'heavyFighter', 'heavyFighter', 'heavyFighter', 'heavyFighter'],
			enemy: ['alienMothership', 'alienLightFighter', 'alienLightFighter', 'alienLightFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienHeavyFighter', 'alienFrigate', 'alienDestroyer', 'alienFrigate']
		}
	};