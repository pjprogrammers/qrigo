interface Props {
  index?: boolean;
  follow?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
}

export default function RobotsMeta({
  index = true,
  follow = true,
  maxSnippet = -1,
  maxImagePreview = "large",
  maxVideoPreview = -1,
}: Props) {
  const parts = [
    index ? "index" : "noindex",
    follow ? "follow" : "nofollow",
    `max-snippet:${maxSnippet}`,
    `max-image-preview:${maxImagePreview}`,
    `max-video-preview:${maxVideoPreview}`,
  ];

  const content = parts.join(",");

  return (
    <>
      <meta name="robots" content={content} />
      <meta name="googlebot" content={content} />
    </>
  );
}
