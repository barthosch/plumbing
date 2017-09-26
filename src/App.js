import React, {Component} from 'react';
import Flow from './components/Flow';
import PipeField from './components/PipeField';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.flow = new Flow();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <PipeField flow={this.flow} posX={0} posY={0} north={false} east={true} south={false} west={true}/>
        <PipeField flow={this.flow} posX={1} posY={0} north={false} east={true} south={false} west={true}/>
        <PipeField flow={this.flow} posX={2} posY={0} north={false} east={true} south={true} west={true}/>
        <PipeField flow={this.flow} posX={3} posY={0} north={false} east={true} south={false} west={true}/>
        <br />
        <PipeField flow={this.flow} posX={0} posY={1} north={false} east={true} south={false} west={true}/>
        <PipeField flow={this.flow} posX={1} posY={1} north={false} east={true} south={false} west={true}/>
        <PipeField flow={this.flow} posX={2} posY={1} north={true} east={false} south={false} west={true}/>
        <PipeField flow={this.flow} posX={3} posY={1} north={false} east={true} south={false} west={true}/>

        <br />
        <button onClick={() => this.flow.sendWater(0, 0, 3, 800)}>Start</button>
      </div>
    );
  }
}

export default App;
