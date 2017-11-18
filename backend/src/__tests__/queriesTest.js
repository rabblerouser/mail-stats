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
});
