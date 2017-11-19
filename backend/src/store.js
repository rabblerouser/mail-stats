class Store {
  constructor() {
    this.campaigns = [];

    this.addCampaign = this.addCampaign.bind(this);
  }

  addCampaign(campaign) {
    this.campaigns.push(campaign);
  }

  addSuccessfulRecipients({ emailId, to }) {
    const campaign = this.campaigns.find(c => c.id === emailId);
    if (campaign) {
      campaign.successfulRecipients = (campaign.successfulRecipients || []).concat(to);
    }
  }

  addFailedRecipients({ emailId, to }) {
    const campaign = this.campaigns.find(c => c.id === emailId);
    if (campaign) {
      campaign.failedRecipients = (campaign.failedRecipients || []).concat(to);
    }
  }
}

module.exports = Store;
