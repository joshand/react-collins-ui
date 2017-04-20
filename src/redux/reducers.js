/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../containers/Home/reducer';
import jobs from '../containers/JobsHome/reducer';

import userInfo from '../containers/UserInfo/reducer';
import jobInfo from '../containers/JobInfo/reducer';

export default combineReducers({
  home,
  jobs,
  userInfo,
  jobInfo,
  router,
});
