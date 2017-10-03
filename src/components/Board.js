import React, {Component} from 'react';
import Flow from './Flow';
import PipeField from './PipeField';
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      entryCol: 0,
      exitCol: 0,
      currentPipe: {
        north: Math.random() > 0.5,
        east: Math.random() > 0.5,
        south: Math.random() > 0.5,
        west: Math.random() > 0.5
      }
    };
    this.flow = new Flow();
    this.getRow = this.getRow.bind(this);
    this.placePipe = this.placePipe.bind(this);
  }

  componentWillMount() {
    let fields = [];
    for (let x = 0; x < this.props.rows; x++) {
      let row=[];
      for (let y = 0; y < this.props.cols; y++) {
        row.push({pipe: null});
      }
      fields.push(row);
    }

    let entryCol = parseInt(Math.random() * this.props.cols + 1),
      exitCol = parseInt(Math.random() * this.props.cols + 1);

    // entry
    fields[0][entryCol] = {pipe: {
      north: true,
      east: false,
      south: true,
      west: false
    }};

    // exit
    fields[this.props.rows-1][exitCol] = {pipe: {
      north: true,
      east: false,
      south: true,
      west: false
    }};

    this.setState({fields, entryCol, exitCol});
  }

  placePipe(x, y) {
    let fields = this.state.fields;
    fields[x][y] = {pipe: {
      north: this.state.currentPipe.north,
      east: this.state.currentPipe.east,
      south: this.state.currentPipe.south,
      west: this.state.currentPipe.west
    }};
    this.setState({
      fields: fields,
      currentPipe: {
        north: Math.random() > 0.5,
        east: Math.random() > 0.5,
        south: Math.random() > 0.5,
        west: Math.random() > 0.5
      }
    });
    this.forceUpdate();
  }

  getRow(rowNum = 0) {
    const w = (100/this.props.cols) + "%";
    return Array.from(Array(this.props.cols)).map((col, colNum)=>{
      let fieldInner;
      if (this.state.fields[rowNum][colNum].pipe) {
        fieldInner = <PipeField flow={this.flow} posX={colNum} posY={rowNum}
                                north={this.state.fields[rowNum][colNum].pipe.north}
                                east={this.state.fields[rowNum][colNum].pipe.east}
                                south={this.state.fields[rowNum][colNum].pipe.south}
                                west={this.state.fields[rowNum][colNum].pipe.west}/>;
      } else {
        fieldInner = <div className="empty-field" onClick={()=>this.placePipe(rowNum, colNum)}> - </div>
      }

      return (
        <div className="cell" style={{width: w}}
             key={"board-row-" + rowNum + "-col-"+colNum}>
          {fieldInner}
        </div>
      );
    })
  }

  setCurrentPipe() {

  }

  render() {
    const h = (100/this.props.rows) + "%";
    let rows = Array.from(Array(this.props.rows)).map((row, index) => {
      return <div className="row" style={{height: h}} key={"board-row-" + index}>{this.getRow(index)}</div>;
    });

    return (
      <div>
        <div className="board" style={this.props.style}>{rows}</div>

        <PipeField style={{width: "100px", height: "100px"}} north={this.state.currentPipe.north} east={this.state.currentPipe.east}
                   south={this.state.currentPipe.south} west={this.state.currentPipe.west} /><br />

        <button onClick={()=>this.flow.sendWater(this.state.entryCol, 0, 0, 1000)}>Starte Wasser</button>
      </div>
    );
  }
}