import React, { useState } from "react";
import "./Forms.css";

const questionsData = {
  depression: [
    { text: "Age", options: ["18-19", "20-21", "22-23", "24-25", "25+"] },
    { text: "Gender", options: ["Male", "Female", "Non-Binary", "Prefer Not To Say"] },
    { text: "Year of Study", options: ["1", "2", "3", "4", "Postgrad"] },
    { text: "Residence", options: ["Hostel", "With Family", "Rented", "PG"] },
    { text: "Academic Workload", options: ["Light", "Manageable", "Heavy", "Overwhelming"] },
    { text: "Placement/Job Worries", options: ["Not At All", "A Little", "Moderate", "A Lot", "Extremely"] },
    { text: "Sleep Hours", options: ["<5", "5-6", "6-7", "7-8", ">8"] },
    { text: "Sleep Quality", options: ["Very Poor", "Poor", "Fair", "Good", "Very Good"] },
    { text: "Exercise Per Week", options: ["None", "1-2 Days", "3-4 Days", "5+ Days"] },
    { text: "I Have Someone To Talk To When Stressed", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { text: "I Feel Lonely", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { text: "Alcohol Use", options: ["Never", "Occasionally", "Weekly", "Daily"] },
    { text: "Tobacco Use", options: ["Never", "Occasionally", "Weekly", "Daily"] },
    { text: "What Helps You Cope Best", options: ["Talking To Friends/Family", "Exercise", "Music", "Substance Use", "Nothing", "Counselling"] },
    { text: "What Coping Strategy You Use As A Student?", options: ["Analyze The Situation And Handle It With Intellect", "Emotional Breakdown (Crying A Lot)", "Social Support (Friends, Family)"] },
    { text: "Dietary Habits", options: ["Unhealthy", "Moderate", "Healthy"] },
    { text: "Have You Ever Experienced Panic Attacks?", options: ["Yes", "No", "Sometimes", "Prefer Not To Say"] },
    { text: "Have You Experienced Any Major Life Event In The Past 6 Months?", options: ["Bereavement", "Breakup / Relationship Issue", "Serious Illness", "Financial Difficulty", "Relocation / Moving Away From Home", "Other", "None"] },
    { text: "How Satisfied Are You With Your Academic Performance In The Past Semester?", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
  ],
  anxiety: [
    { text: "Feeling nervous, anxious, or on edge?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Not being able to stop or control worrying?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Worrying too much about different things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Trouble relaxing?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Being so restless that it is hard to sit still?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Becoming easily annoyed or irritable?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Feeling afraid, as if something awful might happen?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
  ],
  stress: [
    { text: "I found it hard to wind down", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I tended to over-react to situations", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I felt that I was using a lot of nervous energy", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I found myself getting agitated", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I found it difficult to relax", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I was intolerant of anything that kept me from getting on with what I was doing", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] },
    { text: "I felt that I was rather touchy", options: ["Did Not Apply To Me At All", "Applied To Me To Some Degree", "Applied To Me To A Considerable Degree", "Applied To Me Very Much"] }
  ]
};

const Forms = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleNext = () => {
    if (answers[currentQ] !== undefined) {
      setCurrentQ((prev) => prev + 1);
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [currentQ]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questions = questionsData[activeForm];

    if (answers[currentQ] === undefined) {
      alert("Please select an option before submitting.");
      return;
    }

    let score = 0;
    let message = "";

    if (activeForm === "anxiety") {
      // GAD-7 mapping
      const gadMap = {
        "Not at all": 0,
        "Several days": 1,
        "More than half the days": 2,
        "Nearly every day": 3
      };

      questions.forEach((q, i) => {
        const selected = answers[i];
        if (selected && gadMap[selected] !== undefined) {
          score += gadMap[selected];
        }
      });

      if (score <= 4) message = "Minimal anxiety.";
      else if (score <= 9) message = "Mild anxiety.";
      else if (score <= 14) message = "Moderate anxiety.";
      else message = "Severe anxiety — consider professional support.";
    } else {
      // Placeholder scoring for depression/stress
      score = Object.keys(answers).length;
      if (score < questions.length / 3)
        message = "Low risk — You seem to be doing okay.";
      else if (score < (2 * questions.length) / 3)
        message = "Moderate risk — You might be experiencing some challenges.";
      else message = "High risk — Consider reaching out for support.";
    }

    setResult({ score, message });

    // Reset form for next use but keep result visible
    setActiveForm(null);
    setCurrentQ(0);
    setAnswers({});
  };

  const renderForm = () => {
    if (!activeForm) return null;

    const questions = questionsData[activeForm];
    const isLast = currentQ === questions.length - 1;
    const qObj = questions[currentQ];

    return (
      <section className="form-section">
        <h2>{activeForm.charAt(0).toUpperCase() + activeForm.slice(1)} Screening</h2>
        <form onSubmit={handleSubmit}>
          <div className="question">
            <p className="question-text">
              {currentQ + 1}. {qObj.text}
            </p>
            <div className="options">
              {qObj.options.map((opt, idx) => (
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
        {["depression", "anxiety", "stress"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveForm(type);
              setCurrentQ(0);
              setAnswers({});
              setResult(null);
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
            <span className="btn-info">
              {type === "depression"
                ? "(Survey)"
                : type === "anxiety"
                ? "(Worry & Tension)"
                : "(Pressure & Relaxation)"}
            </span>
          </button>
        ))}
      </div>

      {renderForm()}
      {result && (
        <div className="result-box">
          <h3>📊 Screening Result</h3>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Interpretation:</strong> {result.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Forms;
