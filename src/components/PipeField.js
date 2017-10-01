import React, {Component} from 'react';
import './PipeField.css';
import classNames from 'classnames';

const Direction = {
  north: 0,
  east: 1,
  south: 2,
  west: 3
};
Object.freeze(Direction);

class PipeField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterRunning: false,
      timeout: null,
      inWaterSpeed: null,
      outWaterSpeed: null
    };
    this.startWater = this.startWater.bind(this);
    this.getOutletsCount = this.getOutletsCount.bind(this);
  }

  rotateClockwise() {
    if (this.waterRunning) return;

    let new_east = this.state.north,
      new_south = this.state.east,
      new_west = this.state.south,
      new_north = this.state.west;

    this.setState({
      north: new_north,
      east: new_east,
      south: new_south,
      west: new_west
    });
  }

  rotateCounterClockwise() {
    if (this.waterRunning) return;

    let new_east = this.state.south,
      new_south = this.state.west,
      new_west = this.state.north,
      new_north = this.state.east;

    this.setState({
      north: new_north,
      east: new_east,
      south: new_south,
      west: new_west
    });
  }

  getOutletsCount() {
    return (this.props.north + this.props.east
      + this.props.south + this.props.west) - 1;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.flow) {
      this.props.flow.addListener(nextProps.posX, nextProps.posY,
        {
          north: nextProps.north,
          east: nextProps.east,
          south: nextProps.south,
          west: nextProps.west
        },
        this.startWater.bind(this))
    }
  }

  componentDidMount() {
    if (this.props.flow) {
      this.props.flow.addListener(this.props.posX, this.props.posY,
        {
          north: this.props.north,
          east: this.props.east,
          south: this.props.south,
          west: this.props.west
        },
        this.startWater.bind(this))
    }
  }

  componentWillUnmount() {
    if (this.props.flow) {
      this.props.flow.removeListener(this.props.posX, this.props.posY);
    }
  }

  startWater(waterFrom, inWaterSpeed) {
    if (!this.state.waterRunning) {

      // todo: account for decreasing water speed
      let outWaterSpeed = inWaterSpeed;//* this.getOutletsCount();

      this.setState({waterRunning: true},
        // decide what next
        () => {
          setTimeout(() => {
            if (this.props.north && waterFrom !== Direction.north) {
              console.log(this.props.posX +"," + this.props.posY+ " sendWater to " + this.props.posX + "," + (this.props.posY-1) + " (" + Direction.south + ")");
              this.props.flow.sendWater(this.props.posX, this.props.posY - 1, Direction.south, outWaterSpeed);
            }

            if (this.props.east && waterFrom !== Direction.east) {
              console.log(this.props.posX +"," + this.props.posY+ " sendWater to " + (this.props.posX+1) + "," + this.props.posY + " (" + Direction.west + ")");
              this.props.flow.sendWater(this.props.posX + 1, this.props.posY, Direction.west, outWaterSpeed);
            }

            if (this.props.south && waterFrom !== Direction.south) {
              console.log(this.props.posX +"," + this.props.posY+ " sendWater to " + this.props.posX + "," + (this.props.posY+1) + " (" + Direction.north + ")");
              this.props.flow.sendWater(this.props.posX, this.props.posY + 1, Direction.north, outWaterSpeed);
            }

            if (this.props.west && waterFrom !== Direction.west) {
              console.log(this.props.posX +"," + this.props.posY+ " sendWater to " + (this.props.posX-1) + "," + this.props.posY + " (" + Direction.east + ")");
              this.props.flow.sendWater(this.props.posX - 1, this.props.posY, Direction.east, outWaterSpeed);
            }
          }, outWaterSpeed)
        }
      );
    }
  }

  render() {
    return (
      <div className={classNames("pipe-field", {"water": this.state.waterRunning})}
           style={this.props.style}>
        {this.props.north && <div className="pipe north"/>}
        {this.props.east && <div className="pipe east"/>}
        {this.props.south && <div className="pipe south"/>}
        {this.props.west && <div className="pipe west"/>}
      </div>
    );
  }
}

export default PipeField