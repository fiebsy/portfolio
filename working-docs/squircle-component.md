# SimpleSquircle Component Documentation

## Overview

The SimpleSquircle component creates containers with iOS-style corner smoothing, also known as continuous-curvature corners or "squircle" shape. Unlike standard CSS border-radius which creates circular arcs at corners, the SimpleSquircle uses the mathematical superellipse formula to create true "squircle" corners with gradually changing curvature that is more aesthetically pleasing.

The mathematical formula used is: |x|^n + |y|^n = r^n where n=5, which closely approximates the continuous-curvature corners seen in iOS interfaces.

## Technical Implementation

The component works by:

1. Generating an SVG path for the squircle shape using the superellipse formula
2. Applying this path as a clip-path to a standard div container
3. Handling hydration issues by implementing client-side rendering for the complex path styles while falling back to standard border-radius during server rendering

## Basic Usage

```jsx
import { SimpleSquircle } from '@/components/SimpleSquircle';

// Basic usage with default values
<SimpleSquircle>
  Hello, I'm a squircle!
</SimpleSquircle>

// Customized squircle
<SimpleSquircle 
  width={300}
  height={150}
  borderRadius={30}
  color="#3b82f6"
  padding="2rem"
>
  Customized squircle
</SimpleSquircle>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | string \| number | '200px' | Width of the container. Use 'full' for 100% width |
| `height` | string \| number | '200px' | Height of the container |
| `borderRadius` | string \| number | 20 | Corner radius in pixels |
| `color` | string | '#b8dd23' | Background color |
| `padding` | string | '1rem' | Internal padding |
| `className` | string | '' | Additional CSS classes |
| `as` | React.ElementType | 'div' | Element type to render |
| `style` | React.CSSProperties | {} | Additional inline styles |
| `onClick` | function | undefined | Click handler |

## Using SimpleSquircle for Buttons

SimpleSquircle works great as a button container. Here are some examples:

```jsx
import { SimpleSquircle } from '@/components/SimpleSquircle';

// Primary button
<SimpleSquircle 
  width="auto"
  height="50px"
  borderRadius={12}
  color="#3b82f6"
  padding="0 1.5rem"
  style={{ cursor: 'pointer' }}
  onClick={() => alert('Clicked!')}
>
  <span style={{ color: 'white', fontWeight: 'bold' }}>Click Me</span>
</SimpleSquircle>

// Ghost button with custom border
<SimpleSquircle 
  width="auto"
  height="50px"
  borderRadius={12}
  color="transparent"
  padding="0 1.5rem"
  style={{ 
    cursor: 'pointer',
    boxShadow: '0 0 0 2px #3b82f6',
    backgroundColor: 'transparent'
  }}
  onClick={() => alert('Clicked!')}
>
  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>Ghost Button</span>
</SimpleSquircle>
```

### Button Guidelines

1. Use `width="auto"` to allow the button to size based on content
2. Set a fixed `height` for consistent button sizing (e.g., 40-50px)
3. Use a smaller `borderRadius` for buttons (8-15px)
4. Add `style={{ cursor: 'pointer' }}` for proper hover indication
5. For hover effects, wrap in a component with hover state management

## Using SimpleSquircle for Cards

SimpleSquircle makes visually appealing card containers:

```jsx
import { SimpleSquircle } from '@/components/SimpleSquircle';

// Basic card
<SimpleSquircle 
  width="300px"
  height="auto"
  borderRadius={24}
  color="#f9fafb"
  padding="1.5rem"
  style={{ minHeight: '200px' }}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3>Card Title</h3>
    <p>This is a card with iOS-style rounded corners.</p>
    <a href="#">Learn more</a>
  </div>
</SimpleSquircle>

// Feature card with shadow
<SimpleSquircle 
  width="300px"
  height="auto"
  borderRadius={24}
  color="white"
  padding="1.5rem"
  style={{ 
    minHeight: '250px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
  }}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ fontSize: '2rem' }}>🚀</div>
    <h3>Feature Title</h3>
    <p>Feature description goes here with details about this particular feature.</p>
  </div>
</SimpleSquircle>
```

### Card Guidelines

1. Use `height="auto"` and `minHeight` to accommodate variable content
2. Use larger `borderRadius` (20-30px) for cards
3. Apply box shadows via the `style` prop for depth
4. For grid layouts, use CSS Grid or Flexbox as container for multiple cards

## Applying Borders and Other Effects

Since SimpleSquircle uses clip-path for the shape, standard borders don't work the same way. Here are different approaches:

### Method 1: Box-shadow as border

```jsx
<SimpleSquircle 
  width="200px"
  height="200px"
  borderRadius={20}
  color="white"
  style={{ boxShadow: '0 0 0 2px #3b82f6' }}
>
  Content
</SimpleSquircle>
```

### Method 2: Nested SimpleSquircles

```jsx
<SimpleSquircle 
  width="204px"
  height="204px"
  borderRadius={22}
  color="#3b82f6"
  padding="0"
>
  <SimpleSquircle 
    width="200px"
    height="200px"
    borderRadius={20}
    color="white"
  >
    Content with 2px border
  </SimpleSquircle>
</SimpleSquircle>
```

### Method 3: Background with inset for gradient borders

```jsx
<SimpleSquircle 
  width="200px"
  height="200px"
  borderRadius={20}
  color="white"
  style={{ 
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    padding: '2px'
  }}
>
  <SimpleSquircle 
    width="100%"
    height="100%"
    borderRadius={18}
    color="white"
  >
    Content with gradient border
  </SimpleSquircle>
</SimpleSquircle>
```

## Advanced Usage

### Responsive sizing

```jsx
<SimpleSquircle 
  width="full"
  height="auto"
  borderRadius={20}
  color="#f9fafb"
  style={{ maxWidth: '500px', minHeight: '200px' }}
>
  Responsive content
</SimpleSquircle>
```

### Integration with Tailwind

```jsx
<SimpleSquircle 
  className="flex flex-col gap-4 text-slate-800"
  width="100%"
  height="auto"
  borderRadius={20}
  color="#f9fafb"
>
  <h3 className="text-xl font-bold">Tailwind Integration</h3>
  <p className="text-base">Works well with Tailwind classes</p>
</SimpleSquircle>
```

### Image containers

```jsx
<SimpleSquircle 
  width="300px"
  height="300px"
  borderRadius={30}
  padding="0"
  style={{ overflow: 'hidden' }}
>
  <img 
    src="/path/to/image.jpg" 
    alt="Description"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</SimpleSquircle>
```

## Browser Compatibility

The SimpleSquircle component uses modern CSS features:
- `clip-path` with SVG paths: Well supported in modern browsers
- Hydration handling ensures it works in Next.js with SSR
- Fallback to standard border-radius during server rendering

## Performance Considerations

- The SVG path generation is computationally intensive but only happens on mount
- For many SimpleSquircle components on a page, consider memoizing them
- Avoid frequent resizing or radius changes if possible
