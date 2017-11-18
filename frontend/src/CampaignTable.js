import React from 'react';

const THead = () => (
  <thead>
    <tr>
      <th>Date</th>
      <th>ID</th>
      <th>From</th>
      <th>Subject</th>
      <th>To</th>
      <th>S3 Key</th>
    </tr>
  </thead>
);

const formatDate = isoDateString => (
  isoDateString && new Date(isoDateString).toLocaleDateString()
);

const Row = ({ campaign }) => (
  <tr>
    <td><time dateTime={campaign.date}>{formatDate(campaign.date)}</time></td>
    <td>{campaign.id}</td>
    <td>{campaign.from}</td>
    <td>{campaign.subject}</td>
    <td>{campaign.to}</td>
    <td>{(campaign.bodyLocation || {}).key}</td>
  </tr>
);

const TBody = ({ campaigns }) => (
  <tbody>
    {campaigns.map(campaign => (
      <Row key={campaign.id} campaign={campaign} />
    ))}
  </tbody>
);

const CampaignTable = ({ campaigns }) => (
  <table>
    <THead />
    <TBody campaigns={campaigns} />
  </table>
);

export default CampaignTable;
