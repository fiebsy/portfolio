# SimpleSquircle Component Documentation (Final)

## Overview

`SimpleSquircle` is a React component designed to create containers with continuously rounded corners (squircles) using SVG `clipPath`. It supports Tailwind CSS for background colors and non-solid borders, while using props for solid borders that conform to the squircle shape.

This component relies on client-side rendering for the `clipPath`.

## Core Features

*   **Squircle Shape:** Uses SVG `clipPath` for smooth corners.
*   **Tailwind Background:** Background color/gradient applied via `className`.
*   **Solid Squircle Borders:** Uses `border`, `borderColor`, `borderStyle='solid'` props for borders that follow the shape.
*   **Solid Border Hover Effect:** Optional animated border opacity transition via `hoverEffect` props.
*   **Tailwind Non-Solid Borders:** Dashed/dotted/no borders applied via `className` (will be rectangular).
*   **Dynamic Sizing:** Supports fixed (`width`/`height` numbers) or fluid (`'auto'`, `'full'`) dimensions.
*   **Customizable Corners:** `borderRadius` (uniform or per-corner) and `cornerSmoothing` props.
*   **Custom Element:** Can render as a different HTML element using the `as` prop.

## Styling Approach

*   **Background:** Set using Tailwind utility classes (e.g., `bg-blue-500`, `bg-gradient-to-r`) in the `className` prop.
*   **Padding:** Can be set via the `padding` prop *or* Tailwind padding classes (`p-*`, `px-*`, `py-*`) in `className`.
*   **Solid Borders:** Defined using `border`, `borderColor`, `borderStyle='solid'`. Renders a nested structure where the outer element provides the border color background, clipped to the squircle shape.
*   **Solid Border Hover:** Enabled and configured using `hoverEffect`, `hoverOpacity`, `initialOpacity`, `hoverTransition` props. Transitions the background opacity of the outer (border) element.
*   **Dashed/Dotted Borders:** MUST be applied using Tailwind border classes (e.g., `border-2 border-dashed border-gray-400`) in `className`. These borders will follow the rectangular bounds, not the clipPath.
*   **Other Styles:** Text color, shadows, etc., should be applied via `className`.

## Props

| Prop                    | Type                                          | Default        | Description                                                                                                                               |
| :---------------------- | :-------------------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                             | `undefined`    | Content to render inside.                                                                                                                 |
| `className`             | `string`                                      | `''`           | Tailwind classes for background, text, padding (optional), non-solid borders, hover states (for non-solid borders), etc.                |
| `width`                 | `string \| number`                            | `'auto'`       | Component width.                                                                                                                          |
| `height`                | `string \| number`                            | `'auto'`       | Component height.                                                                                                                         |
| `padding`               | `string \| number`                            | `'1rem'`       | Inner padding (CSS value). Can be overridden or replaced by Tailwind classes in `className`.                                              |
| `style`                 | `React.CSSProperties`                         | `{}`           | Custom inline styles (use sparingly, prefer `className`).                                                                                   |
| `borderRadius`          | `string \| number`                            | `16`           | Default border radius in pixels.                                                                                                          |
| `cornerSmoothing`       | `'ios' \| 'medium' \| 'high' \| number`       | `'ios'`        | Controls squircle 'sharpness' ('ios'=5).                                                                                                   |
| `borderRadiusTopLeft`   | `number`                                      | `undefined`    | Top-left radius override.                                                                                                                 |
| `borderRadiusTopRight`  | `number`                                      | `undefined`    | Top-right radius override.                                                                                                                |
| `borderRadiusBottomRight`| `number`                                      | `undefined`    | Bottom-right radius override.                                                                                                             |
| `borderRadiusBottomLeft`| `number`                                      | `undefined`    | Bottom-left radius override.                                                                                                              |
| `border`                | `boolean \| number`                           | `false`        | **For Solid Borders Only:** `true` for 2px, or specify numeric width. Set `borderStyle='solid'`.                                          |
| `borderColor`           | `string`                                      | `'#3b82f6'`    | **For Solid Borders Only:** Border color (CSS color string).                                                                                |
| `borderStyle`           | `'solid' \| 'dashed' \| 'dotted'`             | `'solid'`      | **Must be 'solid'** to use `border`/`borderColor` props. For 'dashed'/'dotted', use Tailwind classes in `className`.                       |
| `hoverEffect`           | `boolean \| 'border'`                         | `false`        | **For Solid Borders Only:** Enable hover opacity effect.                                                                                  |
| `hoverOpacity`          | `number`                                      | `100`          | **For Solid Borders Only:** Border opacity (0-100) on hover.                                                                              |
| `initialOpacity`        | `number`                                      | `0`            | **For Solid Borders Only:** Initial border opacity (0-100).                                                                             |
| `hoverTransition`       | `string`                                      | `'0.3s ease'`  | **For Solid Borders Only:** CSS transition timing for the hover effect (applied to `background-color`).                                     |
| `as`                    | `React.ElementType`                           | `'div'`        | HTML element type to render as.                                                                                                           |

## Limitations

*   **Client-Side Dependency:** Squircle shape relies on browser APIs.
*   **Rectangular Non-Solid Borders:** Dashed/dotted borders applied via `className` will not follow the squircle shape.
