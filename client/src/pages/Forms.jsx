
import React, { useState } from "react";
import "./Forms.css";


const questionsData = {
  depression: [
    "Do you often feel sad or empty?",
    "Do you lose interest in daily activities?"
  ],
  anxiety: [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it is hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid, as if something awful might happen?"
  ],
  stress: [
    "I found it hard to wind down",
    "I tended to over-react to situations",
    "I felt that I was using a lot of nervous energy",
    "I found myself getting agitated",
    "I found it difficult to relax",
    "I was intolerant of anything that kept me from getting on with what I was doing",
    "I felt that I was rather touchy"
  ]
};

const optionsData = {
  depression: ["Never", "Sometimes", "Often", "Always"],
  anxiety: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  stress: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"]
};

const Forms = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (answers[currentQ] !== undefined) {
      setCurrentQ(prev => prev + 1);
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [currentQ]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers[currentQ] === undefined) {
      alert("Please select an option before submitting.");
      return;
    }
    console.log("User Answers:", answers);
    alert("Form submitted!");
    setActiveForm(null);
    setCurrentQ(0);
    setAnswers({});
  };

  const renderForm = () => {
    if (!activeForm) return null;

    const questions = questionsData[activeForm];
    const options = optionsData[activeForm];
    const isLast = currentQ === questions.length - 1;

    return (
      <section className="form-section">
        <h2>{activeForm.charAt(0).toUpperCase() + activeForm.slice(1)} Screening</h2>
        <p className="form-instruction">
          Answer the following question based on how you have felt recently.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="question">
            <p className="question-text">{currentQ + 1}. {questions[currentQ]}</p>
            <div className="options">
              {options.map((opt, idx) => (
                <label 
                  key={idx} 
                  className={`option-label ${answers[currentQ] === opt ? "selected" : ""}`}
                >
                  <input 
                    type="radio" 
                    name={`${activeForm}${currentQ}`} 
                    value={opt} 
                    checked={answers[currentQ] === opt}
                    onChange={handleChange} 
                  /> 
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="form-navigation">
            {!isLast && (
              <button type="button" className="submit-btn" onClick={handleNext}>
                Next
              </button>
            )}
            {isLast && (
              <button type="submit" className="submit-btn">
                Submit
              </button>
            )}
          </div>
        </form>
      </section>
    );
  };

  return (
    <div className="personalise-container">
      <p className="intro-text">
        Welcome! Take a few minutes to complete your quick mental health screening. 
        Choose a category below to get started. Your responses are private and will 
        help you understand your current mental state.
      </p>

      <div className="form-buttons">
        {["depression", "anxiety", "stress"].map(type => (
          <button 
            key={type} 
            onClick={() => { setActiveForm(type); setCurrentQ(0); setAnswers({}); }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} 
            <span className="btn-info">
              {type === "depression" ? "(Mood & Interest)" : type === "anxiety" ? "(Worry & Tension)" : "(Pressure & Relaxation)"}
            </span>
          </button>
        ))}
      </div>

      {renderForm()}
    </div>
  );
};

export default Forms;
