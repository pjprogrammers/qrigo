export default function PreconnectLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/hero-qr.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
    </>
  );
}
