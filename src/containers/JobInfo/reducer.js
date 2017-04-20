/* @flow */

import _ from 'lodash';

import {
  JOB_REQUESTING,
  JOB_FAILURE,
  JOB_SUCCESS,
} from './action';
import type { JobInfo, JobAction } from '../../types';

type State = JobInfo;

export default (state: State = {}, action: JobAction): State => {
  switch (action.type) {
    case JOB_REQUESTING:
      return _.assign({}, state, {
        [action.jobId]: {
          readyStatus: JOB_REQUESTING,
        },
      });
    case JOB_FAILURE:
      return _.assign({}, state, {
        [action.jobId]: {
          readyStatus: JOB_FAILURE,
          err: action.err,
        },
      });
    case JOB_SUCCESS:
      return _.assign({}, state, {
        [action.jobId]: {
          readyStatus: JOB_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
