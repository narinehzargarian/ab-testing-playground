/**
 * DebugPanel — a floating panel that shows live analytics events.
 *
 * This is the equivalent of Adobe Experience Platform Debugger or
 * the browser Network tab — it lets you verify that the right events
 * are firing when users interact with experiments.
 *
 * On the Collacro team, debugging tracking issues ("why are we seeing
 * 0 exposures for variant B?") is a real part of the job.
 */

import { useState } from 'react';
import { ActionButton, Flex, View, Text, Heading, Button } from '@adobe/react-spectrum';
import Bug from '@spectrum-icons/workflow/Bug';
import Delete from '@spectrum-icons/workflow/Delete';
import { useExperimentContext } from '../experimentation/ExperimentContext';

const EVENT_COLORS = {
  page_view: '#4a9eda',
  exposure: '#e68a00',
  click: '#2ea44f',
  conversion: '#d73a49'
};

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { events, trackingService } = useExperimentContext();

  const recentEvents = events.slice(-50).reverse();

  return (
    <div className="debug-panel-container">
      <ActionButton
        onPress={() => setIsOpen(!isOpen)}
        UNSAFE_className="debug-toggle"
      >
        <Bug />
        <Text>Debug ({events.length})</Text>
      </ActionButton>

      {isOpen && (
        <View UNSAFE_className="debug-panel" padding="size-200">
          <Flex justifyContent="space-between" alignItems="center" marginBottom="size-200">
            <Heading level={4} margin={0}>Event Log</Heading>
            <Button variant="negative" style="outline" onPress={() => trackingService.clearEvents()}>
              <Delete />
              <Text>Clear</Text>
            </Button>
          </Flex>

          <Flex gap="size-100" marginBottom="size-200" wrap>
            {Object.entries(EVENT_COLORS).map(([type, color]) => {
              const count = events.filter(e => e.eventType === type).length;
              return (
                <View key={type} UNSAFE_className="event-count-badge" UNSAFE_style={{ borderColor: color }}>
                  <Text UNSAFE_style={{ color, fontSize: '11px' }}>{type}: {count}</Text>
                </View>
              );
            })}
          </Flex>

          <div className="debug-event-list">
            {recentEvents.length === 0 && (
              <Text UNSAFE_className="debug-empty">No events yet. Interact with the page to see events.</Text>
            )}
            {recentEvents.map(event => (
              <View key={event.id} UNSAFE_className="debug-event-row" padding="size-100" marginBottom="size-50">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text UNSAFE_style={{ color: EVENT_COLORS[event.eventType] || '#888', fontWeight: 'bold', fontSize: '12px' }}>
                    {event.eventType.toUpperCase()}
                  </Text>
                  <Text UNSAFE_style={{ fontSize: '10px', color: '#888' }}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Text>
                </Flex>
                <Text UNSAFE_style={{ fontSize: '11px', color: '#555' }}>
                  {event.experimentId && `${event.experimentId} → ${event.variantId}`}
                  {event.page && `page: ${event.page}`}
                  {event.userId && ` (${event.userId})`}
                </Text>
              </View>
            ))}
          </div>
        </View>
      )}
    </div>
  );
}
