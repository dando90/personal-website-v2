import LocalizedPage, {
  localizedPageMetadata,
  type LocalizedPageProps,
} from "@/lib/localized-page";

export function generateMetadata({ params }: LocalizedPageProps) {
  return localizedPageMetadata(params, "contact");
}

export default function ContactRoute({ params }: LocalizedPageProps) {
  return <LocalizedPage params={params} page="contact" />;
}
