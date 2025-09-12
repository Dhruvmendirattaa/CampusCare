import React,{ useState } from "react";
import "./Forms.css";

const Forms = () => {
  const [activeForm, setActiveForm] = useState(null); 

  return (
    <div className="personalise-container">
      
      <p> start your quick screening test.</p>

      {/* Buttons */}
      <div className="form-buttons">
        <button onClick={() => setActiveForm("depression")}>Depression</button>
        <button onClick={() => setActiveForm("anxiety")}>Anxiety</button>
        <button onClick={() => setActiveForm("stress")}>Stress</button>
      </div>

      {/* Depression Form */}
      {activeForm === "depression" && (
        <section className="form-section">
          <h2>Depression Screening</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert(" form submitted!"); }}>
            <div className="question">
              <p>1. Do you often feel sad or empty?</p>
              <label><input type="radio" name="dep1" /> Never</label>
              <label><input type="radio" name="dep1" /> Sometimes</label>
              <label><input type="radio" name="dep1" /> Often</label>
              <label><input type="radio" name="dep1" /> Always</label>
            </div>

            <div className="question">
              <p>2. Do you lose interest in daily activities?</p>
              <label><input type="radio" name="dep2" /> Never</label>
              <label><input type="radio" name="dep2" /> Sometimes</label>
              <label><input type="radio" name="dep2" /> Often</label>
              <label><input type="radio" name="dep2" /> Always</label>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>
      )}

      {/* Anxiety Form */}
      {activeForm === "anxiety" && (
        <section className="form-section">
          <h2>Anxiety Screening</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert(" form submitted!"); }}>
            <div className="question">
              <p>1. Feeling nervous, anxious, or on edge  </p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>

            <div className="question">
              <p>2. Not being able to stop or control worrying  </p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>

            <div className="question">
              <p>3. Worrying too much about different things?</p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>

            <div className="question">
              <p>4. Trouble relaxing  </p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>
            
            <div className="question">
              <p>5. Being so restless that it is hard to sit still  </p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>
            
            <div className="question">
              <p>6. Becoming easily annoyed or irritable</p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>

            <div className="question">
              <p>7. Feeling afraid, as if something awful might happen  </p>
              <label><input type="radio" name="anx1" /> Not at all  </label>
              <label><input type="radio" name="anx1" /> Several days  </label>
              <label><input type="radio" name="anx1" /> More than half the days</label>
              <label><input type="radio" name="anx1" /> Nearly every day </label>
            </div>



            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>
      )}

      {/* Stress Form */}
      {activeForm === "stress" && (
        <section className="form-section">
          <h2>Stress Screening</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("form submitted!"); }}>
            <div className="question">
              <p>1. I found it hard to wind down</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

           <div className="question">
              <p>2. I tended to over-react to situations</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

            <div className="question">
              <p>3. I felt that I was using a lot of nervous energy</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

            <div className="question">
              <p>4. I found myself getting agitated</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

            <div className="question">
              <p>5. I found it difficult to relax</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

            <div className="question">
              <p>6. I was intolerant of anything that kept me from getting on with what I was doing</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>

            <div className="question">
              <p>7.I felt that I was rather touchy</p>
              <label><input type="radio" name="str1" /> Did Not Apply To Me At All</label>
              <label><input type="radio" name="str1" /> Applied To Me To Some Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me To A Considerable Degree</label>
              <label><input type="radio" name="str1" /> Applied To Me Very Much</label>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>
      )}
    </div>
  );
};


export default Forms;
