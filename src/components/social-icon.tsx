export type SocialIconName = "facebook" | "youtube" | "linkedin" | "github";

const viewBoxes: Record<SocialIconName, string> = {
  facebook: "0 0 1536 1536",
  youtube: "0 0 1792 1280",
  linkedin: "0 0 1536 1504",
  github: "0 0 1536 1504",
};

export default function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={className} focusable="false" viewBox={viewBoxes[name]}>
      <use href={`/images/social-icons.svg#${name}`} />
    </svg>
  );
}
