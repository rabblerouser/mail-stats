class Store {
  constructor() {
    this.campaigns = [];

    this.addCampaign = this.addCampaign.bind(this);
  }

  addCampaign(campaign) {
    this.campaigns.push(campaign);
    return Promise.resolve();
  }
}

module.exports = Store;
