import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

type Props = { list: Object };

const JobList = ({ list }: Props) => (
  <div className={styles.JobList}>
    <h4>Job List</h4>
    <ul>
      {list.map(job => (
        <li key={job.id}>
          <Link to={`/jobs/${job.id}`}>{job.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

JobList.defaultProps = {
  list: {
    id: '',
    name: '',
  },
};

export default JobList;
