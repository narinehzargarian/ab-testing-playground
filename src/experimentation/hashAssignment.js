/**
 * Hash-Based Variant Assignment
 *
 * This is how A/B testing platforms assign users to variants deterministically.
 * Instead of using Math.random() (which would give a different result each time),
 * we hash the userId + experimentId to get a stable bucket number.
 *
 * Why hashing?
 * - DETERMINISTIC: same user always gets the same variant (sticky assignment)
 * - NO STATE NEEDED: we don't need to store which user got which variant
 * - UNBIASED: a good hash distributes users evenly across buckets
 *
 * How it works:
 * 1. Combine userId + experimentId into a string
 * 2. Run it through a hash function (djb2) to get a number
 * 3. Mod by 100 to get a bucket (0-99)
 * 4. Walk the variants' weights to find which range the bucket falls in
 *
 * Example with 50/50 split:
 *   hash("user_001exp_hero_cta") % 100 = 37  → bucket 37 → control (0-49)
 *   hash("user_002exp_hero_cta") % 100 = 72  → bucket 72 → variant (50-99)
 *
 * In production, Adobe Target uses more robust hashing (MurmurHash),
 * but djb2 is fine for demonstration purposes.
 */

function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function assignVariant(userId, experimentId, variants) {
  const bucket = djb2Hash(userId + experimentId) % 100;

  // Walk through variants, accumulating weights to find which range
  // the bucket falls into.
  // Example: variants with weights [34, 33, 33]
  //   control:   buckets 0-33
  //   variant_b: buckets 34-66
  //   variant_c: buckets 67-99
  let cumulative = 0;
  for (const variant of variants) {
    cumulative += variant.weight;
    if (bucket < cumulative) {
      return variant;
    }
  }

  // Fallback to last variant (handles rounding edge cases)
  return variants[variants.length - 1];
}
