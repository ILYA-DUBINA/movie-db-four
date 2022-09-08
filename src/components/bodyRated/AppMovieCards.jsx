import React from 'react';

import { SpinerLoading } from '../spinerLoading/spinerLoading.jsx';
import './AppMovieCards.css';

import AppCard from './appCard.jsx';

const AppMovieCards = (props) => {
  let elements = props.data.map((item) => {
    if (item === null) {
      return <SpinerLoading />;
    }
    return <AppCard key={Math.random()} {...item} />;
  });

  return (
    <>
      {elements.length === 0 ? <h2 className="noMovie">Рейтинг никто еще не поставил ни одному фильму!</h2> : elements}
    </>
  );
};

export default AppMovieCards;
