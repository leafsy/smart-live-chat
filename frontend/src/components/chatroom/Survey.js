import React, { Component } from "react";
import "../style.css";
import { connect } from "react-redux";
import { bool } from "prop-types";
import { getSurveyQuestions, updateChatroomId } from "../../store/actions/surveyActions";

import "../materialize/css/materialize.css";


class Survey extends Component {
  state = {
    surveyQuestions: [],
    surveyAnswers: {},
    surveyError: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("https://us-central1-smartlivechat2019.cloudfunctions.net/" + 
          `app/api/survey/?uid=${this.props.uid}&vid=${this.props.vid}`)
      .then(res => res.json())
      .then(data => this.setState({
        surveyQuestions: data.questions,
        surveyAnswers: Object.assign(
          ...data.questions.map(question => {
            switch (question.type) {
              case "boolean":
                return { [question.id]: false };
              case "integer":
                return { [question.id]: null };
              case "string":
                return { [question.id]: "" };
              case "score":
                return { [question.id]: 5 };
            }
          }))
      }));
  }

  handleChange = e => {
    const target = e.target;
    this.setState(prevState => ({
      ...prevState,
      surveyAnswers: {
        ...prevState.surveyAnswers,
        [target.id]: target.type === "checkbox"? target.checked : target.value
      }
    }));
  };

  handleSubmitSurvey = e => {
    e.preventDefault();
    const answers = this.state.surveyAnswers;

    for (let question of this.state.surveyQuestions) {
      if (answers[question.id] === null || answers[question.id] === "") {
        this.setState({
          surveyError: `Please answer the question "${question.text}"`
        });
        return;
      }
    }

    this.setState({ surveyError: null });

    console.log(JSON.stringify({
        uid: this.props.uid,
        vid: this.props.vid,
        answers: Object.keys(answers).map(qid => ({
          qid, answer: answers[qid]
        }))
      }));

    fetch("https://us-central1-smartlivechat2019.cloudfunctions.net/app" +
          "/api/surveyanswer", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        uid: this.props.uid,
        vid: this.props.vid,
        answers: Object.keys(answers).map(qid => ({
          qid, answer: answers[qid]
        }))
      })
    })
    .then(res => res.json())
    .then(data => this.props.updateChatroomId(data.cid));
  };

  render() {
    const { surveyQuestions, surveyAnswers, surveyError } = this.state;

    const questionElements = surveyQuestions && surveyQuestions.map(question => {
      let inputElement;
      switch (question.type) {
        case "boolean":
          return (
            <div key={question.id}>
              <label htmlFor={question.id}>
                <input type="checkbox" id={question.id} onChange={this.handleChange} />
                <span>{question.text}</span>
              </label>
            </div>
          );
        case "integer":
          inputElement = <input type="number" min="0" id={question.id} onChange={this.handleChange} />
          break;
        case "string":
          inputElement = <input type="text" id={question.id} onChange={this.handleChange} />
          break;
        case "score":
          return (
            <div className="input-field" key={question.id}>
              <label htmlFor={question.id} style={{width:"100%"}}>(from 1 to 5) {question.text}
                <span className="right">{surveyAnswers[question.id]}</span>
              </label>
              <input type="range" min="1" max="5" step="1" id={question.id} onChange={this.handleChange} style={{marginTop:"3rem"}} />
            </div>
          );
      }
      return (
        <div className="input-field" key={question.id}>
          <label htmlFor={question.id}>{question.text}</label>
          {inputElement}
        </div>
      );
    });

    return (
      <div className="container pad-container">
        <form className="white" onSubmit={this.handleSubmitSurvey}>
          <h5
            style={{ marginBottom: "2rem" }}
            className="grey-text text-darken-3"
          >
            Survey
          </h5>

          { questionElements }

          <div className="input-field">
            <button className="blue waves-effect waves-light btn">
              SUBMIT
            </button>
            <div className="red-text accent-2-text">
              {surveyError ? <p>{surveyError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveyQuestions: state.surveyReducer.surveyQuestions
  };
};

// have access to signIn into our props
const mapDispatchToProps = dispatch => {
  return {
    getSurveyQuestions: () => dispatch(getSurveyQuestions()),
    updateChatroomId: cid => dispatch(updateChatroomId(cid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
