import React, { Component } from 'react'
import '../style.css'

class SessionBox extends Component {

    render() {
        const { sessions} = this.props;

        return (
            <div className="sessionbox" id="sessionbox">
                <table>
                    <tbody>

                        <tr>
                            <th></th>
                            <th>Platform</th>
                            <th>Stream id</th>
                            <th>Chat Room</th>
                        </tr>

                        {sessions.map((session,index) => (
                            <tr key={index}>
                                <th><input type="checkbox"  key={session.chatroomid}/>&nbsp;</th>
                                <th>{session.platform}</th>
                                <th>{session.streamid}</th>
                                <th>{session.chatroomid}</th>
                            </tr>

                        ))}
                    </tbody>
                </table>
            
            </div>
        )
    }

}
export default SessionBox