/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import type { JobsHome as JobsHomeType, Dispatch, Reducer } from '../../types';
import JobList from '../../components/JobList';
import styles from './styles.scss';

type Props = {
  jobs: JobsHomeType,
  fetchJobsIfNeeded: () => void,
};

// Export this for unit testing more easily
export class JobsHome extends PureComponent {
  props: Props;

  static defaultProps: {
    jobs: {
      readyStatus: 'JOBS_INVALID',
      list: null,
    },
    fetchJobsIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchJobsIfNeeded();
  }

  renderJobList = () => {
    const { jobs } = this.props;

    if (!jobs.readyStatus || jobs.readyStatus === action.JOBS_INVALID ||
      jobs.readyStatus === action.JOBS_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (jobs.readyStatus === action.JOBS_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    return <JobList list={jobs.list} />;
  }

  render() {
    return (
      <div className={styles.JobsHome}>
        <Helmet title="JobsHome" />
        {this.renderJobList()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ jobs }: Reducer) => ({ jobs }),
  (dispatch: Dispatch) => ({
    fetchJobsIfNeeded: () => dispatch(action.fetchJobsIfNeeded()),
  }),
);

export default connector(JobsHome);
