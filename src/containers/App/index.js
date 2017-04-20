/* @flow */

import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';

import config from '../../config';
import routes from '../../routes';
// Import your global styles here
import '../../theme/normalize.css';
import styles from './styles.scss';
// import NavBar from '../../components/NavBar';

export default () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );

  return (
    <div id="container-fluid">
      <div id="Navbar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="http://foo.com">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/jobs">Jobs</NavItem>
              <NavItem eventKey={2} href="/">Users</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="/link1">Link Right</NavItem>
              <NavItem eventKey={2} href="/link2">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className={styles.App}>
        <Helmet {...config.app} />
        <div className={styles.header}>
          <img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
          <h1>{config.app.title}</h1>
        </div>
        <hr />

        <Switch>
          {routes.map(route => routeWithSubRoutes(route))}
        </Switch>
      </div>
    </div>
  );
};
