import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
  state = {videos: [], selectedVideo: null};

  onSizeChange = () => {
    this.setState({
      isMobile: window.innerWidth > 1000,
    });
  };

  componentDidMount() {
    this.onTermSubmit('cats');
    window.addEventListener('resize', this.onSizeChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onSizeChange, false);
  }

  onTermSubmit = async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = video => {
    // console.log('From the App!', video);
    this.setState({selectedVideo: video});
  };

  render() {
    const className = this.state.isMobile ? 'ui row' : '';
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className={className}>
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
