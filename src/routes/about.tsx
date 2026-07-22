import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/aaa/ComingSoon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Coming Soon | HK Associates and Developers" },
      { name: "description", content: "Our About Us page is launching soon. HK Associates and Developers — national construction company across Pakistan." },
      { property: "og:title", content: "About Us — Coming Soon | HK Associates" },
      { property: "og:description", content: "Our About Us page is launching soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <ComingSoon title="About Us" />;
}
