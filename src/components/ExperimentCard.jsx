/**
 * ExperimentCard — dashboard card showing an experiment's status and results.
 *
 * Displays:
 * - Experiment name, type, status
 * - Per-variant: exposures, conversions, conversion rate
 * - Statistical significance between variants and control
 * - Toggle to pause/resume the experiment
 */

import { Flex, Heading, Text, View, Switch, Divider } from '@adobe/react-spectrum';
import { useExperimentContext } from '../experimentation/ExperimentContext';
import StatisticalSignificance from './StatisticalSignificance';

function getVariantStats(events, experimentId, variantId) {
  const experimentEvents = events.filter(e => e.experimentId === experimentId && e.variantId === variantId);
  return {
    exposures: experimentEvents.filter(e => e.eventType === 'exposure').length,
    clicks: experimentEvents.filter(e => e.eventType === 'click').length,
    conversions: experimentEvents.filter(e => e.eventType === 'conversion').length,
  };
}

export default function ExperimentCard({ experiment }) {
  const { events, toggleExperiment } = useExperimentContext();
  const isRunning = experiment.status === 'running';

  const variantStats = experiment.variants.map(v => ({
    ...v,
    stats: getVariantStats(events, experiment.id, v.id)
  }));

  const controlVariant = variantStats.find(v => v.id === 'control') || variantStats[0];

  return (
    <View UNSAFE_className="experiment-card" padding="size-400">
      <Flex justifyContent="space-between" alignItems="start" wrap>
        <View>
          <Flex alignItems="center" gap="size-200">
            <Heading level={3} margin={0}>{experiment.name}</Heading>
            <View UNSAFE_className={`type-badge type-${experiment.type}`}>
              <Text UNSAFE_className="type-badge-text">{experiment.type.toUpperCase()}</Text>
            </View>
          </Flex>
          <Text UNSAFE_style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>
            {experiment.description}
          </Text>
        </View>
        <Switch isSelected={isRunning} onChange={() => toggleExperiment(experiment.id)}>
          {isRunning ? 'Running' : 'Paused'}
        </Switch>
      </Flex>

      <Divider marginTop="size-300" marginBottom="size-300" />

      {/* Per-variant stats */}
      <View UNSAFE_className="variant-stats-grid">
        <Flex UNSAFE_className="variant-stats-header" gap="size-100">
          <Text UNSAFE_className="stat-col-name">Variant</Text>
          <Text UNSAFE_className="stat-col">Exposures</Text>
          <Text UNSAFE_className="stat-col">Clicks</Text>
          <Text UNSAFE_className="stat-col">Conversions</Text>
          <Text UNSAFE_className="stat-col">Conv. Rate</Text>
        </Flex>
        {variantStats.map(v => {
          const rate = v.stats.exposures > 0
            ? ((v.stats.conversions / v.stats.exposures) * 100).toFixed(1)
            : '0.0';
          return (
            <Flex key={v.id} UNSAFE_className="variant-stats-row" gap="size-100">
              <Text UNSAFE_className="stat-col-name">{v.name}</Text>
              <Text UNSAFE_className="stat-col">{v.stats.exposures}</Text>
              <Text UNSAFE_className="stat-col">{v.stats.clicks}</Text>
              <Text UNSAFE_className="stat-col">{v.stats.conversions}</Text>
              <Text UNSAFE_className="stat-col">{rate}%</Text>
            </Flex>
          );
        })}
      </View>

      {/* Statistical significance — compare each non-control variant to control */}
      {experiment.type === 'ab' && controlVariant && (
        <View marginTop="size-300">
          <Text UNSAFE_style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
            Significance
          </Text>
          {variantStats
            .filter(v => v.id !== controlVariant.id)
            .map(v => (
              <StatisticalSignificance
                key={v.id}
                variantName={v.name}
                controlStats={controlVariant.stats}
                variantStats={v.stats}
              />
            ))}
        </View>
      )}
    </View>
  );
}
