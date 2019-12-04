import React, { Component } from 'react'
import '../style.css'
import { updateSelectedAlgorithm} from "../../store/actions/adminActions";
import { connect } from "react-redux";

class AlgorithmBox extends Component {
  state = {
    selectedAlgorithm: ''
  };

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    console.log("=====constructor=====")
    console.log(props)

    const {algorithms} = props;

    console.log("getDerivedStateFromProps")
    console.log(props)
    algorithms.map((algorithm) => {
      console.log(algorithm.id + ": " +algorithm.selected)
      if(algorithm.selected){
        this.state = {
          selectedAlgorithm : algorithm.id
      };
      }
    })
  }

  onAlgorithmChanged = (e) =>  {
    this.setState({
      selectedAlgorithm: e.currentTarget.value
      });
    this.props.updateSelectedAlgorithm(e.currentTarget.value);
  }

  render() {
    const {algorithms} = this.props;

    return (
        <div className="algorithmbox" id="algorithmbox">

        <div>
          {algorithms.map((algorithm,index) => (
            <p key={index}>
              <input 
                type="radio" 
                id={algorithm.id}
                name="algorithm" 
                value={algorithm.id}
                checked={this.state.selectedAlgorithm === algorithm.id } 
                onChange={this.onAlgorithmChanged}/>
              <label htmlFor={algorithm.id}>{algorithm.id}</label>
            </p>
          ))}
        </div>
          

        </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedAlgorithm: (selectedAlgorithm) => dispatch(updateSelectedAlgorithm(selectedAlgorithm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmBox);