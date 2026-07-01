import { buildSitemapXml } from "@/lib/sitemap-data";

export async function GET() {
  const xml = buildSitemapXml();

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
