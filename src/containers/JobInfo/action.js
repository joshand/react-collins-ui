/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const JOB_REQUESTING = 'JOB_REQUESTING';
export const JOB_FAILURE = 'JOB_FAILURE';
export const JOB_SUCCESS = 'JOB_SUCCESS';

export const API_URL = 'http://127.0.0.1:8000/api/v1/jobs';

// Export this for unit testing more easily
export const fetchJob = (jobId: string, axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: JOB_REQUESTING, jobId });

    return axios.get(`${API_URL}/${jobId}`)
      .then((res) => {
        dispatch({ type: JOB_SUCCESS, jobId, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: JOB_FAILURE, jobId, err });
      });
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchJob = (state: Reducer, jobId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const jobInfo = state.jobInfo[jobId];

  // Preventing dobule fetching data in production
  if (jobInfo && jobInfo.readyStatus === JOB_SUCCESS) return false;

  return true;
};

/* istanbul ignore next */
export const fetchJobIfNeeded = (jobId: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchJob(getState(), jobId)) {
      /* istanbul ignore next */
      return dispatch(fetchJob(jobId, axios));
    }

    /* istanbul ignore next */
    return null;
  };
