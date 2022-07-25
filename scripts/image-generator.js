const path = require('path');
const fs = require('fs');

const IMAGES_PATH = path.join(__dirname, '../', 'src', 'res', 'assets', 'images');
const IMAGE_FILE_PATH = path.join(__dirname, '../', 'src', 'res', 'images.ts');

const sanitizedImageFile = (fileName) => {
  const name = fileName.split('.')[0];
  const [imageType, imageName] = name.split('_');
  return `${imageType}${imageName.charAt(0).toUpperCase()}${imageName.slice(1)}`;
};

const images = [];
for (const imageFile of fs.readdirSync(IMAGES_PATH)) {
  images.push({
    sanitizedName: sanitizedImageFile(imageFile),
    originalName: imageFile,
  });
}
const data = `
  ${images
    .map((image) => `import ${image.sanitizedName} from './assets/images/${image.originalName}' `)
    .join('\n')}

    const images = {
        ${images.map((image) => image.sanitizedName).join('\n,')}
    }
    export default images
  `;

if (fs.existsSync(IMAGE_FILE_PATH)) {
  fs.unlinkSync(IMAGE_FILE_PATH);
}

fs.writeFileSync(IMAGE_FILE_PATH, data);
