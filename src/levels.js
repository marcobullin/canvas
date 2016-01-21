define(function () {
    var levels = {
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
            usersUnits: [
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 50
                },
                {
                    spaceship: 'lightFighter',
                    x: 100,
                    y: 100
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 150
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 250
                },
                {
                    spaceship: 'lightFighter',
                    x: 100,
                    y: 300
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 350
                }
            ],
            alienUnits: [
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 150,
                    dx: 400,
                    dy: 150
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 200,
                    dx: 350,
                    dy: 200
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 250,
                    dx: 300,
                    dy: 250
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 300,
                    dx: 350,
                    dy: 300
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 350,
                    dx: 400,
                    dy: 350
                }
            ]
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
            usersUnits: [
                {
                    spaceship: 'heavyFighter',
                    x: 50,
                    y: 50
                },
                {
                    spaceship: 'heavyFighter',
                    x: 100,
                    y: 100
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 150
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 250
                },
                {
                    spaceship: 'heavyFighter',
                    x: 100,
                    y: 300
                },
                {
                    spaceship: 'heavyFighter',
                    x: 50,
                    y: 350
                }
            ],
            alienUnits: [
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 150,
                    dx: 400,
                    dy: 150
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 200,
                    dx: 350,
                    dy: 200
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 250,
                    dx: 400,
                    dy: 250
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 350,
                    dx: 350,
                    dy: 350
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 400,
                    dx: 350,
                    dy: 400
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 450,
                    dx: 350,
                    dy: 450
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1450,
                    y: 500,
                    dx: 350,
                    dy: 500
                }
            ]
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
            usersUnits: [
                {
                    spaceship: 'heavyFighter',
                    x: 50,
                    y: 50
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 150
                },
                {
                    spaceship: 'heavyFighter',
                    x: 150,
                    y: 150
                },
                {
                    spaceship: 'heavyFighter',
                    x: 150,
                    y: 250
                },
                {
                    spaceship: 'lightFighter',
                    x: 50,
                    y: 250
                },
                {
                    spaceship: 'heavyFighter',
                    x: 50,
                    y: 350
                }
            ],
            alienUnits: [
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 150,
                    dx: 400,
                    dy: 150
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 250,
                    dx: 300,
                    dy: 250
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1350,
                    y: 350,
                    dx: 250,
                    dy: 350
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 450,
                    dx: 300,
                    dy: 450
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 550,
                    dx: 400,
                    dy: 550
                },
                {
                    spaceship: 'alienDestroyer',
                    x: 1550,
                    y: 350,
                    dx: 450,
                    dy: 350
                }
            ]

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
            usersUnits: [
                {
                    spaceship: 'heavyFighter',
                    x: 200,
                    y: 100
                },
                {
                    spaceship: 'destroyer',
                    x: 50,
                    y: 150
                },
                {
                    spaceship: 'lightFighter',
                    x: 200,
                    y: 200
                },
                {
                    spaceship: 'heavyFighter',
                    x: 200,
                    y: 300
                },
                {
                    spaceship: 'destroyer',
                    x: 50,
                    y: 350
                },
                {
                    spaceship: 'lightFighter',
                    x: 200,
                    y: 400
                }
            ],
            alienUnits: [
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 150,
                    dx: 400,
                    dy: 150
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 150,
                    dx: 500,
                    dy: 150
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1600,
                    y: 150,
                    dx: 600,
                    dy: 150
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1500,
                    y: 300,
                    dx: 500,
                    dy: 300
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 450,
                    dx: 400,
                    dy: 450
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 450,
                    dx: 500,
                    dy: 450
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1600,
                    y: 450,
                    dx: 600,
                    dy: 450
                }
            ]
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
            usersUnits: [
                {
                    spaceship: 'lightFighter',
                    x: 100,
                    y: 50
                },
                {
                    spaceship: 'lightFighter',
                    x: 200,
                    y: 100
                },
                {
                    spaceship: 'lightFighter',
                    x: 200,
                    y: 350
                },
                {
                    spaceship: 'lightFighter',
                    x: 100,
                    y: 400
                },
                {
                    spaceship: 'mothership',
                    x: 0,
                    y: 150
                },
                {
                    spaceship: 'frigate',
                    x: 200,
                    y: 450
                }

            ],
            alienUnits: [
                {
                    spaceship: 'alienDestroyer',
                    x: 1400,
                    y: 100,
                    dx: 400,
                    dy: 100
                },
                {
                    spaceship: 'alienDestroyer',
                    x: 1400,
                    y: 500,
                    dx: 500,
                    dy: 500
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1500,
                    y: 100,
                    dx: 500,
                    dy: 100
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1500,
                    y: 500,
                    dx: 500,
                    dy: 500
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1250,
                    y: 600,
                    dx: 250,
                    dy: 600
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1450,
                    y: 600,
                    dx: 450,
                    dy: 600
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1350,
                    y: 600,
                    dx: 350,
                    dy: 600
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1250,
                    y: 200,
                    dx: 250,
                    dy: 200
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1450,
                    y: 200,
                    dx: 450,
                    dy: 200
                },
                {
                    spaceship: 'alienHeavyFighter',
                    x: 1350,
                    y: 200,
                    dx: 350,
                    dy: 200
                }
            ]
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
            usersUnits: [
                {
                    spaceship: 'destroyer',
                    x: 200,
                    y: 50
                },
                {
                    spaceship: 'destroyer',
                    x: 200,
                    y: 200
                },
                {
                    spaceship: 'frigate',
                    x: 50,
                    y: 50
                },
                {
                    spaceship: 'destroyer',
                    x: 200,
                    y: 400
                },
                {
                    spaceship: 'destroyer',
                    x: 200,
                    y: 550
                },
                {
                    spaceship: 'frigate',
                    x: 50,
                    y: 400
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 150
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 500
                }

            ],
            alienUnits: [
                {
                    spaceship: 'alienFrigate',
                    x: 1450,
                    y: 100,
                    dx: 450,
                    dy: 100
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1450,
                    y: 300,
                    dx: 450,
                    dy: 300
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1450,
                    y: 500,
                    dx: 450,
                    dy: 500
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1450,
                    y: 700,
                    dx: 450,
                    dy: 700
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 50,
                    dx: 400,
                    dy: 50
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 250,
                    dx: 400,
                    dy: 250
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 450,
                    dx: 400,
                    dy: 450
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 650,
                    dx: 400,
                    dy: 650
                }
            ]
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
            usersUnits: [
                {
                    spaceship: 'frigate',
                    x: 50,
                    y: 50
                },
                {
                    spaceship: 'frigate',
                    x: 50,
                    y: 250
                },
                {
                    spaceship: 'destroyer',
                    x: 150,
                    y: 100
                },
                {
                    spaceship: 'destroyer',
                    x: 150,
                    y: 200
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 50
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 150
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 250
                },
                {
                    spaceship: 'heavyFighter',
                    x: 300,
                    y: 350
                }

            ],
            alienUnits: [
                {
                    spaceship: 'alienMothership',
                    x: 1500,
                    y: 600,
                    dx: 1000,
                    dy: 600
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1350,
                    y: 300,
                    dx: 600,
                    dy: 300
                },
                {
                    spaceship: 'alienFrigate',
                    x: 1350,
                    y: 600,
                    dx: 600,
                    dy: 600
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1400,
                    y: 400,
                    dx: 400,
                    dy: 400
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1500,
                    y: 400,
                    dx: 500,
                    dy: 400
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1300,
                    y: 400,
                    dx: 300,
                    dy: 400
                },
                {
                    spaceship: 'alienLightFighter',
                    x: 1600,
                    y: 400,
                    dx: 600,
                    dy: 400
                },
                {
                    spaceship: 'alienDestroyer',
                    x: 1450,
                    y: 250,
                    dx: 450,
                    dy: 250
                }
            ]
        }
    };

    return levels;
});