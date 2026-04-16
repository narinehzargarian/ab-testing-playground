/**
 * PricingPage — renders different pricing layouts based on the experiment.
 *
 * Experiment exp_pricing_layout determines which layout the user sees:
 * - "cards" → vertical card layout
 * - "table" → comparison table
 * - "horizontal" → horizontal strip layout
 *
 * When a user selects a plan, we fire a conversion event.
 * This is the targetMetric for this experiment.
 */

import { useEffect, useState } from 'react';
import { Heading, Text, View, Flex } from '@adobe/react-spectrum';
import PricingCards from '../components/PricingCards';
import PricingTable from '../components/PricingTable';
import PricingHorizontal from '../components/PricingHorizontal';
import { useExperiment } from '../experimentation/useExperiment';
import { useTracking } from '../experimentation/useTracking';

export default function PricingPage() {
  const { variant, trackConversion } = useExperiment('exp_pricing_layout');
  const { trackPageView } = useTracking();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    trackPageView('pricing');
  }, []);

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    trackConversion({ plan: planName });
  };

  const layout = variant?.props?.layout || 'cards';

  return (
    <View UNSAFE_className="pricing-page" padding="size-500">
      <Flex direction="column" alignItems="center" gap="size-200" marginBottom="size-500">
        <Heading level={1}>Choose Your Plan</Heading>
        <Text UNSAFE_style={{ color: '#666', maxWidth: '500px', textAlign: 'center' }}>
          From free tools to enterprise solutions. Find the plan that fits your needs.
        </Text>

        {variant && (
          <View UNSAFE_className="variant-badge">
            <Text UNSAFE_className="variant-badge-text">
              Experiment: exp_pricing_layout | Layout: {layout}
            </Text>
          </View>
        )}
      </Flex>

      {layout === 'cards' && <PricingCards onSelectPlan={handleSelectPlan} />}
      {layout === 'table' && <PricingTable onSelectPlan={handleSelectPlan} />}
      {layout === 'horizontal' && <PricingHorizontal onSelectPlan={handleSelectPlan} />}

      {selectedPlan && (
        <View UNSAFE_className="plan-selected-toast" padding="size-300" marginTop="size-400">
          <Text UNSAFE_style={{ color: '#2ea44f', fontWeight: 'bold' }}>
            Conversion tracked! User selected: {selectedPlan}
          </Text>
        </View>
      )}
    </View>
  );
}
