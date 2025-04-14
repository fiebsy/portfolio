# SimpleSquircle Component Documentation

The `SimpleSquircle` component creates iOS-style containers with smooth, continuously curved corners (squircles) instead of standard CSS border-radius. This creates a more natural and elegant appearance for UI elements.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Styling Guide](#styling-guide)
- [Sizing & Dimensions](#sizing--dimensions)
- [Borders & Outlines](#borders--outlines)
- [Hover Effects & Animations](#hover-effects--animations)
- [Technical Implementation](#technical-implementation)
- [Performance Considerations](#performance-considerations)
- [Examples](#examples)

## Basic Usage

Import the component and use it as a container:

```tsx
import { SimpleSquircle } from '@/components/ui/simple-squircle';

export default function MyComponent() {
  return (
    <SimpleSquircle className="bg-white p-4" roundnessLevel={2} width="100%">
      Your content here
    </SimpleSquircle>
  );
}
```

## Props Reference

### Core Props

| Prop        | Type                  | Default  | Description                                               |
| ----------- | --------------------- | -------- | --------------------------------------------------------- |
| `className` | `string`              | `''`     | Apply CSS classes to the inner content element            |
| `width`     | `string \| number`    | `'auto'` | Width of the component (number = px, string = CSS value)  |
| `height`    | `string \| number`    | `'auto'` | Height of the component (number = px, string = CSS value) |
| `padding`   | `string \| number`    | `'1rem'` | Inner padding (number = px, string = CSS value)           |
| `style`     | `React.CSSProperties` | `{}`     | Additional inline styles for container                    |
| `as`        | `React.ElementType`   | `'div'`  | HTML element or component to render as                    |

### Shape Props

| Prop                      | Type                                    | Default      | Description                                                             |
| ------------------------- | --------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| `roundnessLevel`          | `1 \| 2 \| 3 \| 4`                      | `1`          | Controls corner roundness (1=most round, 4=least round)                 |
| `borderRadius`            | `string \| number`                      | _from level_ | Custom border radius (only used if `roundnessLevel` not provided)       |
| `cornerSmoothing`         | `'ios' \| 'medium' \| 'high' \| number` | _from level_ | Corner smoothing algorithm (only used if `roundnessLevel` not provided) |
| `borderRadiusTopLeft`     | `number`                                | _from level_ | Custom top-left corner radius                                           |
| `borderRadiusTopRight`    | `number`                                | _from level_ | Custom top-right corner radius                                          |
| `borderRadiusBottomRight` | `number`                                | _from level_ | Custom bottom-right corner radius                                       |
| `borderRadiusBottomLeft`  | `number`                                | _from level_ | Custom bottom-left corner radius                                        |
| `pointsPerCorner`         | `number`                                | _from level_ | Controls number of points used to draw curves                           |

### Border Props

| Prop          | Type                              | Default     | Description                                          |
| ------------- | --------------------------------- | ----------- | ---------------------------------------------------- |
| `border`      | `boolean \| number`               | `false`     | Enable border (boolean = 2px, number = custom width) |
| `borderColor` | `string`                          | `'#3b82f6'` | Border color (hex, rgb, etc.)                        |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`   | Border style                                         |

### Hover/Animation Props

| Prop              | Type                  | Default       | Description                     |
| ----------------- | --------------------- | ------------- | ------------------------------- |
| `hoverEffect`     | `boolean \| 'border'` | `false`       | Enable hover effect             |
| `hoverOpacity`    | `number`              | `100`         | Opacity on hover (0-100)        |
| `initialOpacity`  | `number`              | `0`           | Initial opacity (0-100)         |
| `hoverTransition` | `string`              | `'0.3s ease'` | CSS transition for hover effect |

### Debug Props

| Prop    | Type      | Default | Description                            |
| ------- | --------- | ------- | -------------------------------------- |
| `debug` | `boolean` | `false` | Show debug outlines and dimension info |

## Styling Guide

The component can be styled in multiple ways:

### 1. Using className (Recommended)

The `className` prop applies styles to the content element:

```tsx
<SimpleSquircle className="bg-blue-500 text-white">Content</SimpleSquircle>
```

### 2. Using style prop

The `style` prop applies additional styles to the container:

```tsx
<SimpleSquircle
  style={{
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}
>
  Content
</SimpleSquircle>
```

### 3. Combining approaches

```tsx
<SimpleSquircle
  className="bg-white text-gray-800"
  style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
>
  Content
</SimpleSquircle>
```

## Sizing & Dimensions

Control the component's size using the `width` and `height` props:

### Fixed Size

```tsx
<SimpleSquircle width={200} height={100}>
  Fixed size: 200×100px
</SimpleSquircle>
```

### Responsive Width

```tsx
<SimpleSquircle width="100%" height="auto">
  Responsive width, auto height
</SimpleSquircle>
```

### Special Values

- `width="full"` or `height="full"` = 100%
- `width="auto"` or `height="auto"` = automatic sizing

## Borders & Outlines

The component supports different border styles that follow the squircle shape:

### Simple Border

```tsx
<SimpleSquircle
  border={true} // 2px border
  borderColor="#ff0000"
  borderStyle="solid"
>
  Content with red border
</SimpleSquircle>
```

### Custom Border Width

```tsx
<SimpleSquircle
  border={4} // 4px border
  borderColor="#3b82f6"
>
  Content with 4px blue border
</SimpleSquircle>
```

### Non-solid Borders

```tsx
<SimpleSquircle
  border={2}
  borderColor="#3b82f6"
  borderStyle="dashed" // or "dotted"
>
  Content with dashed border
</SimpleSquircle>
```

## Hover Effects & Animations

The component supports hover effects for interactive elements:

```tsx
<SimpleSquircle
  borderColor="#3b82f6"
  border={2}
  hoverEffect={true}
  hoverOpacity={100} // Full opacity on hover
  initialOpacity={20} // 20% opacity initially
  hoverTransition="0.2s ease-in"
>
  Hover over me
</SimpleSquircle>
```

## Technical Implementation

### How It Works

1. **Measurement**: The component uses a ResizeObserver to measure its dimensions
2. **Path Generation**: Based on measurements, it generates SVG paths for the squircle shape
3. **Clip Path**: The paths are applied as CSS clip-path properties
4. **Rendering Control**: The component remains hidden until measurements and clip-paths are ready
5. **Event Handling**: If hover effects are enabled, it adds mouse event listeners

### Roundness Levels

The component has four pre-defined roundness levels:

1. **Level 1**: Most rounded, iOS-like (smoothing: 5.0, radius: 30px)
2. **Level 2**: Slightly rounded (smoothing: 5.5, radius: 42px)
3. **Level 3**: Slightly geometric (smoothing: 6.5, radius: 55px)
4. **Level 4**: Most geometric/squared (smoothing: 7.8, radius: 65px)

### Custom Shape Control

For advanced cases, you can specify custom corner properties:

```tsx
<SimpleSquircle borderRadius={50} cornerSmoothing={4} pointsPerCorner={30}>
  Custom shape
</SimpleSquircle>
```

## Performance Considerations

- **Path Calculation**: Path generation is CPU-intensive, especially with high `pointsPerCorner`
- **Anti-Flickering**: The component remains invisible until fully measured to prevent flickering
- **Minimize Changes**: Avoid frequently changing dimensions when possible
- **Responsive Performance**: Using percentage-based widths with auto height works well for responsive layouts

## Examples

### Button

```tsx
<SimpleSquircle
  width="auto"
  height="auto"
  roundnessLevel={1}
  className="bg-blue-500 text-white cursor-pointer"
  padding="12px 20px"
  hoverEffect={true}
  hoverOpacity={100}
  initialOpacity={80}
  onClick={() => alert('Clicked!')}
>
  <div className="flex items-center justify-center">Click Me</div>
</SimpleSquircle>
```

### Card with Border

```tsx
<SimpleSquircle
  width="300px"
  height="auto"
  roundnessLevel={2}
  className="bg-white"
  padding="20px"
  border={2}
  borderColor="#e2e8f0"
>
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p>This is a card with a border that follows the squircle shape.</p>
</SimpleSquircle>
```

### Avatar

```tsx
<SimpleSquircle width={64} height={64} roundnessLevel={1} padding={0} className="overflow-hidden">
  <img src="/avatar.jpg" alt="User avatar" className="w-full h-full object-cover" />
</SimpleSquircle>
```

### Interactive Element

```tsx
<SimpleSquircle
  width="100%"
  height="auto"
  roundnessLevel={2}
  className="bg-gray-100"
  padding="16px"
  border={2}
  borderColor="#3b82f6"
  borderStyle="solid"
  hoverEffect={true}
  hoverOpacity={100}
  initialOpacity={0}
  hoverTransition="0.2s ease"
>
  <div className="flex items-center justify-between">
    <span>Interactive card</span>
    <span>→</span>
  </div>
</SimpleSquircle>
```
