/**
 * OnboardingSinglePage — Variant of the onboarding flow experiment.
 *
 * Everything on one page with a single CTA. No steps, no friction.
 *
 * Hypothesis: removing steps reduces drop-off and gets users to
 * the product faster, increasing completion rates.
 *
 * Counter-hypothesis: without guided choices, users feel overwhelmed
 * and don't know where to start.
 */

import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';

const tools = [
  { name: 'Convert PDF', description: 'Turn Word, Excel, and PowerPoint into PDFs and back', icon: '📄' },
  { name: 'Edit PDF', description: 'Modify text, images, and pages directly', icon: '✏️' },
  { name: 'Sign Documents', description: 'Add and request electronic signatures', icon: '✍️' },
  { name: 'Compress PDF', description: 'Reduce file size while keeping quality', icon: '📦' },
];

export default function OnboardingSinglePage({ onComplete }) {
  return (
    <View UNSAFE_className="onboarding-card">
      <Flex direction="column" gap="size-400" alignItems="center">
        <Heading level={2} margin={0}>Welcome!</Heading>
        <Text UNSAFE_style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
          Everything you need for PDFs — convert, edit, sign, and compress. Jump right in.
        </Text>

        <Flex gap="size-200" wrap justifyContent="center" UNSAFE_className="onboarding-tool-grid">
          {tools.map(tool => (
            <View key={tool.name} UNSAFE_className="onboarding-tool-card" padding="size-200">
              <Text UNSAFE_className="onboarding-tool-icon">{tool.icon}</Text>
              <Text UNSAFE_style={{ fontWeight: 'bold', fontSize: '14px', display: 'block' }}>{tool.name}</Text>
              <Text UNSAFE_style={{ fontSize: '12px', color: '#666', display: 'block' }}>{tool.description}</Text>
            </View>
          ))}
        </Flex>

        <Button
          variant="accent"
          style="fill"
          onPress={onComplete}
          UNSAFE_className="onboarding-cta"
        >
          Get Started Free
        </Button>
      </Flex>
    </View>
  );
}
