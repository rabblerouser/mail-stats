import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
    };
  }

  componentDidMount() {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(({ campaigns }) => this.setState({ campaigns }));
  }

  render() {
    return (
      <div>
        <header >
          <h1>Welcome to RR Mail Stats</h1>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>From</th>
              <th>Subject</th>
              <th>To</th>
              <th>S3 Key</th>
            </tr>
          </thead>
          <tbody>
            {this.state.campaigns.map(campaign => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.from}</td>
                <td>{campaign.subject}</td>
                <td>{campaign.to}</td>
                <td>{campaign.bodyLocation.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
