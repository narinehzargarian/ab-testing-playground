/**
 * useTracking — generic event tracking hook for non-experiment events.
 *
 * Use this for page views and arbitrary interactions that aren't tied
 * to a specific experiment. For experiment-specific tracking (exposure,
 * click, conversion), use the functions returned by useExperiment().
 */

import { useExperimentContext } from './ExperimentContext';

export function useTracking() {
  const { currentUser, trackingService } = useExperimentContext();

  const trackPageView = (pageName) => {
    trackingService.trackEvent('page_view', {
      userId: currentUser.id,
      page: pageName
    });
  };

  const trackEvent = (eventType, payload = {}) => {
    trackingService.trackEvent(eventType, {
      userId: currentUser.id,
      ...payload
    });
  };

  return { trackPageView, trackEvent };
}
