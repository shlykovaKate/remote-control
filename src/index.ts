import { httpServer } from './http_server/index';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import * as shapes from './shapes';
import * as image from './image';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8081,
});

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    const args = data.toString().split(' ');
    const command = args[0];
    const arg1 = Number(args[1]);
    const arg2 = Number(args[2]);

    switch (command) {
      case 'mouse_up': {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y - arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        ws.send(`mouse_up__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_down': {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y + arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        ws.send(`mouse_down__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_left': {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x - arg1, y);
        const { x:newX, y:newY } = robot.getMousePos();
        ws.send(`mouse_left__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_right': {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x + arg1, y);
        const { x:newX, y:newY } = robot.getMousePos();
        ws.send(`mouse_right__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_position': {
        const { x, y } = robot.getMousePos();
        ws.send(`mouse_position ${x},${y}\0`);
        break;
      }
      case 'draw_circle': {
        shapes.drawCircle(arg1);
        ws.send(`draw_circle\0`);
        break;
      }
      case 'draw_square': {
        shapes.drawSquare(arg1);
        ws.send(`draw_square\0`);
        break;
      }
      case 'draw_rectangle': {
        shapes.drawRectangle(arg1, arg2);
        ws.send(`draw_rectangle\0`);
        break;
      }
      case 'prnt_scrn': {
        const printScreen = await image.printScreen();
        const base64 = await printScreen.getBase64Async(printScreen.getMIME());
        const imageString = base64.substring(22);
        ws.send(`prnt_scrn ${imageString}\0`);
        break;
      }
    }
  });
});

wss.on('close', () => {

});
