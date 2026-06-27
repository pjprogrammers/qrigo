import type { Metadata } from "next";
import { getGeneratePageMetadata } from "./seo/generate-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getGeneratePageMetadata();
}

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
