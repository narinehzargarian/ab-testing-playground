/**
 * Mock Users — simulates user profiles that Adobe Target would identify.
 *
 * In production, the experimentation SDK identifies users automatically
 * (via cookies, login, or anonymous IDs). Here we define users manually
 * so you can switch between them and see how different users get
 * different experiment assignments and personalized experiences.
 *
 * Each user has a "segment" — this is used by personalization experiments
 * to show tailored content (e.g., students see student pricing).
 */

export const mockUsers = [
  { id: 'user_001', name: 'Alex Chen', segment: 'student', isNewVisitor: true },
  { id: 'user_002', name: 'Maria Garcia', segment: 'business', isNewVisitor: false },
  { id: 'user_003', name: 'James Wilson', segment: 'casual', isNewVisitor: true },
  { id: 'user_004', name: 'Priya Patel', segment: 'student', isNewVisitor: false },
  { id: 'user_005', name: 'Tom Baker', segment: 'business', isNewVisitor: true },
  { id: 'user_006', name: 'Sofia Rossi', segment: 'casual', isNewVisitor: false },
  { id: 'user_007', name: 'Kenji Tanaka', segment: 'business', isNewVisitor: false },
  { id: 'user_008', name: 'Emma Davis', segment: 'student', isNewVisitor: true },
];

export const DEFAULT_USER = mockUsers[0];
