# SVG Icon Component Implementation Plan

## Current Issues
1. SVG files contain specific brand color configurations that aren't properly reflected in components
2. Current implementation tries to handle both brand colors and custom colors in a single component
3. Color mappings exist but aren't being utilized effectively
4. Some SVGs have multiple colors or gradients that aren't properly handled

## Solution Plan

### 1. Component Structure
- Create two versions of each logo component:
  - `[Name]Logo.tsx` - Basic version with customizable fill color
  - `[Name]ColorLogo.tsx` - Brand-colored version that uses original SVG colors

### 2. Types and Interfaces
```typescript
// types.ts
interface BaseLogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

interface CustomizableLogoProps extends BaseLogoProps {
  color?: string;
}

interface BrandLogoProps extends BaseLogoProps {
  // No color prop - uses brand colors only
}
```

### 3. Implementation Steps
1. Create script to generate both versions of components:
   ```typescript
   // scripts/generate-logo-components.ts
   function generateComponents() {
     // For each SVG in public/svg/logos:
     // 1. Parse SVG and extract color information
     // 2. Generate ColorLogo version with original colors
     // 3. Generate basic Logo version with customizable fill
     // 4. Update index.ts exports
   }
   ```

2. Example Component Structure:
   ```typescript
   // FigmaLogo.tsx (Customizable)
   export const FigmaLogo = ({ size = 24, color, ...props }: CustomizableLogoProps) => (
     <svg width={size} height={size} viewBox="0 0 32 32" {...props}>
       <g fill={color || 'currentColor'}>
         {/* SVG paths */}
       </g>
     </svg>
   );

   // FigmaColorLogo.tsx (Brand Colors)
   export const FigmaColorLogo = ({ size = 24, ...props }: BrandLogoProps) => (
     <svg width={size} height={size} viewBox="0 0 32 32" {...props}>
       <g>
         <path fill="#19bcfe" d="..." />
         <path fill="#09cf83" d="..." />
         <path fill="#a259ff" d="..." />
         <path fill="#f24e1e" d="..." />
         <path fill="#ff7262" d="..." />
       </g>
     </svg>
   );
   ```

### 4. Color Handling
1. For brand-colored versions:
   - Preserve all original colors from SVG
   - Handle gradients and multiple colors
   - Keep defs and other special SVG elements

2. For customizable versions:
   - Convert all paths to use single fill color
   - Remove unnecessary color-specific elements
   - Simplify SVG structure where possible

### 5. Implementation Script
```bash
#!/bin/bash
# scripts/update-logo-components.sh

# 1. Parse color SVGs
# 2. Generate both component versions
# 3. Update exports
# 4. Run prettier
# 5. Update color-mappings.ts
```

### 6. Testing Plan
1. Create test page showing all logos in:
   - Brand colors
   - Custom colors
   - Different sizes
   - Different backgrounds

### 7. Migration Steps
1. Create new components without removing existing ones
2. Update imports in existing code gradually
3. Add deprecation warnings to old components
4. Remove old components once migration is complete

## Next Steps
1. Create script to parse SVG files and extract color information
2. Generate component templates for both versions
3. Update build and test process
4. Create documentation for new component usage
