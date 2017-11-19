import React from 'react';
import styled from 'styled-components';
import EmailStatusBar from './EmailStatusBar';

const Table = styled.table`
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px;
`;

const Td = styled.td`
  border-width: 1px 0;
  border-color: #DDDDDD;
  border-style: solid;
  padding: 10px;
`;

const Tr = styled.tr`
  :hover {
    background-color: #EFEFEF;
  }
`;

const TableHead = () => (
  <thead>
    <tr>
      <Th>Date</Th>
      <Th>Subject</Th>
      <Th>From</Th>
      <Th>Sent / Failed / Pending</Th>
    </tr>
  </thead>
);

const formatDate = isoDateString => (
  isoDateString && new Date(isoDateString).toLocaleDateString()
);

const Row = ({ campaign }) => {
  const { successful, failed, total } = campaign.recipients;
  return (
    <Tr>
      <Td><time dateTime={campaign.date}>{formatDate(campaign.date)}</time></Td>
      <Td>{campaign.subject}</Td>
      <Td>{campaign.from}</Td>
      <Td><EmailStatusBar successful={successful} failed={failed} total={total} /></Td>
    </Tr>
  );
};

const TableBody = ({ campaigns }) => (
  <tbody>
    {campaigns.map(campaign => (
      <Row key={campaign.id} campaign={campaign} />
    ))}
  </tbody>
);

const CampaignTable = ({ campaigns }) => (
  <Table>
    <TableHead />
    <TableBody campaigns={campaigns} />
  </Table>
);

export default CampaignTable;
