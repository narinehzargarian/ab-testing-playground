/**
 * Experiment Configurations — the "server-side" definitions.
 *
 * In production, these live on Adobe Target's servers and are managed
 * through Target's UI. Engineers and PMs create "activities" (experiments)
 * in Target, defining variants, traffic allocation, and targeting rules.
 *
 * Here we define them in a config file to simulate that server response.
 *
 * Key concepts:
 * - Each experiment has a unique ID (like a Target activity ID)
 * - "weight" determines traffic split (must sum to 100 across variants)
 * - "type: ab" = random assignment via hashing
 * - "type: personalization" = assignment based on user segment
 * - "status" can be toggled to simulate pausing/resuming experiments
 * - "targetMetric" is the conversion event we're optimizing for
 */

export const experiments = [
  {
    id: 'exp_hero_cta',
    name: 'Hero CTA Copy Test',
    description: 'Testing which call-to-action text drives more clicks on the landing page hero.',
    status: 'running',
    type: 'ab',
    targetMetric: 'cta_click',
    variants: [
      {
        id: 'control',
        name: 'Control',
        weight: 34,
        props: { ctaText: 'Try Free' }
      },
      {
        id: 'variant_b',
        name: 'Variant B',
        weight: 33,
        props: { ctaText: 'Start Converting PDFs' }
      },
      {
        id: 'variant_c',
        name: 'Variant C',
        weight: 33,
        props: { ctaText: 'Get Started Free' }
      }
    ]
  },
  {
    id: 'exp_pricing_layout',
    name: 'Pricing Page Layout Test',
    description: 'Testing whether cards, table, or horizontal layout converts better on the pricing page.',
    status: 'running',
    type: 'ab',
    targetMetric: 'plan_select',
    variants: [
      {
        id: 'cards',
        name: 'Cards Layout',
        weight: 34,
        props: { layout: 'cards' }
      },
      {
        id: 'table',
        name: 'Table Layout',
        weight: 33,
        props: { layout: 'table' }
      },
      {
        id: 'horizontal',
        name: 'Horizontal Layout',
        weight: 33,
        props: { layout: 'horizontal' }
      }
    ]
  },
  {
    id: 'exp_personalization',
    name: 'Hero Personalization',
    description: 'Personalized hero messaging based on user segment — students, business users, and casual users each see tailored content.',
    status: 'running',
    type: 'personalization',
    segmentKey: 'segment',
    targetMetric: 'cta_click',
    variants: [
      {
        id: 'student',
        name: 'Student Experience',
        segment: 'student',
        props: {
          headline: 'Student Pricing Available',
          subheadline: 'Get PDF tools at a fraction of the cost. Perfect for assignments, research papers, and group projects.',
          ctaText: 'Get Student Discount'
        }
      },
      {
        id: 'business',
        name: 'Business Experience',
        segment: 'business',
        props: {
          headline: 'Enterprise-Grade PDF Tools',
          subheadline: 'Streamline document workflows for your entire team. Secure, compliant, and built for scale.',
          ctaText: 'See Business Plans'
        }
      },
      {
        id: 'casual',
        name: 'Casual Experience',
        segment: 'casual',
        props: {
          headline: 'Simple PDF Tools for Everyday Tasks',
          subheadline: 'Convert, compress, and edit PDFs in seconds. No signup required for basic tools.',
          ctaText: 'Use Free Tools'
        }
      }
    ]
  },
  {
    id: 'exp_onboarding_flow',
    name: 'Onboarding Flow Format',
    description: 'Testing whether a multi-step wizard or a single-page onboarding converts more users to complete setup.',
    status: 'running',
    type: 'ab',
    targetMetric: 'onboarding_complete',
    variants: [
      {
        id: 'control',
        name: 'Multi-Step Wizard',
        weight: 50,
        props: { flow: 'multi-step' }
      },
      {
        id: 'single_page',
        name: 'Single Page',
        weight: 50,
        props: { flow: 'single-page' }
      }
    ]
  },
  {
    id: 'exp_onboarding_tutorial',
    name: 'Onboarding Tutorial Test',
    description: 'Testing whether showing a guided tooltip tutorial after onboarding increases tool usage.',
    status: 'running',
    type: 'ab',
    targetMetric: 'tool_used',
    variants: [
      {
        id: 'control',
        name: 'With Tutorial',
        weight: 50,
        props: { showTutorial: true }
      },
      {
        id: 'no_tutorial',
        name: 'No Tutorial',
        weight: 50,
        props: { showTutorial: false }
      }
    ]
  }
];
