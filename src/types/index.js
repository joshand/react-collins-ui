/* @flow */

import type { Store as ReduxStore } from 'redux';

export type Home = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};


export type JobsHome = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};

export type UserInfo = {
  [userId: string]: {
    readyStatus: string,
    err: any,
    info: Object,
  },
};

export type JobInfo = {
  [jobId: string]: {
    readyStatus: string,
    err: any,
    info: Object,
  },
};

export type Reducer = {
  home: Home,
  userInfo: UserInfo,
  router: any,
};


export type Action =
  { type: 'USERS_REQUESTING' } |
  { type: 'USERS_SUCCESS', data: Array<Object> } |
  { type: 'USERS_FAILURE', err: any } |
  { type: 'USER_REQUESTING', userId: string } |
  { type: 'USER_SUCCESS', userId: string, data: Object } |
  { type: 'USER_FAILURE', userId: string, err: any };

export type JobAction =
  { type: 'JOBS_REQUESTING' } |
  { type: 'JOBS_SUCCESS', data: Array<Object> } |
  { type: 'JOBS_FAILURE', err: any } |
  { type: 'JOB_REQUESTING', userId: string } |
  { type: 'JOB_SUCCESS', userId: string, data: Object } |
  { type: 'JOB_FAILURE', userId: string, err: any };


export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | JobAction | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type PromiseJobAction = Promise<JobAction>;
