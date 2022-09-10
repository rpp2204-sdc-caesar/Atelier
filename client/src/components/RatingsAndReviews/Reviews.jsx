import React, { useState, useEffect } from "react";
import DisplayReview from "./DisplayReview.jsx";
import AddReview from "./AddReview.jsx";
const axios = require("axios");

export default function Reviews({ currProduct, renderStarRating, sendReview }) {
  console.log('prod: ', currProduct)
  const starPercentage = (rating) => {
    let totalStars = 0;
    for (let currentRating in metaData.ratings) {
      totalStars += parseInt(metaData.ratings[currentRating]);
    }
    let barLength = Math.floor((rating / totalStars) * 100);
    return (
      <div
        style={{ border: "solid black 5px", width: `${barLength + "px"}` }}
      ></div>
    );
  };

  const [displayedReviews, setDisplayedReviews] = useState(4);

  const [metaData, setMetaData] = useState({});

  const [currReviews, setCurrReviews] = useState([]);

  const [showReview, setShowReview] = useState(false);

  const [filter, updateFilter] = useState("helpful");

  const getReviews = (newFilter) => {
    updateFilter(newFilter);

    axios
      .get("/review", {
        params: {
          productId: `${currProduct}&sort=${newFilter}`,
        },
      })
      .then((reviewData) => {
        setCurrReviews((priorReviews) => reviewData.data);
      })
      .then(() => {
        axios
          .get("/meta", {
            params: {
              productId: currProduct,
            },
          })
          .then((metaData) => {
            if (metaData) {
              setMetaData((priorMetaData) => metaData.data);
            }
            return;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    axios
      .get("/review", {
        params: {
          productId: `${currProduct}&sort=${filter}`,
        },
      })
      .then((reviewData) => {
        setCurrReviews(reviewData.data);
      })
      .then(() => {
        axios
          .get("/meta", {
            params: {
              productId: currProduct,
            },
          })
          .then((metaData) => {
            if (metaData) {
              setMetaData(metaData.data);
            }
            return;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  function increaseDisplayedReviews() {
    setDisplayedReviews((previousDisplayed) => previousDisplayed + 4);
  }

  function toggleShowReview() {
    setShowReview((showForm) => !showForm);
  }

  return (
    <div style={{ marginLeft: "10px" }}>
      <h2>Ratings and Reviews</h2>
      <div className="main" style={{ display: "flex" }}>
        <div className="ratings">
          <div className="review-score" style={{ fontSize: "36px" }}>
            {metaData.ratings
              ? renderStarRating(metaData.characteristics.Quality.value)
              : null}
          </div>
          {/* <div className='stars'>{metaData.ratings ? renderStarRating(totalScore(metaData.ratings)) : null}</div> */}
          <div>
            5 star reviews:{" "}
            {metaData.ratings ? starPercentage(metaData.ratings[5]) : null}
          </div>
          <div>
            4 star reviews:{" "}
            {metaData.ratings ? starPercentage(metaData.ratings[4]) : null}
          </div>
          <div>
            3 star reviews:{" "}
            {metaData.ratings ? starPercentage(metaData.ratings[3]) : null}
          </div>
          <div>
            2 star reviews:{" "}
            {metaData.ratings ? starPercentage(metaData.ratings[2]) : null}
          </div>
          <div>
            1 star reviews:{" "}
            {metaData.ratings ? starPercentage(metaData.ratings[1]) : null}
          </div>
          <div className="size-rating-slide">Size rating goes here</div>
          <div className="comfort-rating-slide">Comfort rating goes here</div>
        </div>
        <div className="reviews" style={{ paddingLeft: "20px" }}>
          <div className="total-reviews">{`${currReviews.length} Reviews`}</div>
          <label form="filter">Show reviews by:</label>
          <select
            name="filter"
            id="filters"
            onChange={(e) => {
              getReviews(e.target.value);
            }}
          >
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
            <option value="relevant">Relevant</option>
          </select>
          <DisplayReview
            reviewsList={currReviews}
            displayedReviews={displayedReviews}
            renderStarRating={renderStarRating}
          />
          <div className="more-and-add-review" style={{ display: "flex" }}>
            <div
              style={{ border: "solid black 3px", padding: "20px" }}
              onClick={increaseDisplayedReviews}
            >
              More Reviews
            </div>
            <div
              onClick={toggleShowReview}
              style={{
                border: "solid black 3px",
                padding: "20px",
                marginLeft: "40px",
              }}
            >
              Add Review
            </div>
          </div>
          <div>
            {showReview ? (
              <AddReview
                productId={currProduct}
                toggleShowReview={toggleShowReview}
                metaData={metaData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}