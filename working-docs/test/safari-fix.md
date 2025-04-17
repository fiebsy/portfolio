# Safari Fix for Silk Sheet Components

## Issue

When using `@silk-hq/components` Sheet components with `themeColorDimming="auto"` property on the `Sheet.Backdrop`, the following errors can occur in Safari:

```
getAndStoreUnderlyingThemeColorAsRGBArray@...
updateThemeColorDimmingOverlay@...
PortfolioSheetDemo@...
ClientPageRoot@...
```

These errors are related to the theme color dimming functionality in Silk sheets when running in Safari, particularly in iOS SFSafariViewController environments.

## Solution

To fix this issue, replace the `themeColorDimming="auto"` approach with a custom CSS solution:

1. Remove the `themeColorDimming="auto"` property from all `Sheet.Backdrop` components.

2. Add a data attribute to each backdrop for targeting with CSS:

   ```jsx
   <Sheet.Backdrop
     data-sheet-backdrop
     travelAnimation={{
       opacity: ({ progress }) => Math.min(progress * 0.33, 0.33),
     }}
   />
   ```

3. Add a custom CSS rule to style all backdrops with a consistent background color, but allow opacity animation:
   ```css
   [data-sheet-backdrop] {
     background-color: rgba(0, 0, 0, 1) !important;
   }
   ```

This approach bypasses the problematic theme color dimming implementation and uses a direct CSS approach to achieve the same visual effect, while preserving the animation.

## Example Implementation

```jsx
// Add to your stylesheet or style tag
const sheetStyles = `
  /* Add backdrop styling - allow opacity animation */
  [data-sheet-backdrop] {
    background-color: rgba(0, 0, 0, 1) !important;
  }
`;

// In your component
return (
  <div>
    <style>{sheetStyles}</style>

    <Sheet.Root>
      <Sheet.Portal>
        <Sheet.View>
          {/* Updated backdrop with animation */}
          <Sheet.Backdrop
            data-sheet-backdrop
            travelAnimation={{
              opacity: ({ progress }) => Math.min(progress * 0.33, 0.33),
            }}
          />
          <Sheet.Content>{/* Sheet content */}</Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  </div>
);
```

## Why This Works

This solution works because:

1. It bypasses the Silk component's internal handling of theme colors which has compatibility issues in Safari.
2. The `travelAnimation` prop allows the opacity to animate properly as the sheet enters and exits.
3. We're using solid black (rgba(0, 0, 0, 1)) with the component controlling the opacity animation, rather than a semi-transparent color with fixed opacity.

## Additional Notes

- Adjust the `background-color` value to match your design system.
- This solution can be applied to all Silk Sheet components in your application.
- The opacity value can be adjusted if you need a different level of dimming.
