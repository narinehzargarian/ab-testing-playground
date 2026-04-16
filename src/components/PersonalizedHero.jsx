/**
 * PersonalizedHero — hero section with content tailored to user segment.
 *
 * Unlike HeroCTA (which is a random A/B test), this uses PERSONALIZATION:
 * the variant is determined by who the user IS, not by random assignment.
 *
 * - Students see messaging about affordable pricing
 * - Business users see messaging about enterprise features
 * - Casual users see messaging about simplicity
 *
 * In Adobe Target, this would be an "Experience Targeting" (XT) activity
 * rather than an A/B test activity.
 */

import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';
import { useExperiment } from '../experimentation/useExperiment';
import { useExperimentContext } from '../experimentation/ExperimentContext';

export default function PersonalizedHero() {
  const { variant, trackClick } = useExperiment('exp_personalization');
  const { currentUser } = useExperimentContext();

  if (!variant) {
    return (
      <View UNSAFE_className="hero-section">
        <Flex direction="column" alignItems="center" gap="size-300" UNSAFE_className="hero-content">
          <Heading level={1} UNSAFE_className="hero-heading">PDF Tools</Heading>
          <Text UNSAFE_className="hero-subheading">The complete PDF solution.</Text>
          <Button variant="accent" style="fill" UNSAFE_className="hero-cta">Try Free</Button>
        </Flex>
      </View>
    );
  }

  return (
    <View UNSAFE_className="hero-section">
      <Flex direction="column" alignItems="center" gap="size-300" UNSAFE_className="hero-content">
        <Heading level={1} UNSAFE_className="hero-heading">
          {variant.props.headline}
        </Heading>
        <Text UNSAFE_className="hero-subheading">
          {variant.props.subheadline}
        </Text>
        <Button
          variant="accent"
          style="fill"
          UNSAFE_className="hero-cta"
          onPress={() => trackClick({ element: 'personalized-hero-cta' })}
        >
          {variant.props.ctaText}
        </Button>

        <View UNSAFE_className="variant-badge">
          <Text UNSAFE_className="variant-badge-text">
            Personalization: {currentUser.segment} segment | User: {currentUser.name}
          </Text>
        </View>
      </Flex>
    </View>
  );
}
