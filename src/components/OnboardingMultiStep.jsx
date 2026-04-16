/**
 * OnboardingMultiStep — Control variant of the onboarding flow experiment.
 *
 * A 3-step wizard that guides users through setup:
 * 1. Welcome — why are you here? (Work / School / Personal)
 * 2. Pick your tools — which PDF tools do you need?
 * 3. All set — completion with CTA
 *
 * Hypothesis: a guided multi-step flow reduces overwhelm and increases
 * completion rates compared to showing everything at once.
 *
 * Counter-hypothesis: more steps = more drop-off points.
 * That's exactly what this experiment tests.
 */

import { useState } from 'react';
import { Button, Flex, Heading, Text, View, RadioGroup, Radio, CheckboxGroup, Checkbox, ProgressBar } from '@adobe/react-spectrum';

const steps = ['Welcome', 'Pick Tools', 'All Set'];

export default function OnboardingMultiStep({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [purpose, setPurpose] = useState(null);
  const [selectedTools, setSelectedTools] = useState([]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <View UNSAFE_className="onboarding-card">
      {/* Progress bar */}
      <View marginBottom="size-400">
        <Flex justifyContent="space-between" marginBottom="size-100">
          {steps.map((step, i) => (
            <Text
              key={step}
              UNSAFE_style={{
                fontSize: '12px',
                color: i <= currentStep ? '#c62828' : '#999',
                fontWeight: i === currentStep ? 'bold' : 'normal'
              }}
            >
              {step}
            </Text>
          ))}
        </Flex>
        <ProgressBar value={progress} aria-label="Onboarding progress" width="100%" />
      </View>

      {/* Step 1: Welcome */}
      {currentStep === 0 && (
        <Flex direction="column" gap="size-300">
          <Heading level={2} margin={0}>Welcome!</Heading>
          <Text UNSAFE_style={{ color: '#666' }}>What brings you here today?</Text>
          <RadioGroup
            value={purpose}
            onChange={setPurpose}
            aria-label="Purpose"
          >
            <Radio value="work">Work — documents, contracts, reports</Radio>
            <Radio value="school">School — assignments, research, notes</Radio>
            <Radio value="personal">Personal — forms, taxes, organizing files</Radio>
          </RadioGroup>
          <Flex justifyContent="flex-end">
            <Button
              variant="accent"
              style="fill"
              onPress={() => setCurrentStep(1)}
              isDisabled={!purpose}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}

      {/* Step 2: Pick tools */}
      {currentStep === 1 && (
        <Flex direction="column" gap="size-300">
          <Heading level={2} margin={0}>Pick Your Tools</Heading>
          <Text UNSAFE_style={{ color: '#666' }}>Select the tools you'll use most. You can always change this later.</Text>
          <CheckboxGroup
            value={selectedTools}
            onChange={setSelectedTools}
            aria-label="Tools"
          >
            <Checkbox value="convert">Convert PDF — turn files to and from PDF</Checkbox>
            <Checkbox value="edit">Edit PDF — modify text and images</Checkbox>
            <Checkbox value="sign">Sign — request and add e-signatures</Checkbox>
            <Checkbox value="compress">Compress — reduce file size</Checkbox>
          </CheckboxGroup>
          <Flex justifyContent="space-between">
            <Button variant="secondary" onPress={() => setCurrentStep(0)}>Back</Button>
            <Button
              variant="accent"
              style="fill"
              onPress={() => setCurrentStep(2)}
              isDisabled={selectedTools.length === 0}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}

      {/* Step 3: All set */}
      {currentStep === 2 && (
        <Flex direction="column" gap="size-300" alignItems="center" UNSAFE_className="onboarding-complete">
          <Text UNSAFE_className="onboarding-check">✓</Text>
          <Heading level={2} margin={0}>You're All Set!</Heading>
          <Text UNSAFE_style={{ color: '#666', textAlign: 'center' }}>
            We've personalized your experience based on your preferences.
            {purpose === 'work' && ' Your workspace is ready for business documents.'}
            {purpose === 'school' && ' Your tools are set up for academic work.'}
            {purpose === 'personal' && ' Your tools are ready for personal use.'}
          </Text>
          <Text UNSAFE_style={{ fontSize: '13px', color: '#999' }}>
            Selected tools: {selectedTools.join(', ')}
          </Text>
          <Button
            variant="accent"
            style="fill"
            onPress={onComplete}
            UNSAFE_className="onboarding-cta"
          >
            Get Started
          </Button>
        </Flex>
      )}
    </View>
  );
}
