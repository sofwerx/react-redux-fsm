import {store} from '../App'

export const IDLE         = "IDLE"
export const RUNNING      = "RUNNING"
export const STOPPED      = "STOPPED"
export const PAUSED       = "PAUSED"
export const COMPLETED    = "COMPLETED"

class Timer {

    constructor(name, timerId) {
        this.name = name;
        this.timerId = timerId;
        this.time = 0;
        this.lifecycleState = IDLE;
        this.intervalLength = 1000;
    }

    setTime( value ) {
        this.timer = value;
    }

    isExpired() {
        if ( this.time <= 0 ) {
            return true;
        }
        else {
            return false;
        }
    }

    startTimer() {
        this.interval = setInterval( this.tick.bind(this), this.intervalLength);
    }

    tick() {
        store.dispatch({type: 'TIMER_TICK', payload: { timerId: this.timerId } } );
    }

    decrement() {
        this.time = this.time - ( this.intervalLength / 1000 );
    }

    stopTimer() {
        clearInterval(this.interval);
    }

} // end class

export default Timer



