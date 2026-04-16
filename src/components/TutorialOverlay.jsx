/**
 * TutorialOverlay — a guided tooltip tour after onboarding.
 *
 * This is experiment exp_onboarding_tutorial's "with tutorial" variant.
 * Shows 3 tooltip steps highlighting key features:
 * 1. Upload your PDF
 * 2. Convert to any format
 * 3. Edit directly in browser
 *
 * Users can click Next to advance or Skip to dismiss.
 * Tracks tutorial_complete or tutorial_skip events.
 *
 * In production, this would use a library like React Joyride
 * or a custom tooltip system. Here we simulate it with positioned cards.
 */

import { useState } from 'react';
import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';

const tutorialSteps = [
  {
    title: 'Upload Your PDF',
    description: 'Drag and drop any PDF file here, or click to browse. We support files up to 100MB.',
    icon: '📤',
  },
  {
    title: 'Convert to Any Format',
    description: 'Turn your PDF into Word, Excel, PowerPoint, or images. Or convert other files to PDF.',
    icon: '🔄',
  },
  {
    title: 'Edit Directly in Browser',
    description: 'Add text, images, and annotations. Rearrange pages. No software download needed.',
    icon: '✏️',
  },
];

export default function TutorialOverlay({ onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = tutorialSteps[currentStep];
  const isLast = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View UNSAFE_className="tutorial-overlay">
      <View UNSAFE_className="tutorial-backdrop" />
      <View UNSAFE_className="tutorial-card">
        {/* Step indicator dots */}
        <Flex gap="size-100" justifyContent="center" marginBottom="size-300">
          {tutorialSteps.map((_, i) => (
            <View
              key={i}
              UNSAFE_className={`tutorial-dot ${i === currentStep ? 'tutorial-dot-active' : ''}`}
            />
          ))}
        </Flex>

        <Text UNSAFE_className="tutorial-icon">{step.icon}</Text>
        <Heading level={3} margin={0} marginTop="size-200">{step.title}</Heading>
        <Text UNSAFE_style={{ color: '#666', marginTop: '8px', textAlign: 'center', display: 'block' }}>
          {step.description}
        </Text>

        <Text UNSAFE_style={{ fontSize: '12px', color: '#999', marginTop: '16px', display: 'block' }}>
          Step {currentStep + 1} of {tutorialSteps.length}
        </Text>

        <Flex gap="size-200" justifyContent="center" marginTop="size-300">
          {!isLast && <Button variant="secondary" onPress={onSkip}>
            Skip Tour
          </Button>}
          <Button variant="accent" style="fill" onPress={handleNext}>
            {isLast ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      </View>
    </View>
  );
}
