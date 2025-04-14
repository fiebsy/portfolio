# Sheet Stacking Implementation Guide

## Overview

This guide explains how to implement stacked sheets with expandable content using Silk components. The implementation focuses on a fixed-scale approach that avoids the complexities of progress-based animations while providing a smooth user experience.

## Core Components

- `SheetStack.Root`: Manages the collection of stacked sheets
- `Sheet.Root`: Individual sheets with state management
- `Sheet.Content`: Containers for the content of each sheet

## Implementation Approaches

### 1. State-Based Animation (Current Implementation)

The current implementation uses a state-based approach rather than a progress-based approach:

```tsx
// Calculate if the first sheet should be scaled down (when any child sheet is active)
const isFirstSheetScaled = activeSheets.includes('second') || activeSheets.includes('third');

// Apply the transform directly with inline styles
<Sheet.Content
  style={{
    transform: isFirstSheetScaled ? 'translateY(-10px) scale(0.933)' : 'none',
    transformOrigin: '50% 0',
    transition: 'transform 0.3s ease 0.05s'
  }}
>
```

**Advantages:**

- Simpler implementation
- Consistent scaling regardless of scroll position
- More predictable behavior
- Better compatibility with multiple stacked sheets

### 2. Progress-Based Animation (Alternative)

The Silk documentation shows a more complex progress-based approach:

```tsx
// Define stacking animation
const stackingAnimation: SheetContentProps['stackingAnimation'] = {
  translateY: ({ progress }: { progress: number }) =>
    progress <= 1 ? progress * -10 + 'px' : `calc(-12.5px + 2.5px * ${progress})`,
  scale: [1, 0.933] as [number, number],
  transformOrigin: '50% 0',
};

// Apply to SheetStack.Outlet or Sheet.Content
<SheetStack.Outlet stackingAnimation={stackingAnimation} />;
```

**Disadvantages:**

- More complex implementation
- Animation varies based on sheet scroll progress
- Less predictable with multiple sheets
- May not scale consistently across different sheet heights

## Detent Configuration

The implementation uses absolute viewport calculations to ensure proper sizing:

```tsx
const sheetDetents = [
  'calc(var(--silk-100-lvh-dvh-pct) * 0.3)', // 30% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.6)', // 60% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.9)', // 90% of full viewport
];
```

This ensures that the sheet heights are calculated against the full viewport rather than any containing elements.

## Sheet Stacking Logic

The `useEffect` hook ensures proper sheet ordering:

```tsx
useEffect(() => {
  // Ensure "first" sheet is open if second or third is active
  if (
    (activeSheets.includes('second') || activeSheets.includes('third')) &&
    !activeSheets.includes('first')
  ) {
    setActiveSheets((prev) => ['first', ...prev.filter((s) => s !== 'first')]);
  }
}, [activeSheets]);
```

This guarantees that the base sheet is always open when any child sheet is active.

## Content Scrolling

Content scrolling is managed through proper container structure:

```tsx
{
  /* Fixed Header Section */
}
<div className="p-4 border-b border-gray-200">
  <Sheet.Handle className="mb-4" />
  <Sheet.Title className="text-xl font-bold">Project A</Sheet.Title>
  <Sheet.Description className="text-gray-600 mt-1">
    Interactive design prototype details
  </Sheet.Description>
</div>;

{
  /* Scrollable Content Section */
}
<div className="flex-1">
  <div className="p-4 space-y-6">{/* Content here */}</div>
</div>;
```

## Height Management

Sheet heights are managed through detent state:

```tsx
// Sheet state
const [secondSheetDetent, setSecondSheetDetent] = useState(1); // Start at 30%

// Sheet configuration
<Sheet.Root
  activeDetent={secondSheetDetent}
  onActiveDetentChange={setSecondSheetDetent}
  defaultActiveDetent={1}
>
```

## Switching Between Versions

To switch between the state-based and progress-based approaches:

### To use state-based (current):

1. Define a state variable like `isFirstSheetScaled`
2. Apply transforms directly to the `Sheet.Content` with inline styles
3. Add a transition for smoothness

### To use progress-based:

1. Define a `stackingAnimation` object with transform calculations
2. Apply it to the `SheetStack.Outlet` or `Sheet.Content` components
3. Remove the inline style transforms

## Best Practices

1. **Use absolute viewport units**: Always use `var(--silk-100-lvh-dvh-pct)` instead of `vh` units.
2. **Fixed vs. scrollable content**: Split sheet content into fixed and scrollable sections.
3. **Consistent styling**: Maintain visual consistency while providing clear distinctions between sheets.
4. **Height feedback**: Show users the current height of expandable sheets.
5. **Smooth transitions**: Add a small delay (0.05s) to transform transitions for a more polished feel.
