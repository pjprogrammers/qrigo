import { SITE_URL } from "@/lib/constants";

export interface HreflangTag {
  code: string;
  url: string;
}

interface Props {
  languages?: HreflangTag[];
  defaultUrl?: string;
}

export default function HreflangTags({
  languages = [
    { code: "en", url: SITE_URL },
    { code: "x-default", url: SITE_URL },
  ],
  defaultUrl,
}: Props) {
  const tags =
    defaultUrl && !languages.some((l) => l.code === "x-default")
      ? [...languages, { code: "x-default" as const, url: defaultUrl }]
      : languages;

  return (
    <>
      {tags.map(({ code, url }) => (
        <link key={code} rel="alternate" hrefLang={code} href={url} />
      ))}
    </>
  );
}
