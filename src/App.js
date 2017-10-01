import React, {Component} from 'react';
import Board from './components/Board';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Board rows={10} cols={10} style={{width: "600px", height: "600px"}} />
      </div>
    );
  }
}

export default App;
