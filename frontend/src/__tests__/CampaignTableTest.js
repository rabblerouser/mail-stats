import React from 'react';
import { mount } from 'enzyme';
import CampaignTable from '../CampaignTable';

describe('CampaignTable', () => {
  it('renders an empty table when there are no campaigns', () => {
    const table = mount(<CampaignTable campaigns={[]} />);

    expect(table.find('thead').find('tr')).toHaveLength(1);
    expect(table.find('tbody').find('tr')).toHaveLength(0);
  });

  it('renders a row for each campaign', () => {
    const table = mount(<CampaignTable campaigns={[{ id: 1, from: 'a@a.com' }, { id: 2, from: 'b@b.com' }]} />);

    const trs = table.find('tbody').find('tr');
    expect(trs).toHaveLength(2);
    expect(trs.at(0)).toIncludeText('a@a.com');
    expect(trs.at(1)).toIncludeText('b@b.com');
  });

  it('renders dates nicely, and handles missing dates', () => {
    const table = mount(<CampaignTable campaigns={[{ id: 1, date: '2017-11-16T14:14:49.216Z' }]} />);

    // Calling toLocaleDateString here is a bit tautological, but we can't write the actual
    // result here because we don't know what locale our tests will run in
    const time = table.find('time');
    expect(time).toHaveProp('dateTime', '2017-11-16T14:14:49.216Z');
    expect(time).toIncludeText(new Date('2017-11-16').toLocaleDateString());
  });

  it('does not blow up on missing dates', () => {
    const table = mount(<CampaignTable campaigns={[{ id: 1 }]} />);

    const time = table.find('time');
    expect(time).not.toIncludeText('Invalid Date');
  });
});
