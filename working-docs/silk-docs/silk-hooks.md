# Silk – useThemeColorDimmingOverlay

# useThemeColorDimmingOverlay

**Description**

A hook which registers a theme color dimming overlay based associated with an HTML element. It returns an object containing two functions allowing to adjust the HTML element and the associated theme color dimming overlay alpha value.

`setDimmingOverlayOpacity` allows to set the overlay opacity punctually.

`animateDimmingOverlayOpacity` allows to animate the overlay opacity.

**Parameters**

| **Type** | **Description** |
| -------- | --------------- |

| `{
   elementRef: React.RefObject<HTMLElement>;
   dimmingColor: string;
  }` | - The `elementRef` key must contain the ref of the HTML element used as theme color dimming overlay.

- The `dimmingColor` key must contain a color declaration in the RGB format (e.g. `"rgb(0, 0, 0)"`) which matches the background-color CSS property value of the HTML element and will be used to dim the theme color.
  |

**Returned values**

| **Type** | **Description** |
| -------- | --------------- |

| `{
   setDimmingOverlayOpacity: (
      opacity: number
   ) => void;
   animateDimmingOverlayOpacity: ({
      keyframes: [number, number];
      duration?: number;
      easing?: string;
    }) => void
 }` | - The `setDimmingOverlayOpacity` key contains a function allowing to set the opacity of both the HTML element and the associated theme color dimming overlay.

- The `animateDimmingOverlayOpacity` key contains a function allowing to animate the opacity of both the HTML element and the associated theme color dimming overlay.
  - The `keyframes` key represents the start and end values (between 0 and 1) for the opacity animation.
  - The `duration` key represents the duration of animation, expressed in milliseconds. The default value is `500`.
  - The `easing` key represents the easing function for the animation. Only supports cubic-bezier() functions. The default value is `"cubic-bezier(0.25, 1, 0.25, 1)"`.
    |

**Example**

```tsx
const { setDimmingOverlayOpacity, animateDimmingOverlayOpacity } = useThemeColorDimmingOverlay({
  elementRef: stackBackgroundRef,
  dimmingColor: 'rgb(0, 0, 0)',
});

setDimmingOverlayOpacity(0.5);
animateDimmingOverlayOpacity({ keyframes: [0, 0.5] });
```

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

Silk – useClientMediaQuery
useClientMediaQuery
Description
A hook returning a React state whose value is true when the CSS media query passed as parameter matches, false when it does not match. It gets updated if the value changes during the lifetime of the component where it is used.
It always returns false on the server.
Parameters
Type
Description
string (CSS media query)
A required parameter defining the CSS media query whose matching result is desired. (e.g. "(min-width: 500px)")
Examples
const largeViewport = useClientMediaQuery("(min-width: 500px)");

Silk – usePageScrollData
Description
A hook which returns an object with two keys: { pageScrollContainer, nativePageScrollReplaced }. On page load, both values are undefined. After hydration, if native page scroll is currently replaced by a scroll container as a result of the action of the nativePageScrollReplacement prop on <Scroll.View />, nativePageScrollReplaced is true and pageScrollContainer contains the HTML element used as page scroll container instead. Otherwise, nativePageScrollReplaced is false and pageScrollContainer contains document.body
This is useful to adapt the logic, styling or animations of certain components and HTML elements in one case or the other.
Usage
Example
import { Sheet, usePageScrollData } from "@silk-hq/components";

const MySheetOutlet = () => {
const { nativePageScrollReplaced } = usePageScrollData();
return (
<Sheet.Outlet
travelAnimation={
nativePageScrollReplaced
? {
borderRadius: ["0px", "20px"],
transformOrigin: "50% 0",
}
: {
clipBoundary: "layout-viewport",
clipBorderRadius: ["0px", "20px"],
clipTransformOrigin: "50% 0",
}
}
/>
)
}
​
import { Sheet, usePageScrollData } from "@silk-hq/components";
import { useScroll } from "framer-motion";

const MyComponent = () => {
const ref = useRef<HTMLDivElement>(null);
const { pageScrollContainer, nativePageScrollReplaced } = usePageScrollData();

    const { scrollYProgress } = useScroll({
    	container: nativePageScrollReplaced ? { current: pageScrollContainer } : undefined,
      target: ref,
      offset: ["start end", "end end"],
    });

}

Silk – createComponentId
Description
Function which returns a componentId which can be used to identify a component instance by affecting it to its Root sub-component componentId prop. It can then be passed to the forComponent prop of other sub-components to associates them to the same component instance.
Notes
createComponentId is short for “create component instance id”.
Usage
To avoid any HMR issue createComponentId must always be called outside of component functions or classes, inside of a file dedicated to component ids and/or React contexts.
componentId must always passed to the Root sub-component of the component instance that is to be identified.
Only sub-components or components positioned inside of the Root sub-component bearing the componentId in the virtual DOM can be linked to it.
Example
const loginSheetId = createComponentId();
​
<Sheet.Root componentId={loginSheetId}>
...
<Sheet.Trigger forComponent={loginSheetId} />
...
</Sheet.Root>
