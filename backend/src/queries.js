module.exports = (store) => {
  const getCampaigns = (req, res) => {
    const campaigns = store.campaigns.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return Date.parse(b.date) - Date.parse(a.date);
    });
    res.send({ campaigns });
  };

  return { getCampaigns };
};
