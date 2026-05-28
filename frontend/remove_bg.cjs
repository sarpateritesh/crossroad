const Jimp = require('jimp');

async function removeBlackBackground() {
  const imagePath = './src/assets/mascot.png';
  const outputPath = './src/assets/mascot-transparent.png';

  try {
    const image = await Jimp.read(imagePath);
    const threshold = 15;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (red <= threshold && green <= threshold && blue <= threshold) {
        this.bitmap.data[idx + 3] = 0;
      } else {
        if (red <= 30 && green <= 30 && blue <= 30) {
            this.bitmap.data[idx + 3] = 128;
        }
      }
    });

    await image.writeAsync(outputPath);
    console.log('Successfully created mascot-transparent.png');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

removeBlackBackground();
