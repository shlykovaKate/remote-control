import { httpServer } from './http_server/index';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import * as drawing from './drawing';
import * as screenImage from './screenImage';
import * as navigation from './navigation';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: WS_PORT,
});

wss.on('connection', (ws) => {
  console.log(`Start web socket on the ${WS_PORT} port!`);

  const webSocketStream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});
  let data = '';
  
  webSocketStream.on('readable', async() => {
    let chunk;

    while ((chunk = webSocketStream.read()) !== null) {
      data += chunk;
    }

    const args = data.split(' ');
    const command = args[0];
    const arg1 = Number(args[1]);
    const arg2 = Number(args[2]);

    switch (command) {
      case 'mouse_up': {
        navigation.mouseUp(arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        webSocketStream.write(`mouse_up__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_down': {
        navigation.mouseDown(arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        webSocketStream.write(`mouse_down__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_left': {
        navigation.mouseLeft(arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        webSocketStream.write(`mouse_left__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_right': {
        navigation.mouseRight(arg1);
        const { x:newX, y:newY } = robot.getMousePos();
        webSocketStream.write(`mouse_right__(currX:${newX},currY:${newY})\0`);
        break;
      }
      case 'mouse_position': {
        const { x, y } = robot.getMousePos();
        webSocketStream.write(`mouse_position ${x},${y}\0`);
        break;
      }
      case 'draw_circle': {
        drawing.drawCircle(arg1);
        webSocketStream.write(`draw_circle\0`);
        break;
      }
      case 'draw_square': {
        drawing.drawSquare(arg1);
        webSocketStream.write(`draw_square\0`);
        break;
      }
      case 'draw_rectangle': {
        drawing.drawRectangle(arg1, arg2);
        webSocketStream.write(`draw_rectangle\0`);
        break;
      }
      case 'prnt_scrn': {
        const printScreen = await screenImage.printScreen();
        const base64 = await printScreen.getBase64Async(printScreen.getMIME());
        const imageString = base64.substring(22);
        webSocketStream.write(`prnt_scrn ${imageString}\0`);
        break;
      }
    }
    data = '';
  });
});

wss.on('close', () => {

});
