/**
 * useExperiment — the main hook that components call to get their variant.
 *
 * This is the equivalent of calling Adobe Target's getOffer() / sendEvent().
 * Components don't need to know about hashing, configs, or tracking —
 * they just call useExperiment('exp_hero_cta') and get back the variant.
 *
 * What this hook does:
 * 1. Finds the experiment config by ID
 * 2. If paused → returns null (component should show control/default)
 * 3. If type="personalization" → picks variant by user segment
 * 4. If type="ab" → assigns variant via deterministic hashing
 * 5. Auto-tracks an "exposure" event on first render
 * 6. Returns convenience functions for tracking clicks and conversions
 *
 * In production with Adobe Target, steps 1-4 happen on Target's servers.
 * The SDK just returns the result. Here we do it client-side.
 */

import { useEffect, useRef } from 'react';
import { useExperimentContext } from './ExperimentContext';
import { assignVariant } from './hashAssignment';

export function useExperiment(experimentId) {
  const { currentUser, experiments, trackingService } = useExperimentContext();
  const exposureTracked = useRef(false);
  const prevKey = useRef('');

  const experiment = experiments.find(e => e.id === experimentId);

  // If experiment not found or paused, return null variant
  if (!experiment || experiment.status !== 'running') {
    return { variant: null, experiment, trackClick: () => {}, trackConversion: () => {} };
  }

  // Resolve variant based on experiment type
  let variant;
  if (experiment.type === 'personalization') {
    // Personalization: pick variant by user's segment
    variant = experiment.variants.find(v => v.segment === currentUser.segment)
      || experiment.variants[0];
  } else {
    // A/B test: assign via deterministic hash
    variant = assignVariant(currentUser.id, experimentId, experiment.variants);
  }

  // Track exposure when the user actually sees the variant.
  // We use a ref to avoid double-tracking, and reset when user or variant changes.
  const currentKey = `${currentUser.id}_${experimentId}_${variant.id}`;
  if (currentKey !== prevKey.current) {
    exposureTracked.current = false;
    prevKey.current = currentKey;
  }

  useEffect(() => {
    if (!exposureTracked.current) {
      trackingService.trackEvent('exposure', {
        userId: currentUser.id,
        experimentId,
        variantId: variant.id,
        experimentName: experiment.name,
        variantName: variant.name
      });
      exposureTracked.current = true;
    }
  }, [currentKey]);

  // Convenience functions for tracking user actions
  const trackClick = (extra = {}) => {
    trackingService.trackEvent('click', {
      userId: currentUser.id,
      experimentId,
      variantId: variant.id,
      ...extra
    });
  };

  const trackConversion = (extra = {}) => {
    trackingService.trackEvent('conversion', {
      userId: currentUser.id,
      experimentId,
      variantId: variant.id,
      ...extra
    });
  };

  return { variant, experiment, trackClick, trackConversion };
}
