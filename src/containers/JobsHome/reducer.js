/* @flow */

import _ from 'lodash';

import {
  JOBS_INVALID,
  JOBS_REQUESTING,
  JOBS_FAILURE,
  JOBS_SUCCESS,
} from './action';
import type { JobsHome, JobAction } from '../../types';

type State = JobsHome;

const initialState = {
  readyStatus: JOBS_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: JobAction): State => {
  switch (action.type) {
    case JOBS_REQUESTING:
      return _.assign({}, state, { readyStatus: JOBS_REQUESTING });
    case JOBS_FAILURE:
      return _.assign({}, state, {
        readyStatus: JOBS_FAILURE,
        err: action.err,
      });
    case JOBS_SUCCESS:
      return _.assign({}, state, {
        readyStatus: JOBS_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
