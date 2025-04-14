Note that commercial use of Silk requires a commercial license. More information on the website: silkhq.co.
Install the library
npm install @silk-hq/components
Import and use the components
// BottomSheet.tsx

import { Sheet } from "@silk-hq/components";

const BottomSheet = () => (
<Sheet.Root license="commercial">
<Sheet.Trigger>Open</Sheet.Trigger>
<Sheet.Portal>
<Sheet.View nativeEdgeSwipePrevention={true}>
<Sheet.Backdrop themeColorDimming="auto" />
<Sheet.Content>
<Sheet.BleedingBackground />
Some content
</Sheet.Content>
</Sheet.View>
</Sheet.Portal>
</Sheet.Root>
);
Add your styles
// BottomSheet.tsx

import { Sheet } from "@silk-hq/components";
import "./BottomSheet.css";

const BottomSheet = () => (
<Sheet.Root license="commercial">
<Sheet.Trigger>Open</Sheet.Trigger>
<Sheet.Portal>
<Sheet.View className="BottomSheet-view" nativeEdgeSwipePrevention={true}>
<Sheet.Backdrop themeColorDimming="auto" />
<Sheet.Content className="BottomSheet-content">
<Sheet.BleedingBackground className="BottomSheet-bleedingBackground" />
Some content
</Sheet.Content>
</Sheet.View>
</Sheet.Portal>
</Sheet.Root>
);

export { BottomSheet };
/_ BottomSheet.css _/

.BottomSheet-view {
height: var(--silk-100-lvh-dvh-pct);
}

.BottomSheet-content {
max-width: 700px;
height: auto;
}

