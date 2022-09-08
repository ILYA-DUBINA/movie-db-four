import React, { useState } from 'react';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { SpinerLoadingImage } from '../spinerLoading/spinerLoading.jsx';

import minify from './appCard.js';

import './appCard.css';

const AppCard = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [color, setColor] = useState(null);

  const arr = [];
  let image;

  let {
    original_title,
    release_date,
    overview,
    poster_path,
    onNumberStar,
    onSetRating,
    genresMovie,
    genre_ids,
    onSetGenres,
  } = props;

  for (let i = 0; i < genresMovie.length; i++) {
    for (let j = 0; j < genre_ids.length; j++) {
      if (genresMovie[i].id === genre_ids[j]) {
        arr.push(genresMovie[i].name);
      }
    }
  }

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

  const onColorChange = (ratingNumber) => {
    if (ratingNumber < 3) {
      setColor('#E90000');
    } else if (ratingNumber === 3 || (ratingNumber > 3 && ratingNumber < 5)) {
      setColor('#E97E00');
    } else if (ratingNumber === 5 || (ratingNumber > 5 && ratingNumber < 7)) {
      setColor('#E9D100');
    } else {
      setColor('#66E900');
    }
  };

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
            {arr[0] ? <div className="card__ganre-title">{arr[0]}</div> : null}
            {arr[1] ? <div className="card__ganre-name">{arr[1]}</div> : null}
            {arr[2] ? <div className="card__ganre-name">{arr[2]}</div> : null}
          </div>
          <p className="card__data-text">{minify(overview, 200)}</p>
          <div className="card__stars">
            {[...Array(10)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label
                  key={ratingValue}
                  onClick={() => {
                    onColorChange(ratingValue);
                  }}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => {
                      setRating(ratingValue);
                      onSetRating(ratingValue);
                      onSetGenres(arr);
                      onNumberStar();
                    }}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    size={17}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
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
  onNumberStar: PropTypes.func,
  onSetRating: PropTypes.func,
  genresMovie: PropTypes.array,
  genre_ids: PropTypes.array,
  onSetGenres: PropTypes.func,
};
