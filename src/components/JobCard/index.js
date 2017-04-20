import React from 'react';

import styles from './styles.scss';

type Props = { info: Object };

const JobCard = ({ info }: Props) => (
  <div className={styles.JobCard}>
    <h4>Job Card</h4>
    <ul>
      <li>Name: {info.name}</li>
      <li>Image: {info.image}</li>
      <li>ID: {info.id}</li>
      <li>Last Result: {info.last_result}</li>
    </ul>
  </div>
);

JobCard.defaulProps = {
  info: {
    name: '',
    image: '',
    id: '',
    last_result: '',
  },
};

export default JobCard;
