import robot from 'robotjs';

const drawCircle = (radius) => {
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + radius, mousePos.y);
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x + (radius * Math.cos(i));
    const y = mousePos.y + (radius * Math.sin(i));

    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};

const drawSquare = (side) => {
  const {x, y} = robot.getMousePos();
  robot.mouseToggle("down");
  for (let i = 0; i <= side; i += 1) {
    robot.dragMouse(x, y - i);
  }
  for (let i = 0; i <= side; i += 1) {
    robot.dragMouse(x + i, y - side);
  }
  for (let i = 0; i <= side; i += 1) {
    robot.dragMouse(x + side, y - side + i);
  }
  for (let i = 0; i <= side; i += 1) {
    robot.dragMouse(x + side - i, y);
  }
  robot.mouseToggle("up");
}

const drawRectangle = (width, height) => {
  const {x, y} = robot.getMousePos();
  robot.mouseToggle("down");
  for (let i = 0; i <= height; i += 1) {
    robot.dragMouse(x, y - i);
  }
  for (let i = 0; i <= width; i += 1) {
    robot.dragMouse(x + i, y - height);
  }
  for (let i = 0; i <= height; i += 1) {
    robot.dragMouse(x + width, y - height + i);
  }
  for (let i = 0; i <= width; i += 1) {
    robot.dragMouse(x + width - i, y);
  }
  robot.mouseToggle("up");
}

export {
  drawCircle,
  drawSquare,
  drawRectangle
}