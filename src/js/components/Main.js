import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import NavSidebar from './NavSidebar';
import { navResponsive } from '../actions/nav';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Airports from '../screens/Airports';
import Airport from '../screens/Airport';
import NotFound from '../screens/NotFound';

class Main extends Component {

  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive(responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const {
      nav: { active: navActive, enabled: navEnabled, responsive }
    } = this.props;
    const includeNav = (navActive && navEnabled);
    let nav;
    if (includeNav) {
      nav = <NavSidebar />;
    }
    const priority = (includeNav && responsive === 'single' ? 'left' : 'right');

    return (
      <App centered={false}>
        <Router>
          <Split priority={priority} flex='right'
            onResponsive={this._onResponsive}>
            {nav}
            <Switch>
              <Route exact={true} path='/' component={Dashboard} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/airports/:id' component={Airport} />
              <Route path='/airports' component={Airports} />
              <Route path='/*' component={NotFound} />
            </Switch>
          </Split>
        </Router>
      </App>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    responsive: PropTypes.string
  })
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(Main);
