import { SITE_URL } from "@/lib/constants";

export async function GET() {
  const body = `User-Agent: *
Allow: /
Disallow: /_next/
Disallow: /api/

User-Agent: Googlebot
Allow: /
Disallow: /_next/

User-Agent: Google-Extended
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: Claude-Web
Allow: /

User-Agent: CCBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: Bytespider
Allow: /

User-Agent: Perplexity-User
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: ChatGPT-User
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap_new.xml

`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
