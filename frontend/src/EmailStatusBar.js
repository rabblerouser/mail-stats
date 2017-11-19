import React from 'react';
import styled from 'styled-components';

const PercentageSpan = styled.span`
  padding: 5px 0;
  text-align: center;
  display: ${props => (props.num === 0 ? 'none' : 'inline-block')};
  background-color: ${props => props.color};
  width: ${props => (props.num / props.total) * 100}%;
`;

const EmailStatusBar = ({ successful, failed, total }) => {
  const pending = total - successful - failed;
  return [
    <PercentageSpan total={total} num={successful} key="1" color="#408D40">{successful}</PercentageSpan>,
    <PercentageSpan total={total} num={failed} key="2" color="#EA4B4B">{failed}</PercentageSpan>,
    <PercentageSpan total={total} num={pending} key="3" color="#EAEA4E">{pending}</PercentageSpan>,
  ];
};

export default EmailStatusBar;
