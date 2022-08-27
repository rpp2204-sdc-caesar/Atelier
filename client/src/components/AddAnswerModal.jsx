import React, { useState } from 'react';

function AddAnswerModal(props) {
  const [ submitted, setSubmitted ] = useState(false);
  function handleSubmit() {
    setSubmitted((prevVal) => {
      return !prevVal;
    });
  }

  return (
    <div style={{display:
      props.addAnswerButtonClicked && !submitted ? "block" : "none",
      fontSize: "1rem",
      position: "absolute", zIndex: "2", opacity:"1", border: "solid grey",
      top: "50%", left: "60%", transform: "translate(-50%, -50%)", width: "40%",
      float: "left",
      backgroundColor: "ivory",
      marginLeft: "-10rem", padding: "5px 20px"}}>

      <h3 style={{ marginBottom: "0" }}>Submit your Answer</h3>
      <span>{props.currentProductName}: {props.questionBody}</span>
      <span>Your Answer *</span>
      <input name="content"
      style={{ width: "98%", height: "15rem", margin: "5px 5px" }} type="text"></input>
      <span>What is your nickname *</span>
      <input name="nickname"
      type="text" placeholder="Example: jack543!"></input>
      <br />
      <span>For privacy reasons, do not use your full name or email address</span>
      <br />
      <span>Your email *</span>
      <input name="email" type="text" placeholder="Example: jack@email.com"></input>
      <br />
      <span>For authentication reasons, you will not be emailed</span>

      <button className="upload-photos-button">Upload your photos</button>

      <div className="modal-actions">
          <button onClick={handleSubmit} className="submit-answer-button">Submit answer</button>
      </div>

    </div>
  );
}

export default AddAnswerModal;




    {/* <div className="modal"style={{
        display: props.questionAdded ? "block" : "none",
        position: "relative", zIndex: "2", opacity:"1", border: "solid grey", marginTop: "-35rem", width: "80%",
        backgroundColor: "ivory",
        marginLeft: "5rem", padding: "5px 20px"}} >
        <h3 style={{ marginBottom: "0" }}>Ask Your Question</h3>
        <span>About the {props.currentProductName}</span>

        <div className="your-question-content">
            <span>Your Question *</span>
            <input onChange={handleChange} value={inputQuestion.content} name="content" style={{ width: "98%", height: "15rem", margin: "5px 5px" }} type="text"
            placeholder="Why did you like the product or not?"></input>
        </div>
        <div className="your-question-nickname">
          <span>What is your nickname *</span>
          <input onChange={handleChange} value={inputQuestion.nickname} name="nickname" type="text" placeholder="Example: jackson11!"></input>
          <span>For privacy reasons, do not use your full name or email address</span>
        </div>
        <div className="your-question-email">
          <span>Your email *</span>
          <input onChange={handleChange} value={inputQuestion.email} name="email" type="text"></input>
          <span>For authentication reasons, you will not be emailed</span>
        </div>

        <div className="modal-actions">
          <button className="submit-button">Submit question</button>
        </div>
    </div> */}