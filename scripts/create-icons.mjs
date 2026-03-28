import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

async function createIcons() {
  const logoPath = path.join(__dirname, 'public', 'logo.png');
  const publicDir = path.join(__dirname, 'public');
  
  // Check if logo.png exists
  if (!fs.existsSync(logoPath)) {
    console.log('logo.png not found, creating from uploaded image');
    const uploadedLogo = path.join(__dirname, 'upload', 'pasted_image_1774723205961.png');
    if (fs.existsSync(uploadedLogo)) {
      // Copy and resize uploaded logo
      await sharp(uploadedLogo)
        .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(logoPath);
      console.log('Created logo.png from uploaded image');
    }
  }

  // Create apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Create favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // Create favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // Create android-chrome-192x192.png
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('Created android-chrome-192x192.png');

  // Create android-chrome-512x512.png
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Created android-chrome-512x512.png');

  // Create favicon.ico (multi-resolution ICO)
  // For ICO, we'll create a PNG that browsers can use
  await sharp(logoPath)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  console.log('All icons created successfully!');
}

createIcons().catch(console.error);
