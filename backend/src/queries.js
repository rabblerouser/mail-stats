module.exports = (store) => {
  const getCampaigns = (req, res) => {
    res.send({ campaigns: store.campaigns });
  };

  return { getCampaigns };
};
