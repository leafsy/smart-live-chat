import React, { Component } from "react";
import "../style.css";
import SessionBox from "./SessionBox";
import AlgorithmBox from "./AlgorithmBox";
import { getSessions, getAlgorithms} from "../../store/actions/adminActions";
import { connect } from "react-redux";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.props.getAlgorithms();
    this.props.getSessions();
  }


  render() {
    const { sessions,algorithms} = this.props;

    let algos;

    if(algorithms.length > 0) {
      algos = 
      <div className="row">
        <AlgorithmBox algorithms={algorithms} />
      </div>
    } 
    return (
      <div>
        <div className="row">
          <div className="column">AvailableSettions</div>
          <div className="column">Signout</div>
        </div>

        <div className="row">
            <SessionBox sessions={sessions} />
        </div>

        <div className="row">
          Algorithms       
        </div>

        {algos}

        <div className="row">
          Reload Messages          
        </div>

      
      </div>
    );
  
    
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('log admin state: ', state)
  // console.log('log chatroom ownProps: ', ownProps)
  
  return {
    sessions: state.adminReducer.sessions,
    algorithms: state.adminReducer.algorithms,
  };
};

// have access to signIn into our props
const mapDispatchToProps = dispatch => {
  return {
    getSessions: () => dispatch(getSessions()),
    getAlgorithms: () => dispatch(getAlgorithms()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
