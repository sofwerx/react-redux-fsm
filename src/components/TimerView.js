import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startTimerEvent,
        stopTimerEvent,
        pauseTimerEvent,
        resumeTimerEvent } from '../actions/TimerActions'

// Import the lifecycle states
import { IDLE, PAUSED, RUNNING, STOPPED, COMPLETED } from '../models/Timer';

class TimerView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputValue: ''
        };
    }

    // invoke the startTimerEvent and then clear the input value
    onClickStartButton = () => {
        this.props.startTimerEvent(this.props.index, this.state.inputValue);
        this.state.inputValue = "";
    };

    render() {

        // Extract these specific props to use in the component
        const { index, timer, startTimerEvent, stopTimerEvent, pauseTimerEvent, resumeTimerEvent } = this.props;

        return (
            <p>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td style={{textAlign:'right'}}>
                                NAME:
                            </td>
                            <td>
                                {timer.name}
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'right'}}>
                                CURRENT TIME:
                            </td>
                            <td>
                                {(() => {
                                    switch (timer.lifecycleState) {
                                        case RUNNING:   return ( <span>{timer.time}</span> );
                                        case PAUSED:   return ( <span>{timer.time}</span> );
                                        default:          return ( <span>{0}</span> );
                                    }
                                })()}
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'right'}}>
                                LIFECYCLE STATE:
                            </td>
                            <td>
                                {(() => {
                                    switch (timer.lifecycleState) {
                                        case COMPLETED: return (<span style={{color:'green'}}>{timer.lifecycleState}</span>);
                                        case STOPPED:   return (<span style={{color:'red'}}>{timer.lifecycleState}</span>);
                                        default:        return (<span>{timer.lifecycleState}</span>);
                                    }
                                })()}
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'right'}}>
                                INPUT TIME:
                            </td>
                            <td>
                                <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={(e) => this.onClickStartButton()}>Start</button>
                                <button onClick={(e) => {pauseTimerEvent(index)}}>Pause</button>
                                <button onClick={(e) => {resumeTimerEvent(index)}}>Resume</button>
                                <button onClick={(e) => {stopTimerEvent(index)}}>Stop</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </p>
        )
    }

    // save the changes to the input field
    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

} // end class

const mapStateToProps = ( state ) => ( {
    value: state
} )

const mapDispatchToProps = () => {
    return { startTimerEvent,
            stopTimerEvent,
            pauseTimerEvent,
            resumeTimerEvent }
}

export default connect(mapStateToProps, mapDispatchToProps())(TimerView)

