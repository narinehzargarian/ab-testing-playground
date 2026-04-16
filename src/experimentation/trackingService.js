/**
 * Event Tracking Service
 *
 * This simulates what Adobe Analytics does in production — collecting
 * user interaction events for experiment analysis.
 *
 * Event types:
 * - "page_view"  — user visited a page
 * - "exposure"   — user actually SAW a variant (not just assigned to it)
 * - "click"      — user clicked an interactive element
 * - "conversion" — user completed the goal action (e.g., selected a plan)
 *
 * Why exposure matters:
 * A user might be assigned to variant B but never visit the page where
 * that variant is shown. If you count them in your analysis, you dilute
 * the results. Only analyze users who were actually EXPOSED.
 *
 * Events are stored in memory and persisted to localStorage so they
 * survive page refreshes. A pub/sub system notifies the DebugPanel
 * in real time when new events arrive.
 */

const STORAGE_KEY = 'ab_events';

let events = [];
let subscribers = [];

// Load persisted events on startup
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    events = JSON.parse(stored);
  }
} catch {
  events = [];
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // localStorage might be full or unavailable
  }
}

function notifySubscribers() {
  subscribers.forEach(cb => cb([...events]));
}

let nextId = events.length;

export const trackingService = {
  trackEvent(eventType, payload = {}) {
    const event = {
      id: ++nextId,
      timestamp: Date.now(),
      eventType,
      ...payload
    };
    events.push(event);
    persist();
    notifySubscribers();
    return event;
  },

  getEvents() {
    return [...events]; 
  },

  getEventsByExperiment(experimentId) {
    return events.filter(e => e.experimentId === experimentId);
  },

  clearEvents() {
    events = [];
    nextId = 0;
    persist();
    notifySubscribers();
  },

  subscribe(callback) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(cb => cb !== callback);
    };
  }
};
