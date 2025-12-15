/**
 * Format price with currency symbol
 * @param {number} price
 * @param {string} currency
 * @returns string
 */
export function formatPrice(price, currency = "$") {
  if (price == null) return "-";
  return `${currency}${price.toLocaleString()}`;
}

/**
 * Generate URL-friendly slug from string
 * @param {string} text
 * @returns string
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // Replace spaces with -
    .replace(/[^\w\-]+/g, "")   // Remove all non-word chars
    .replace(/\-\-+/g, "-");    // Replace multiple - with single -
}

/**
 * Calculate distance (in km) between two coordinates
 * @param {number[]} coord1 [lat, lng]
 * @param {number[]} coord2 [lat, lng]
 */
export function getDistanceKm(coord1, coord2) {
  const toRad = deg => (deg * Math.PI) / 180;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371; // Earth radius km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Capitalize first letter of each word
 * @param {string} text
 * @returns string
 */
export function capitalizeWords(text) {
  return text.replace(/\b\w/g, char => char.toUpperCase());
}
