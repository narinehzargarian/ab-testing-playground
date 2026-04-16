# A/B Testing Playground

A hands-on project that simulates a real A/B testing and experimentation workflow. Built with React, React Spectrum, and React Router.

## What This Demonstrates

- **Simulated experimentation SDK** with deterministic user-to-variant assignment via hashing
- **5 running experiments** across landing, pricing, and onboarding pages
- **Personalization** based on user segments (student, business, casual)
- **Event tracking** with a live debug panel showing exposures, clicks, and conversions
- **Analytics dashboard** with per-variant stats and statistical significance calculations
- **Experiment lifecycle** — pause/resume experiments from the dashboard

## Experiments

| Experiment | Type | Page | What it tests |
|-----------|------|------|--------------|
| Hero CTA Copy | A/B | Landing | Button text: "Try Free" vs "Start Converting PDFs" vs "Get Started Free" |
| Pricing Layout | A/B | Pricing | Cards vs table vs horizontal layout |
| Hero Personalization | Personalization | Landing | Segment-based messaging for students, business, casual users |
| Onboarding Flow | A/B | Onboarding | Multi-step wizard vs single-page |
| Onboarding Tutorial | A/B | Onboarding | Guided tooltip tour vs no tutorial |

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:3001`.

## How to Use

1. **Switch users** via the sidebar dropdown (desktop) or user icon (mobile) to see different variant assignments
2. **Navigate pages** to trigger exposure and page view events
3. **Click CTAs** and select plans to fire conversion events
4. **Open the Debug panel** (bottom-right) to see events in real time
5. **Visit the Dashboard** to see experiment results, per-variant stats, and significance

## Tech Stack

- React 19
- React Spectrum (Adobe's design system)
- React Router v7
- Vite 8

## Project Structure

```
src/
  experimentation/    # SDK: experiment config, hashing, tracking, hooks
  components/         # UI: variants, debug panel, user switcher, dashboard cards
  pages/              # Landing, Pricing, Onboarding, Dashboard
  data/               # Mock users
```
