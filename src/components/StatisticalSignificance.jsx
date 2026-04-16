/**
 * StatisticalSignificance — simulates significance calculation.
 *
 * In real A/B testing, you run a statistical test (z-test, chi-squared)
 * to determine if the difference between variants is real or just noise.
 *
 * Key concepts:
 * - p-value: probability the difference is due to chance (want < 0.05)
 * - Confidence: 1 - p-value (want > 95%)
 * - Sample size matters: more data = more reliable results
 * - You need BOTH variants to have enough exposures
 *
 * This is a simplified simulation — real statistical tests are more rigorous.
 */

import { Flex, Text, View } from '@adobe/react-spectrum';

function calculateSignificance(controlExposures, controlConversions, variantExposures, variantConversions) {
  if (controlExposures < 5 || variantExposures < 5) {
    return { confidence: 0, status: 'needs_data', lift: 0 };
  }

  const controlRate = controlConversions / controlExposures;
  const variantRate = variantConversions / variantExposures;
  const lift = controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0;

  // Simplified z-test for two proportions
  const pooledRate = (controlConversions + variantConversions) / (controlExposures + variantExposures);
  const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlExposures + 1 / variantExposures));

  if (se === 0) return { confidence: 0, status: 'needs_data', lift };

  const z = Math.abs(variantRate - controlRate) / se;

  // Approximate confidence from z-score
  let confidence;
  if (z >= 2.58) confidence = 99;
  else if (z >= 1.96) confidence = 95;
  else if (z >= 1.645) confidence = 90;
  else if (z >= 1.28) confidence = 80;
  else confidence = Math.min(79, Math.round(z * 40));

  const status = confidence >= 95 ? 'significant' : confidence >= 80 ? 'trending' : 'not_significant';

  return { confidence, status, lift };
}

export default function StatisticalSignificance({ controlStats, variantStats, variantName }) {
  const { confidence, status, lift } = calculateSignificance(
    controlStats.exposures,
    controlStats.conversions,
    variantStats.exposures,
    variantStats.conversions
  );

  const statusConfig = {
    significant: { color: '#2ea44f', label: 'Significant', bg: '#e6f4ea' },
    trending: { color: '#e68a00', label: 'Trending', bg: '#fff8e6' },
    not_significant: { color: '#888', label: 'Not Significant', bg: '#f0f0f0' },
    needs_data: { color: '#888', label: 'Needs More Data', bg: '#f0f0f0' }
  };

  const config = statusConfig[status];

  return (
    <View UNSAFE_className="significance-row" padding="size-100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text UNSAFE_style={{ fontSize: '13px' }}>{variantName} vs Control</Text>
        <Flex gap="size-200" alignItems="center">
          {lift !== 0 && (
            <Text UNSAFE_style={{ fontSize: '12px', color: lift > 0 ? '#2ea44f' : '#d73a49' }}>
              {lift > 0 ? '+' : ''}{lift.toFixed(1)}% lift
            </Text>
          )}
          <View UNSAFE_style={{ background: config.bg, padding: '2px 8px', borderRadius: '4px' }}>
            <Text UNSAFE_style={{ color: config.color, fontSize: '12px', fontWeight: 'bold' }}>
              {confidence}% — {config.label}
            </Text>
          </View>
        </Flex>
      </Flex>
    </View>
  );
}
