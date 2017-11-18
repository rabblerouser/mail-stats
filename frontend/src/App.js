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
    return (
      <main>
        <header >
          <h1>Email campaigns</h1>
        </header>
        <CampaignTable campaigns={this.state.campaigns} />
      </main>
    );
  }
}

export default App;
