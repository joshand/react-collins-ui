import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import UserList from '../index';

describe('<JobList />', () => {
  test('renders', () => {
    const mockData = [{ id: '1', name: 'mock job 1' }];
    const tree = renderer.create(
      <StaticRouter location={''} context={{}}>
        <JobList list={mockData} />
      </StaticRouter>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
