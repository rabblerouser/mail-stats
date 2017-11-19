module.exports = (store) => {
  const getCampaigns = (req, res) => {
    const campaigns = store.campaigns
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return Date.parse(b.date) - Date.parse(a.date);
      })
      .map(({ id, date, subject, from, to, successfulRecipients, failedRecipients }) => ({
        id,
        date,
        subject,
        from,
        recipients: {
          total: (to || []).length,
          successful: (successfulRecipients || []).length,
          failed: (failedRecipients || []).length,
        },
      }));
    res.send({ campaigns });
  };

  return { getCampaigns };
};
