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
    const campaigns = [{ id: 1, from: 'a@a.com', recipients: [] }, { id: 2, from: 'b@b.com', recipients: [] }];
    const table = mount(<CampaignTable campaigns={campaigns} />);

    const trs = table.find('tbody').find('tr');
    expect(trs).toHaveLength(2);
    expect(trs.at(0)).toIncludeText('a@a.com');
    expect(trs.at(1)).toIncludeText('b@b.com');
  });

  it('renders dates nicely, and handles missing dates', () => {
    const table = mount(<CampaignTable campaigns={[{ id: 1, date: '2017-11-16T14:14:49.216Z', recipients: [] }]} />);

    // Calling toLocaleDateString here is a bit tautological, but we can't write the actual
    // result here because we don't know what locale our tests will run in
    const time = table.find('time');
    expect(time).toHaveProp('dateTime', '2017-11-16T14:14:49.216Z');
    expect(time).toIncludeText(new Date('2017-11-16').toLocaleDateString());
  });

  it('does not blow up on missing dates', () => {
    const table = mount(<CampaignTable campaigns={[{ id: 1, recipients: {} }]} />);

    const time = table.find('time');
    expect(time).not.toIncludeText('Invalid Date');
  });

  it('shows the sending status of emails', () => {
    const campaign = { id: 1, recipients: { total: 23, successful: 18, failed: 3 } };

    const table = mount(<CampaignTable campaigns={[campaign]} />);
    expect(table.find('tbody').find('tr')).toIncludeText('18 / 3 / 2');
  });
});
