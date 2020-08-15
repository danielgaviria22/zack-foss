import { nullaryActionCreator } from "core/utils/redux-utils";

export const START_TIMER = "zack-foss/start-timer";
export const STARTED_TIMER = "zack-foss/started-timer";
export const TICK = "zack-foss/tick";
export const TICKED = "zack-foss/ticked";
export const STOP_TIMER = "zack-foss/stop-timer";
export const STOPPED = "zack-foss/stopped";

export const startTimer = nullaryActionCreator(START_TIMER);
export const startedTimer = nullaryActionCreator(STARTED_TIMER)
export const tick = nullaryActionCreator(TICK);
export const ticked = nullaryActionCreator(TICKED);
export const stopTimer = nullaryActionCreator(STOP_TIMER);
export const stopped = nullaryActionCreator(STOPPED);