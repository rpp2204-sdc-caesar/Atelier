import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Reviews from './component/Reviews.jsx';
import Axios from 'axios';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curr_product_id: 71697,
      curr_product_reviews: [],
      curr_product_meta: []

    }
    this.renderStarRating = this.renderStarRating.bind(this);
    this.totalScore = this.totalScore.bind(this);
  }

  totalScore(reviews) {
    let totalScore = 0;
    let totalReviews = 0;
    for (let currentScore in reviews) {
      totalScore += parseInt(currentScore * reviews[currentScore]);
      totalReviews += parseInt(reviews[currentScore]);
    }
    return (totalScore / totalReviews).toFixed(2);
  }

  renderStarRating(reviewScore) {

    var starsInHtml = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= reviewScore) {
        starsInHtml.push(<div key={`${i}-star`}>&#9733;</div>)
      } else {
        starsInHtml.push(<div key={`${i}-star`}>&#9734;</div>)
      }
    }
    return (
      <>
      <div style={{display: 'flex'}}>
      {starsInHtml.map((star) => {
        return star
      })}
      </div>
      </>
    )
  }

  render() {
    return (
      <>
      <Reviews currReviews={this.state.curr_product_reviews} currProduct={this.state.curr_product_id} metaData={this.state.curr_product_meta} renderStarRating={this.renderStarRating} totalScore={this.totalScore}/>
      {/* <Overview curr_product_id={this.state.curr_product_id} /> */}
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);

// ReactDOM.render(<Index />, document.getElementById('root'));