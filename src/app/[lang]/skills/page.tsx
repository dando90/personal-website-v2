import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "skills");
}

export default function SkillsRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="skills" />;
}
