import sharp from "sharp";
import fs from "fs";

async function svgToPng(svgPath, size, outputPath) {
  const svg = fs.readFileSync(svgPath, "utf-8");
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outputPath);
  console.log(`  ✓ ${outputPath} (${size}x${size})`);
}

async function buildIco(svgPath, icoPath) {
  const sizes = [48, 32, 16];
  const pngs = [];
  for (const size of sizes) {
    const svg = fs.readFileSync(svgPath, "utf-8");
    const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
    pngs.push({ size, buf });
    console.log(`  ✓ embedded ${size}x${size}`);
  }

  const count = pngs.length;
  const headerSize = 6 + count * 16;
  const buffers = [Buffer.alloc(6 + count * 16)];

  // ICO header
  buffers[0].writeUInt16LE(0, 0);      // reserved
  buffers[0].writeUInt16LE(1, 2);      // ICO type
  buffers[0].writeUInt16LE(count, 4);  // count

  let offset = headerSize;
  for (let i = 0; i < count; i++) {
    const { size, buf } = pngs[i];
    const entryOffset = 6 + i * 16;
    buffers[0].writeUInt8(size >= 256 ? 0 : size, entryOffset);
    buffers[0].writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    buffers[0].writeUInt8(0, entryOffset + 2);   // colors
    buffers[0].writeUInt8(0, entryOffset + 3);   // reserved
    buffers[0].writeUInt16LE(1, entryOffset + 4); // planes
    buffers[0].writeUInt16LE(32, entryOffset + 6); // bpp
    buffers[0].writeUInt32LE(buf.length, entryOffset + 8); // size
    buffers[0].writeUInt32LE(offset, entryOffset + 12);    // offset
    offset += buf.length;
    buffers.push(buf);
  }

  fs.writeFileSync(icoPath, Buffer.concat(buffers));
  console.log(`  ✓ ${icoPath}`);
}

async function main() {
  console.log("Regenerating icons…\n");

  console.log("Manifest icons (dark bg):");
  await svgToPng("public/icons/icon-192.svg", 192, "public/icons/icon-192.png");
  await svgToPng("public/icons/icon-512.svg", 512, "public/icons/icon-512.png");

  console.log("Apple touch icon:");
  await svgToPng("public/icons/icon-192.svg", 180, "public/apple-touch-icon.png");

  console.log("Browser favicon PNGs (light bg):");
  await svgToPng("public/favicon.svg", 96, "public/icons/icon-96.png");
  await svgToPng("public/favicon.svg", 32, "public/icons/icon-32.png");

  console.log("ICO favicon (48x48, 32x32, 16x16):");
  await buildIco("public/favicon.svg", "public/favicon.ico");

  console.log("\nAll icons regenerated.");
}

main().catch(console.error);
