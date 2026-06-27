import { SITE_URL, SITE_NAME, SITE_LOCALE, OG_IMAGE } from "@/lib/constants";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface OpenGraphBase {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  type: string;
  images: OpenGraphImage[];
}

export interface OpenGraphArticle extends OpenGraphBase {
  type: "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export interface BuildOpenGraphParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
}

export interface BuildArticleOpenGraphParams extends BuildOpenGraphParams {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function buildOpenGraphImages(
  ogImage?: string,
  alt?: string,
): OpenGraphImage[] {
  return [
    {
      url: ogImage || OG_IMAGE,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      ...(alt ? { alt } : {}),
    },
  ];
}

export function buildOpenGraph(params: BuildOpenGraphParams): OpenGraphBase {
  return {
    title: params.title,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: params.type || "website",
    images: buildOpenGraphImages(params.ogImage, params.title),
  };
}

export function buildArticleOpenGraph(
  params: BuildArticleOpenGraphParams,
): OpenGraphArticle {
  return {
    ...buildOpenGraph({ ...params, type: "article" }),
    type: "article",
    ...(params.publishedTime ? { publishedTime: params.publishedTime } : {}),
    ...(params.modifiedTime ? { modifiedTime: params.modifiedTime } : {}),
    ...(params.authors ? { authors: params.authors } : {}),
  };
}
