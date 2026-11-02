import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "experience");
}

export default function ExperienceRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="experience" />;
}
