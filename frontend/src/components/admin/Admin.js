import React, { Component } from "react";
import "../style.css";
import { connect } from "react-redux";

class Admin extends Component {
  state = {

  };

  render() {
    return (
      <div className="container pad-container">
          
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

// have access to signIn into our props
const mapDispatchToProps = dispath => {
  return {
  };
};
export default connect(
)(Admin);
