import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';

import {
  fetchJobs,
  JOBS_REQUESTING,
  JOBS_FAILURE,
  JOBS_SUCCESS,
  API_URL,
} from '../action';

const mockStore = configureMockStore([thunk]);

describe('fetch jobs data', () => {
  const response = [{ id: '1', name: 'mock job 1' }];
  const errorMessage = 'Oops! Something went wrong.';

  beforeEach(() => { moxios.install(); });

  afterEach(() => { moxios.uninstall(); });

  test('creates JOBS_SUCCESS when fetching users has been done', () => {
    moxios.stubRequest(API_URL, {
      status: 200,
      response: { data: response },
    });

    const expectedActions = [
      { type: JOBS_REQUESTING },
      { type: JOBS_SUCCESS, data: response },
    ];
    const store = mockStore({ list: null });

    store.dispatch(fetchJobs(axios))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });

  test('creates JOBS_FAILURE when fail to fetch users', () => {
    moxios.stubRequest(API_URL, {
      status: 400,
      response: { err: errorMessage },
    });

    const expectedActions = [
      { type: JOBS_REQUESTING },
      { type: JOBS_FAILURE, err: errorMessage },
    ];
    const store = mockStore({ err: null });

    store.dispatch(fetchJobs(axios))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });
});
