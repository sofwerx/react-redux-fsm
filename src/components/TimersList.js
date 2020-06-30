import React, { Component } from 'react'
import { connect } from 'react-redux'
import TimerView from './TimerView'

class TimersList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log( "Entering render()");

        return (
            <div>
                {this.props.timers.map((timer, i) => <TimerView key={i} timer={timer} index={i}/>)}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return { timers: state.timerReducer.timers,
            isNewTransition: state.timerReducer.isNewTransition }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps())(TimersList)