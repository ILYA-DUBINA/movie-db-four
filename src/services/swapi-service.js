export default class SwapiService {
  constructor() {
    this.keyApi = 'c46fe2d2dfaf3b08ca5d1d15e236a397';
    this.urlConst = 'https://api.themoviedb.org/3/';
  }

  async getResource(url) {
    const res = await fetch(`${this.urlConst}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    const body = await res.json();

    return body;
  }

  async getAllMovies(search, _page) {
    const res = await this.getResource(
      `search/movie?api_key=${this.keyApi}&language=en-US&query=${search}&page=${_page}`
    );
    return res.results;
  }

  async setAuthentication() {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${this.keyApi}`);
    return res.guest_session_id;
  }

  async getAllGenres() {
    const genresRes = await this.getResource(`genre/movie/list?api_key=${this.keyApi}`);
    return genresRes.genres;
  }
}
