/**
 * PricingCards — Variant A of the pricing layout experiment.
 * Vertical cards side by side, the most common pricing layout pattern.
 */

import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';

const plans = [
  { name: 'Free', price: '$0', period: '/month', features: ['View PDFs', 'Convert 2 files/day', 'Basic commenting'], cta: 'Get Started' },
  { name: 'Pro', price: '$19.99', period: '/month', features: ['Unlimited conversions', 'Edit PDFs', 'E-signatures', 'Compress files'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: '$34.99', period: '/user/month', features: ['Everything in Pro', 'Admin console', 'SSO integration', 'Priority support'], cta: 'Contact Sales' }
];

export default function PricingCards({ onSelectPlan }) {
  return (
    <Flex gap="size-300" wrap justifyContent="center" UNSAFE_className="pricing-cards">
      {plans.map(plan => (
        <View key={plan.name} UNSAFE_className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`} padding="size-400">
          {plan.popular && <Text UNSAFE_className="popular-badge">Most Popular</Text>}
          <Heading level={3} margin={0}>{plan.name}</Heading>
          <Flex alignItems="baseline" gap="size-50" marginTop="size-200">
            <Text UNSAFE_className="pricing-amount">{plan.price}</Text>
            <Text UNSAFE_className="pricing-period">{plan.period}</Text>
          </Flex>
          <View UNSAFE_className="pricing-features" marginTop="size-300">
            {plan.features.map(f => (
              <Text key={f} UNSAFE_className="pricing-feature">✓ {f}</Text>
            ))}
          </View>
          <Button
            variant={plan.popular ? 'accent' : 'primary'}
            style="fill"
            width="100%"
            marginTop="size-400"
            onPress={() => onSelectPlan?.(plan.name)}
          >
            {plan.cta}
          </Button>
        </View>
      ))}
    </Flex>
  );
}
