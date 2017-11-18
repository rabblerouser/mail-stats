import React from 'react';
import { shallow } from 'enzyme';
import CampaignTable from '../CampaignTable';

describe('CampaignTable', () => {
  it('renders an empty table when there are no campaigns', () => {
    const table = shallow(<CampaignTable campaigns={[]} />);

    expect(table.find('thead').find('tr')).toHaveLength(1);
    expect(table.find('tbody').find('tr')).toHaveLength(0);
  });

  it('renders a row for each campaign', () => {
    const table = shallow(<CampaignTable campaigns={[{ id: 1, from: 'a@a.com' }, { id: 2, from: 'b@b.com' }]} />);

    const trs = table.find('tbody').find('tr');
    expect(trs).toHaveLength(2);
    expect(trs.at(0)).toIncludeText('a@a.com');
    expect(trs.at(1)).toIncludeText('b@b.com');
  });
});
