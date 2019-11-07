import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'
import "../style.css"

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    userName: '',
    checkBox: false,
    checkBoxError: false
  }
  handleCheck = (e) => {
    console.log('clicked me')
    this.setState({
      checkBox: !this.state.checkBox
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.checkBox) {
      this.setState({
        checkBoxError: true
      })
    } else {
      this.props.signUp(this.state)
    }

  }
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to='/' />

    const { authError } = this.props;
    return (
      <div className="container pad-container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>

          <div className="input-field">
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' class="validate" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>

          <div >
            <label >
              <input type="checkbox" className="filled-in"
                onChange={this.handleCheck}
                checked={this.state.checkBox} />
              <span>I agree with EventViewer&nbsp;
                <span>
                  <a href="/tos">Terms of Use</a> and&nbsp;
                  <a href="/privacy">rivacy Policy</a>
                </span>
                </span>
            </label>

          </div>

          <div className="input-field">
            <button className="btn red accent-2 lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text accent-2-text">
              {authError ? <p>{authError}</p> : null}
            </div>
            <div className="red-text accent-2-text">
              {this.state.checkBoxError ?
                <p>Please indicate that you have read and agree to the terms of use and privacy policy. </p>
                : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)