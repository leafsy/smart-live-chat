import React, { Component } from 'react'
import '../style.css'

class UserMsgBox extends Component {
    state = {
        content: '',
        userName: '',
    }

    onUserNameChange = (e) => {
        var userName = e.target.value;
        this.setState({...this.state, userName: userName})
    }

    onMsgChange = (e) => {
        var content = e.target.value;
        this.setState({...this.state, content: content})
    }

    cleanMsgBox = () => {
        this.setState({...this.state, content: ''})
    }

    render() {
        var { content } = this.state;
        var buttonDisabled = true;
        if (content.length !== 0) {
            buttonDisabled = false
        }
        return (
            <div className="textbox" id="textbox">
                <img src="" />
                <form onSubmit={(e) => {this.props.handleSendMessage(e, this.state);
                    this.cleanMsgBox();
                    }
                }>
                    User Name:
                    <input className="textbox-input"
                        type="text" id="userName"
                        value={this.state.userName}
                        data-length="100"
                        onChange={this.onUserNameChange} />
                    Msg:
                    <input className="textbox-input"
                        type="text" id="content"
                        value={this.state.content}
                        data-length="100"
                        onChange={this.onMsgChange} />
                    <button disabled={buttonDisabled}
                        className="btn-floating waves-effect waves-light material-icons red accent-2 right">
                        <i className="material-icons">send</i>
                    </button>
                </form>
            </div>
        )
    }

}
export default UserMsgBox