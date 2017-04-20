import React from 'react';
import { Link } from 'react-router-dom';
import { jQuery } from 'jQuery';
var bootstrap = require('bootstrap');
import { Table } from 'react-bootstrap';
var ReactDOM = require('react-dom');
// import styles from './styles.scss';

type Props = { list: Object };



const JobList = ({ list }: Props) => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image</th>
        <th>Last Result</th>
      </tr>
    </thead>
    <tbody>
      {list.map(job => (
        <tr key={job.id}>
          <td>{job.id}</td>
          <td><Link to={`/jobs/${job.id}`}>{job.name}</Link></td>
          <td>{job.image}</td>
          <td>{job.last_result}</td>
        </tr>
      ))}

    </tbody>
  </Table>
);

JobList.defaultProps = {
  list: {
    id: '',
    name: '',
  },
};

export default JobList;
