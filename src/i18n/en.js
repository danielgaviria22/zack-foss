export default {
	actions: {
		Breathe: "Breathe"
	},
	stats: {
        HP: "HP",
        OXYGEN: "Oxygen",
        STAMINA: "Stamina",
        WATER: "Water"
	},
	items: {
		drill: "Drill",
		pickaxe: "Pickaxe",
		GP: "GP"
	},
    location: 
	{
		conectors: {
			city: "to the ",
			forest: "to the ",
			home: "",
			foundry: "to the ",
			shop: "to the ",
			library: "to the ",
		},
		places: {
			city: "city",
			forest: "forest",
			home: "home",
			foundry: "foundry",
			shop: "shop",
			library: "library",
		},
		goTo: "Go $t(conectors.{{context}})$t(places.{{context}})",
		startingPoint:
		{
			startStory: "You find yourself in the dark, you feel like you are drowning",
			clickBreatheButton: "Oxygen fills your lungs",
			autoBreatheOn: "Looks like you know how to breathe",
			chooseDestination: "Before you are two roads one leads to the forest, the other to the city",
		},
		city:
		{
			arrivalRandomPrompts: {
				0: "The city is agitated today, what will you do?",
				1: "The city is calm today, what will you do?",
				2: "The city is pretty lonely today, what will you do?",
			},
			actions:
			{
				gym: {
					option: "Go to the Gym",
					message: "You feel stronger but get dehidrated"
				},
				work: {
					option: "Go to work",
					message: "You earn some money but feel tired"
				}
			},
			randomEvents:
			{
				suitcase:
				{
					find: "You find a suitcase, it feels heavy and seems like its it doesn't have an owner",
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
                    buyMessage: "You bought a {{item}}",
                    leave: "You leave the vendor and his wares behind",
					kill: "This branch is under construction",
					amount: "{{amount}} $t(items:GP)"
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
		death: "You died"
    }
}