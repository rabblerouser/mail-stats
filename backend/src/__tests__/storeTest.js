const Store = require('../store');

describe('store', () => {
  it('has no campaigns by default', () => {
    const store = new Store();

    expect(store.campaigns).to.eql([]);
  });

  it('can add a new campaign', () => {
    const store = new Store();
    const campaign = { id: '1234', to: ['someone@example.com'] };
    store.addCampaign(campaign);

    expect(store.campaigns).to.eql([campaign]);
  });

  it('records successful sendings', () => {
    const store = new Store();
    store.addCampaign({ id: '1234', to: ['first@example.com', 'second@example.com'] });
    store.addCampaign({ id: '5678' });

    store.addSuccessfulRecipients({ emailId: '1234', to: ['first@example.com'] });
    expect(store.campaigns[0].successfulRecipients).to.eql(['first@example.com']);

    store.addSuccessfulRecipients({ emailId: '1234', to: ['second@example.com'] });
    expect(store.campaigns[0].successfulRecipients).to.eql(['first@example.com', 'second@example.com']);
  });

  it('records failed sendings', () => {
    const store = new Store();
    store.addCampaign({ id: '1234' });
    store.addCampaign({ id: '5678', to: ['first@example.com', 'second@example.com'] });

    store.addFailedRecipients({ emailId: '5678', to: ['first@example.com'] });
    expect(store.campaigns[1].failedRecipients).to.eql(['first@example.com']);

    store.addFailedRecipients({ emailId: '5678', to: ['second@example.com'] });
    expect(store.campaigns[1].failedRecipients).to.eql(['first@example.com', 'second@example.com']);
  });

  it('ignores success and failure messages for unknown emails', () => {
    const store = new Store();
    store.addSuccessfulRecipients({ emailId: 'unknown', to: [] });
    store.addFailedRecipients({ emailId: 'also-unknown', to: [] });
  });
});
