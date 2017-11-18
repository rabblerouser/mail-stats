import React from 'react';
import CampaignTable from './CampaignTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { campaigns: [] };
  }

  componentDidMount() {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(({ campaigns }) => this.setState({ campaigns }));
  }

  render() {
    return <CampaignTable campaigns={this.state.campaigns} />;
  }
}

export default App;
