import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "projects");
}

export default function ProjectsRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="projects" />;
}
