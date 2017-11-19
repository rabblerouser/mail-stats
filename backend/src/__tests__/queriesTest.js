const queries = require('../queries');
const Store = require('../store');

describe('queries', () => {
  let store;
  let getCampaigns;

  beforeEach(() => {
    store = new Store();
    ({ getCampaigns } = queries(store));
  });

  it('sends a summary of the campaigns from the store', () => {
    const campaign1 = {
      id: '5678',
      date: '2017-01-01T00:00:00.00Z',
      from: 'someone@example.com',
      to: ['first@example.com', 'second@example.com'],
      subject: 'Goodbye!',
      bodyLocation: { key: 'someKey' },
    };
    const campaign2 = {
      id: '1234',
      date: '2016-01-01T00:00:00.00Z',
      from: 'someone@example.com',
      to: ['first@example.com', 'second@example.com'],
      subject: 'Hello!',
      bodyLocation: { key: 'someKey' },
    };
    store.addCampaign(campaign1);
    store.addCampaign(campaign2);
    store.addSuccessfulRecipients({ emailId: '5678', to: ['first@example.com', 'second@example.com'] });
    store.addFailedRecipients({ emailId: '1234', to: ['someone@example.com'] });

    const res = { send: sinon.spy() };
    getCampaigns(null, res);

    const sentCampaigns = res.send.args[0][0].campaigns;
    expect(sentCampaigns[0]).to.eql({
      id: '5678',
      date: '2017-01-01T00:00:00.00Z',
      subject: 'Goodbye!',
      from: 'someone@example.com',
      recipients: {
        total: 2,
        successful: 2,
        failed: 0,
      },
    });
    expect(sentCampaigns[1]).to.eql({
      id: '1234',
      date: '2016-01-01T00:00:00.00Z',
      subject: 'Hello!',
      from: 'someone@example.com',
      recipients: {
        total: 2,
        successful: 0,
        failed: 1,
      },
    });
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
