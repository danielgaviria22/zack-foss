import { nullaryActionCreator } from "core/utils/redux-utils";

export const START_TIMER = "zack-foss/start-timer";
export const TICK = "zack-foss/tick";
export const STOP_TIMER = "zack-foss/stop-timer";

export const startTimer = nullaryActionCreator(START_TIMER);
export const tick = nullaryActionCreator(TICK);
export const stopTimer = nullaryActionCreator(STOP_TIMER);