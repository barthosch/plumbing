export default class {
  constructor(boardName = "Testboard") {
    this.listeners = [];
    this.boardName = boardName;
  }

  sendWater(posX, posY, direction, speed) {
    console.log("sendWater " + posX + "," + posY + " to direction " + direction + " at " + speed + " speed");

    for (let x = 0; x < this.listeners.length; x++) {
      let listener = this.listeners[x];
      // todo: listeners should be a 2 dimensional array to directly access the listener instead of searching it
      if (listener.posX === posX && listener.posY === posY) {
        listener.callbackFn(direction, speed);
        break;
      }
    }
  }

  addListener(posX, posY, callbackFn) {
    console.log("addListener");
    this.listeners.push({posX, posY, callbackFn});
  }

}
