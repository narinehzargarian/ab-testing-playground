/**
 * OnboardingPage — runs two experiments in sequence.
 *
 * Experiment 1 (exp_onboarding_flow):
 *   Determines whether the user sees a multi-step wizard or single-page onboarding.
 *
 * Experiment 2 (exp_onboarding_tutorial):
 *   After onboarding completes, determines whether the user sees a guided
 *   tooltip tutorial or goes straight to a "ready" screen.
 *
 * This demonstrates a real pattern: chaining experiments where the second
 * experiment depends on completing the first. In production, you'd see this
 * for flows like: signup → onboarding → first-use experience.
 */

import { useState, useEffect } from 'react';
import { Heading, Text, View, Flex, Button } from '@adobe/react-spectrum';
import { useNavigate } from 'react-router-dom';
import { useExperiment } from '../experimentation/useExperiment';
import { useTracking } from '../experimentation/useTracking';
import OnboardingMultiStep from '../components/OnboardingMultiStep';
import OnboardingSinglePage from '../components/OnboardingSinglePage';
import TutorialOverlay from '../components/TutorialOverlay';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { trackPageView } = useTracking();
  const { variant: flowVariant, trackConversion: trackFlowConversion } = useExperiment('exp_onboarding_flow');
  const { variant: tutorialVariant, trackConversion: trackTutorialConversion, trackClick: trackTutorialClick } = useExperiment('exp_onboarding_tutorial');

  const [phase, setPhase] = useState('onboarding'); // 'onboarding' | 'tutorial' | 'done'

  useEffect(() => {
    trackPageView('onboarding');
  }, []);

  const handleOnboardingComplete = () => {
    trackFlowConversion({ action: 'onboarding_complete' });

    // Check tutorial experiment — should we show the tutorial?
    if (tutorialVariant?.props?.showTutorial) {
      setPhase('tutorial');
    } else {
      setPhase('done');
    }
  };

  const handleTutorialComplete = () => {
    trackTutorialConversion({ action: 'tutorial_complete' });
    setPhase('done');
  };

  const handleTutorialSkip = () => {
    trackTutorialClick({ action: 'tutorial_skip' });
    setPhase('done');
  };

  const flow = flowVariant?.props?.flow || 'multi-step';

  return (
    <View UNSAFE_className="onboarding-page" padding="size-500">
      {/* Onboarding phase */}
      {phase === 'onboarding' && (
        <Flex direction="column" alignItems="center" gap="size-300">
          {flowVariant && (
            <View UNSAFE_className="variant-badge" UNSAFE_style={{ background: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.2)' }}>
              <Text UNSAFE_className="variant-badge-text" UNSAFE_style={{ color: '#888' }}>
                Experiment: exp_onboarding_flow | Variant: {flow}
              </Text>
            </View>
          )}

          {flow === 'multi-step'
            ? <OnboardingMultiStep onComplete={handleOnboardingComplete} />
            : <OnboardingSinglePage onComplete={handleOnboardingComplete} />
          }
        </Flex>
      )}

      {/* Tutorial phase */}
      {phase === 'tutorial' && (
        <TutorialOverlay
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}

      {/* Done phase */}
      {phase === 'done' && (
        <Flex direction="column" alignItems="center" gap="size-300" UNSAFE_className="onboarding-done">
          <Text UNSAFE_className="onboarding-check">🎉</Text>
          <Heading level={2} margin={0}>You're Ready!</Heading>
          <Text UNSAFE_style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
            Your experience is set up. Start working with your PDFs.
          </Text>
          <Flex gap="size-200">
            <Button variant="accent" style="fill" onPress={() => navigate('/')}>
              Go to Home
            </Button>
            <Button variant="secondary" onPress={() => navigate('/pricing')}>
              View Plans
            </Button>
          </Flex>

          {tutorialVariant && (
            <View UNSAFE_className="variant-badge" UNSAFE_style={{ background: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.2)' }}>
              <Text UNSAFE_className="variant-badge-text" UNSAFE_style={{ color: '#888' }}>
                Experiment: exp_onboarding_tutorial | Tutorial: {tutorialVariant.props.showTutorial ? 'shown' : 'skipped'}
              </Text>
            </View>
          )}
        </Flex>
      )}
    </View>
  );
}
