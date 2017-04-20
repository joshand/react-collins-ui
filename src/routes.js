/* @flow */

import type { Dispatch } from './types';
import { fetchUsersIfNeeded } from './containers/Home/action';
import { fetchUserIfNeeded } from './containers/UserInfo/action';
import { fetchJobsIfNeeded } from './containers/JobsHome/action';
import { fetchJobIfNeeded } from './containers/JobInfo/action';
import HomePage from './containers/Home';
import JobsHomePage from './containers/JobsHome';
import UserInfoPage from './containers/UserInfo';
import JobInfoPage from './containers/JobInfo';
import NotFoundPage from './containers/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,  // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchUsersIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchUserIfNeeded(params.id)),
    ]),
  },
  {
    path: '/jobs',
    // If the route matches the location.pathname exactly or not (used for index route usually)
    exact: true,
    // Add your route component here
    component: JobsHomePage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchJobsIfNeeded(params.id)),
    ]),

  },
  {
    // Define your route path
    path: '/jobs/:id',
    // If the route matches the location.pathname exactly or not (used for index route usually)
    exact: true,
    // Add your route component here
    component: JobInfoPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchJobIfNeeded(params.id)),
    ]),

  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
