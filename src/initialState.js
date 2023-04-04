export const initialState = {
    ready: false,
    resources: {},
    cooldowns: [],
    flags: {},
    actionLog: [],
    counters: {},
    main: false,
    location: "home",
    character: {
        effects: {},
        stats: {
            OXYGEN: 0,
            MAX_OXYGEN: 100,
            HP: 30,
            MAX_HP: 100,
            STAMINA: 50,
            MAX_STAMINA: 100,
            WATER: 50,
            MAX_WATER: 100,
        },
        inventory: []
    }
}