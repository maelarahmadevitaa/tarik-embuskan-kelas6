---
name: Tarik dan Embuskan
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#994100'
  on-tertiary: '#ffffff'
  tertiary-container: '#c05400'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Quicksand
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-lg:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style

This design system establishes a joyful, tactile, and luminous educational environment designed specifically for 6th-grade elementary students exploring human respiratory biology. The aesthetic merges colorful frosted glassmorphism with tactile, bubbly 3D micro-elements reminiscent of premium educational media. 

The visual voice is encouraging, playful, and scientific without being clinical. It balances the playful enthusiasm of candy-bright gradients (sky blue, mint green, coral pink, and sunny gold) with the clarity required for diagrams, organ maps, interactive quizzes, and anatomical callouts. Frosted translucent surfaces, radiant ambient glows, hyper-rounded containers, and cheerful typography create an inviting visual sanctuary that encourages tactile exploration and sustained curiosity.

## Colors

The palette balances luminous energy with WCAG AAA-compliant contrast for growing readers.

- **Primary (`#0284C7` / Sky Blue):** Symbolizes oxygenation, inhaled air (`Tarik napas`), and refreshing clarity. Paired with its radiant light tint (`#38BDF8`) for glassy borders and glowing interactive states.
- **Secondary (`#059669` / Mint & Emerald):** Represents biological vitality, correct quiz states, alveolar health, and progression tokens. Supported by `#34D399` for soft glows and tag fills.
- **Tertiary (`#F97316` / Coral Orange & Pink):** Captures cellular activity, blood vessels, exhaled air (`Hembuskan napas`), and attention-demanding interaction hotspots, accented by `#FB7185`.
- **Accent Yellow (`#FBBF24`):** Used strictly for gamified reward states, star badges, streaks, and focus highlights.
- **Neutral Palette:** Built on deep ink navy (`#0F172A`) for crisp, legible typography on light frosted canvases, paired with ultra-pale tinted backgrounds (`#F0F9FF` to `#E0F2FE`) to give frosted glass cards luminous depth.

## Typography

Typography pairs **Quicksand** for headlines and interactive tokens with **Nunito Sans** for instructional copy and organ descriptions. 

- **Quicksand** brings a naturally friendly, rounded geometric structure with open counters and gentle terminal curves. It removes the cold intimidation of scientific terminology (e.g., *Diafragma*, *Bronkiolus*, *Alveolus*), making terminology inviting to read aloud.
- **Nunito Sans** balances warmth with high legibility across variable reading speeds. Generous x-heights and open apertures maintain legibility on translucent frosted panels over colorful illustrated backdrops.
- Font weights lean bold (`600` and `700`) to guarantee contrast and visual weight against semi-transparent glass cards.

## Layout & Spacing

The design system relies on a flexible 12-column layout on desktop, transitioning into an 8-column layout on tablet and a single-column modular stack on mobile. Because the UI targets elementary students interacting via touchscreens and tablets, spacing prioritizes generous touch target clearances (minimum 48×48px interactive bounds) and wide card gutters.

Spacious padding inside components (`space-md` to `space-lg`) prevents interactive diagrams and quiz options from feeling crowded. Layouts center visual interactive items (such as the interactive 3D lung model) while placing control buttons, breathing timers, and navigation triggers within ergonomic thumb zones at the bottom edges.

## Elevation & Depth

Visual hierarchy uses frosted glass layers stacked over soft organic gradient canvases.

- **Canvas Foundation:** Layered with subtle mesh gradients (`#E0F2FE` sky blue fading into `#ECFDF5` mint and `#FFF7ED` warm peach).
- **Glass Tier 1 (Surface Cards):** Background `rgba(255, 255, 255, 0.65)` with `backdrop-filter: blur(16px)`, bound by a 1.5px semi-transparent highlight rim `rgba(255, 255, 255, 0.75)` and a subtle tinted drop shadow: `0 12px 32px -4px rgba(2, 132, 199, 0.12)`.
- **Glass Tier 2 (Floating Modals & Interactive Nodes):** Background `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(20px)`, framed with `rgba(255, 255, 255, 0.95)` borders and dual-layer glow shadows: `0 16px 40px -6px rgba(2, 132, 199, 0.18), 0 0 16px rgba(56, 189, 248, 0.25)`.
- **Tactile Elements (Badges & Buttons):** Saturated color fills with an inset top-lit highlight `inset 0 2px 4px rgba(255, 255, 255, 0.4)` and an extruded base shadow `0 6px 0px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(2, 132, 199, 0.2)` to create a squishy, touchable toy-like aesthetic.

## Shapes

The design system uses pill-shaped geometry (`roundedness: 3`) across all surfaces. Sharp corners are avoided to ensure an approachable, injury-free tactile universe.

- **Base Cards & Panels:** Styled with extra-large radii (typically `2rem` to `3rem` / `rounded-3xl`), mirroring inflatable air sacks and rounded organic anatomy.
- **Buttons, Tags, & Metric Chips:** True capsule/pill silhouettes (`border-radius: 9999px`).
- **Interactive Touch Targets:** Circular (`round-full`) floating action buttons for audio playbacks, breathing rhythm guides, and organ zoom triggers.

## Components

### Buttons
- **Primary ("Tarik Napas" / Action):** High-saturation gradient fill (`#38BDF8` to `#0284C7`), full pill radius, bold Quicksand type in crisp white. Elevated with a tactile bottom ridge and subtle hover bounce (`scale(1.03)`).
- **Secondary ("Hembuskan"):** Frosted white backdrop (`rgba(255, 255, 255, 0.75)`), 2px solid `#38BDF8` border, deep navy text `#0F172A`.
- **Reward / Next Step:** Sunshine Yellow (`#FBBF24` to `#F59E0B`) with warm amber drop shadows.

### Glassmorphic Cards
- Primary containers for respiratory anatomy diagrams, trivia, and question prompts. Built with `backdrop-filter: blur(16px)`, `rounded-3xl`, and soft white top-lit gradients on borders. Hover states produce a gentle cyan or mint ambient glow.

### Interactive Organ Hotspots & Chips
- Anatomical pins placed on the nasal cavity, trachea, bronchi, and diaphragm. Styled as pulsing concentric frosted circles with an inner glowing core.
- Category chips use 100% rounded capsules with soft pastel fills (`rgba(52, 211, 153, 0.2)` for lungs, `rgba(249, 115, 22, 0.2)` for oxygen-carbon exchange).

### Form Controls (Checkboxes & Radios)
- Oversized rounded squares (28×28px with 10px radius) for multiple-choice quiz questions. Checked state transitions into a vibrant mint gradient with a white bouncy checkmark. Radio buttons utilize a concentric target bubble that scales up with spring physics.

### Gamified Badges & Meters
- **Lung Capacity Meter:** A thick vertical or horizontal pill track with liquid-like wave animation filling dynamically with `#38BDF8` and `#34D399`.
- **Achievement Badges:** 3D-effect badges encased in frosted glass bubbles, surrounded by gold star accents (`#FBBF24`).