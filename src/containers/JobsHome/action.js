/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const JOBS_INVALID = 'JOBS_INVALID';
export const JOBS_REQUESTING = 'JOBS_REQUESTING';
export const JOBS_FAILURE = 'JOBS_FAILURE';
export const JOBS_SUCCESS = 'JOBS_SUCCESS';

export const API_URL = 'http://127.0.0.1:8000/api/v1/jobs';

// Export this for unit testing more easily
export const fetchJobs = (axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: JOBS_REQUESTING });

    return axios.get(API_URL)
      .then((res) => {
        dispatch({ type: JOBS_SUCCESS, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: JOBS_FAILURE, err });
      });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchJobs = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const jobs = state.jobs;

  if (jobs.readyStatus === JOBS_SUCCESS) return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchJobsIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchJobs(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchJobs(axios));
    }

    /* istanbul ignore next */
    return null;
  };
