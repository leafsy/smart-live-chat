import React, { Component } from "react";
import "../style.css";
import { connect } from "react-redux";
import { signIn, signUp } from "../../store/actions/authActions";
import { bool } from "prop-types";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";

import "../materialize/css/materialize.css";


class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isSignIn: true,

    userName: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmitSignIn = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.signIn(this.state);
  };

  handleSubmitSignUp = e => {
    e.preventDefault();

    this.props.signUp(this.state);
  };

  render() {
    const { auth } = this.props;
    // if (auth.uid) return <Redirect to="/" />;

    const { authError } = this.props;
    if (this.state.isSignIn) {
      return (
        <div className="container pad-container">
          <form className="white" onSubmit={this.handleSubmitSignIn}>
            <h5
              style={{ marginBottom: "2rem" }}
              className="grey-text text-darken-3"
            >
              Sign In
            </h5>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <button className="red accent-2 waves-effect waves-light btn">
                Login
              </button>
              <div className="red-text accent-2-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
            <p>Do not have an account yet?</p>
          </form>
          <span>
            <button
              onClick={() => this.setState({ ...this.state, isSignIn: false })}
            >
              Sign up here
            </button>
          </span>
        </div>
      );
    } else {
      return (
        <div className="container pad-container">
          <form className="white" onSubmit={this.handleSubmitSignUp}>
            <h5 className="grey-text text-darken-3">Sign Up</h5>

            <div className="input-field">
              <label htmlFor="userName">User Name</label>
              <input type="text" id="userName" onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                class="validate"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <button className="btn red accent-2 lighten-1 z-depth-0">
                Sign Up
              </button>
              <div className="red-text accent-2-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
          <span>
            <button
              onClick={() => this.setState({ ...this.state, isSignIn: true })}
            >
              Sign In here
            </button>
          </span>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

// have access to signIn into our props
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
