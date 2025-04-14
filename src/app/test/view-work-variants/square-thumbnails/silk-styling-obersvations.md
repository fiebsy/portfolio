# Silk Styling Observations & Best Practices

This document captures key observations and best practices for styling Silk components, specifically focusing on Sheet and SheetStack components.

## General Structure & Approach

### Component Architecture

Silk components typically follow a nested structure:

```jsx
<Sheet.Root>
  <Sheet.Portal>
    <Sheet.View>
      <Sheet.Backdrop />
      <Sheet.Content>
        <Sheet.BleedingBackground /> {/* Optional */}
        <CustomInnerContent />
      </Sheet.Content>
    </Sheet.View>
  </Sheet.Portal>
</Sheet.Root>
```

### CSS Structure Pattern

For reliable styling, follow this nested structure pattern:

1. **Outer View Container** (Sheet.View): Controls dimensions, positioning, and z-index
2. **Content Container** (Sheet.Content): Controls height/width of the visible panel
3. **Inner Content Container**: Provides background, borders, and content layout
4. **Header/Body Sections**: Organize content into logical areas with specific styling

## Height Control

### Sheet.View Height

```css
.CustomSheet-view {
  /* Accounts for iOS Safari's bottom UI and ensures full height */
  height: calc(var(--silk-100-lvh-dvh-pct) + 60px);
  z-index: 1;
}
```

Key points:

- `--silk-100-lvh-dvh-pct` is a special Silk variable that handles viewport inconsistencies
- Adding `60px` ensures content is visible below iOS Safari's UI
- This approach is more reliable than using `100vh` directly

### Sheet.Content Height

```css
.CustomSheet-content {
  /* Limiting height with fallback for smaller screens */
  height: calc(min(800px, 85svh) + env(safe-area-inset-bottom, 0px));
}
```

Key points:

- Use `min()` to set a maximum height that scales down on smaller screens
- `85svh` limits to 85% of the small viewport height (better than `vh` units)
- `env(safe-area-inset-bottom, 0px)` accounts for notches on newer devices
- Adjust the fixed pixel value (800px) to control maximum sheet height

## Placement & Positioning

### Bottom Sheets

```css
.CustomSheet-content {
  /* For bottom sheets */
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
```

Key points:

- Center horizontally with `margin: 0 auto`
- Use `max-width` to control maximum width on larger screens
- No special positioning needed beyond `contentPlacement="bottom"` in JSX

### Side Sheets (Right/Left)

For side sheets (not used in our implementation), use:

```css
.CustomSheet-content.contentPlacement-right {
  height: 100%;
  width: min(80%, 700px);
}
```

## Animation Techniques

### Using stackingAnimation

In the React component:

```jsx
stackingAnimation={{
  translateY: ({ progress }) => progress * -10 + 'px',
  scale: [1, 0.933] as [number, number],
  transformOrigin: '50% 0',
}}
```

Key points:

- Use function syntax for complex animations: `({ progress }) => expression`
- Use array syntax `[start, end]` for simple transforms
- Set `transformOrigin` to control scaling point (important for natural motion)
- Use TypeScript assertion (`as [number, number]`) to avoid type errors

### Using travelAnimation

For backdrop animations:

```jsx
<Sheet.Backdrop travelAnimation={{ opacity: [0, 0.33] }} />
```

Key points:

- Simple opacity changes work well with array syntax
- Lower maximum opacity (0.33) creates a subtle dimming effect
- Can be applied to any sheet component, not just backdrop

## Inner Content Structure

```jsx
<div className="CustomSheet-innerContent">
  <div className="CustomSheet-header">{/* Header content */}</div>
  <div className="CustomSheet-body">{/* Main content, may need scrolling */}</div>
</div>
```

```css
.CustomSheet-innerContent {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.75rem;
  overflow: clip;
  background-color: white;
  box-shadow: /* ... */;
}

.CustomSheet-body {
  overflow-y: auto; /* Enable scrolling */
}
```

Key points:

- Use CSS Grid for reliable header/body relationships
- `grid-template-rows: auto 1fr` ensures header takes minimum space
- Apply `overflow-y: auto` to body only, not the entire content
- Keep border radius on the innermost container to ensure proper masking

## Responsive Considerations

For responsive layouts:

1. Use `useClientMediaQuery` to adapt placement based on viewport size
2. Conditionally apply different animations based on orientation
3. Use different CSS classes with media queries for more complex styling

Example responsive pattern:

```jsx
const largeViewport = useClientMediaQuery('(min-width: 700px)');
const contentPlacement = largeViewport ? 'right' : 'bottom';
```

## Sheet Stacking

When working with SheetStack:

1. Make sure sheet components are correctly associated using `forComponent`
2. Adjust appearance/scale of background sheets when stacked
3. Use consistent z-index management with SheetStack.Outlet

## Special Cases

### Fixed Height Sheet

For fixed height sheet ignoring viewport, replace:

```css
height: calc(min(800px, 85svh) + env(safe-area-inset-bottom, 0px));
```

with direct pixel value:

```css
height: 1000px;
overflow-y: auto;
```

### Theme Color Dimming

For backdrop that adjusts meta theme-color:

```jsx
<Sheet.Backdrop themeColorDimming="auto" />
```

Requires:

- Meta tag with theme-color in RGB format
- Backdrop with non-transparent background-color

## Common Issues & Solutions

1. **Height Calculation Issues**:

   - Always use `--silk-100-lvh-dvh-pct` for reliable height calculation
   - Add extra padding (60px) for iOS Safari compatibility

2. **Stacking Animation Bugs**:

   - Use TypeScript assertion `as [number, number]` for scale array values
   - Use detailed type for progress parameter: `({ progress }: { progress: number })`

3. **Overflow Issues**:

   - Apply `overflow: clip` to container with border-radius
   - Use `overflow-y: auto` only on scrollable content areas

4. **iOS Safe Area**:
   - Include `env(safe-area-inset-bottom, 0px)` in height calculations
   - Use fallback values for browsers that don't support env()

## Safari-Specific Issues

### Theme Color Dimming Errors

If you encounter errors like:

```
getAndStoreUnderlyingThemeColorAsRGBArray
updateThemeColorDimmingOverlay
```

Fix them by:

1. **Set explicit RGB theme color**:

   ```jsx
   <Head>
     <meta name="theme-color" content="rgb(255, 255, 255)" />
   </Head>
   ```

   - Must use `rgb()` format, not hex or named colors
   - Must include the values in parentheses

2. **Provide explicit backdrop background color**:

   ```css
   .CustomSheet-backdrop {
     background-color: rgb(0, 0, 0);
   }
   ```

   - Must use an RGB color without alpha channel
   - Apply this via a custom class

3. **Disable theme color dimming if persistent errors occur**:

   ```jsx
   <Sheet.Backdrop themeColorDimming={false} travelAnimation={{ opacity: [0, 0.33] }} />
   ```

4. **Common causes of Safari theme color errors**:
   - Missing RGB format for theme-color meta tag
   - Using hex colors instead of RGB format
   - Not providing background-color for backdrop
   - Using background-color with alpha channel
