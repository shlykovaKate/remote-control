import robot from 'robotjs';

const mouseUp = (controlOffset:number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x, y - controlOffset);
};

const mouseDown = (controlOffset:number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x, y + controlOffset);
};

const mouseLeft = (controlOffset:number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x - controlOffset, y);
}

const mouseRight = (controlOffset:number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x + controlOffset, y);
}

export {
  mouseUp,
  mouseDown,
  mouseLeft,
  mouseRight
}