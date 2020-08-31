import { Status } from "redux/status/constants";
import { Colors } from "components/StatusBar";
import { prop } from "ramda";

const getColor = (name) => prop(name,Colors);

export const OrderedStats = [
    Status.HP,
    Status.Stamina,
    Status.Oxygen,
    Status.Water
]

export const Stats = OrderedStats.map(stat => {
    return {
        colors: getColor(stat),
        stat,
    }
})