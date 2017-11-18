const queries = require('../queries');
const Store = require('../store');

describe('queries', () => {
  let store;
  let getCampaigns;

  beforeEach(() => {
    store = new Store();
    ({ getCampaigns } = queries(store));
  });

  it('sends all the campaigns from the store', () => {
    const campaign = { id: '1234', from: 'someone@example.com' };
    store.addCampaign(campaign);

    const res = { send: sinon.spy() };
    getCampaigns(null, res);

    expect(res.send).to.have.been.calledWith({ campaigns: [campaign] });
  });

  it('sorts the campaigns by date, most-recent first, with missing dates last', () => {
    store.addCampaign({ id: '1', date: '2016-11-16T14:14:59.482Z' });
    store.addCampaign({ id: '2', date: '2017-11-16T14:14:59.482Z' });
    store.addCampaign({ id: '3' });
    store.addCampaign({ id: '4', date: '2015-11-16T14:14:59.482Z' });

    const res = { send: sinon.spy() };
    getCampaigns(null, res);

    const sentCampaigns = res.send.args[0][0].campaigns;
    expect(sentCampaigns[0].id).to.eql('2');
    expect(sentCampaigns[1].id).to.eql('1');
    expect(sentCampaigns[2].id).to.eql('4');
    expect(sentCampaigns[3].id).to.eql('3');
  });
});
