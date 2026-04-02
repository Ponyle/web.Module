import { readFile, writeFile } from 'fs/promises';
import themeSettings from '../src/settings/theme.json';

async function updateFavicon(svgPath: string, color: string) {
  const svgStr = await readFile(svgPath, 'utf-8');

  const svgStrWithColor = svgStr.replace(/currentColor/g, color);

  await writeFile('./public/favicon.ico', svgStrWithColor);
}

updateFavicon('./src/assets/svg-icon/tlogo.svg', themeSettings.themeColor);
