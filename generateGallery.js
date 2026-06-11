const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'gallery');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = getFiles(galleryDir);

const galleryItems = [];
let index = 1;

for (const file of allFiles) {
  const relativePath = file.replace(galleryDir, '').replace(/\\/g, '/');
  const ext = path.extname(file).toLowerCase();
  const dirName = path.dirname(file);
  
  // Skip HEIC
  if (ext === '.heic') continue;
  
  // Skip explicitly excluded videos
  if (relativePath.includes('m.mp4') || relativePath.includes('acm.mp4')) continue;
  
  // EXCLUDE TEAM IMAGES (Folders explicitly meant for Team / Leadership)
  if (relativePath.includes('/ACM TEAM/') || relativePath.includes('/LeADS/') || relativePath.includes('/ACM -W TEAM/')) continue;

  const type = ['.mp4', '.webm', '.ogg'].includes(ext) ? 'video' : 'image';
  
  // EXCLUDE images from the root public/gallery folder (these are often uncategorized/WhatsApp team photos)
  if (type === 'image' && dirName === galleryDir) {
    continue;
  }

  let event = "Chapter Event";
  let wing = "ACM Main Council";
  let track = "General";
  let year = "Cycle 2025 - 2026";
  let title = path.basename(file, ext);

  if (relativePath.includes('ACM SUMMIT')) {
    event = "ACM India Chapter Summit 2025";
    track = "Summit";
    year = "Cycle 2024 - 2025";
    title = "Summit Executive Snapshot";
  } else if (relativePath.includes('ACM -W')) {
    event = "ACM-W Structural Launch";
    wing = "ACM-W Diversity Wing";
    track = "Diversity Panel";
    year = "Cycle 2024 - 2025";
    title = "Diversity & Inclusion Panel";
  } else if (relativePath.includes('3 day webinar')) {
    event = "3-Day Technical Webinar";
    track = "Workshop";
    title = "Technical Webinar Session";
  }

  // Rename videos explicitly
  if (relativePath.includes('bts.mp4')) title = "Behind The Scenes Reel";
  if (relativePath.includes('intro reel.mp4')) title = "Chapter Introduction Reel";
  if (relativePath.includes('WhatsApp Video')) title = "Event Highlights " + index;
  
  // Give remaining images better names
  if (title.startsWith('DSC_') || title.startsWith('IMG_') || title.startsWith('2025') || title.startsWith('WhatsApp Image')) {
    title = "Event Capture " + index;
  }

  galleryItems.push({
    id: index++,
    type,
    src: `/gallery${relativePath}`,
    title,
    event,
    track,
    context: `Archived asset from ${event}.`,
    year,
    wing,
    assetType: type === 'video' ? 'Cinematic Videos' : 'High-Res Photos'
  });
}

const fileContent = `export const galleryItems = ${JSON.stringify(galleryItems, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'gallery', 'galleryData.ts'), fileContent);
console.log('Gallery data updated successfully. Excluded ACM TEAM, LeADS, and ACM -W TEAM directories.');
