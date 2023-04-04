export default {
	stats: {
        HP: "HP",
        OXYGEN: "Oxygen",
        STAMINA: "Stamina",
        WATER: "Water"
    },
	statsModification:{
		gain:"you gain {{ammount}} {{stats}}",
		lose:"you lose {{ammount}} {{stats}}"
	},
    location:{
		conectors: {
			forest: "to the ",
			home: "",
			foundry: "to the ",
			shop: "to the ",
			library: "to the ",
		},
		arrivalRandomPromts: {
				0: "The $t(places.{{context}}) is agitated today, what will you do?",
				1: "The $t(places.{{context}}) is calm today, what will you do?",
				2: "The $t(places.{{context}}) is pretty lonely today, what will you do?",
		},
		places: {
			forest: "forest",
			home: "home",
			foundry: "foundry",
			shop: "shop",
			library: "library",
		},
		goTo: "Go $t(conectors.{{context}})$t(places.{{context}})",
		startingPoint:{
			clickBreathButton: "Oxygen fills your lungs",
			startStory: "You find yourself in the dark, you feel like you are drowning",
			autoBreathOn: "Looks like you know how to breathe",
			chooseDestination: "Before you are two roads one leads to the forest, the other to the city",
		},
		city:{
			actions:
			{
				gymOption:"Go to the Gym",
				gymResult: "You feel stronger but get dehidrated",
				workOption: "Go to work",
				workResult: "You earn some money but feel tired"
				
			},
			randomEvents:
			{
				suitcase:
				{
					find: "You find a suitcase, it feels heavy and seems like it doesn't have an owner",
					openSuitcase: "Open the suitcase",
					openSuitcaseResult: "You find plans for a secret investagation to expand human lifespan (this branch is under construction)",
					storeSuitcase: "Store the suitcase",
					storeSuitcaseResult: "You store the suitcase at home",
					giveSuitcaseToAuthorities: "Give to authorities",
					giveSuitcaseToAuthoritiesResult: "You gave the suitcase to the police, they seem nervous",
				},
				suspiciousVendor: {
					find: "You encounter a suspicous vendor",
                    lookAtWares: "You take a look at his wares",
					buyItemButtom:"Buy a {{item}} for {{currency}}",
                    buyMessage: "You bought a {{item}}",
                    leave: "You leave the vendor and his wares behind",
                    kill: "This branch is under construction",
                    item: {
                        drill: "Drill",
                        pickaxe: "Pickaxe"
                    },
                    currency: {
                        name: "GP",
                        abbreviation: "GP",
                        amount: "{{amount}} GP"
                    },
				},
				hunger: {
                    find: "You feel a sudden hunger",
                    eatPeople: "Eat a pedestrian",
                    eatPeopleResult: "This branch is under construction",
                    fancyRestaurant: "Eat at a fancy place",
                    fancyRestaurantResult: "It cost you quite a bit, but you feel full and happy",
                    normalRestaurant: "Eat at a cheap resturant",
                    normalRestaurantResult: "You feel satisfied"
                }
			}
			
		},
		home:{
			
			shipParts:{
				cabin:"cabin",
				tank:"tank",
				turbine:"turbine"
			},
			arrivalRandomPromts: {
				0: "Home sweet home",
				1: "This is your place",
				2: "Back in your humble house",
			},
			actions:{
				builOption:"Work on the construction of the $t(shipParts.{{context}}) ",
				buildResult:{
					0:"You star to create something that resembles a  $t(shipParts.{{context}}), there is much left to do",
					1:"The  $t(shipParts.{{context}}) is starting to take shape, soon you should be able to work on the more complicated stuff",
					2:"Some of the final details ar giving you trouble but the  $t(shipParts.{{context}}) is almos done",
					3:"At last the  $t(shipParts.{{context}}) is finally finished"
				},
				noLight:"you wish you coukd work on the ship, but it's imposible with the lights off, you need to fix this as soon as possible"
			},
			randomEvents:{
				thieves:{
					prompt:"You have been robbed! most of your materials are gone but there is a track you can follow",
					follow:"Follow the tracks. You will get your stuff back",
					stay:"It might be dangerous, stay home an start over",
					findThieves:"You finde the thieves not far away from your place, at a lonely alcove, there two of them and they don't have any weapons",
					fightoption:"fight the thieves, you will teach them a lesson they will never forget",
					fightSucces:"It was hard buf you managed to put the thieves down and get yout stuff back",
					fightGreatSucces:"With your equipment dispatiching the thieves was an easy task, your stuff is back where it belongs",
					fightFail:"You where not properly equiped for a fight, the thieves beat you and leave with your stuff",
					runOption:"This was a bad idea, better run",
					entertain:"Try to entretain them, it might work somehow",
					entertainResult:"this branch is under construction",
					intimidate:"Try to intimidate them, maybe you can solve this without spilling blood",
					intimidateSucces:"The thieves can see you are armed, they will not risk it and return your stuff back",
					intimidateFail:"The thieves are not impressed and suround you, now you can't run",
				},
				woundedDog:{
					prompt:"A wounded dog is at your doorstep. It's in pretty bad shape and looks at you expectantly",
					hush:"Hush the dog away",
					hushResult:"You have no time for dogs, it's hard enought to feed yourself. You hush the dog away con continue on with your life",
					feed:"Take care of him",
					feedResult:"You feel pity for the poor creature, you take it with you inside your home and care for him until it recovers, now you have a partner waiting for you each day",
					train:"this branch is under construction"
				},
				electricalFailure:{
					prompt:"Sudendly the lights go out and you find yourself surrounded only by darkness, you look out the window and it seems the failure is local to your home",
					tryToRepair:"Apply what you've learned and attempt to repair the failure",
					tryToRepairResult:"The failure is nothing to serious and you manage to fix in no time",
					findTecGuy:"Find someone that can take care of the blackout",
					findTecGuyResult:"You are not knowledgeable enough to attempt to fix it yourself better pay someone to get it repaired, the electrician is swift in repairing the failure and even swifter in writing the bill",
					FindTecGuyNoMoney:"Looks like you are out of luck and have no funds to pay an Electrician, get some cash first"					
				}
				
			}
		},	
		forest:{
			minerals:{
				COPPER:"copper",
				TIN:"tin",
				IRON:"iron",
				COAL:"coal",
				MAGNESIUM:"magnesium",
				LEAD:"lead"
			},
			actions:{
				lakeOption:"Go to the lake",
				lakeResult:"You feel refreshed but feel tired from the long walk",	
				mineOption:"Go to mine and get some $t(minerals.{{context}})",
				mineResult:{
					noTool:"You lack the required tool to mine $t(minerals.{{context}})",
					getMineral:"You acquire some $t(minerals.{{context}})"					
				}
		
			},
			randomEvents:{
				findBody:{
					prompt:"As you walk through the forest you come across a dead body,by the looks of it you can tell it has been here for a while, upon closer inspection you realise there is a sword and a bag",
					takeSwordPrompt:"Take the sword",
					swordTaken:"You take the sword, it feels heavy...and dangerous! For whatever reason the bag seems unimportant now, you leave it behind",
					takeBagPrompt:"Take the bag",
					bagTaken:"You take the bag, inside there a series of documents, all of them referring to a certain 'Suitcase', this seems serious, you decide to go back to your house and inspect them",
					leavePrompt:"It doesn't look safe, leave the body",
					left:"You leave the body to rot"					
				},
				secretLake:{
					prompt:"In the middle of the forest there is a lake with cristaline water",
					swimPrompt:"Take a swim",
					fishPromp:"Go fishing",
					swimResult:"You lose no time and take a refreshing and envigoring swin across the lake, you feel stronger.(STAMINA UP)",
					fishResult:"This gotta be a great spot for fishing, you find a confortable spot and spend your afternoon fishing. You end up fishing no fish a rare chunk of metal (Gain Steel x10)"
				}				
			}
		},
		shop:
		{
			tools:{
				PICKAXE:"pickaxe",
				DRILL:"drill"				
			},
			actions:{
				prompt:"The shoopkeper greets you 'Welcome, dear costumer'",
				itemsDisplayed:"There is a $t(tools.{{context}}) displayed for sale",
				buyItem:"Buy the $t(tools.{{context}})",
				itemSold:"You buy the $t(tools.{{context}}), now you will be able to extrac more minerals",
				leave:"You leave the shop, maybe next time"
			}
			
		},	
		library:
		{
			shipParts:{
				cabin:"cabin",
				tank:"tank",
				turbine:"turbine"
			},
			
			actions:{
				prompt:"You arrive at the library, you might learn something useful here",
				researchOption:"Do some reasearch",
				succes:"You finally unerstand a concept that was previously too hard to comprehend",
				failure:"Today is not your day, things are not making sense to you right now",
				criticalSuccess:"you feel inspired today, everything makes sense and you are able to assimilate new knowledge with ease",
				tooTired:"you feel too tired to start stuying right now",
				leavePrompt:"Leave the library",
				leaftLibrary:"You leave the Library behind, maybe tomorrow",
				learnTocraft:"After todays session you've learned how to craft a $t(shipParts.{{context}}, way to go!"
			}
			
		},	
		forge:
		{
			minerals:{
				COPPER:"copper",
				TIN:"tin",
				IRON:"iron",
				COAL:"coal",
				MAGNESIUM:"magnesium",
				LEAD:"lead"
			},
			alloys:{
				PEWTER:"pewter",
				STEEL:"steel",
				BRRONZE:"bronze",
			},
			
			actions:{
				prompt:"You arrive at the Forge",
				forgeAlloy:"forge a piece of $t(alloys.{{context}}) requires $t(minerals.{{context}}) ands $t(minerals.{{context}})",
				alloyForged:"You forge a piece of $t(alloys.{{context}})",
				leaveForgeSign:"Leave the forge",
				leaftForge:"You leave the forge and return to the city"
			}
			
		},	
		death: "You died"
    }
}