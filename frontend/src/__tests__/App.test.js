import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from '../App';

describe('App', () => {
  it('passes no campaigns down by default', () => {
    fetchMock.get('/api/campaigns', { campaigns: [] });

    const app = shallow(<App />);

    const table = app.find('CampaignTable');
    expect(table).toHaveProp('campaigns', []);
  });
});
