export default {
    location: 
	{
		startingPoint:
		{
			clickBreathButton:
			{
				EN:"Oxygen fills your lungs",
				ES:"El oxígeno llena tus pulmones"
			},
			startStory:
			{
				EN:"You find yourself in the dark, you feel like you are drownking",
				ES:"Te encuentras a oscuras, sientes que te ahogas"
			},
			autoBreathOn:
			{
				EN:"Looks like you know how to breath",
				ES:"Parece que sabes respirar"
			},
			chooseDestination:
			{
				EN:"Before you are two roads one leads to the forest, the other to the city",
				ES:"Ante ti hay dos caminos uno lleva al bosque y otro lleva a la ciudad"
			},
			chooseButtonStart:
			{
				goForest:
				{
					EN:"Go to the forest",
					ES:"Ir al bosque"
				},
				goCity:
				{
					EN:"Go to the city",
					ES:"Ir a la ciudad"
				}
			}
		},
		city:
		{
			CityArrivalPromts:
			{
				cityArrivalOne:
				{
					EN:"The city is agitated today, what will you do?",
					ES:"La ciudad está agitada hoy ¿Qué deseas hacer?"
				},
				cityArrivalTwo:
				{
					EN:"The city is calm today, what will you do?",
					ES:"La ciudad está en calma hoy ¿Qué deseas hacer?"
				},
				cityArrivalThree:
				{
					EN:"The city is pretty lonely today, what will you do?",
					ES:"La ciudad está bastante vacía hoy ¿Qué deseas hacer?"
				}
			},
			chooseButtonCity:
			{
				goForest:
				{
					EN:"Go to the forest",
					ES:"Ir al bosque"
				},
				goHome:
				{
					EN:"Go home",
					ES:"Ir a casa"
				},
				goFoundry:
				{
					EN:"Go to the foundry",
					ES:"Ir a la forja"
				},
				goShop:
				{
					EN:"Go to the shop",
					ES:"Ir a la tienda"
				},
				goLibrary:
				{
					EN:"Go to the library",
					ES:"Ir a la biblioteca"
				},
				gainStaminaLessWater:
				{
					EN:"Go to the Gym",
					ES:"Ir al gimnasio",
					GymResul:
					{
						EN:"You feel stronger but dehidrated",
						ES:"Te sientes más fuerte"
						
					}
				},
				gainCoinLessOxygen:
				{
					EN:"Go to work",
					ES:"Ir al trabajo",
					workesult:
					{
						EN:"You earn some money but feel tired",
						ES:"Ganas algo de dinero pero te sientes cansado"
					}
				},
			},
			randomEventsCity:
			{
				suitCaseEvent:
				{
					suitcaseFind:
					{
						EN:"You find a suitcase, it feels heavy and seems like its it doesn't have an owner",
						ES:"Encuentras un maletín, se siente pesado y no parece que tenga dueño "
					},
					suitcaseButton:
					{
						openTheSuitcase:
						{
							EN:"Open the suitcase",
							ES:"Abrir el maletín",
							openTheSuitcaseResult:
							{
								EN:"You find plans for a secret investagation to expand human lifespan (this branch is under construction)",
								ES:"Encuentras los planes de una investigación secreta para incrementar el tiempo de vida humano(this branch is under construction)"
							}
							
							
						},
						storeTheSuitcase:
						{
							EN:"Store the suitcase",
							ES:"Guardar el maletín",
							storeTheSuitcaseResult:
							{
								EN:"You store the suitcase at home",
								ES:"Guardas el maletin en tu casa"
							}
							
						},
						giveSuitcaseToAuthorities:
						{
							EN:"Give to authorities",
							ES:"Entregar a las autoridades",
							giveSuitcaseToAuthoritiesResutl:
							{
								EN:"You give the suitcase to the police, they seem nervous",
								ES:"Le entregas el maletín a la policía, parecen algo nerviosas"
							}
							
						}
					}
				},
				suspicousVendorEvent:
				{
					suspicousVendorFind:
					{
						EN:"You encounter  a suspicous vendor",
						ES:"Te topas con un vendedor sospechoso"
					},
					suspicousVendorButton:
					{
						suspicousVendorBuy:
						{
							EN:"You take a look at his wares",
							ES:"Miras la mercancia del vendedor",
							
							suspicousVendorBuyOptions:
							{
								buyDrillButtonDiscount:
								{
									EN:"Drill: 5000 GP",
									ES:"Taladro:5000 PO",
									BuyDrillComfirmation:
									{
										EN:"You buy a drill",
										ES:"Compras un taladro"									
									}
											
								},
								buyPickaxeButtonDiscount:
								{
									EN:"Pickaxe: 5000 GP",
									ES:"Pico:5000 PO",
									BuyDrillComfirmation:
									{
										EN:"You buy a pickaxe",
										ES:"Compras una pica"									
									}
								}
							}			
						},
						suspicousVendorLeave:
						{
							EN:"You leave the vendor and his wares behind",
							ES:"Dejas atrás al vendedor y su mercancía"
						},
						suspicousVendorKill:
						{
							EN:"This branch is under construction",
							ES:"This branch is under construction"
						}
					}
					
				},
				hungerEvent:
				{
					EN:"You feel a sudden hunger",
					ES:"sientes un hambre repentina",
					hungerEventButtons:
					{
						hungerEventButtonsEatPeople:
						{
							EN:"Eat a pedestrian",
							ES:"Comer un peatón",
							hungerEventButtonsEatPeopleResult:
							{
								EN:"This branch is under construction",
								ES:"This branch is under construction"
							}							
						},
						hungerEventButtonsFancyRestaurant:
						{
							EN:"Eat at a fancy place",
							ES:"Comer en un lugar elegante",
							hungerEventButtonsFancyRestaurantResult:
							{
								EN:"It cost you quite a bit, but you feel full and happy",
								ES:"Te costo bastante, pero te sientes lleno y feliz"
							}							
						},
						hungerEventButtonsNormalRestaurant:
						{
							EN:"Eat at a cheap resturant",
							ES:"Comer en un lugar económico",
							hungerEventButtonsFancyRestaurantResult:
							{
								EN:"Te sientes satisfecho",
								ES:"Te sientes lleno"
							}							
						}
					}
				}
			}
			
		},
		forest:
		{
		},
		home:
		{
		},	
		shop:
		{
		},	
		library:
		{
		},	
		forge:
		{
		},	
		death:
		{
			EN:"You died",
			ES:"Has muerto"
		}
       
    }
}