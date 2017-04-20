import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

type Props = { list: Object };


const JobList = ({ list }: Props) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image</th>
        <th>Last Result</th>
        <th>Interval</th>
      </tr>
    </thead>
    <tbody>
      {list.map(job => (
        <tr key={job.id}>
          <td>{job.id}</td>
          <td><Link to={`/jobs/${job.id}`}>{job.name}</Link></td>
          <td>{job.image}</td>
          <td>{job.last_result}</td>
          <td>{job.interval.every} {job.interval.period}</td>
        </tr>
      ))}

    </tbody>
  </Table>
);

JobList.defaultProps = {
  list: {
    id: '',
    name: '',
    image: '',
    last_result: '',
  },
};

export default JobList;