.BottomSheet-bleedingBackground {
border-radius: 24px;
background-color: white;
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

Silk – Styling
Normal Styling
Silk components’ underlying elements can be styled using any method you wish.
You can pass a className, style or any other attribute to all sub-components with underlying elements to assign CSS styles to them.
Default styles
Some components’ underlying elements come with very basic default styles. They are likely to match your needs and provide a useful base at the beginning of the development. They can be fully overridden.

- Defaults styles are identifiable by their declaration: they make use of the --silk-defaults custom property (e.g. background-color: var(--silk-defaults, #fafafa);).
- Defaults styles can be individually overridden with a selector of specificity ≥ 10 (e.g. a class or attribute selector).
- To remove all defaults styles for one element, use --silk-defaults: silk-reset; on this element.
  Required styles
  Most components’ underlying elements have required styles, already set for you. Those are necessary for the proper functioning of the components. They must not be overridden in any case.
- Required styles are identifiable by their declaration: they use the !important marker.
- Sometimes, a --NOTE is also present to provide further informations on specific CSS properties.
  Custom properties
  --silk-100-lvh-dvh-pct
  Description
  In iOS SFSafariViewController (i.e. iOS standard in-app browser) the CSS vh and lvh units wrongly reflect the same size as the svh unit. See https://bugs.webkit.org/show_bug.cgi?id=255708.
  As a consequence, when using either of these units, we end up with a size which is shorter than expected. In particular, it is often desirable to set the height CSS property of <Scroll.View /> underlying HTML element to 100lvh or calc(100lvh + 60px) so that <Scroll.Content /> underlying HTML element overflows the layout viewport, and does not resize when the user expands or collapses manually iOS Safari's UI. It is also useful so it appears below iOS Safari's semi-transparent UI.
  To address this issue, we expose globally the --silk-100-lvh-dvh-pct CSS custom property, which provides the best compromise to work around the iOS SFSafariViewController bug.
  Normally, this CSS custom property returns 100lvh (or 100vh if the lvh unit is not supported). However, if 100lvh happens to be smaller than 100dvh (or 100% if dvh is not supported), which can only happen when the bug is present, it falls back to 100dvh (or 100% if dvh is not supported).
  That way, in a normal situation we get the desired 100lvh value, and if the bug is present, we get 100dvh, which fills the viewport and is subject to resize, but will not cause the view to be improperly sized to 100svh as it would without this fallback, due to the bug.
  Underlying value
  :root {
  --silk-100-lvh-dvh-pct: max(100%, 100vh);
  }
  @supports (width: 1dvh) {
  :root {
  --silk-100-lvh-dvh-pct: max(100dvh, 100lvh);
  }
  }
  Example
  .MySheet_view {
  height: var(--silk-100-lvh-dvh-pct);
  }
  Silk components are made up of several sub-components, most of which render one or several underlying HTML elements. Silk allows to easily substitute those underlying HTML elements with your own HTML elements or React components.
  asChild
  The asChild prop is available on all sub-components rendering an underlying HTML elements.
  When present (i.e. set to true) the sub-component expects exactly one child (with any number of descendants). It can be either an HTML element, or a React component rendering one HTML element, and will be used in lieu of the default underlying HTML element.
  When in use, the HTML element normally rendered by the sub-component will not be rendered. Instead, the HTML element received as child will be used, and it will receive automatically the HTML attributes required for the proper functioning of the Silk sub-component.
  Usage with an HTML element
  When used with an HTML element, all you need to do is set the asChild prop on the Silk sub-component, and pass the HTML element as child of this sub-component.
  <Sheet.Trigger asChild>
  <a href="/my-page">Open the sheet</a>
  </Sheet.Trigger>
  Usage with a React component
  When used with a React component, the process is similar: you need to set the asChild prop on the Silk sub-component, and pass the React component as child of this sub-component.
  Secondly, you need the React component to accept props and a ref and spread them onto the underlying HTML element, as well as use forwardRef so your component properly forwards the ref.
  // MyButton.tsx

const MyButton = React.forwardRef((props, forwardedRef) =>
<button ref={forwardedRef} {...props}>
);
// Usage

<Sheet.Trigger asChild>
<MyButton>Open the sheet</MyButton>
</Sheet.Trigger>
Note: Read more about React.forwardRef in React’s documentation.
Nested asChild
It is possible to nest several Silk sub-components using asChild, as long as it ends up containing single HTML element that will receive the props and refs of all the nested sub-components.
// Sheet.Content, Scroll.Root and Scroll.View will only render one HTML element

...
<Sheet.Content asChild>
<Scroll.Root asChild>
<Scroll.View>
<Scroll.Content>
...
</Scroll.Content>
</Scroll.View>
</Scroll.Root>
</Sheet.Content>
...
Acknowledgment
Silk asChild prop is similar to Radix’s and uses most of the same code. We thank the Radix team for introducing this pattern to the React ecosystem.
Silk – Implementing a controlled sheet
Silk’s components are designed to be used declaratively first, ensuring ease of use and automatic accessibility handling. If you want your sheet component to react to button clicks, we recommend you do it with the <Sheet.Trigger /> sub-component.
Sometimes you do need to control your sheet programmatically though, like when responding to an async operation, a URL change, or simply a different event than the <Sheet.Trigger /> press event. For such scenarios, Silk allows you to use a sheet as a controlled component.
A sheet component has two sets of props allowing you to control internal state: the presented and onPresentedChange props, and the activeDetent and onActiveDetentChange props.
The presented and onPresentedChange props
This set of props allows you to present and dismiss a sheet programmatically.
When setting the value of the presented prop to true, it will present the sheet, when setting it to false, it will dismiss it. You also need to pass a function allowing to update the value to the onPresentedChange prop, so it can be updated by the component itself as a result of a user interactions—like dismissing the sheet with a swipe, or pressing the escape key.
import { useState } from "react";
import { Sheet } from "@silk-hq/components";

export default function ControlledSheet() {
const [presented, setPresented] = useState(false);

useEffect(() => {
const timer = setTimeout(() => {
setPresented(true);
}, 3000); // Open dialog after 3 seconds

    return () => clearTimeout(timer);

}, []);

return (
<Sheet.Root presented={presented} onPresentedChange={setPresented}>
<Sheet.Portal>
<Sheet.View>
<Sheet.Backdrop />
<Sheet.Content>
<Sheet.Title>Controlled Sheet</Sheet.Title>
<Sheet.Description>This sheet is controlled by state.</Sheet.Description>
</Sheet.Content>
</Sheet.View>
</Sheet.Portal>
</Sheet.Root>
);
}
These props come with some limitations at the moment. Read more about the presented and onPresentedChange props on the Sheet documentation page.
The activeDetent and onActiveDetent props
This set of props allows you to set the index of the detent the sheet rests on programmatically.
Detent are numbered from 0 to n, where 0 is the index of the detent the sheet is resting on when it is fully outside of the view, and n the index of the detent the sheet is resting on when it is fully expanded inside of the view. When you add one intermediary detent to your sheet using the detents prop on the <Sheet.View /> sub-component, this detent has the index 1, and the last detent the index 2.
When setting the value of the activeDetent prop to the index of a detent , the sheet will step to that detent, and rest on it. You also need to pass a function allowing to update the value to the onActiveDetent prop, so it can be updated by the component itself as a result of a user interactions—like a swipe, or using a <Sheet.Trigger />.
import { useState } from "react";
import { Sheet } from "@silk-hq/components";

export default function ControlledDetentSheet() {
const [activeDetent, setActiveDetent] = useState(1);

useEffect(() => {
const timer = setTimeout(() => {
setActiveDetent(2);
}, 3000); // Step to the last detent after 3 seconds

    return () => clearTimeout(timer);

}, []);

return (
<Sheet.Root activeDetent={activeDetent} onActiveDetentChange={setActiveDetent}>
<Sheet.Portal>
<Sheet.View detents="60lvh">
<Sheet.Backdrop />
<Sheet.Content>
<Sheet.Title>Controlled Detent Sheet</Sheet.Title>
<Sheet.Description>This sheet active detent is controlled by state.</Sheet.Description>
</Sheet.Content>
</Sheet.View>
</Sheet.Portal>
</Sheet.Root>
);
}
These props come with some limitations at the moment. Read more about the activeDetent and on

# Silk – Usage with Tailwind V4

In Tailwind V4, Tailwind generated styles are wrapped inside of CSS `@layer {}`. As a consequence, unlayered styles—that is styled that are not themselves wrapped that way— take precedence over them.

This can cause issue with the few default styles that Silk uses as base styles, which can be easily identified by their shape: `property: var(--silk-defaults, value);`. They will override the styles that you try to set with Tailwind.

To get around this issue, you can make your Tailwind styles more important, by adding a `!` marker right after them, like so: `rounded-md!`. This is equivalent to the `!important` flag in CSS. These styles will then take precedence over Silk’s default styles.

**Note:**

We hope to find a way to workaround this issue within Silk or in collaboration with Tailwind in the future, removing the need for this workaround.

# Silk – animate

# animate

**Description**

A function which runs a WAAPI animation on the specified HTML element and persists its final styles as inline styles when it is finished.

**Parameters**

| **Type**      | **Description**                                                     |
| ------------- | ------------------------------------------------------------------- |
| `HTMLElement` | Required. The HTML element whose CSS properties are to be animated. |

| `{
   [keys: string]:
      [string | number, string | number]
}` | Required. An object whose keys are the CSS properties to be animated and their values the keyframes (the initial one and the final one) to be used for the animation of their respective values. (e.g. `{ opacity: [0, 1] }`). |
| `{
   duration?: number;
   easing?: string;
}` | Optional. The options for the animation. The `duration` is expressed in millisecond. The `easing` must be a CSS easing function (e.g. `"ease"`).

The default values are `{ duration: 500, easing: "cubic-bezier(0.25, 1, 0.25, 1)" }`. |

**Example**

```tsx
animate(
  anotherElementRef.current,
  { opacity: [0, 1] },
  {
    duration: 600,
    easing: 'cubic-bezier(0, 0, 0.58, 1)',
  }
);
```

# Silk – Usage with Next.js /pages directory

Silk makes use of a CSS file that must be imported in your project along with the JavaScript file.

When using the /pages directory, Next.js does not allow the import of CSS files from within `.node_module`. To workaround that limitation, you must add the Silk’s package to the `transpilePackages` option in your `next.config.js` file, like so:

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@silk-hq/components'],
};

module.exports = nextConfig;
```

**Note:** You may need to delete the `package-lock.js` file and the `.node_module` and `.next` directories for it to work; they will be regenerated automatically.
