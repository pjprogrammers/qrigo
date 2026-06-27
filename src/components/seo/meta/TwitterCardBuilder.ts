import { SITE_TWITTER, OG_IMAGE } from "@/lib/constants";

export const TWITTER_SITE = SITE_TWITTER;
export const TWITTER_CREATOR = SITE_TWITTER;

export interface BuildTwitterCardParams {
  title: string;
  description: string;
  image?: string;
  card?: "summary" | "summary_large_image" | "app" | "player";
}

export interface TwitterCard {
  card: "summary" | "summary_large_image" | "app" | "player";
  title: string;
  description: string;
  site: string;
  images: string[];
  creator?: string;
}

export function buildTwitterCard(params: BuildTwitterCardParams): TwitterCard {
  return {
    card: params.card || "summary_large_image",
    title: params.title,
    description: params.description,
    site: SITE_TWITTER,
    images: [params.image || OG_IMAGE],
  };
}

export function buildTwitterCardWithCreator(
  params: BuildTwitterCardParams,
): TwitterCard {
  return {
    ...buildTwitterCard(params),
    creator: TWITTER_CREATOR,
  };
}
