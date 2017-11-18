import React from 'react';

const CampaignTable = ({ campaigns }) => (
  <div>
    <header >
      <h1>Welcome to RR Mail Stats</h1>
    </header>
    <table>
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
      <tbody>
        {campaigns.map(campaign => (
          <tr key={campaign.id}>
            <td>{campaign.date}</td>
            <td>{campaign.id}</td>
            <td>{campaign.from}</td>
            <td>{campaign.subject}</td>
            <td>{campaign.to}</td>
            <td>{(campaign.bodyLocation || {}).key}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CampaignTable;
