import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
    const imageUrl = media.url.startsWith("/")
        ? getStrapiURL(media.url.slice(1))
        : media.url;
    return imageUrl;
}