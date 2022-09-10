import React, { useState, useEffect } from "react";
const axios = require("axios");

export default function AddReview({ productId, toggleShowReview, metaData }) {
  console.log('meta: ', metaData.characteristics)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [comfort, setComfort] = useState(metaData.characteristics.Comfort.id);
  const [fit, setFit] = useState(metaData.characteristics.Width.id);
  const [length, setLength] = useState(metaData.characteristics.Size.id);
  const [quality, setQuality] = useState(metaData.characteristics.Quality.id);


  const backgroundStyling = {
    position: "fixed",
    top: "0%",
    left: "0%",
    zIndex: "2",
    backgroundColor: "rgba(100,100,100,0.5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  };

  const formStyling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh",
    width: "60vw",
    backgroundColor: "white",
    position: "fixed"
  };

  const reviewData = {
    product_id: parseInt(metaData.product_id),
    rating: 5,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: [],
    characteristics: {
    }
  }

  function sendReview() {
      axios.post('/addReview', reviewData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <form style={backgroundStyling}>
      <div style={formStyling}>
        <p onClick={() => {toggleShowReview()}}>X</p>
        <label>Nickname: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Summary: </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></input>
        <label>Review: </label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></input>
        <label>Recommend? </label>
        <input
          type="checkbox"
          value={recommend}
          onChange={() => {setRecommend(true)}}
        ></input>
        <br></br>
        <label>Comfort: </label>
        <input type="text" placeholder="" onChange={(e) => {
          reviewData.characteristics[`${comfort}`] = parseInt(e.target.value);
        }}></input>
        <label>Fit: </label>
        <input type="text" onChange={(e) => {
          reviewData.characteristics[`${fit}`] = parseInt(e.target.value);
        }}></input>
        <label>Length: </label>
        <input type="text" onChange={(e) => {
          reviewData.characteristics[`${length}`] = parseInt(e.target.value);
        }}></input>
        <label>Quality: </label>
        <input type="text" onChange={(e) => {
          reviewData.characteristics[`${quality}`] = parseInt(e.target.value);
        }}></input>
        <button type="submit" onClick={sendReview}>Submit</button>
      </div>
    </form>
  );
}

/*
Required paramaters:

product_id
rating
summary
body
recommend
name
email
photos
characteristics

Review object

{
    "product_id": 71697,
    "rating": 2,
    "summary": "this thing is BAD",
    "body": "I really did not like this product. It had nothing I enjoyed.",
    "recommend": false,
    "name": "user",
    "email": "user@gmail.com",
    "photos": [],
    "characteristics": {"240582": 5, "240583": 5, "240584": 5, "240585": 5 }
}

*/