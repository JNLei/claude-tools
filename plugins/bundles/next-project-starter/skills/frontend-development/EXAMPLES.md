# Examples & Case Studies

Real-world examples demonstrating correct and incorrect application of frontend design principles.

---

## Table of Contents

1. [Case Study: Blog Search Bar (Design Consistency)](#case-study-blog-search-bar)
2. [Example: Component Reuse Decision Matrix](#example-component-reuse-decision)
3. [Example: Typography Consistency](#example-typography-consistency)
4. [Example: Layout Pattern Matching](#example-layout-pattern-matching)
5. [Anti-Example: Generic AI Slop](#anti-example-generic-ai-slop)

---

## Case Study: Blog Search Bar

**Context:** Adding a search bar to a blog page in an existing Next.js application.

### ❌ WRONG APPROACH (Autopilot Mode)

**What happened:**
```
User: "Blog page needs a search bar"
Assistant: [Sees SearchBar component exists] → [Pastes component into blog page] → Done
```

**Implementation:**
```tsx
// Blog page
<section className="py-6 px-6">
  <div className="max-w-5xl mx-auto">
    <SearchBar value={searchQuery} onChange={setSearchQuery} />
  </div>
</section>

// SearchBar component (from tools page)
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">  {/* ← PROBLEM: Centered with narrow container */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
      <Input value={value} onChange={onChange} className="pl-10" />
    </div>
  );
}
```

**Result:**
- ❌ Search bar centered on left-aligned page
- ❌ max-w-2xl container inside max-w-5xl container
- ❌ Visual inconsistency with rest of blog page
- ❌ Breaks design language

**Visual outcome:**
```
Blog Page (LEFT-ALIGNED, max-w-5xl)
┌─────────────────────────────────────────────────┐
│ Blog                                            │
│ Real-world guides...                            │
│                                                 │
│         ┌──────────────────┐                    │  ← Centered, narrow
│         │ [Search bar]     │                    │
│         └──────────────────┘                    │
│                                                 │
│ [All Posts - left-aligned cards]                │
└─────────────────────────────────────────────────┘
```

### ✅ RIGHT APPROACH (Design-Thinking Mode)

**Process:**

**Phase 1: Design Language Analysis**

```markdown
## Design Language Analysis

### Files Scanned
- src/app/blog/page.tsx (blog landing page)
- src/app/page.tsx (tools page for comparison)
- src/components/SearchBar.tsx
- src/components/CategoryFilter.tsx
- src/app/globals.css

### Layout Patterns
- Blog page: LEFT-ALIGNED layout throughout
- All blog sections use max-w-5xl container
- Category filter buttons are left-aligned
- Blog cards grid is left-aligned

- Tools page (for comparison): CENTERED layout
- Tools hero uses max-w-3xl centered
- Tools SearchBar uses max-w-2xl centered

**Key insight:** Blog page has CONSISTENT left-aligned pattern with max-w-5xl containers.

### Component Patterns
- SearchBar component exists with built-in max-w-2xl mx-auto (centered)
- This pattern works for tools page but NOT for blog page
- Category filter on blog page is left-aligned (not centered)
```

**Phase 2: Design Decisions**

```markdown
## Design Decisions

### Pattern Application
Blog page requires LEFT-ALIGNED full-width search within max-w-5xl container.
Cannot use SearchBar's centered max-w-2xl pattern - would break consistency.

### Component Approach
Options:
1. Add width/alignment variant props to SearchBar component
2. Create inline search input specifically for blog page
3. Create new FullWidthSearchBar component

Decision: Option 1 - Extend SearchBar with optional props
- Maintains component reuse
- Allows flexibility for different layout contexts
- Avoids code duplication

### Consistency Requirements
MUST maintain:
- max-w-5xl container (matches rest of blog page)
- Full width within container (left-aligned, not centered)
- Same input styling (h-11, pl-10, bg-card, search icon)
- Same search functionality

CAN vary:
- Container width and alignment (adapts to page context)
```

**Phase 3: Implementation**

```tsx
// Enhanced SearchBar component with layout props
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;  // New prop
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  fullWidth = false  // Default to centered (backward compatible)
}: SearchBarProps) {
  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 h-11 bg-card"
      />
    </div>
  );
}

// Blog page usage
<section className="py-6 px-6">
  <div className="max-w-5xl mx-auto">
    <SearchBar
      value={searchQuery}
      onChange={setSearchQuery}
      placeholder="Search posts by title, author, or tags..."
      fullWidth={true}  // Matches blog's left-aligned pattern
    />
  </div>
</section>

// Tools page usage (unchanged, backward compatible)
<section className="py-6 px-6">
  <div className="max-w-5xl mx-auto">
    <SearchBar
      value={searchQuery}
      onChange={setSearchQuery}
      // No fullWidth prop = defaults to centered
    />
  </div>
</section>
```

**Result:**
- ✅ Search bar matches blog page's left-aligned layout
- ✅ Consistent max-w-5xl container width
- ✅ Component reuse with flexibility
- ✅ Backward compatible (tools page unchanged)
- ✅ Design language preserved

**Visual outcome:**
```
Blog Page (LEFT-ALIGNED, max-w-5xl)
┌─────────────────────────────────────────────────┐
│ Blog                                            │
│ Real-world guides...                            │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │  ← Full width, left-aligned
│ │ [Search bar]                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [All Posts - left-aligned cards]                │
└─────────────────────────────────────────────────┘
```

### Key Lessons

1. **Don't skip analysis** - The checklist exists for a reason
2. **Scan multiple files** - Understanding context requires comprehensive analysis
3. **Document patterns** - Explicit output makes thinking visible
4. **Consider reuse vs creation** - Adapt existing components when possible
5. **Match the context** - Blog's left-aligned pattern ≠ Tools' centered pattern

---

## Example: Component Reuse Decision

**Scenario:** Need a card component for a new dashboard section.

### Analysis

**Existing components found:**
1. `ToolCard` - Border, rounded corners, hover effect, vertical layout
2. `BlogPostCard` - Border, rounded corners, gradient header, vertical layout
3. `FeatureCard` - No border, shadow effect, horizontal layout

### Decision Matrix

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Reuse ToolCard | Matches border/rounded style | Vertical layout might not fit | ❌ Layout mismatch |
| Reuse FeatureCard | Horizontal layout fits | No border/rounded style | ❌ Style mismatch |
| Create DashboardCard | Perfect fit for needs | New component = maintenance | ⚠️ Only if truly different |
| **Extend ToolCard with layout prop** | Reuses existing + flexible | Small refactor needed | ✅ **Best choice** |

### Implementation

```tsx
// Extended ToolCard with layout variant
interface ToolCardProps {
  tool: Tool;
  layout?: 'vertical' | 'horizontal';
}

export default function ToolCard({ tool, layout = 'vertical' }: ToolCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={`border rounded-lg p-4 hover:border-foreground/20 transition-all
      ${isHorizontal ? 'flex items-center gap-4' : 'flex flex-col'}`}
    >
      {/* Content adapts to layout */}
    </div>
  );
}
```

---

## Example: Typography Consistency

**Scenario:** Adding a new "About" page to existing site.

### Analysis Output

```markdown
## Typography Patterns (from existing pages)

### Heading Hierarchy
- H1: text-3xl md:text-4xl, font-semibold, tracking-tight
- H2: text-xl md:text-2xl, font-semibold
- H3: text-lg, font-medium

### Body Text
- Default: text-base, leading-relaxed
- Small: text-sm
- Meta/timestamps: text-xs, text-muted-foreground

### Font Family
- Primary: Inter with fallbacks
- No display font used
- No monospace needed (no code samples)
```

### Correct Implementation

```tsx
// About page - matches existing hierarchy
<div className="max-w-3xl mx-auto">
  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
    About Us
  </h1>

  <p className="text-base leading-relaxed mb-6">
    Our story begins...
  </p>

  <h2 className="text-xl md:text-2xl font-semibold mb-3">
    Our Mission
  </h2>

  <p className="text-base leading-relaxed">
    We believe in...
  </p>
</div>
```

### ❌ Incorrect Implementation

```tsx
// DON'T: Different sizes, weights, tracking
<div className="max-w-3xl mx-auto">
  <h1 className="text-5xl font-bold tracking-wide mb-6">  {/* ← Too large, too bold */}
    About Us
  </h1>

  <p className="text-lg leading-normal mb-8">  {/* ← Larger than existing pages */}
    Our story begins...
  </p>

  <h2 className="text-2xl font-bold mb-4">  {/* ← font-bold instead of font-semibold */}
    Our Mission
  </h2>
</div>
```

---

## Example: Layout Pattern Matching

**Scenario:** Adding a "Pricing" page.

### Pattern Analysis

**Existing page patterns:**
- Home: Centered hero (max-w-3xl) → Wide content (max-w-5xl)
- Blog: All sections left-aligned (max-w-5xl)
- Tools: Centered hero (max-w-3xl) → Wide grid (max-w-5xl)

**Decision:** Pricing is marketing content, matches "Home" pattern.

### Correct Implementation

```tsx
// Pricing page - matches Home pattern
export default function PricingPage() {
  return (
    <main>
      {/* Hero: Centered, narrow */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Simple, Transparent Pricing
          </h1>
        </div>
      </section>

      {/* Plans: Wide, centered grid */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pricing cards */}
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Anti-Example: Generic AI Slop

### ❌ The Problem

**Request:** "Create a landing page for a SaaS product"

**Generic AI Output:**
```tsx
// Predictable, seen-it-before structure
<main className="bg-white">
  {/* Purple gradient hero */}
  <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">
        Revolutionize Your Workflow
      </h1>
      <p className="text-xl mb-8">
        The all-in-one platform for modern teams
      </p>
      <button className="bg-white text-purple-600 px-8 py-3 rounded-lg">
        Get Started
      </button>
    </div>
  </section>

  {/* Three feature cards */}
  <section className="py-20">
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
      <Card icon="⚡" title="Fast" description="Lightning fast performance" />
      <Card icon="🔒" title="Secure" description="Bank-level security" />
      <Card icon="📈" title="Scalable" description="Grows with you" />
    </div>
  </section>

  {/* Testimonials */}
  {/* CTA */}
</main>
```

**Font:** Inter (of course)
**Colors:** Purple gradient (of course)
**Layout:** Centered everything (of course)

**Problem:** Indistinguishable from 1000 other AI-generated SaaS pages.

### ✅ Better Approach

**Apply design thinking:**
- What makes THIS product different?
- Who is the audience? (Technical? Creative? Enterprise?)
- What feeling should the design evoke?
- What's ONE memorable element?

**Example re-design (Brutalist/Technical Direction):**
```tsx
// Bold, distinctive approach
<main className="bg-black text-green-400 font-mono">
  {/* Terminal-style hero */}
  <section className="min-h-screen p-6 flex items-center">
    <div className="max-w-4xl">
      <pre className="text-sm mb-4">$ initialize_revolution.sh</pre>
      <h1 className="text-6xl font-bold mb-4 glitch-effect">
        SYSTEM<br/>
        OVERRIDE
      </h1>
      <p className="text-lg text-green-300 mb-8 max-w-xl">
        For developers who don't compromise. Raw power. Zero abstraction.
      </p>
      <div className="flex gap-4">
        <button className="border-2 border-green-400 px-6 py-2 hover:bg-green-400 hover:text-black transition-colors">
          &gt; ssh access@deploy
        </button>
      </div>
    </div>
  </section>

  {/* Asymmetric feature layout */}
  <section className="p-6">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
      <div className="col-span-8 border-2 border-green-400 p-8">
        {/* Main feature */}
      </div>
      <div className="col-span-4 border-2 border-green-400 p-4">
        {/* Stats ticker */}
      </div>
    </div>
  </section>
</main>
```

**Distinctive elements:**
- Terminal/command-line aesthetic
- Monospace typography
- High-contrast green-on-black
- Asymmetric grid layout
- Technical/hacker vibe
- Memorable and specific to audience

---

## More Examples

For additional examples and techniques, see:
- [REFERENCE.md](REFERENCE.md#advanced-techniques) - Deep-dive patterns
- [NEW-PROJECT-DESIGN.md](NEW-PROJECT-DESIGN.md) - Aesthetic philosophy
- [EXISTING-CODEBASE-CHECKLIST.md](EXISTING-CODEBASE-CHECKLIST.md) - Consistency workflow
