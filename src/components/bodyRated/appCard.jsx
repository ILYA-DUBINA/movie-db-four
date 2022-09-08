import React from 'react';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { SpinerLoadingImage } from '../spinerLoading/spinerLoading.jsx';

import minify from './appCard.js';

import './appCard.css';

const AppCard = (props) => {
  let color;
  let image;

  let { original_title, release_date, overview, poster_path, rating, showGenres } = props;

  if (poster_path !== null) {
    image = (
      <img
        className="card__image-img"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="картинка фильма"
      />
    );
  } else {
    image = <SpinerLoadingImage />;
  }

  if (rating < 3) {
    color = '#E90000';
  } else if (rating === 3 || (rating > 3 && rating < 5)) {
    color = '#E97E00';
  } else if (rating === 5 || (rating > 5 && rating < 7)) {
    color = '#E9D100';
  } else {
    color = '#66E900';
  }

  return (
    <div className="card">
      <div className="card__content">
        {image}
        <div className="card__content-data">
          <div className="card__data-header">
            <h2 className="card__data-title">{original_title}</h2>
            <div className="card__data-reting" style={{ border: `2px solid ${color}` }}>
              <span>{rating}</span>
            </div>
          </div>
          <p className="card__data-time">{moment(release_date).format('MMMM D, YYYY')}</p>
          <div className="card__data-ganre">
            {showGenres[0] ? <div className="card__ganre-title">{showGenres[0]}</div> : null}
            {showGenres[1] ? <div className="card__ganre-name">{showGenres[1]}</div> : null}
            {showGenres[2] ? <div className="card__ganre-name">{showGenres[2]}</div> : null}
          </div>
          <p className="card__data-text">{minify(overview, 200)}</p>
          <div className="card__stars">
            {[...Array(10)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={ratingValue}>
                  <input type="radio" name="rating" value={ratingValue} />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    size={17}
                    style={{ cursor: 'default' }}
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCard;

AppCard.propTypes = {
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  rating: PropTypes.number,
  showGenres: PropTypes.array,
};
