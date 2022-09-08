import React, { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import { SpinerLoading } from '../spinerLoading/spinerLoading';
import AppMovieCards from '../bodySearch/AppMovieCards';
import ErrorIndicator from '../error-indicator/error-indicator';
import SearchMovie from '.././header/search/searchMovie';

import 'antd/dist/antd.min.css';
import './AppSearch-Reted.css';

export default class AppSearch extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      arrayMovie: null,
      isLoading: true,
      error: true,
      totalArrayMovie: 0,
      pageNumber: 1,
      search: '',
      token: null,
      stars: [],
      ratingMovie: null,
      genres: null,
      genresMovieReted: null,
    };
    this.onSetRating = (rating) => {
      this.setState(() => {
        return {
          ratingMovie: rating,
        };
      });
    };
    this.onSetGenres = (genres) => {
      this.setState(() => {
        return {
          genresMovieReted: genres,
        };
      });
    };
    this.onNumberStar = (id) => {
      this.setState(({ arrayMovie, ratingMovie, genresMovieReted }) => {
        const idx = arrayMovie.findIndex((el) => el.id === id);

        let newItem = arrayMovie[idx];
        newItem.rating = ratingMovie;
        newItem.showGenres = genresMovieReted;

        const newArr = [...this.state.stars, newItem];

        localStorage.setItem(`${this.state.token}`, JSON.stringify(newArr));

        return {
          stars: newArr,
        };
      });
    };
    this.onError = () => {
      this.setState({
        error: false,
        isLoading: true,
      });
    };
    this.searchMovies = (search = 'return', _page) => {
      if (search.trim() === '') return;
      this.swapiService
        .getAllMovies(search, _page)
        .then((result) => {
          this.setState({
            arrayMovie: result,
            isLoading: false,
            error: false,
            totalArrayMovie: result.length,
            search: search,
          });
        })
        .catch(this.onError);
    };
    this.onNewGuestsSession = () => {
      this.swapiService
        .setAuthentication()
        .then((result) => {
          this.setState(() => {
            return {
              token: result,
            };
          });
        })
        .catch(this.onError);
    };
    this.getAllGenres = () => {
      this.swapiService
        .getAllGenres()
        .then((result) => {
          this.setState(() => {
            return {
              genres: result,
            };
          });
        })
        .catch(this.onError);
    };
  }

  componentDidMount() {
    this.getAllGenres();
    this.searchMovies();
    this.onNewGuestsSession();
  }

  render() {
    const { isLoading, error, pageNumber, arrayMovie, stars, genres, search, totalArrayMovie } = this.state;

    const errorMessage = !error && isLoading ? <ErrorIndicator /> : null;
    const spinner = error && isLoading ? <SpinerLoading /> : null;
    const content = !(isLoading || error) ? (
      <div className="allContent">
        <div className="search">
          <SearchMovie onSearch={this.searchMovies} page={pageNumber} />
        </div>
        <div className="container">
          <AppMovieCards
            data={arrayMovie}
            stars={stars}
            onNumberStar={this.onNumberStar}
            onSetRating={this.onSetRating}
            genresMovie={genres}
            onSetGenres={this.onSetGenres}
          />
        </div>
        <div className="pagination">
          {arrayMovie.length > 10 ? (
            <Pagination
              size="small"
              total={totalArrayMovie}
              onChange={(page) => {
                this.setState(
                  {
                    pageNumber: page,
                  },
                  () => {
                    this.searchMovies(search, page);
                  }
                );
              }}
            />
          ) : null}
        </div>
      </div>
    ) : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}

AppSearch.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  pageNumber: PropTypes.number,
  totalArrayMovie: PropTypes.number,
  search: PropTypes.string,
  arrayMovie: PropTypes.array,
  stars: PropTypes.array,
  genres: PropTypes.array,
  searchMovies: PropTypes.func,
  onNumberStar: PropTypes.func,
  onSetRating: PropTypes.func,
  onSetGenres: PropTypes.func,
};
