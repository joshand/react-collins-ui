/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import type { JobInfo as JobInfoType, Dispatch, Reducer } from '../../types';
import JobCard from '../../components/JobCard';
import styles from './styles.scss';

type Props = {
  jobInfo: JobInfoType,
  match: Object,
  fetchJobIfNeeded: (id: string) => void,
};

// Export this for unit testing more easily
export class JobInfo extends PureComponent {
  props: Props;

  static defaultProps: {
    jobInfo: {},
    match: { params: { id: '' } },
    fetchJobIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchJobIfNeeded, match: { params } } = this.props;

    fetchJobIfNeeded(params.id);
  }

  renderJobCard = () => {
    console.log(this.props);
    const { jobInfo, match: { params } } = this.props;

    const jobInfoById = jobInfo[params.id];
    if (!jobInfoById || jobInfoById.readyStatus === action.JOB_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (jobInfoById.readyStatus === action.JOB_FAILURE) {
      return <p>Oops, Failed to load info!</p>;
    }

    return <JobCard info={jobInfoById.info} />;
  }

  render() {
    return (
      <div className={styles.JobInfo}>
        <Helmet title="Job Info" />
        {this.renderJobCard()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ jobInfo }: Reducer) => ({ jobInfo }),
  (dispatch: Dispatch) => ({
    fetchJobIfNeeded: (id: string) => dispatch(action.fetchJobIfNeeded(id)),
  }),
);

export default connector(JobInfo);
