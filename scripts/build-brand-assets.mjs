import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const publicURL = new URL("../public/", import.meta.url);
const logo = await readFile(new URL("logo.svg", publicURL));

await writeFile(new URL("favicon.svg", publicURL), logo);
for (const [filename, size] of [["logo-512.png", 512], ["apple-touch-icon.png", 180]]) {
  await writeFile(new URL(filename, publicURL),
    await sharp(logo).resize(size, size).flatten({ background: "#0e0e0e" }).png().toBuffer());
}

// ICO directory entries point to PNG-encoded images at each browser icon size.
const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map(size => sharp(logo).resize(size, size).ensureAlpha().png().toBuffer()));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (let index = 0; index < sizes.length; index++) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
await writeFile(new URL("favicon.ico", publicURL), Buffer.concat([directory, ...images]));
await writeFile(new URL("default-og.png", publicURL), await sharp(await readFile(new URL("social-card.svg", publicURL))).png().toBuffer());
console.log("Generated AF favicon, touch icon, logo, and sharing preview.");
