import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppRated from './pages/AppRated';
import AppSearch from './pages/AppSearch';
import HeaderRouter from './header/router/headerRouter';
import { Provider } from './service-context/service-context';

export class App extends React.Component {
  afterLogIn() {
    window.parent.location = '/';
  }

  render() {
    return (
      <>
        <div className="allContent">
          <Provider value={this.afterLogIn}>
            <HeaderRouter />
            <Switch>
              <Route path="/" exact component={AppSearch} />
              <Route path="/reted" component={AppRated} />
            </Switch>
          </Provider>
        </div>
      </>
    );
  }
}
