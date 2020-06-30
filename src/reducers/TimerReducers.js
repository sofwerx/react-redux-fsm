import { NEW_TIMER, START_TIMER, TIMER_TICK, STOP_TIMER, PAUSE_TIMER, RESUME_TIMER } from '../actions/TimerActions';
import Timer from '../models/Timer';
import { IDLE, PAUSED, RUNNING, STOPPED, COMPLETED } from '../models/Timer';

const defaultState = {
    timers: [],
    isNewTransition: false
};

export default (state = defaultState, action) => {
    let newState = state;

    switch (action.type) {
        case NEW_TIMER:
            // Add a new timer, return a copy of state
            const name = action.payload.name ? action.payload.name : `Timer ${state.length}`
            const timerId = state.timers.length;
            newState = { ...state,
                        timers: [...state.timers, new Timer(name, timerId)] };

            return newState;

        case START_TIMER:
            // Find the timer and set the time to the input
            state.timers.map((timer, index) => {
                if (action.payload.index === index) {
                    if ( timer.lifecycleState === IDLE ) {
                        timer.time = action.payload.inputTime;
                        timer.startTimer();
                        timer.lifecycleState = RUNNING;

                        // a transition happened so update the list of timers view
                        newState = { ...state, isNewTransition: true };
                    }
                }
                return null;  // must return something or a warning will be generated
            })
            return newState;

        case STOP_TIMER:
            // Find the timer, set the time to the input, and return a copy of state
            state.timers.map((timer, index) => {
                if (action.payload.index === index) {
                    if ( timer.lifecycleState === RUNNING ||
                        timer.lifecycleState === PAUSED ) {
                        timer.stopTimer();

                        timer.time = 3;
                        timer.startTimer();
                        timer.lifecycleState = STOPPED;

                        // a transition happened so update the list of timers view
                        newState = { ...state, isNewTransition: true };
                    }
                }
                return null;  // must return something or a warning will be generated
            })
            return newState;

        case TIMER_TICK:
            // Find the timer and update it's time
            state.timers.map((timer, index) => {
                if (action.payload.timerId === index) {
                    if ( timer.lifecycleState === RUNNING ) {
                        // decrement the time
                        timer.decrement();
                        if ( timer.isExpired() ) {
                            // if time is equal to or less than zero, stop the timer
                            // and set the lifecycle to the next state
                            timer.stopTimer();

                            timer.lifecycleState = COMPLETED;
                            timer.time = 3;
                            timer.startTimer();

                        }
                        // a transition happened even if it's a RUNNING to RUNNING state change
                        newState = { ...state, isNewTransition: true };
                    }
                    else if ( timer.lifecycleState === COMPLETED ||
                        timer.lifecycleState === STOPPED ) {
                        // decrement the time
                        timer.decrement();
                        if ( timer.isExpired() ) {
                            // if time is equal to or less than zero, stop the timer
                            // and set the lifecycle to the next state
                            timer.stopTimer();

                            timer.time = 0;
                            timer.lifecycleState = IDLE;

                            // a transition happened so update the list of timers view
                            newState = { ...state, isNewTransition: true };
                        }
                    }
                }
                return null;  // must return something or a warning will be generated
            })
            return newState;

        case PAUSE_TIMER:
            // Find the timer, set the time to the input, and return a copy of state
            state.timers.map((timer, index) => {
                if (action.payload.index === index) {
                    if ( timer.lifecycleState === RUNNING ) {
                        timer.stopTimer();

                        timer.lifecycleState = PAUSED;

                        // a transition happened so update the list of timers view
                        newState = { ...state, isNewTransition: true };
                    }
                }
                return null;  // must return something or a warning will be generated
            })
            return newState;

        case RESUME_TIMER:
            // Find the timer, set the time to the input, and return a copy of state
            state.timers.map((timer, index) => {
                if (action.payload.index === index) {
                    if ( timer.lifecycleState === PAUSED ) {
                        timer.startTimer();

                        timer.lifecycleState = RUNNING;

                        // a transition happened so update the list of timers view
                        newState = { ...state, isNewTransition: true };
                    }
                }
                return null;  // must return something or a warning will be generated
            })
            return newState;

        default:
            return newState;
    }
}
