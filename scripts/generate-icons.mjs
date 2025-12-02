import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

// Candidate source images in order of preference (largest/cleanest first)
const candidates = [
  path.resolve("public/images/favicon.png"),
  path.resolve("public/assets/images/ToastHeadShotClear.webp"),
  path.resolve("assets/images/ToastHeadShotClear.webp"),
];

function findSource() {
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function createPng(sharpSrc, outPath, size) {
  await sharpSrc
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`Created ${outPath}`);
}

async function createIco(sharpSrc, outPath) {
  // Generate PNGs and convert to multi-size ICO via png-to-ico
  const tmpDir = path.resolve(".tmp-favicon");
  await ensureDir(tmpDir);
  const sizes = [16, 32, 48, 64];
  const pngPaths = [];
  for (const s of sizes) {
    const p = path.join(tmpDir, `favicon-${s}.png`);
    await sharpSrc
      .resize(s, s, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toFile(p);
    pngPaths.push(p);
  }
  const icoBuffer = await pngToIco(pngPaths);
  await fs.promises.writeFile(outPath, icoBuffer);
  console.log(`Created ${outPath}`);
  await fs.promises.rm(tmpDir, { recursive: true, force: true });
}

async function main() {
  const srcPath = findSource();
  if (!srcPath) {
    console.error(
      "No source icon found. Add one at public/images/favicon.png or assets/images/ToastHeadShotClear.webp"
    );
    process.exit(1);
  }
  console.log(`Using source: ${srcPath}`);

  const outDir = path.resolve("public");
  await ensureDir(outDir);

  const sharpSrc = sharp(srcPath);

  // Required by index.html
  await createPng(sharpSrc, path.join(outDir, "favicon-16x16.png"), 16);
  await createPng(sharpSrc, path.join(outDir, "favicon-32x32.png"), 32);
  await createPng(sharpSrc, path.join(outDir, "apple-touch-icon.png"), 180);

  // Manifest icons
  await createPng(
    sharpSrc,
    path.join(outDir, "android-chrome-192x192.png"),
    192
  );
  await createPng(
    sharpSrc,
    path.join(outDir, "android-chrome-512x512.png"),
    512
  );

  // ICO at root for broad browser/Google support
  await createIco(sharpSrc, path.join(outDir, "favicon.ico"));

  console.log("All icons generated in /public");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
