/**
 * HeroCTA — the hero section with an A/B tested call-to-action button.
 *
 * This component calls useExperiment('exp_hero_cta') to get the variant,
 * which determines the CTA button text. The rest of the hero stays the same.
 *
 * This is the most common A/B test pattern: changing a small element
 * (button text, color, position) while keeping everything else constant.
 * This isolation is important — if you change too many things at once,
 * you can't tell which change caused the difference in results.
 */

import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';
import { useExperiment } from '../experimentation/useExperiment';

export default function HeroCTA() {
  const { variant, trackClick } = useExperiment('exp_hero_cta');

  const ctaText = variant?.props?.ctaText || 'Try Free';

  return (
    <View UNSAFE_className="hero-section">
      <Flex direction="column" alignItems="center" gap="size-300" UNSAFE_className="hero-content">
        <Heading level={1} UNSAFE_className="hero-heading">
          The Complete PDF Solution
        </Heading>
        <Text UNSAFE_className="hero-subheading">
          Convert, edit, sign, and share PDFs from anywhere.
        </Text>
        <Button
          variant="accent"
          style="fill"
          UNSAFE_className="hero-cta"
          onPress={() => trackClick({ element: 'hero-cta' })}
        >
          {ctaText}
        </Button>

        {/* Variant badge — for educational purposes only. In production you'd never show this. */}
        {variant && (
          <View UNSAFE_className="variant-badge">
            <Text UNSAFE_className="variant-badge-text">
              Experiment: exp_hero_cta | Variant: {variant.id} | CTA: "{variant.props.ctaText}"
            </Text>
          </View>
        )}
      </Flex>
    </View>
  );
}
