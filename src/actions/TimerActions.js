export const NEW_TIMER = "NEW_TIMER"
export const START_TIMER = "START_TIMER"
export const STOP_TIMER = "STOP_TIMER"
export const TIMER_TICK = "TIMER_TICK"
export const PAUSE_TIMER = "PAUSE_TIMER"
export const RESUME_TIMER = "RESUME_TIMER"

export const createTimerEvent = (name) => {
    return {
        type: NEW_TIMER,
        payload: { name }
    }
}

export const startTimerEvent = (index, inputTime) => {
    return {
        type: START_TIMER,
        payload: { index, inputTime }
    }
}

export const stopTimerEvent = (index) => {
    return {
        type: STOP_TIMER,
        payload: { index }
    }
}

export const pauseTimerEvent = (index) => {
    return {
        type: PAUSE_TIMER,
        payload: { index }
    }
}

export const resumeTimerEvent = (index) => {
    return {
        type: RESUME_TIMER,
        payload: { index }
    }
}