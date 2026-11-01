"use client";

import Image, { type ImageLoader } from "next/image";

const profileImageLoader: ImageLoader = ({ width }) => {
  const variant = width <= 480 ? 480 : 800;
  return `/images/profile/stefano-chiabrando-${variant}.webp`;
};

export default function ProfileImage({ alt }: { alt: string }) {
  return (
    <div className="relative mx-0 aspect-[3/4] w-36 max-w-[15rem] overflow-hidden rounded-3xl bg-page sm:w-40 md:w-full">
      <Image
        alt={alt}
        className="object-cover object-[center_35%]"
        fill
        loader={profileImageLoader}
        priority={false}
        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 24rem, calc(100vw - 2.5rem)"
        src="/images/profile/stefano-chiabrando-480.webp"
      />
    </div>
  );
}
