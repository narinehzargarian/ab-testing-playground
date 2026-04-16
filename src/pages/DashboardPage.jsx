/**
 * DashboardPage — the analytics view showing experiment results.
 *
 * This simulates what you'd see in Adobe Target's reporting UI:
 * - All experiments with their status
 * - Per-variant metrics (exposures, clicks, conversions, rates)
 * - Statistical significance calculations
 * - Full event log for debugging
 *
 * On the Collacro team, reviewing dashboards like this is a daily activity.
 */

import { useEffect, useState } from 'react';
import { Heading, Text, View, Flex, Divider, Picker, Item, SearchField, Button } from '@adobe/react-spectrum';
import { useExperimentContext } from '../experimentation/ExperimentContext';
import { useTracking } from '../experimentation/useTracking';
import ExperimentCard from '../components/ExperimentCard';
import Delete from '@spectrum-icons/workflow/Delete';

export default function DashboardPage() {
  const { experiments, events, trackingService } = useExperimentContext();
  const { trackPageView } = useTracking();
  const [eventFilter, setEventFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    trackPageView('dashboard');
  }, []);

  // Summary stats
  const totalEvents = events.length;
  const totalExposures = events.filter(e => e.eventType === 'exposure').length;
  const totalConversions = events.filter(e => e.eventType === 'conversion').length;
  const overallRate = totalExposures > 0 ? ((totalConversions / totalExposures) * 100).toFixed(1) : '0.0';

  // Filtered event log
  const filteredEvents = events
    .filter(e => eventFilter === 'all' || e.eventType === eventFilter)
    .filter(e => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.eventType?.toLowerCase().includes(q) ||
        e.experimentId?.toLowerCase().includes(q) ||
        e.variantId?.toLowerCase().includes(q) ||
        e.userId?.toLowerCase().includes(q) ||
        e.page?.toLowerCase().includes(q)
      );
    })
    .reverse()
    .slice(0, 100);

  return (
    <View UNSAFE_className="dashboard-page" padding="size-500">
      <Heading level={1}>Experiment Dashboard</Heading>

      {/* Summary stats */}
      <Flex gap="size-300" wrap marginTop="size-400" marginBottom="size-500">
        <View UNSAFE_className="stat-card" padding="size-300">
          <Text UNSAFE_className="stat-label">Total Events</Text>
          <Text UNSAFE_className="stat-value">{totalEvents}</Text>
        </View>
        <View UNSAFE_className="stat-card" padding="size-300">
          <Text UNSAFE_className="stat-label">Exposures</Text>
          <Text UNSAFE_className="stat-value">{totalExposures}</Text>
        </View>
        <View UNSAFE_className="stat-card" padding="size-300">
          <Text UNSAFE_className="stat-label">Conversions</Text>
          <Text UNSAFE_className="stat-value">{totalConversions}</Text>
        </View>
        <View UNSAFE_className="stat-card" padding="size-300">
          <Text UNSAFE_className="stat-label">Overall Conv. Rate</Text>
          <Text UNSAFE_className="stat-value">{overallRate}%</Text>
        </View>
      </Flex>

      {/* Experiment cards */}
      <Heading level={2}>Active Experiments</Heading>
      <Flex direction="column" gap="size-300" marginTop="size-300">
        {experiments.map(exp => (
          <ExperimentCard key={exp.id} experiment={exp} />
        ))}
      </Flex>

      <Divider marginTop="size-500" marginBottom="size-400" />

      {/* Event log */}
      <Flex justifyContent="space-between" alignItems="end" marginBottom="size-300" wrap gap="size-200">
        <Heading level={2} margin={0}>Event Log</Heading>
        <Flex gap="size-200" alignItems="end" wrap>
          <Picker
            label="Filter by type"
            selectedKey={eventFilter}
            onSelectionChange={setEventFilter}
            width="size-2000"
          >
            <Item key="all">All Events</Item>
            <Item key="page_view">Page Views</Item>
            <Item key="exposure">Exposures</Item>
            <Item key="click">Clicks</Item>
            <Item key="conversion">Conversions</Item>
          </Picker>
          <SearchField
            label="Search events"
            value={searchQuery}
            onChange={setSearchQuery}
            width="size-2400"
          />
          <Button variant="negative" style="outline" onPress={() => trackingService.clearEvents()}>
            <Delete />
            <Text>Clear All</Text>
          </Button>
        </Flex>
      </Flex>

      <View UNSAFE_className="event-log">
        <Flex UNSAFE_className="event-log-header" gap="size-100">
          <Text UNSAFE_className="log-col-time">Time</Text>
          <Text UNSAFE_className="log-col-type">Type</Text>
          <Text UNSAFE_className="log-col">User</Text>
          <Text UNSAFE_className="log-col-wide">Experiment</Text>
          <Text UNSAFE_className="log-col">Variant</Text>
          <Text UNSAFE_className="log-col">Details</Text>
        </Flex>
        {filteredEvents.length === 0 && (
          <View padding="size-300">
            <Text UNSAFE_style={{ color: '#888' }}>
              No events match your filter. Navigate to the Landing or Pricing pages to generate events.
            </Text>
          </View>
        )}
        {filteredEvents.map(event => (
          <Flex key={event.id} UNSAFE_className="event-log-row" gap="size-100">
            <Text UNSAFE_className="log-col-time">{new Date(event.timestamp).toLocaleTimeString()}</Text>
            <Text UNSAFE_className={`log-col-type log-type-${event.eventType}`}>{event.eventType}</Text>
            <Text UNSAFE_className="log-col">{event.userId || '—'}</Text>
            <Text UNSAFE_className="log-col-wide">{event.experimentId || event.page || '—'}</Text>
            <Text UNSAFE_className="log-col">{event.variantId || '—'}</Text>
            <Text UNSAFE_className="log-col">{event.plan || event.element || '—'}</Text>
          </Flex>
        ))}
      </View>
    </View>
  );
}
