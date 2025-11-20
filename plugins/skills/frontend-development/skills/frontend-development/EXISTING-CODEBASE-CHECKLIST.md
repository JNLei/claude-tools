# Existing Codebase: Design Consistency Checklist

**⚠️ MANDATORY WORKFLOW FOR EXISTING CODEBASES**

When adding components, pages, or UI elements to an existing codebase, you MUST complete this analysis and OUTPUT your findings BEFORE writing any code. This prevents design language inconsistencies.

---

## Phase 1: Design Language Analysis (REQUIRED OUTPUT)

**YOU MUST OUTPUT A "DESIGN LANGUAGE ANALYSIS" SECTION** showing:

### 1. Files Scanned
- List specific files you examined (components, pages, layouts)
- Minimum 3-5 related files

### 2. Layout Patterns Identified
- Document: Centered vs left-aligned content
- Document: Container max-widths used (e.g., max-w-2xl, max-w-5xl, max-w-7xl)
- Document: Spacing patterns (section padding, element gaps)
- Document: Grid systems and responsive breakpoints

### 3. Typography Patterns Identified
- Document: Font families used (primary, display, mono)
- Document: Heading hierarchy (h1, h2, h3 styles)
- Document: Font sizes, weights, line heights
- Document: Text colors and muted text patterns

### 4. Component Patterns Identified
- Document: How similar existing components are structured
- Document: Reusable UI components available (buttons, inputs, cards)
- Document: State management patterns
- Document: Animation and interaction patterns

### 5. Color & Theme Patterns
- Document: CSS variables or theme system used
- Document: Color palette (background, foreground, accent, muted)
- Document: Light/dark mode approach

### Example Output Format

```markdown
## Design Language Analysis

### Files Scanned
- src/app/page.tsx (tools landing page)
- src/app/blog/page.tsx (blog landing page)
- src/components/SearchBar.tsx
- src/components/ToolCard.tsx
- src/app/globals.css

### Layout Patterns
- Blog page: LEFT-ALIGNED with max-w-5xl containers
- Tools page: CENTERED hero with max-w-3xl, then max-w-5xl for content
- Consistent: py-8 px-6 section padding
- Consistent: max-w-5xl for main content areas

### Typography Patterns
- Font: Inter with fallbacks
- H1: text-3xl md:text-4xl, font-semibold
- Body: text-base, text-sm for meta
- Muted text: text-muted-foreground

### Component Patterns
- SearchBar: Exists, uses max-w-2xl centered layout
- Cards: Border, rounded-lg, hover states
- Inputs: h-11 height, pl-10 with icon, bg-card background

### Color & Theme
- Dark theme via CSS variables
- Background: hsl(0 0% 7%)
- Muted: hsl(0 0% 60%)
```

---

## Phase 2: Design Decisions (REQUIRED OUTPUT)

**YOU MUST OUTPUT A "DESIGN DECISIONS" SECTION** documenting:

### 1. Which patterns apply to this new component/page?
- What layout approach matches the context?
- What typography styles should be used?
- What spacing values maintain consistency?

### 2. Should you adapt existing components or create new ones?
- Can existing components be reused as-is?
- Do existing components need props/variants added?
- Is a new component justified, or would it create inconsistency?

### 3. What are the consistency requirements?
- What MUST stay the same (e.g., container width on blog pages)
- What CAN vary (e.g., component-specific details)

### Example Output Format

```markdown
## Design Decisions

### Pattern Application
Blog page uses LEFT-ALIGNED layout with max-w-5xl containers throughout.
The search bar must match this pattern, NOT the centered max-w-2xl pattern from tools page.

### Component Approach
SearchBar component exists but is designed for centered layouts (max-w-2xl mx-auto).
Options:
1. Add width variant prop to SearchBar
2. Create inline search input for blog page
Decision: Option 2 - create inline search to match blog's full-width pattern

### Consistency Requirements
MUST maintain:
- max-w-5xl container (matches rest of blog page)
- Full width within container (left-aligned, not centered)
- Same input styling (h-11, pl-10, bg-card)
- Same search icon positioning

CAN vary:
- Container width (must match blog's max-w-5xl, not tools' max-w-2xl)
```

---

## Phase 3: Implementation

**ONLY AFTER** completing Phase 1 and Phase 2 outputs above, proceed with writing code.

### Implementation Guidelines

**For existing codebases**, maintain consistency with identified patterns:

- **Typography**: Use existing font families, sizes, weights
- **Color & Theme**: Use existing CSS variables and color tokens
- **Spacing**: Match existing padding, margin, gap patterns
- **Components**: Reuse or extend existing components when possible
- **Animations**: Match existing motion and interaction patterns

**See also:**
- [EXAMPLES.md](EXAMPLES.md) - Real-world case studies
- [REFERENCE.md](REFERENCE.md) - Deep aesthetic principles (apply only where consistent)

---

## Common Mistakes to Avoid

❌ **Skipping Phase 1** - Jumping straight to implementation without analysis
❌ **Shallow scanning** - Only looking at 1-2 files instead of comprehensive analysis
❌ **Ignoring patterns** - Seeing patterns but not applying them
❌ **Component bloat** - Creating new components when existing ones could be adapted
❌ **Inconsistent widths** - Mixing centered and left-aligned layouts on the same page type
❌ **Typography drift** - Using different fonts, sizes, or weights without justification
❌ **Color divergence** - Adding new color values instead of using existing tokens

---

## Checklist Summary

Before writing any code:

- [ ] Scanned 3-5 related files
- [ ] Documented layout patterns (alignment, containers, spacing)
- [ ] Documented typography patterns (fonts, hierarchy, colors)
- [ ] Documented component patterns (structure, reusable components)
- [ ] Documented color/theme patterns (variables, palette, mode)
- [ ] OUTPUT complete "Design Language Analysis" section
- [ ] Decided which patterns apply to new work
- [ ] Decided on component reuse vs creation strategy
- [ ] Identified consistency requirements (MUST vs CAN)
- [ ] OUTPUT complete "Design Decisions" section
- [ ] **Only then**: Proceed to implementation

---

**Remember:** The goal is consistency, not perfection. When in doubt, match existing patterns.
