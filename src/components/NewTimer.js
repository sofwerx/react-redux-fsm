import React, { Component } from 'react'
import { connect } from 'react-redux'

// We need to import our action to create a new timer
import { createTimerEvent } from '../actions/TimerActions'

class NewTimer extends Component {
    constructor(props) {
        super(props)
        this.state = { name: "" }
    }

    // invoke the createTimerEvent and then clear the input value so the render will be called
    onClickCreateButton = () => {
        this.props.createTimerEvent(this.state.name);
        this.setState({
            name: ""
        });
    };

    render() {
        // Build out a component that takes a name as input and a Create button to save the timer
        return (
            <div>
                <input
                    type='text'
                    placeholder=""
                    name="name"
                    value={this.state.name}
                    onChange={evt => this.updateInputValue(evt)}/>
                <button onClick={(e) => this.onClickCreateButton()}>Create</button>
            </div>
        )
    }

    // save the changes to the input field
    updateInputValue(evt) {
        this.setState({
            name: evt.target.value
        });
    }

} // end class

// Not needed for this component
const mapStateToProps = (state) => {
    return {}
}

// Use 'mapDispatchToProps' to connect the 'newTimer' action creator to this component. Here is a stub for the component:
const mapDispatchToProps = () => {
    return { createTimerEvent }
}

export default connect(mapStateToProps, mapDispatchToProps())(NewTimer)