import React from 'react';
import SearchBar from './SearchBar';

class App extends React.Component {
  componentDidMount() {
    // fetch('.netlify/functions/youtube')
    //   .then(response => response.json())
    //   .then(data => console.log(data));
    const response = fetch('/.netlify/functions/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({msg: 'this is a test'}),
    });
    console.log(response);
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar />
      </div>
    );
  }
}

export default App;
