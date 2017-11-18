const Store = require('../store');

describe('store', () => {
  it('has no campaigns by default', () => {
    const store = new Store();

    expect(store.campaigns).to.eql([]);
  });

  it('can add a new campaign', () => {
    const store = new Store();
    const campaign = { id: '1234', to: 'someone@example.com' };
    store.addCampaign(campaign);

    expect(store.campaigns).to.eql([campaign]);
  });
});
