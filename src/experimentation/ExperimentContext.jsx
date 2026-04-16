/**
 * Experiment Context — the global provider for the experimentation system.
 *
 * This wraps the entire app and provides:
 * - currentUser: who is browsing (switchable for demo purposes)
 * - experiments: all experiment configs with live status
 * - events: tracked analytics events
 * - toggleExperiment: pause/resume an experiment from the dashboard
 * - trackingService reference
 *
 * In production, this is analogous to initializing the Adobe Target SDK
 * at app startup — it fetches experiment configs and makes them available
 * to any component that calls useExperiment().
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { experiments as experimentConfigs } from './experimentConfig';
import { trackingService } from './trackingService';
import { DEFAULT_USER } from '../data/mockUsers';

const ExperimentContext = createContext(null);

export function ExperimentProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [experiments, setExperiments] = useState(experimentConfigs);
  const [events, setEvents] = useState(trackingService.getEvents());

  // Subscribe to tracking events so the UI updates in real time
  useEffect(() => {
    return trackingService.subscribe(setEvents);
  }, []);

  const toggleExperiment = useCallback((experimentId) => {
    setExperiments(prev => prev.map(exp =>
      exp.id === experimentId
        ? { ...exp, status: exp.status === 'running' ? 'paused' : 'running' }
        : exp
    ));
  }, []);

  return (
    <ExperimentContext.Provider value={{
      currentUser,
      setCurrentUser,
      experiments,
      toggleExperiment,
      events,
      trackingService
    }}>
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperimentContext() {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperimentContext must be used within ExperimentProvider');
  }
  return context;
}
