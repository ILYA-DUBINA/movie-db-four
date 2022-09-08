import React from 'react';
import PropTypes from 'prop-types';

import { SpinerLoading } from '../spinerLoading/spinerLoading.jsx';
import './AppMovieCards.css';

import AppCard from './appCard.jsx';

const AppMovieCards = (props) => {
  let { onNumberStar, onSetRating, genresMovie, onSetGenres } = props;

  let elements = props.data.map((item) => {
    if (item === null) {
      return <SpinerLoading />;
    }
    const { id } = item;

    return (
      <AppCard
        key={id}
        {...item}
        onNumberStar={() => onNumberStar(id)}
        onSetRating={onSetRating}
        onSetGenres={onSetGenres}
        genresMovie={genresMovie}
      />
    );
  });

  return <>{elements.length === 0 ? <h2 className="noMovie">Фильмы по вашему запросу не найдены</h2> : elements}</>;
};

export default AppMovieCards;

AppMovieCards.propTypes = {
  onNumberStar: PropTypes.func,
  onSetRating: PropTypes.func,
  genresMovie: PropTypes.array,
  onSetGenres: PropTypes.func,
};
