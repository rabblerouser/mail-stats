import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from '../App';

describe('App', () => {
  it('renders an empty table', () => {
    fetchMock.get('/api/campaigns', { campaigns: [] });
    const app = shallow(<App />);

    expect(app.find('thead').find('tr')).toHaveLength(1);
    expect(app.find('tbody').find('tr')).toHaveLength(0);
  });
});
