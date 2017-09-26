import React, { Component } from 'react';

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
            north: false || props.north,
            east: true || props.east,
            south: false || props.south,
            west: true || props.west,
            posX: props.posX,
            posY: props.posY,
            waterRunning: false,
            timeout: null,
            outWaterSpeed: null
        };
    }

    rotateClockwise() {
        if (this.waterRunning) return;

        let new_east  = this.state.north,
            new_south = this.state.east,
            new_west  = this.state.south,
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

        let new_east  = this.state.south,
            new_south = this.state.west,
            new_west  = this.state.north,
            new_north = this.state.east;

        this.setState({
            north: new_north,
            east: new_east,
            south: new_south,
            west: new_west
        });
    }

    getOutletsCount() {
        return (this.state.north + this.state.east + this.state.south + this.west) - 1;
    }

    startWater(waterFrom, outWaterSpeed) {
        waterFrom = waterFrom || Direction.south;

        this.setState({timeout:
            setTimeout(() => {
                // decide what next
                setTimeout(() => {
                    if (this.state.north && waterFrom !== Direction.north) {
                        // Board.sendWater(this.state.posX, this.state.posY-1, outWaterSpeed);
                    }

                    if (this.state.east && waterFrom !== Direction.east) {
                        // Board.sendWater(this.state.posX+1, this.state.posY, outWaterSpeed);
                    }

                    if (this.state.south && waterFrom !== Direction.south) {
                        // Board.sendWater(this.state.posX, this.state.posY+1, outWaterSpeed);
                    }

                    if (this.state.west && waterFrom !== Direction.west) {
                        // Board.sendWater(this.state.posX-1, this.state.posY, outWaterSpeed);
                    }
                }, this.getOutletsCount() * outWaterSpeed / 2);
                // this will make the water slower the less outlets there are

            }, outWaterSpeed / 2)
        });
    }

    render() {
        // ...
    }
}

export default PipeField