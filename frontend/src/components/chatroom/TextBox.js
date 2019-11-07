import React, { Component } from 'react'
import '../style.css'

class TextBox extends Component {
    state = {
        body: '',
    }
    onChange = (e) => {
        var body = e.target.value;
        this.setState({ body })
    }
    cleanBox = () => {
        this.setState({
            body: ''
        })
    }
    render() {
        var { body } = this.state;
        var buttonDisabled = true;
        if (body.length !== 0) {
            buttonDisabled = false
        }
        return (
            <div className="textbox" id="textbox">
                <img src="" />
                <form onSubmit={(e) => this.props.handleSendMessage(e, this.state)}>
                    <input className="textbox-input"
                        type="text" id="text"
                        value={this.state.body}
                        data-length="100"
                        onChange={this.onChange} />
                    <button disabled={buttonDisabled}
                        className="btn-floating waves-effect waves-light material-icons red accent-2 right">
                        <i className="material-icons">send</i>
                    </button>
                </form>
            </div>
        )
    }

}
export default TextBox