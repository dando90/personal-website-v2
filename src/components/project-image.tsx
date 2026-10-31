"use client";

import Image, { type ImageLoader } from "next/image";

const availableWidths = [480, 800, 1200] as const;

const projectImageLoader: ImageLoader = ({ src, width }) => {
  if (src.endsWith(".svg")) return src;

  const basePath = src.replace(/\.(?:avif|jpe?g|png|webp)$/i, "");
  const widthVariant = availableWidths.find((size) => size >= width) ?? 1200;

  return `${basePath}-${widthVariant}.webp`;
};

export default function ProjectImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <Image
      alt={alt}
      className="object-cover"
      fill
      loader={projectImageLoader}
      sizes={sizes}
      src={src}
    />
  );
}
