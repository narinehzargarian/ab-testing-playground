/**
 * LandingPage — the main "Acrobat Web" landing page.
 *
 * This page runs two experiments:
 * 1. exp_hero_cta (A/B test on CTA button text)
 * 2. exp_personalization (segment-based hero messaging)
 *
 * If the personalization experiment is running, we show PersonalizedHero.
 * Otherwise, we fall back to HeroCTA (the A/B test).
 * This demonstrates how personalization takes priority over generic A/B tests.
 */

import { useEffect } from 'react';
import { View } from '@adobe/react-spectrum';
import HeroCTA from '../components/HeroCTA';
import PersonalizedHero from '../components/PersonalizedHero';
import FeaturesSection from '../components/FeaturesSection';
import { useExperimentContext } from '../experimentation/ExperimentContext';
import { useTracking } from '../experimentation/useTracking';

export default function LandingPage() {
  const { experiments } = useExperimentContext();
  const { trackPageView } = useTracking();

  useEffect(() => {
    trackPageView('landing');
  }, []);

  const personalizationRunning = experiments.find(
    e => e.id === 'exp_personalization' && e.status === 'running'
  );

  return (
    <View UNSAFE_className="landing-page">
      {personalizationRunning ? <PersonalizedHero /> : <HeroCTA />}
      <FeaturesSection />
    </View>
  );
}
