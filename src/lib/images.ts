import type React from "react";

/** Neutral local product-image fallback (lives in /public). */
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

/** Swap a broken/empty product image for the local placeholder exactly once. */
export function onImageError(
	event: React.SyntheticEvent<HTMLImageElement>,
): void {
	const img = event.currentTarget;
	if (img.src.endsWith(PLACEHOLDER_IMAGE)) return;
	img.src = PLACEHOLDER_IMAGE;
}

/** First image URL for a product, or the placeholder. */
export function productImage(images?: { url: string }[]): string {
	return images?.[0]?.url || PLACEHOLDER_IMAGE;
}
