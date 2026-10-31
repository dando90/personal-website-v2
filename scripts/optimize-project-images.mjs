import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDirectory = path.resolve("assets/project-images");
const outputDirectory = path.resolve("public/images/projects");
const supportedExtensions = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);
const widths = [480, 800, 1200];

await mkdir(outputDirectory, { recursive: true });

const inputs = (await readdir(inputDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => supportedExtensions.has(path.extname(name).toLowerCase()));

if (inputs.length === 0) {
  console.log("No project source images found; keeping the SVG placeholders.");
} else {
  for (const inputName of inputs) {
    const slug = path.basename(inputName, path.extname(inputName));
    const inputPath = path.join(inputDirectory, inputName);

    for (const width of widths) {
      const outputPath = path.join(outputDirectory, `${slug}-${width}.webp`);

      await sharp(inputPath)
        .rotate()
        .resize({
          width,
          height: Math.round((width * 10) / 16),
          fit: "cover",
          position: "attention",
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 5 })
        .toFile(outputPath);

      console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
    }
  }
}
