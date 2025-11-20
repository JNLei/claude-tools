# Skill Optimizer Reference

Detailed optimization patterns, anti-patterns, migration workflows, and advanced techniques.

## Table of Contents

- [Detailed Optimization Patterns](#detailed-optimization-patterns)
  - [Pattern 1: Extract API Documentation](#pattern-1-extract-api-documentation)
  - [Pattern 2: Extract Pattern Libraries](#pattern-2-extract-pattern-libraries)
  - [Pattern 3: Extract Troubleshooting](#pattern-3-extract-troubleshooting)
  - [Pattern 4: Convert Code to Scripts](#pattern-4-convert-code-to-scripts)
- [Common Anti-Patterns](#common-anti-patterns)
- [Complete Migration Workflow](#complete-migration-workflow)
- [Advanced Optimization Techniques](#advanced-optimization-techniques)
- [Measurement & Validation](#measurement--validation)

---

## Detailed Optimization Patterns

### Pattern 1: Extract API Documentation

**Before (in SKILL.md - consuming tokens):**
```markdown
## API Reference

### Function: processData()
**Signature**: processData(input: DataInput): Promise<DataOutput>
**Parameters**:
- input.field1: string - Description of field1 with detailed explanation of valid values, constraints, and validation rules
- input.field2: number - Description of field2 with range specifications, default values, and edge cases to consider
- input.field3: boolean - Description of field3 with behavior when true vs false and implications
- input.field4: object - Nested object with multiple sub-fields
  - field4.subfield1: string - Description...
  - field4.subfield2: array - Description...
**Returns**: Promise<DataOutput>
- output.result: string - Detailed description of result format, possible values, and interpretation
- output.metadata: object - Metadata object containing:
  - metadata.timestamp: number - Unix timestamp
  - metadata.version: string - API version used
  - metadata.requestId: string - Unique request identifier
**Throws**:
- ValidationError - When input validation fails
- ProcessingError - When data processing encounters issues
- NetworkError - When network operations fail

**Example**:
\`\`\`typescript
import { processData } from './processor';

async function example() {
  try {
    const input = {
      field1: 'example value',
      field2: 42,
      field3: true,
      field4: {
        subfield1: 'nested value',
        subfield2: ['item1', 'item2']
      }
    };

    const result = await processData(input);

    console.log('Result:', result.result);
    console.log('Processed at:', new Date(result.metadata.timestamp));
    console.log('Request ID:', result.metadata.requestId);

    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Invalid input:', error.message);
    } else if (error instanceof ProcessingError) {
      console.error('Processing failed:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
\`\`\`

**Error Handling**:
- Always wrap calls in try-catch blocks
- Check for specific error types to handle appropriately
- Log errors with context for debugging
- Consider retry logic for transient failures
- Implement circuit breakers for external dependencies

**Performance Considerations**:
- Batch multiple calls when possible
- Cache results when appropriate
- Monitor processing time
- Set appropriate timeouts
```

**After (in SKILL.md - minimal reference):**
```markdown
## API Overview

Key functions: `processData()`, `validateInput()`, `formatOutput()`

**Quick usage:**
\`\`\`typescript
const result = await processData({ field1: 'value' });
\`\`\`

**Complete API reference**: [REFERENCE.md](REFERENCE.md#api-reference-complete)
```

**Savings**: ~80 lines → 10 lines (87% reduction, ~1,400 tokens saved)

**When to apply:**
- API documentation >30 lines
- Multiple function signatures
- Detailed parameter descriptions
- Extensive error handling documentation
- Performance considerations and examples

---

### Pattern 2: Extract Pattern Libraries

**Before (in SKILL.md - consuming tokens):**
```markdown
## Common Patterns

### Pattern 1: Authentication Flow
\`\`\`typescript
import { authenticate, refreshToken, logout } from './auth';

async function authenticationFlow() {
  // Initial authentication
  const { accessToken, refreshToken: refresh } = await authenticate({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });

  // Store tokens securely
  secureStorage.set('access_token', accessToken);
  secureStorage.set('refresh_token', refresh);

  // Set up token refresh
  const refreshInterval = setInterval(async () => {
    try {
      const newTokens = await refreshToken(refresh);
      secureStorage.set('access_token', newTokens.accessToken);
    } catch (error) {
      clearInterval(refreshInterval);
      await logout();
    }
  }, 15 * 60 * 1000); // Refresh every 15 minutes

  return { accessToken, cleanup: () => clearInterval(refreshInterval) };
}
\`\`\`

**Explanation**: This pattern handles initial authentication, secure token storage, and automatic token refresh with cleanup.

### Pattern 2: Error Handling with Retry Logic
\`\`\`typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (error instanceof ValidationError) {
        throw error;
      }

      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = delayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} retries: ${lastError.message}`);
}

// Usage
const result = await withRetry(() => fetchData(), 3, 500);
\`\`\`

**Explanation**: Implements exponential backoff retry logic with configurable attempts and delays.

### Pattern 3: Data Validation
\`\`\`typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(0).max(120),
  roles: z.array(z.enum(['admin', 'user', 'guest'])),
  metadata: z.record(z.unknown()).optional()
});

type User = z.infer<typeof UserSchema>;

// Validation function
function validateUser(data: unknown): User {
  try {
    return UserSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
      throw new ValidationError(`Invalid user data: ${issues.join(', ')}`);
    }
    throw error;
  }
}

// Usage
const user = validateUser(rawData);
\`\`\`

**Explanation**: Uses Zod for runtime type validation with clear error messages.

### Pattern 4: Database Transaction Pattern
[25 lines of code...]

### Pattern 5: Event-Driven Architecture
[30 lines of code...]

### Pattern 6: Caching Strategy
[20 lines of code...]

[10 more patterns, 200+ total lines]
```

**After (in SKILL.md - minimal reference):**
```markdown
## Common Patterns

Quick reference to implementation patterns:
- Authentication Flow - Token-based auth with refresh
- Error Handling - Retry logic with exponential backoff
- Data Validation - Schema-based validation
- Database Transactions - ACID-compliant patterns
- Event-Driven - Event sourcing and CQRS
- Caching - Multi-level cache strategies

**Complete pattern library**: [REFERENCE.md](REFERENCE.md#pattern-library-complete)

**Quick example:**
\`\`\`typescript
// Retry pattern
const result = await withRetry(() => fetchData());
\`\`\`
```

**Savings**: 200+ lines → 18 lines (91% reduction, ~3,640 tokens saved)

**When to apply:**
- Multiple code patterns >15 lines each
- Pattern collection >100 lines total
- Detailed explanations for each pattern
- More than 5 distinct patterns

---

### Pattern 3: Extract Troubleshooting

**Before (in SKILL.md - consuming tokens):**
```markdown
## Troubleshooting

### Issue 1: Connection Timeout

**Symptoms**:
- Requests hanging for extended periods
- Socket timeout errors after 30-60 seconds
- Intermittent connection failures
- Error messages: "ETIMEDOUT", "ECONNREFUSED"

**Causes**:
1. Network connectivity issues
2. Firewall blocking outbound connections
3. Server overload or not responding
4. DNS resolution failures
5. Incorrect host/port configuration

**Solutions**:
1. Verify network connectivity:
   \`\`\`bash
   ping api.example.com
   telnet api.example.com 443
   \`\`\`

2. Check firewall rules:
   \`\`\`bash
   # Linux
   sudo iptables -L -n
   # macOS
   sudo pfctl -sr
   \`\`\`

3. Test DNS resolution:
   \`\`\`bash
   nslookup api.example.com
   dig api.example.com
   \`\`\`

4. Verify configuration:
   \`\`\`typescript
   console.log('Host:', process.env.API_HOST);
   console.log('Port:', process.env.API_PORT);
   \`\`\`

5. Increase timeout values:
   \`\`\`typescript
   const client = new ApiClient({
     timeout: 60000, // 60 seconds
     retries: 3
   });
   \`\`\`

6. Check server status:
   \`\`\`bash
   curl -I https://api.example.com/health
   \`\`\`

**Prevention**:
- Implement connection pooling
- Set appropriate timeout values
- Use health checks before critical operations
- Monitor network latency
- Configure retry logic with exponential backoff

### Issue 2: Authentication Failure

**Symptoms**:
- 401 Unauthorized responses
- "Invalid credentials" errors
- Token expired messages
- Access denied errors

**Causes**:
1. Incorrect credentials
2. Expired authentication tokens
3. Invalid API keys
4. Clock skew issues
5. Token refresh failures

**Solutions**:
[Similar detailed breakdown...]

### Issue 3: Rate Limiting

**Symptoms**:
- 429 Too Many Requests responses
- Throttling errors
- Requests being rejected

**Causes**:
[Detailed causes...]

**Solutions**:
[Detailed solutions...]

[20 more issues with similar detail level, 300+ total lines]
```

**After (in SKILL.md - minimal reference):**
```markdown
## Troubleshooting

Common issues and quick fixes:
1. Connection timeout → Check network and increase timeout values
2. Authentication failure → Verify credentials and token expiration
3. Rate limiting → Implement backoff and request queuing
4. Data validation errors → Check input schema
5. Performance issues → Enable caching and optimize queries

**Complete troubleshooting guide**: [REFERENCE.md](REFERENCE.md#troubleshooting-complete)

**Quick diagnostics:**
\`\`\`bash
# Check connectivity
curl -I https://api.example.com/health
\`\`\`
```

**Savings**: 300+ lines → 18 lines (94% reduction, ~5,400 tokens saved)

**When to apply:**
- More than 5 troubleshooting scenarios
- Detailed diagnostic steps >10 lines each
- Multiple solutions per issue
- Extensive prevention guidelines

---

### Pattern 4: Convert Code to Scripts

**Before (in SKILL.md - consuming tokens):**
```markdown
## Configuration Validation

Use this script to validate your complete configuration:

\`\`\`bash
#!/bin/bash
set -e

echo "========================================="
echo " Configuration Validation Script"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check database connection
echo -n "Checking database connection... "
if psql "$DATABASE_URL" -c "SELECT 1" > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
else
  echo -e "${RED}✗${NC}"
  echo "Database connection failed. Check DATABASE_URL environment variable."
  exit 1
fi

# Check Redis connection
echo -n "Checking Redis connection... "
if redis-cli -u "$REDIS_URL" ping > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
else
  echo -e "${RED}✗${NC}"
  echo "Redis connection failed. Check REDIS_URL environment variable."
  exit 1
fi

# Validate API key
echo -n "Validating API key... "
if [ -z "$API_KEY" ]; then
  echo -e "${RED}✗${NC}"
  echo "API_KEY environment variable not set."
  exit 1
else
  echo -e "${GREEN}✓${NC}"
fi

# Check file permissions
echo -n "Checking file permissions... "
if [ -r "./config.json" ] && [ -w "./logs" ]; then
  echo -e "${GREEN}✓${NC}"
else
  echo -e "${RED}✗${NC}"
  echo "Permission issues detected."
  exit 1
fi

# Validate port availability
echo -n "Checking port availability... "
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠${NC} Port 3000 already in use"
else
  echo -e "${GREEN}✓${NC}"
fi

echo ""
echo -e "${GREEN}All checks passed!${NC}"
\`\`\`

Run this before starting your application to ensure everything is configured correctly.
```

**After (in SKILL.md - script reference only):**
```markdown
## Configuration Validation

Run validation script to check your setup:
\`\`\`bash
bash .claude/skills/skill-name/scripts/validate-config.sh
\`\`\`

Checks database, Redis, API keys, permissions, and port availability.
```

**Create file**: `scripts/validate-config.sh` (with the actual script content)

```bash
chmod +x .claude/skills/skill-name/scripts/validate-config.sh
```

**Savings**: ~55 lines → 7 lines (87% reduction, ~1,100 tokens saved)

**Bonus**: Script code never enters context - only output is visible when Claude runs it

**When to apply:**
- Reusable scripts >20 lines
- Diagnostic or validation tools
- Configuration generators
- Data transformation utilities
- Setup or installation helpers

---

## Common Anti-Patterns

### ❌ Anti-Pattern 1: Monolithic Skills

**Problem**: Single SKILL.md file containing everything (1000-2000+ lines)

**Example structure:**
```
skill-name/
└── SKILL.md  (1500 lines)
    ├── Purpose (10 lines)
    ├── Quick Start (50 lines)
    ├── API Documentation (300 lines)
    ├── Examples (400 lines)
    ├── Pattern Library (350 lines)
    ├── Troubleshooting (250 lines)
    └── Advanced Topics (140 lines)
```

**Impact**:
- **Token consumption**: ~22,500-30,000 tokens loaded every time skill triggers
- **Navigation difficulty**: Hard to find specific information in large file
- **Maintenance burden**: Changes require editing massive file
- **Violates 500-line rule**: 3-4x over the limit
- **Poor user experience**: Overwhelming amount of information at once

**Solution**:
```
skill-name/
├── SKILL.md  (350 lines)
│   ├── Purpose (10 lines)
│   ├── Quick Start (50 lines)
│   ├── Common Patterns Summary (30 lines)
│   ├── Troubleshooting Summary (20 lines)
│   └── References to detailed docs (10 lines)
├── REFERENCE.md  (600 lines - API docs)
├── EXAMPLES.md  (400 lines - code examples)
├── PATTERNS.md  (350 lines - pattern library)
└── TROUBLESHOOTING.md  (250 lines - debug guide)
```

**Result**: Only 350 lines (~5,250 tokens) loaded initially, detailed docs loaded on-demand

---

### ❌ Anti-Pattern 2: Incomplete References

**Problem**: Reference files exist but aren't linked from main SKILL.md

**Example SKILL.md:**
```markdown
## API Reference

Here's how to use the API...

[No mention of REFERENCE.md which contains complete API docs]
```

**File structure:**
```
skill-name/
├── SKILL.md  (mentions "API Reference" but no link)
├── REFERENCE.md  (contains full API docs - orphaned!)
└── EXAMPLES.md  (contains examples - never discovered!)
```

**Impact**:
- **Wasted effort**: Reference files created but never used
- **Poor discoverability**: Users don't know detailed docs exist
- **Inconsistent info**: Main file may contradict reference files
- **Claude can't access**: Without explicit file paths, Claude won't read them

**Solution**:
```markdown
## API Reference

Quick reference for common operations.

**For complete API documentation**: [REFERENCE.md](REFERENCE.md#api-complete)
**For usage examples**: [EXAMPLES.md](EXAMPLES.md#api-usage)

### Quick Example
\`\`\`typescript
// Basic usage
const result = await api.call();
\`\`\`
```

**Best practice**: Every reference file should be linked at least once from SKILL.md

---

### ❌ Anti-Pattern 3: Nested References

**Problem**: References pointing to other references (>1 level deep)

**Example**:
```
SKILL.md
  → "See REFERENCE.md for details"
    → REFERENCE.md: "See ADVANCED.md for edge cases"
      → ADVANCED.md: "See DEEP_DIVE.md for implementation"
        → DEEP_DIVE.md: [actual content]
```

**Impact**:
- **Cognitive load**: Users must navigate multiple files to find information
- **Navigation complexity**: Easy to get lost in reference chain
- **Time waste**: Multiple file reads to reach actual content
- **Frustration**: "Just tell me the answer!"

**Solution**: Flat hierarchy (max 1 level)
```
SKILL.md
  → REFERENCE.md [complete reference]
  → EXAMPLES.md [all examples]
  → PATTERNS.md [all patterns]
  → TROUBLESHOOTING.md [all debugging info]
```

**Each reference file should be self-contained and comprehensive**

---

### ❌ Anti-Pattern 4: Sparse Frontmatter

**Problem**: Minimal YAML description missing critical trigger keywords

**Bad example:**
```yaml
---
name: api-helper
description: Helps with API development.
---
```

**Impact**:
- **Poor discoverability**: Skill won't trigger when relevant
- **Missed opportunities**: Users manually invoke instead of auto-suggest
- **Wasted potential**: Skill could help but isn't activated
- **Low utilization**: Skill sits unused despite being valuable

**Good example:**
```yaml
---
name: api-development
description: API development guidance for REST, GraphQL, and gRPC APIs including Express, Fastify, Node.js, TypeScript, authentication, authorization, JWT, OAuth, rate limiting, error handling, validation, middleware, routing, database integration, testing, documentation, OpenAPI, Swagger, and deployment. Use when building APIs, creating endpoints, handling requests, implementing auth, validating input, error handling, or working with HTTP, REST, GraphQL, or gRPC.
---
```

**What to include in description**:
- Technologies (Express, GraphQL, JWT, etc.)
- Use cases (building APIs, authentication, validation)
- Actions (creating, implementing, handling, validating)
- Concepts (REST, middleware, error handling, routing)
- Related terms (HTTP, endpoints, authorization, OpenAPI)

**Aim for 500-1000 characters** to maximize trigger coverage while staying under 1024 char limit

---

### ❌ Anti-Pattern 5: Code as Documentation

**Problem**: Large executable scripts embedded in markdown instead of separate files

**Bad example in SKILL.md:**
```markdown
## Database Migration Script

\`\`\`bash
#!/bin/bash
# Complete migration script (100+ lines)

set -e

echo "Starting migration..."

# [100+ lines of migration logic]
# [Connection setup]
# [Transaction handling]
# [Rollback logic]
# [Validation]
# [Cleanup]

echo "Migration complete"
\`\`\`

Copy this script to your project and run it.
```

**Impact**:
- **Token waste**: 100+ lines of script code in context every time
- **Not reusable**: Can't execute directly, must copy-paste
- **Hard to maintain**: Updates require editing SKILL.md
- **Version control issues**: Script and documentation coupled

**Good example in SKILL.md:**
```markdown
## Database Migration

Run migration script:
\`\`\`bash
bash .claude/skills/skill-name/scripts/migrate-db.sh
\`\`\`

Script handles:
- Connection validation
- Transaction management
- Automatic rollback on failure
- Post-migration verification
```

**Script in `scripts/migrate-db.sh`:**
- Executable directly by Claude via bash command
- Code never enters context
- Only script output visible
- Easy to maintain and version

---

## Complete Migration Workflow

### Phase 1: Discovery and Analysis

**Step 1.1: Identify candidate skills**
```bash
# Find all skills
find .claude/skills -name "SKILL.md" -type f

# Check sizes
for skill in .claude/skills/*/SKILL.md; do
  lines=$(wc -l < "$skill")
  name=$(basename $(dirname "$skill"))
  echo "$lines lines - $name"
done | sort -rn

# Focus on skills >500 lines
```

**Step 1.2: Analyze content structure**
```bash
# Extract section headers
grep "^##" .claude/skills/skill-name/SKILL.md

# Count lines per section
awk '/^## Section1/,/^## Section2/{count++} END{print count}' SKILL.md
```

**Step 1.3: Identify extraction candidates**

Sections to extract if >30 lines:
- API documentation
- Code examples (multiple >20 lines)
- Pattern libraries
- Troubleshooting guides
- Reference tables
- Configuration details
- Advanced topics

**Step 1.4: Create optimization plan**

Document:
- Current line count
- Target line count (<500)
- Sections to extract
- New reference files needed
- Scripts to create
- Estimated token savings

---

### Phase 2: Structure Planning

**Step 2.1: Design file hierarchy**

```
skill-name/
├── SKILL.md              # <500 lines - core workflow
├── REFERENCE.md          # API docs, detailed reference
├── EXAMPLES.md           # Code examples
├── PATTERNS.md           # Pattern library (if needed)
├── TROUBLESHOOTING.md    # Debug guide (if needed)
└── scripts/              # Executable utilities
    ├── validate.sh
    └── setup.sh
```

**Step 2.2: Plan content distribution**

**SKILL.md should contain:**
- Purpose and scope (1-2 paragraphs)
- When to use (bulleted list)
- Quick start workflow (5-10 steps)
- Common patterns (summaries only)
- Troubleshooting (summaries only)
- Cross-references to detailed docs

**Reference files should contain:**
- Complete API documentation
- Detailed examples with explanations
- Comprehensive pattern library
- Full troubleshooting procedures
- Advanced topics and edge cases

**Scripts should contain:**
- Reusable validation/setup logic
- Configuration generators
- Diagnostic tools
- Data transformation utilities

---

### Phase 3: Implementation

**Step 3.1: Create reference file structure**
```bash
cd .claude/skills/skill-name

# Create reference files
touch REFERENCE.md EXAMPLES.md
mkdir -p scripts

# Add table of contents templates
cat > REFERENCE.md <<'EOF'
# [Skill Name] Reference

Complete reference documentation.

## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)

## Section 1
...
EOF
```

**Step 3.2: Extract content systematically**

Process for each section:
1. **Copy section to reference file** (preserve formatting)
2. **Replace in SKILL.md with summary + link**
3. **Verify link path is correct**
4. **Remove detailed content from SKILL.md**
5. **Test navigation works**

**Example extraction:**
```bash
# Before: Section in SKILL.md (80 lines)
## API Reference
[80 lines of detailed API docs]

# After: Summary in SKILL.md (5 lines)
## API Reference

Quick reference: `processData()`, `validateInput()`, `formatOutput()`

**Complete API docs**: [REFERENCE.md](REFERENCE.md#api-reference)

# Content moved to REFERENCE.md
## API Reference

[Original 80 lines of detailed API docs]
```

**Step 3.3: Convert scripts**
```bash
# Extract embedded scripts
# Find scripts in SKILL.md
grep -A 50 '```bash' SKILL.md

# Create script file
cat > scripts/validate.sh <<'EOF'
#!/bin/bash
[script content]
EOF

# Make executable
chmod +x scripts/validate.sh

# Replace in SKILL.md
\`\`\`bash
bash .claude/skills/skill-name/scripts/validate.sh
\`\`\`
```

**Step 3.4: Update cross-references**

Ensure all references use relative paths:
```markdown
✅ Correct: [Details](REFERENCE.md#section)
✅ Correct: [Examples](EXAMPLES.md#example-1)
✅ Correct: Run `scripts/validate.sh`

❌ Wrong: [Details](../skill-name/REFERENCE.md#section)
❌ Wrong: [Examples](/full/path/EXAMPLES.md)
```

---

### Phase 4: Optimization

**Step 4.1: Trim remaining content**

After extractions, optimize what remains:
- Remove verbose explanations → concise bullets
- Combine related bullet points
- Use tables instead of paragraphs
- Remove redundant examples
- Condense repeated concepts

**Before:**
```markdown
The API provides several methods for data processing. The first method is processData which takes input and returns processed output. This method is very useful when you need to transform data. The second method is validateInput which checks if the input meets requirements. This is important to run before processing.
```

**After:**
```markdown
API methods:
- `processData()` - Transform input data
- `validateInput()` - Check input requirements
```

**Step 4.2: Optimize frontmatter**

Extract all key terms from content:
```bash
# Extract common terms
grep -o '\*\*[^*]*\*\*' SKILL.md | sort | uniq

# Build description with:
# - Technology names
# - Action verbs
# - Use cases
# - File types
# - Related concepts
```

**Step 4.3: Add navigation aids**

If SKILL.md is still >300 lines, add table of contents:
```markdown
# Skill Name

## Table of Contents
- [Quick Start](#quick-start)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Reference Docs](#reference-docs)

## Quick Start
...
```

Add to reference files >100 lines:
```markdown
# Reference Documentation

## Table of Contents
[...]
```

---

### Phase 5: Validation

**Step 5.1: Verify line counts**
```bash
# Check SKILL.md is under 500
wc -l .claude/skills/skill-name/SKILL.md

# Calculate total lines
find .claude/skills/skill-name -name "*.md" -exec wc -l {} \; | awk '{sum+=$1} END{print sum, "total lines"}'

# Before/after comparison
echo "Before: $BEFORE_LINES lines"
echo "After: $AFTER_LINES lines"
echo "Saved: $((BEFORE_LINES - AFTER_LINES)) lines (~$((( BEFORE_LINES - AFTER_LINES) * 20)) tokens)"
```

**Step 5.2: Test links**
```bash
# Extract all markdown links
grep -o '\[.*\](.*\.md#.*)' SKILL.md

# Verify files exist
for file in REFERENCE.md EXAMPLES.md PATTERNS.md; do
  [ -f "$file" ] && echo "✓ $file" || echo "✗ $file missing"
done

# Verify anchors exist
# (manually check that #section-name anchors match headers)
```

**Step 5.3: Validate content completeness**

Checklist:
- [ ] All original information preserved (in SKILL.md or reference files)
- [ ] No broken links
- [ ] All reference files linked from SKILL.md
- [ ] Scripts are executable and work correctly
- [ ] Table of contents accurate for files >100 lines
- [ ] YAML frontmatter includes all trigger keywords

**Step 5.4: Test with real usage**

Manually test skill:
1. Trigger skill with typical prompt
2. Verify SKILL.md provides sufficient quick reference
3. Navigate to reference file for details
4. Verify reference file has complete information
5. Test scripts execute correctly

---

### Phase 6: Documentation

**Step 6.1: Update skill documentation**

If migration involved significant restructuring, document changes:
```markdown
# Skill Name

## Recent Updates
- **2025-11-09**: Optimized for progressive disclosure
  - Reduced SKILL.md from 850 to 420 lines
  - Created REFERENCE.md for API docs
  - Created EXAMPLES.md for code examples
  - Extracted scripts to scripts/ directory
  - Estimated token savings: ~8,600 tokens
```

**Step 6.2: Share patterns learned**

Document any unique optimization techniques discovered:
- Novel extraction patterns
- Effective summary techniques
- Script conversion strategies
- Navigation improvements

---

## Advanced Optimization Techniques

### Technique 1: Conditional Content Loading

**Concept**: Structure content so advanced/optional sections are only loaded when explicitly needed

**Implementation pattern:**
```markdown
## Feature Overview

Basic usage covers 80% of use cases.

**Quick start:**
\`\`\`typescript
basicUsage();
\`\`\`

**Advanced scenarios** (for edge cases and complex requirements):
- Multi-tenant configuration → [ADVANCED.md](ADVANCED.md#multi-tenant)
- Custom authentication → [ADVANCED.md](ADVANCED.md#custom-auth)
- Performance tuning → [ADVANCED.md](ADVANCED.md#performance)
- Enterprise deployment → [ADVANCED.md](ADVANCED.md#enterprise)
```

**Benefits**:
- Most users never load advanced content
- Advanced users can easily find detailed docs
- Clear separation of concerns
- Reduces cognitive load for beginners

**When to use**:
- Content has distinct basic vs advanced levels
- Advanced content is >30% of total
- Most users won't need advanced features

---

### Technique 2: Layered Examples

**Concept**: Progressive complexity in examples

**Implementation:**
```markdown
## Examples

### Level 1: Minimal Example (most common)
\`\`\`typescript
const result = await api.call({ id: '123' });
\`\`\`

### Level 2: Production Example
Production-ready with error handling: [EXAMPLES.md](EXAMPLES.md#production)

### Level 3: Enterprise Example
Complete implementation with auth, retry, logging: [EXAMPLES.md](EXAMPLES.md#enterprise)
```

**In EXAMPLES.md:**
```markdown
## Production Example

\`\`\`typescript
async function callApi(id: string) {
  try {
    return await api.call({ id });
  } catch (error) {
    logger.error('API call failed', { id, error });
    throw error;
  }
}
\`\`\`

## Enterprise Example

\`\`\`typescript
// [50+ lines of enterprise-grade implementation]
\`\`\`
```

**Benefits**:
- Beginners see simple examples immediately
- Advanced users can access complex examples
- Gradual learning curve
- SKILL.md stays minimal

---

### Technique 3: Executable Documentation

**Concept**: Scripts that both execute and document behavior

**Example script**: `scripts/check-setup.sh`
```bash
#!/bin/bash
# Diagnostic script that explains what it's checking

echo "=== Setup Validation ==="
echo ""

echo "[1/5] Checking Node.js version..."
node_version=$(node -v)
echo "       Found: $node_version"
if [[ "$node_version" =~ v1[89]|v2[0-9] ]]; then
  echo "       ✓ Node.js version compatible"
else
  echo "       ✗ Node.js 18+ required"
  exit 1
fi

echo ""
echo "[2/5] Checking package manager..."
if command -v pnpm >/dev/null 2>&1; then
  echo "       ✓ pnpm installed"
else
  echo "       ✗ pnpm not found - install with: npm install -g pnpm"
  exit 1
fi

echo ""
echo "[3/5] Checking environment variables..."
required_vars=("DATABASE_URL" "REDIS_URL" "API_KEY")
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "       ✗ $var not set"
    missing=true
  else
    echo "       ✓ $var configured"
  fi
done
[[ -z "$missing" ]] || exit 1

echo ""
echo "[4/5] Checking database connection..."
if psql "$DATABASE_URL" -c "SELECT 1" >/dev/null 2>&1; then
  echo "       ✓ Database accessible"
else
  echo "       ✗ Cannot connect to database"
  exit 1
fi

echo ""
echo "[5/5] Checking file permissions..."
if [ -w "./logs" ]; then
  echo "       ✓ Write permissions OK"
else
  echo "       ✗ Cannot write to ./logs directory"
  exit 1
fi

echo ""
echo "✅ All checks passed! Ready to start."
```

**In SKILL.md:**
```markdown
## Setup Validation

Verify your environment is configured correctly:
\`\`\`bash
bash .claude/skills/skill-name/scripts/check-setup.sh
\`\`\`

Checks Node.js version, package manager, environment variables, database connection, and permissions.
```

**Benefits**:
- Self-documenting (output explains what's being checked)
- Executable (Claude can run it directly)
- Zero token cost (code doesn't enter context)
- Reusable (can run multiple times)
- Maintainable (script separate from docs)

---

### Technique 4: Tabular Compression

**Concept**: Use tables to compress information

**Before (verbose list - 20 lines):**
```markdown
## Configuration Options

### Option: timeout
- Type: number
- Default: 30000
- Description: Request timeout in milliseconds
- Valid range: 1000-300000

### Option: retries
- Type: number
- Default: 3
- Description: Number of retry attempts
- Valid range: 0-10

[More options...]
```

**After (table - 8 lines):**
```markdown
## Configuration Options

| Option | Type | Default | Range | Description |
|--------|------|---------|-------|-------------|
| timeout | number | 30000 | 1000-300000 | Request timeout (ms) |
| retries | number | 3 | 0-10 | Retry attempts |
| maxSize | number | 1048576 | 1024-10485760 | Max payload size (bytes) |
| cache | boolean | true | - | Enable response caching |
```

**Savings**: 20 lines → 8 lines (60% reduction)

**When to use**:
- Structured data (configurations, options, parameters)
- Repetitive format across multiple items
- Quick reference needed
- Space constraints

---

### Technique 5: Smart Chunking

**Concept**: Group related small sections instead of individual extraction

**Before (scattered references):**
```markdown
## Topic A
Brief content...
**Details**: [REF.md](REF.md#topic-a)

## Topic B
Brief content...
**Details**: [REF.md](REF.md#topic-b)

## Topic C
Brief content...
**Details**: [REF.md](REF.md#topic-c)
```

**After (grouped):**
```markdown
## Related Topics

Quick overview:
- **Topic A**: Brief summary
- **Topic B**: Brief summary
- **Topic C**: Brief summary

**Complete documentation**: [REFERENCE.md](REFERENCE.md#related-topics)
```

**Benefits**:
- Fewer cross-references to manage
- Better narrative flow
- Easier navigation
- Less repetitive linking

---

## Measurement & Validation

### Token Estimation Methods

**Method 1: Line-based estimation**
```bash
# Count lines
lines=$(wc -l < SKILL.md)

# Estimate tokens (conservative: 20 tokens/line, aggressive: 15 tokens/line)
tokens_conservative=$((lines * 20))
tokens_aggressive=$((lines * 15))

echo "Estimated tokens: $tokens_aggressive - $tokens_conservative"
```

**Method 2: Character-based estimation**
```bash
# Count characters
chars=$(wc -m < SKILL.md)

# Estimate tokens (rough: 1 token ≈ 4 characters)
tokens=$((chars / 4))

echo "Estimated tokens: $tokens"
```

**Method 3: Word-based estimation**
```bash
# Count words
words=$(wc -w < SKILL.md)

# Estimate tokens (rough: 1 token ≈ 0.75 words)
tokens=$((words * 4 / 3))

echo "Estimated tokens: $tokens"
```

**Reality check**: Actual token count varies by content type
- Code: ~25-30 tokens/line
- Markdown text: ~15-20 tokens/line
- Tables: ~10-15 tokens/line
- Comments: ~12-18 tokens/line

---

### Before/After Analysis

**Comprehensive comparison script:**
```bash
#!/bin/bash
# optimization-metrics.sh

SKILL_NAME=$1

echo "Optimization Metrics for $SKILL_NAME"
echo "======================================"

# Before metrics (from git history or backup)
BEFORE_LINES=$(git show HEAD~1:.claude/skills/$SKILL_NAME/SKILL.md | wc -l)
BEFORE_CHARS=$(git show HEAD~1:.claude/skills/$SKILL_NAME/SKILL.md | wc -m)

# After metrics (current)
AFTER_LINES=$(wc -l < .claude/skills/$SKILL_NAME/SKILL.md)
AFTER_CHARS=$(wc -m < .claude/skills/$SKILL_NAME/SKILL.md)

# Calculate savings
LINE_SAVINGS=$((BEFORE_LINES - AFTER_LINES))
CHAR_SAVINGS=$((BEFORE_CHARS - AFTER_CHARS))
TOKEN_SAVINGS=$((LINE_SAVINGS * 20))  # Conservative estimate

# Calculate percentages
LINE_PCT=$((LINE_SAVINGS * 100 / BEFORE_LINES))
CHAR_PCT=$((CHAR_SAVINGS * 100 / BEFORE_CHARS))

echo ""
echo "Lines:    $BEFORE_LINES → $AFTER_LINES (saved $LINE_SAVINGS, ${LINE_PCT}%)"
echo "Chars:    $BEFORE_CHARS → $AFTER_CHARS (saved $CHAR_SAVINGS, ${CHAR_PCT}%)"
echo "Tokens:   ~$((BEFORE_LINES * 20)) → ~$((AFTER_LINES * 20)) (saved ~$TOKEN_SAVINGS)"
echo ""

# New reference files
echo "New reference files:"
for file in .claude/skills/$SKILL_NAME/*.md; do
  if [ "$file" != ".claude/skills/$SKILL_NAME/SKILL.md" ]; then
    lines=$(wc -l < "$file")
    name=$(basename "$file")
    echo "  - $name: $lines lines"
  fi
done

echo ""
echo "Total documentation lines: $(find .claude/skills/$SKILL_NAME -name "*.md" -exec wc -l {} + | tail -1 | awk '{print $1}')"
```

**Usage:**
```bash
bash optimization-metrics.sh skill-name
```

---

### Quality Validation Checklist

After optimization, verify quality hasn't degraded:

**Content Integrity:**
- [ ] All original information preserved
- [ ] No loss of critical details
- [ ] Examples still complete and correct
- [ ] No broken workflows or procedures

**Navigation:**
- [ ] All cross-references work
- [ ] Reference files are discoverable
- [ ] Table of contents accurate
- [ ] Clear path from overview to details

**Usability:**
- [ ] SKILL.md provides sufficient quick reference
- [ ] Common use cases covered in main file
- [ ] Advanced topics clearly marked
- [ ] Scripts executable and functional

**Technical:**
- [ ] SKILL.md < 500 lines
- [ ] YAML description < 1024 chars
- [ ] All trigger keywords included
- [ ] File hierarchy is flat (max 1 level)
- [ ] Scripts have proper permissions (chmod +x)

**Performance:**
- [ ] Reduced token consumption
- [ ] Faster initial load
- [ ] Reference files load only when needed
- [ ] No duplicate content

---

### Success Metrics

**Quantitative:**
- Line count reduction: Target >50%
- Token savings: Target >5,000 tokens
- File count: 3-5 organized files better than 1 monolithic
- Load time: Faster initial context load

**Qualitative:**
- User feedback: Easier to navigate?
- Claude feedback: More relevant?
- Maintenance: Easier to update?
- Discoverability: Better trigger rate?

**Track over time:**
```bash
# Create metrics log
cat >> .claude/skills/optimization-log.txt <<EOF
$(date): Optimized $SKILL_NAME
  Before: $BEFORE_LINES lines
  After: $AFTER_LINES lines
  Savings: $TOKEN_SAVINGS tokens (~${LINE_PCT}%)
  Files: SKILL.md, REFERENCE.md, EXAMPLES.md
EOF
```

---

**End of Reference Documentation**

For quick reference and workflows, see main [SKILL.md](SKILL.md)
