/**
 * PricingHorizontal — Variant C of the pricing layout experiment.
 * Each plan is a horizontal strip — compact and scannable.
 */

import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';

const plans = [
  { name: 'Free', price: '$0/mo', highlight: 'View & convert 2 PDFs/day', cta: 'Get Started' },
  { name: 'Pro', price: '$19.99/mo', highlight: 'Unlimited edits, conversions & e-signatures', cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: '$34.99/user/mo', highlight: 'Everything + admin, SSO & priority support', cta: 'Contact Sales' }
];

export default function PricingHorizontal({ onSelectPlan }) {
  return (
    <Flex direction="column" gap="size-200" UNSAFE_className="pricing-horizontal">
      {plans.map(plan => (
        <View
          key={plan.name}
          UNSAFE_className={`pricing-hstrip ${plan.popular ? 'pricing-hstrip-popular' : ''}`}
          padding="size-300"
        >
          <Flex alignItems="center" justifyContent="space-between" gap="size-400" wrap>
            <Flex alignItems="center" gap="size-300" flex>
              <View>
                <Flex alignItems="center" gap="size-100">
                  <Heading level={3} margin={0}>{plan.name}</Heading>
                  {plan.popular && <Text UNSAFE_className="popular-badge-small">Popular</Text>}
                </Flex>
                <Text UNSAFE_className="hstrip-highlight">{plan.highlight}</Text>
              </View>
            </Flex>
            <Flex alignItems="center" gap="size-300">
              <Text UNSAFE_className="hstrip-price">{plan.price}</Text>
              <Button
                variant={plan.popular ? 'accent' : 'primary'}
                style="fill"
                onPress={() => onSelectPlan?.(plan.name)}
              >
                {plan.cta}
              </Button>
            </Flex>
          </Flex>
        </View>
      ))}
    </Flex>
  );
}
