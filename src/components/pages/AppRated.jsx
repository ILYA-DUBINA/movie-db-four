import React, { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import AppMovieCards from '../bodyRated/AppMovieCards';
import ErrorIndicator from '../error-indicator/error-indicator';

import 'antd/dist/antd.min.css';
import './AppSearch-Reted.css';

export default class AppReted extends Component {
  constructor(props) {
    super(props);

    this.swapiService = new SwapiService();

    this.state = {
      arrayMovie: [],
      error: true,
      totalArrayMovie: 0,
      pageNumber: 1,
      allElementNumber: 10,
      genres: null,
    };
    this.onError = () => {
      this.setState({
        error: false,
      });
    };
  }

  componentDidMount() {
    this.setState({
      arrayMovie: this.allStorage(),
    });
  }

  allStorage() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    let newElement = [].concat(...values);

    return newElement;
  }

  render() {
    const { allElementNumber, error, pageNumber, arrayMovie } = this.state;

    const indexOfLastPost = pageNumber * allElementNumber;
    const indexOfFirstPost = indexOfLastPost - allElementNumber;
    const currentPosts = arrayMovie.slice(indexOfFirstPost, indexOfLastPost);

    const errorMessage = !error ? <ErrorIndicator /> : null;
    const content = (
      <div className="allContent">
        <div className="container">
          <AppMovieCards data={currentPosts} />
        </div>
        <div className="pagination">
          {arrayMovie.length > 10 ? (
            <Pagination
              size="small"
              total={arrayMovie.length}
              onChange={(page) => {
                this.setState(
                  {
                    pageNumber: page,
                  },
                  () => {
                    arrayMovie, page;
                  }
                );
              }}
            />
          ) : null}
        </div>
      </div>
    );

    return (
      <>
        {errorMessage}
        {content}
      </>
    );
  }
}

AppReted.propTypes = {
  allElementNumber: PropTypes.number,
  error: PropTypes.bool,
  pageNumber: PropTypes.number,
  arrayMovie: PropTypes.array,
};
