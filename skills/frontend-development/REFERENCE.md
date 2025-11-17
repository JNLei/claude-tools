# Frontend Design Reference

Comprehensive guide to aesthetic principles, advanced techniques, and deep-dive guidance for creating exceptional frontend interfaces.

---

## Table of Contents

1. [Advanced Typography Techniques](#advanced-typography-techniques)
2. [Color Theory & Application](#color-theory--application)
3. [Motion Design Principles](#motion-design-principles)
4. [Spatial Composition Techniques](#spatial-composition-techniques)
5. [Visual Depth & Atmosphere](#visual-depth--atmosphere)
6. [Responsive Design Patterns](#responsive-design-patterns)
7. [Accessibility & Inclusive Design](#accessibility--inclusive-design)
8. [Performance Optimization](#performance-optimization)
9. [Design System Patterns](#design-system-patterns)

---

## Advanced Typography Techniques

### Font Pairing Strategies

**Rule of Contrast**
Pair fonts that are different enough to create hierarchy, but harmonious enough to feel cohesive.

**Successful Pairings:**
```css
/* Display + Sans */
--font-display: 'Clash Display', sans-serif;  /* Bold, geometric */
--font-body: 'Inter', sans-serif;             /* Clean, readable */

/* Serif + Sans */
--font-display: 'Fraunces', serif;            /* Classic, elegant */
--font-body: 'Untitled Sans', sans-serif;     /* Modern, neutral */

/* Mono + Sans */
--font-code: 'JetBrains Mono', monospace;     /* Technical */
--font-body: 'Work Sans', sans-serif;         /* Professional */
```

**Font Pairing Framework:**
1. **Contrast in style** - Serif vs Sans, Geometric vs Humanist
2. **Harmony in proportion** - Similar x-heights or cap heights
3. **Shared characteristics** - Similar stroke contrast or terminals
4. **Appropriate mood** - Both match the aesthetic direction

### Variable Fonts

**Advantages:**
- Single file, multiple styles
- Smooth animations between weights/widths
- Fine-tuned responsive typography
- Performance benefits

**Implementation:**
```css
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

.heading {
  font-family: 'InterVariable', sans-serif;
  font-weight: 700;

  @media (max-width: 768px) {
    font-weight: 600;  /* Lighter weight on mobile */
  }
}

/* Animate weight on interaction */
.button {
  font-weight: 500;
  transition: font-weight 0.2s ease;
}

.button:hover {
  font-weight: 700;
}
```

### Typographic Rhythm

**Vertical Rhythm:**
Consistent spacing based on baseline grid.

```css
:root {
  --baseline: 8px;
  --line-height: 1.5;
}

h1 {
  font-size: 48px;
  line-height: calc(var(--baseline) * 8);  /* 64px */
  margin-bottom: calc(var(--baseline) * 4); /* 32px */
}

p {
  font-size: 16px;
  line-height: calc(var(--baseline) * 3);  /* 24px */
  margin-bottom: calc(var(--baseline) * 3); /* 24px */
}
```

**Modular Scale:**
Type sizes based on mathematical ratio.

```css
:root {
  --ratio: 1.25;  /* Major third */
  --base-size: 16px;
}

.text-xs   { font-size: calc(var(--base-size) / var(--ratio) / var(--ratio)); }
.text-sm   { font-size: calc(var(--base-size) / var(--ratio)); }
.text-base { font-size: var(--base-size); }
.text-lg   { font-size: calc(var(--base-size) * var(--ratio)); }
.text-xl   { font-size: calc(var(--base-size) * var(--ratio) * var(--ratio)); }
.text-2xl  { font-size: calc(var(--base-size) * var(--ratio) * var(--ratio) * var(--ratio)); }
```

### Advanced Typography CSS

**Optical alignment:**
```css
.heading {
  /* Hanging punctuation */
  hanging-punctuation: first last;

  /* Adjust spacing for visual balance */
  letter-spacing: -0.02em;  /* Tighter tracking for large headings */
}
```

**OpenType features:**
```css
.body-text {
  /* Enable ligatures and contextual alternates */
  font-feature-settings:
    "liga" 1,    /* Standard ligatures */
    "calt" 1,    /* Contextual alternates */
    "kern" 1;    /* Kerning */

  /* Better for body text */
  text-rendering: optimizeLegibility;
}

.numbers {
  /* Tabular figures for alignment */
  font-variant-numeric: tabular-nums;
}
```

---

## Color Theory & Application

### Color Psychology

**Warm Colors** - Energy, passion, urgency
- Red: Bold, attention-grabbing, urgent
- Orange: Friendly, enthusiastic, creative
- Yellow: Optimistic, cheerful, attention

**Cool Colors** - Trust, calm, professionalism
- Blue: Trustworthy, stable, corporate
- Green: Natural, growth, health
- Purple: Luxury, creativity, wisdom

**Neutral Colors** - Balance, sophistication
- Black: Elegant, powerful, formal
- White: Clean, minimal, pure
- Gray: Professional, timeless, neutral

### Advanced Color Systems

**HSL-Based Design:**
Benefits of HSL over RGB/Hex:
- Easier to create variations (lighter, darker)
- Intuitive manipulation (hue, saturation, lightness)
- Better for programmatic generation

```css
:root {
  /* Base color in HSL */
  --hue: 220;
  --saturation: 70%;
  --lightness: 50%;

  /* Generate color scale */
  --color-50:  hsl(var(--hue), var(--saturation), 95%);
  --color-100: hsl(var(--hue), var(--saturation), 90%);
  --color-200: hsl(var(--hue), var(--saturation), 80%);
  --color-300: hsl(var(--hue), var(--saturation), 70%);
  --color-400: hsl(var(--hue), var(--saturation), 60%);
  --color-500: hsl(var(--hue), var(--saturation), 50%);
  --color-600: hsl(var(--hue), var(--saturation), 40%);
  --color-700: hsl(var(--hue), var(--saturation), 30%);
  --color-800: hsl(var(--hue), var(--saturation), 20%);
  --color-900: hsl(var(--hue), var(--saturation), 10%);
}
```

**Semantic Color Tokens:**
```css
:root {
  /* Primitive colors */
  --blue-500: hsl(220, 70%, 50%);
  --red-500: hsl(0, 70%, 50%);
  --green-500: hsl(140, 60%, 45%);

  /* Semantic tokens */
  --color-primary: var(--blue-500);
  --color-danger: var(--red-500);
  --color-success: var(--green-500);

  /* Contextual usage */
  --button-bg: var(--color-primary);
  --error-text: var(--color-danger);
}

/* Easily theme by changing primitives */
[data-theme="orange"] {
  --blue-500: hsl(30, 70%, 50%);  /* Override to orange */
}
```

### Color Accessibility

**WCAG Contrast Requirements:**
- **AA** (minimum): 4.5:1 for normal text, 3:1 for large text
- **AAA** (enhanced): 7:1 for normal text, 4.5:1 for large text

**Testing contrast:**
```css
/* Bad: Insufficient contrast */
.low-contrast {
  color: #999;           /* Gray */
  background: #fff;      /* White */
  /* Ratio: ~2.8:1 - FAILS AA */
}

/* Good: Meets AA */
.good-contrast {
  color: #666;           /* Darker gray */
  background: #fff;      /* White */
  /* Ratio: ~5.7:1 - PASSES AA */
}

/* Better: Meets AAA */
.best-contrast {
  color: #333;           /* Even darker */
  background: #fff;      /* White */
  /* Ratio: ~12.6:1 - PASSES AAA */
}
```

---

## Motion Design Principles

### Easing Functions

**Never use linear easing** - it feels robotic and unnatural.

**Standard easings:**
```css
/* Ease-out: Fast start, slow end (entering elements) */
.enter {
  animation: slideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
}

/* Ease-in: Slow start, fast end (exiting elements) */
.exit {
  animation: slideOut 0.2s cubic-bezier(0.4, 0, 1, 1);
}

/* Ease-in-out: Smooth both ends (position changes) */
.move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spring/bounce: Playful, energetic */
.bounce {
  animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

**Custom easings for character:**
```css
:root {
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  --ease-snap: cubic-bezier(0.87, 0, 0.13, 1);
}
```

### Orchestrated Animations

**Staggered delays create rhythm:**
```css
.card-grid > .card {
  opacity: 0;
  animation: fadeInUp 0.5s var(--ease-smooth) forwards;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Or programmatic delays:**
```jsx
{items.map((item, index) => (
  <Card
    key={item.id}
    style={{
      animationDelay: `${index * 0.1}s`
    }}
  />
))}
```

### Performance-First Animation

**Use transform and opacity only** - these are GPU-accelerated.

```css
/* ❌ BAD: Causes repaints */
.slow {
  transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
}

/* ✅ GOOD: GPU-accelerated */
.fast {
  transition: transform 0.3s, opacity 0.3s;
}
```

**Will-change hint:**
```css
.animated-element {
  /* Tell browser this will animate */
  will-change: transform;
}

/* Remove after animation completes */
.animated-element.animation-done {
  will-change: auto;
}
```

### Scroll-Triggered Animations

**Intersection Observer pattern:**
```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth),
              transform 0.6s var(--ease-smooth);
}

.reveal-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Spatial Composition Techniques

### Grid Breaking

**Start with a grid, then selectively break it:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* Standard grid items */
.grid-item {
  grid-column: span 4;
}

/* Break the grid for emphasis */
.featured-item {
  grid-column: 1 / -1;      /* Full width */
  grid-row: span 2;         /* Double height */
}

.offset-item {
  grid-column: 3 / 11;      /* Offset from edges */
}
```

### Asymmetric Layouts

**Visual tension creates interest:**

```css
/* Asymmetric two-column */
.asymmetric-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;  /* 66% / 33% split */
  gap: 3rem;
}

/* Diagonal composition */
.diagonal-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transform: rotate(-2deg);  /* Subtle tilt */
}

.diagonal-section > * {
  transform: rotate(2deg);   /* Counter-rotate content */
}
```

### Z-Index Layering

**Create depth through layering:**

```css
:root {
  /* Z-index scale */
  --z-base: 0;
  --z-elevated: 10;
  --z-sticky: 100;
  --z-overlay: 1000;
  --z-modal: 10000;
}

.layered-composition {
  position: relative;
}

.background-shape {
  position: absolute;
  z-index: var(--z-base);
  opacity: 0.1;
}

.content {
  position: relative;
  z-index: var(--z-elevated);
}

.floating-element {
  position: absolute;
  z-index: calc(var(--z-elevated) + 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```

---

## Visual Depth & Atmosphere

### Shadow System

**Layered shadows for realism:**

```css
:root {
  /* Elevation system */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1),
               0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1),
               0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1),
               0 10px 10px rgba(0, 0, 0, 0.04);
}

/* Colored shadows for vibrancy */
.vibrant-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}
```

### Gradient Meshes

**Complex, organic color transitions:**

```css
.gradient-mesh {
  background:
    radial-gradient(at 20% 30%, hsl(220, 70%, 60%) 0px, transparent 50%),
    radial-gradient(at 80% 20%, hsl(280, 70%, 60%) 0px, transparent 50%),
    radial-gradient(at 40% 80%, hsl(180, 70%, 50%) 0px, transparent 50%),
    radial-gradient(at 90% 70%, hsl(30, 80%, 60%) 0px, transparent 50%),
    hsl(240, 20%, 10%);
}
```

### Texture & Grain

**Subtle texture adds tactility:**

```css
.noise-texture {
  position: relative;
}

.noise-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### Glass Morphism

**Frosted glass effect:**

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

/* Dark mode variation */
[data-theme="dark"] .glass {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}
```

---

## Responsive Design Patterns

### Container Queries

**Component-based responsive design:**

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

/* Respond to container width, not viewport */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### Fluid Typography

**Smooth scaling between viewports:**

```css
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;

  --fluid-screen: 100vw;
  --fluid-bp: calc(
    (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
    (var(--fluid-max-width) - var(--fluid-min-width))
  );
}

h1 {
  font-size: clamp(2rem, calc(2rem + 2 * var(--fluid-bp)), 4rem);
}

/* Or use modern clamp directly */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  /* Min: 2rem, Preferred: 5vw, Max: 4rem */
}
```

---

## Accessibility & Inclusive Design

### Focus Management

**Visible, clear focus indicators:**

```css
/* Remove default outline, add custom */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast for keyboard users */
.button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(var(--primary-rgb), 0.2);
}
```

### Screen Reader Considerations

**Visually hidden but accessible:**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```jsx
<button>
  <Icon />
  <span className="sr-only">Open menu</span>
</button>
```

### Reduced Motion

**Respect user preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Optimization

### Critical CSS

**Inline critical CSS, defer rest:**

```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Above-the-fold styles */
    body { margin: 0; font-family: system-ui; }
    .header { /* ... */ }
  </style>

  <!-- Defer non-critical CSS -->
  <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
</head>
```

### Image Optimization

**Modern formats with fallbacks:**

```jsx
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Description" loading="lazy" />
</picture>
```

---

## Design System Patterns

### Token Architecture

**Layered token system:**

```css
:root {
  /* Layer 1: Primitive tokens */
  --color-blue-500: hsl(220, 70%, 50%);
  --color-red-500: hsl(0, 70%, 50%);
  --spacing-4: 1rem;

  /* Layer 2: Semantic tokens */
  --color-primary: var(--color-blue-500);
  --color-danger: var(--color-red-500);
  --button-padding: var(--spacing-4);

  /* Layer 3: Component tokens */
  --button-bg: var(--color-primary);
  --button-text: white;
  --button-padding-x: var(--button-padding);
}
```

---

**This reference provides deep-dive guidance. For workflows, see:**
- [SKILL.md](SKILL.md) - Scenario router
- [EXISTING-CODEBASE-CHECKLIST.md](EXISTING-CODEBASE-CHECKLIST.md) - Consistency workflow
- [NEW-PROJECT-DESIGN.md](NEW-PROJECT-DESIGN.md) - Aesthetic philosophy
- [EXAMPLES.md](EXAMPLES.md) - Real-world case studies
