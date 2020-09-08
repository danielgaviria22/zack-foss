import store from '../../store'

const createTimer = () => {
    let interval_id = undefined;
    return {
        interval(fn,t=1000){
            this.stopInterval()
            interval_id = window.setInterval(() => {
                fn(store)
            },t)
            return () => this.stopInterval()
        },
        stopInterval(){
            if( interval_id ){
                window.clearInterval(interval_id)
            }
        }
    }
}

let timerInstance = null;
const Timer = () => {
    if( !timerInstance ){
        timerInstance = createTimer();
    }
    return timerInstance
}

export default Timer;