import robot from 'robotjs';
import Jimp from 'jimp';

const printScreen:() => Promise<Jimp> = () => {
  const { x, y } = robot.getMousePos();
  const robotScreenPic = robot.screen.capture(x, y, 200, 200);

  return new Promise((resolve, reject) => {
      try {
          var image = new Jimp(robotScreenPic.width, robotScreenPic.height);
          image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
              var color = robotScreenPic.colorAt(x, y);
              var red = parseInt(color[0] + color[1], 16);
              var green = parseInt(color[2] + color[3], 16);
              var blue = parseInt(color[4] + color[5], 16);

              image.bitmap.data[idx + 0] = Number(red);
              image.bitmap.data[idx + 1] = Number(green);
              image.bitmap.data[idx + 2] = Number(blue);
              image.bitmap.data[idx + 3] = 255;
          });
          resolve(image);
      } catch (e) {
          console.error(e);
          reject(e);
      }
  });
}

export {
  printScreen
}
