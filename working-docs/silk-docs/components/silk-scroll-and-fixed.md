# Silk – Scroll

# Description

In addition to providing additional features compared to plain CSS scroll containers, the Scroll component contains performance optimizations for the Sheet component animations when it is either containing Scroll components, or being wrapped into one. Therefore, we recommend using the Scroll component for all your scrolling needs across your web app or website.

# Structure

## Basic

```jsx
import { Scroll } from '@silk-hq/sheet';

export default () => (
  <Scroll.Root>
    <Scroll.View>
      <Scroll.Content>...</Scroll.Content>
    </Scroll.View>

    <Scroll.Trigger />
  </Scroll.Root>
);
```

# Sub-components

## `<Scroll.Root />`

| Required                | yes                                                         |
| ----------------------- | ----------------------------------------------------------- |
| Underlying HTML element | `div`                                                       |
| Requirements            | Must contain all Scroll sub-components on the same instance |

**Description**

The root sub-component of the Scroll component.

### asChild

| **Required**      | no          |
| ----------------- | ----------- |
| **Value type**    | `boolean`   |
| **Default value** | `undefined` |

**Values description**

| `true` | The underlying HTML element rendered is the child. |
| ------ | -------------------------------------------------- | -------------------------------------------------------- |
| `false | undefined`                                         | The underlying HTML element rendered is the default one. |

**Description**

Defines whether the sub-component underlying HTML element is the default one or the one passed as child of the sub-component.

**Usage**

If the child is a React component rendering a HTML element:

- it must accept props and spread all received props onto the rendered HTML element;
- it must use `React.forwardRef()` and pass the received ref to the rendered HTML element.

**Notes**

- See [Silk – Composition](https://www.notion.so/Silk-Composition-5c6794eb57dd40109ebc7010ab9f3a67?pvs=21) for more information.

### componentId

| **Required**   | no         |
| -------------- | ---------- |
| **Value type** | `ScrollId` |

**Description**

Defines the id of the Scroll component instance. This id can then be passed to other Scroll sub-components `forComponent` prop to associate them with this instance.

### componentRef

| **Required**   | no                           |
| -------------- | ---------------------------- |
| **Value type** | `React.RefObject<ScrollRef>` |

where
`ScrollRef = {
   getProgress: () => number;
   getDistance: () => number;
   getAvailableDistance: () => number;
   scrollTo: (options: ScrollToOptions) => void;
   scrollBy: (options: ScrollByOptions) => void;
}`
where
`ScrollToOptions = ScrollByOptions = {
   progress?: number;
   distance?: number;
   animationSettings?: { skip: "default" | "auto" | boolean };
}` |
| **Default value** | `undefined` |

**Description**

Defines a `React.RefObject` which can then be used to control the Scroll component imperatively by calling the methods stored in it.

**Methods description**

| `getProgress`          | Returns the scroll progress from `0` to `1`. When the `<Scroll.Content />` underlying HTML element start edge is aligned with the `<Scroll.View />` underlying HTML element start edge, scroll progress is `0`. When they are aligned on their end edge, scroll progress is `1`. |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getDistance`          | Returns the distance in pixels traveled by the `<Scroll.Content />` underlying HTML element from its start position.                                                                                                                                                             |
| `getAvailableDistance` | Returns the distance in pixels that the `<Scroll.Content />` underlying HTML element can travel in total, from its start position to its end position.                                                                                                                           |
| `scrollTo`             | Make the `<Scroll.Content />` underlying HTML element travel so it ends up at either the defined `progress` or `distance`.                                                                                                                                                       |

If the animationSettings `skip` key value computes to `false`, then animation occurs; if it computes to `true` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise. |
| `scrollBy` | Make the `<Scroll.Content />` underlying HTML element travel by either the defined `progress` or `distance`.

If the animationSettings `skip` key value computes to `false`, then animation occurs; if it computes to `true` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise. |

## `<Scroll.Trigger />`

| Required                | no                                        |
| ----------------------- | ----------------------------------------- |
| Underlying HTML element | `button`                                  |
| Requirements            | Must be a descendant of `<Scroll.Root />` |

**Description**

A Trigger sub-component for the Scroll component.

It allows to run specific actions related to Scroll based on user input.

### asChild

See [asChild](https://www.notion.so/Silk-Scroll-72699d18f5fc4cf39bdcd10878c0ffb1?pvs=21) on `<Scroll.Root />`.

### forComponent

| **Required**      | no                                                       |
| ----------------- | -------------------------------------------------------- |
| **Value type**    | `ScrollId`                                               |
| **Default value** | the `ScrollId` of the closest `<Scroll.Root />` ancestor |

**Description**

Associates this sub-component with the desired Scroll instance.

### action

| **Required**      | no           |
| ----------------- | ------------ |
| **Value type**    | `{           |
| type: "scroll-to" | "scroll-by"; |

progress?: number;
distance?: number;
animationSettings?: { skip: "default" | "auto" | boolean };
}`|
| **Default value** |`undefined` |

**Values description**

| `"scroll-to"` | Make the `<Scroll.Content />` underlying HTML element travel so it ends up at either the defined `progress` or `distance`.

| If the animationSettings `skip` key value computes to `false`, then animation occurs, if it computes to `false` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise. |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `"scroll-by"`                                                                                                                                                                                                                                                                                                                                                    | Make the `<Scroll.Content />` underlying HTML element travel by either the defined `progress` or `distance`. |

If the animationSettings `skip` key value computes to `false`, then animation occurs, if it computes to `false` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise. |

**Description**

Defines the action the Trigger will run when it is pressed.

### onPress

| **Required**   | no  |
| -------------- | --- | --- |
| **Value type** | `   | {   |

    forceFocus?: boolean;
    runAction?: boolean;

}
| ((customEvent: {
changeDefault: (changedBehavior: {
forceFocus?: boolean;
runAction?: boolean;
}) => void;
nativeEvent: React.MouseEvent<HTMLElement, MouseEvent>;
}) => void)}`|
| **Default value** |`{ forceFocus: true, runAction: true }` |

**Values description**

| `{ forceFocus: true }`  | The underlying HTML element will be focused on press in all browsers (by default Safari doesn’t do it, causing issues with focus management). This is the recommended setting. |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{ forceFocus: false }` | The underlying HTML element will only receive focus on press in browsers where this is the default behavior (Safari will not do it).                                           |
| `{ runAction: true }`   | The Trigger action will be run.                                                                                                                                                |
| `{ runAction: true }`   | The Trigger action will not be run.                                                                                                                                            |

**Description**

An event handler which runs when a press event (click event) is fired on the underlying HTML element.

- **Examples**
  ```jsx
  // Will not force focus the underlying HTML element on press

  const MyTrigger = () => {
    return <Scroll.Trigger onPress={{ forceFocus: false }}>Click me</Scroll.Trigger>;
  };
  ```
  ```jsx
  // Will not run the Trigger action

  const MyTrigger = () => {
    const pressHandler = ({ changeDefault }) => {
      changeDefault({ runAction: false });
      console.log("I don't run the Trigger action!");
    };

    return <Scroll.Trigger onPress={pressHandler}>Click me</Scroll.Trigger>;
  };
  ```

## `<Scroll.View />`

| Required                | yes                                       |
| ----------------------- | ----------------------------------------- |
| Underlying HTML element | `div`                                     |
| Requirements            | Must be a descendant of `<Scroll.Root />` |

**Description**

The View sub-component for the Scroll component.

Elements put inside of this sub-component will not move along the content as scroll occurs.

**Notes**

- If you are using this component inside of nested CSS grid or flex containers, you may need to add `min-width: 0px` and/or `min-height: 0px` on these containers’ children to prevent `<Scroll.View />` being sized based on `<Scroll.Content />` size on scroll axis, thus causing visible overflow instead of a scrollable overflow.

### asChild

See [asChild](https://www.notion.so/Silk-Scroll-72699d18f5fc4cf39bdcd10878c0ffb1?pvs=21) on `<Scroll.Root />`.

### forComponent

| **Required**      | no                                                       |
| ----------------- | -------------------------------------------------------- |
| **Value type**    | `ScrollId`                                               |
| **Default value** | the `ScrollId` of the closest `<Scroll.Root />` ancestor |

**Description**

Associates this sub-component with the desired Scroll instance.

### axis

| **Required**      | no    |
| ----------------- | ----- | ---- |
| **Value type**    | `"x"  | "y"` |
| **Default value** | `"y"` |

**Description**

Defines the axis on which the `<Scroll.Content />` underlying HTML element can travel.

### pageScroll

| **Required**      | only required if the `nativePageScrollReplacement` is set to `true` or `"auto"` |
| ----------------- | ------------------------------------------------------------------------------- |
| **Value type**    | `boolean`                                                                       |
| **Default value** | `false`                                                                         |

**Values description**

| `false` | The underlying HTML element acts a scroll container.                      |
| ------- | ------------------------------------------------------------------------- |
| `true`  | Pages scrolling can be controlled through this Scroll component instance. |

- If the `nativePageScrollReplacement` prop computes to `false`, the underlying HTML element does not act as a scroll container, instead it acts as a simple container wrapping `<Scroll.Content />` underlying HTML element.

- If the `nativePageScrollReplacement` computes to `true`, the underlying HTML element acts as a scroll container replacing native page scrolling. |

**Description**

Defines whether this Scroll component is considered as a page.

When set to `true`, this Scroll component instance can be used to control page scrolling (no matter whether it is native or replaced). Therefore, you can use the `<Scroll.Trigger />` sub-component, or imperative methods to get scroll informations or cause scrolling. You can therefore use the exact same API to control any scroll container and page scrolling.

### nativePageScrollReplacement

| **Required**      | no                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------ | -------- |
| **Value type**    | `"auto"                                                                                          | boolean` |
| **Default value** | `false`                                                                                          |
| **Requirements**  | The `pageScroll` prop must be set to `true` to use this prop with a value of `true` or `"auto"`. |

**Values description**

| `true`   | Native page scrolling is replaced by the Scroll component scroll container.                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `false`  | Native page scrolling is not replaced by the Scroll component scroll container.                                                                                         |
| `"auto"` | Computes to `false` inside of a browser (i.e. not when the web app is running in standalone mode) on Android, on iOS and on iPadOS; computes to `true` everywhere else. |

**Description**

Defines whether native page scrolling (also called “body scrolling”) is being replaced by the Scroll component scroll container.

This has several benefits, but also comes with limitations.

Consequences when set or computing to `true`:

- **Benefits**
  - Improves animation performance when animating `<Scroll.View />` underlying HTML element or HTML elements wrapping it.
  - Enables the use of the `nativeFocusScrollPrevention` prop with the replaced page scroll.
  - Enables the removal or customization of the replaced page scroll container scrollbar (not possible on iOS otherwise).
  - Prevents the unnatural behavior of scrolling the page when swiping over HTML elements whose `position` CSS property is set to `fixed`.
- **Limitations**
  - Native scroll into view of text fragment (defined in the URL) does not work.
  - Native scroll into view of anchors (defined in the URL with a `#anchor-id` matching the `id` HTML attribute of an HTML element) does not work. This limitation will be lifted in the future.
  - On iOS, tapping on the status bar to scroll top does not work. This limitation will be lifted in the future.
  - Overscrolling is not possible in Chromium-based browsers. We are hopeful that Chromium will add support for this support in the future.
  - Native pull-down from the top of the page to refresh on mobile does not work. Because this native behavior brings also causes top navigations bar to come down on iOS, it is rarely desirable. It can be replaced with a better custom implementation.
  - When setting this prop to `true`, it prevents mobile browser interfaces from expanding/collapsing as the user scrolls the page inside of mobile browsers. This is why we recommend using the `"auto"` value instead, as it will compute to `false` in this case.

**Notes**

- The [`useNativePageScrollReplaced`](https://www.notion.so/Silk-usePageScrollData-964560861c2743188c8ae3a57518193b?pvs=21) hook can be used to get a `boolean` value indicating whether native page scroll is currently replaced.
- If you are using server-side rendering (SSR), if you set the prop to `true` or `"auto"`, you need to add the React prop `suppressHydrationWarning` to the `<html>` element.

### **safeArea**

| **Required**      | no                  |
| ----------------- | ------------------- | ----------------- | ------------------ |
| **Value type**    | `"none"             | "layout-viewport" | "visual-viewport"` |
| **Default value** | `"visual-viewport"` |

**Values description**

| `"none"`            | No safe area is defined.                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"layout-viewport"` | The safe area is defined by the bounds of the layout viewport (i.e. the browser window excluding the browser interface).                            |
| `"visual-viewport"` | The safe area is defined by the bounds of the visual viewport (i.e. the browser window excluding the browser interface and the on-screen keyboard). |

**Description**

Defines the area within which the `<Scroll.Content />` underlying HTML element must be able to safely travel. If this area happens to be smaller than the area defined by the `<Scroll.View />` underlying HTML element, then the available scroll distance is increased so that the `<Scroll.Content />` underlying HTML element can travel as much as required for it to be fully accessible to the user.

For example, if the `<Scroll.View />` underlying HTML fills the entire layout viewport, then when the on-screen keyboard appears and the visual viewport shrinks, the bottom part of the `<Scroll.View />` underlying HTML will be hidden behind the on-screen keyboard, and the `<Scroll.Content />` underlying HTML element will not be fully accessible to the user. By setting this prop to `"visual-viewport"`, the scrolling distance gets expanded so that the `<Scroll.Content />` underlying HTML element can travel as much as needed to be entirely visible above the on-screen keyboard.

### scrollGestureTrap

| **Required**   | no  |
| -------------- | --- | ------- |
| **Value type** | `   | boolean |

| {
x?: boolean;
y?: boolean;
}
| {
xStart?: boolean;
xEnd?: boolean;
yStart?: boolean;
yEnd?: boolean;
}`|
| **Default value** |`false` |

**Description**

Defines whether scroll gestures performed in a direction where scrolling cannot occur (because the edge has been reached) should be trapped inside of the `<Scroll.View />` underlying HTML element, or propagate to ancestor scroll containers or Sheet components (causing swipe).

**Notes**

- When trapping is enabled, browsers overscroll effects will be prevented. For example, if trapping is enabled on `yStart`, pull to refresh in mobile browsers will be prevented; if it is enabled on `xStart`, swipe to go back in history will be prevented in desktop browsers.
- If the `scrollGestureOvershoot` prop is set to `false`, it causes the `scrollGestureTrap` prop to compute to `true` no matter its declared value.
- There is a bug in Safari causing trapping to always be enabled when swiping over a vertical Scroll component wrapped in an horizontally swipeable Sheet component itself wrapped in a vertically swipeable Sheet component. We hope to see that bug resolved quickly.

### scrollGestureOvershoot

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Values description**

| `true`  | The `<Scroll.Content />` underlying HTML will overshoot.     |
| ------- | ------------------------------------------------------------ |
| `false` | The `<Scroll.Content />` underlying HTML will not overshoot. |

**Description**

Defines the behavior of `<Scroll.Content />` underlying HTML element when the user performs a scroll gesture in a direction where scrolling cannot occur (because the edge has been reached).

**Notes**

- Only iOS/iPadOS browsers and Safari and Firefox on macOS support overshooting.
- If the `scrollGestureOvershoot` prop is set to `false`, it causes the `scrollGestureTrap` prop to compute to `true` no matter its declared value.

### scrollGesture

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Values description**

| `true`  | User scroll gestures can be used to perform scrolling.    |
| ------- | --------------------------------------------------------- |
| `false` | User scroll gestures cannot be used to perform scrolling. |

**Description**

Defines whether user scroll gestures (mousewheel, touchmove, direction keys, start/end keys, dragging the scrollbar, etc.) can be used to perform scrolling.

### onScroll

| **Required**   | no  |
| -------------- | --- |
| **Value type** | `({ |

progress: number;
distance: number;
availableDistance: number;
nativeEvent: React.UIEvent<HTMLDivElement>;
}) => void`|
| **Default value** |`undefined` |

**Parameters description**

| `progress`          | The progress value of `<Scroll.Content />`, going from `0` to `1`. It is `0` when the it is at its start position, and `1` when it is scrolled all the way to the other end |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `distance`          | The distance in pixels travelled by `<Scroll.Content />` from its start position. It goes from `0` to the value of `availableDistance`.                                     |
| `availableDistance` | The full distance that `<Scroll.Content />` can travel.                                                                                                                     |
| `nativeEvent`       | The underlying native scroll event                                                                                                                                          |

**Description**

An event handler which runs asynchronously on every frame when scroll occurs, whether it is caused by a scroll gesture or programmatically.

### onScrollStart

| **Required**   | no  |
| -------------- | --- | ---------------------------- |
| **Value type** | `   | { dismissKeyboard: boolean } |

| ((customEvent: ScrollStartCustomEvent) ⇒ void`where`ScrollStartCustomEvent = {
changeDefault: (changedBehavior: {
dismissKeyboard: boolean;
}) => void;
dismissKeyboard: boolean;
nativeEvent: null;
}`|
| **Default value** |`{ dismissKeyboard: false }` |

**Values description**

| `{ dismissKeyboard: true }` | Causes the on-screen keyboard to be dismissed if it is presented when the event is fired. |
| --------------------------- | ----------------------------------------------------------------------------------------- |

**Description**

An event handler which runs when scrolling starts, whether it is initiated by a scroll gesture or programmatically.

### onScrollEnd

| **Required**                       | no          |
| ---------------------------------- | ----------- | ---------------------------- |
| **Value type**                     | `           | { dismissKeyboard: boolean } |
| (({ nativeEvent: Event; }) ⇒ void` |
| **Default value**                  | `undefined` |

**Description**

An event handler which runs when scrolling ends, whether it was initiated by a scroll gesture or programmatically.

### **nativeFocusScrollPrevention**

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether the native browser scroll into view mechanism should be prevented or not when an HTML element which is the descendant of the `<Scroll.View />` underlying HTML element receives focus.

When an HTML element receives focus on mobile, if the browser determines that it will be off-screen, or that it will end up being covered by the on-screen keyboard after receiving focus, it may move some scroll containers into views and shift the viewport up or down so that the focused HTML element ends up being visible to the user. Unfortunately, in all browsers this behavior is currently buggy, janky, and possibly ineffective, resulting in a terrible user experience.

That is why we allow to prevent the default behavior, and properly deal with the position of the focused HTML element.

**Notes**

- The `onFocusInside` prop allows to replace the native broken scroll into view mechanism by a functioning one.
- **!** The mechanism does not work when used with the `pageScroll` prop is set to `true` and `nativePageScrollReplacement` is set or computes to `false`.
- **!** When the user clicks on text present in a text input, the caret will always be put back at its previous position when the mechanism is used. If it is a problem for you, you can disable the mechanism by setting the prop to `false`.
- **!** In iOS Safari, the mechanism doesn’t work effectively with password inputs whose `autoComplete` html attribute is set to anything else than `"current-password"`. Therefore, we strongly recommend always using this value. Safari won’t suggest a new password directly, but the user can still get a suggested password by tapping the “Password” button in the suggestion bar and asking the password manager to provide a new password.
- **!** Due to Safari bugs, the mechanism may still sometimes fail with password-related inputs (i.e. any field for which Safari shows the Password button in the suggestion bar).
- **!** Due to a bug in Android Chrome, the prevention mechanism doesn’t work effectively when the focus is moved using the on-screen keyboard “next input” button.
- **!** Due to a bug in Android Chrome, for inputs causing the suggestion bar of the on-screen keyboard to be shown, a distance of at least 48px between the last text input and the bottom of the viewport is required to avoid a layout shift.

### **onFocusInside**

| **Required**   | no  |
| -------------- | --- | ---------------------------- |
| **Value type** | `   | { scrollIntoView: boolean; } |

| ((customEvent: ScrollViewFocusInsideCustomEvent) => void);`where`ScrollViewFocusInsideCustomEvent = {
changeDefault: (changedBehavior: { scrollIntoView: boolean }) => void;
scrollIntoView: boolean;
nativeEvent: Event;
}`|
| **Default value** |`{ scrollIntoView: true }` |

**Values description**

| `{ scrollIntoView: true }`  | The HTML element receiving the focus is scrolled into view so it becomes fully visible. |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `{ scrollIntoView: false }` | The HTML element receiving the focus is not scrolled into view.                         |

**Description**

An event handler which runs when a descendant HTML element of the `<Scroll.View />` underlying HTML element receives focus.

### scrollAnimationSettings

| **Required**      | no                 |
| ----------------- | ------------------ | ---------- |
| **Value type**    | `{ skip: "auto"    | boolean }` |
| **Default value** | `{ skip: "auto" }` |

**Values description**

| `{ skip: false }`  | Programmatic scroll is animated.                                                    |
| ------------------ | ----------------------------------------------------------------------------------- |
| `{ skip: true }`   | Programmatic scroll is not animated.                                                |
| `{ skip: "auto" }` | Programmatic scroll is animated only if the user does not prefers “reduced motion”. |

**Description**

Defines the animation settings for programmatic scroll (i.e. scroll caused by `<Scroll.Trigger />` or an imperative call).

### scrollAnchoring

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether the scroll position should be adjusted to prevent sudden changes when a layout shift occurs inside of its `<Scroll.Content />` underlying HTML element.

**Notes**

- Uses the [`overflow-anchor` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor) underneath.
- Not yet supported in Safari.

### scrollSnapType

| **Required**      | no       |
| ----------------- | -------- | ----------- | ------------ |
| **Value type**    | `"none"  | "proximity" | "mandatory"` |
| **Default value** | `"none"` |

**Description**

Defines the value for the [`scroll-snap-type` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type).

### scrollPadding

| **Required**      | no     |
| ----------------- | ------ | -------------------- |
| **Value type**    | `auto  | string` (CSS length) |
| **Default value** | `auto` |

**Description**

Defines the value for the [`scroll-padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding) [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type).

### scrollTimelineName

| **Required**      | no     |
| ----------------- | ------ | ---------------------------- |
| **Value type**    | `none  | string` (prefixed with "--") |
| **Default value** | `none` |

**Description**

Defines the value for the [`scroll-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline-name) [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type).

### nativeScrollbar

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether the native scrollbar is displayed or not. It is displayed by default.

## `<Scroll.Content />`

| Required                | yes                                       |
| ----------------------- | ----------------------------------------- |
| Underlying HTML element | `div`                                     |
| Requirements            | Must be a descendant of `<Scroll.View />` |

**Description**

The Content sub-component for the Scroll component.

This sub-component represents the content that will move as scroll occurs.

### asChild

See [asChild](https://www.notion.so/Silk-Scroll-72699d18f5fc4cf39bdcd10878c0ffb1?pvs=21) on `<Scroll.Root />`.

# Imperative handling

You can manipulate imperatively the Scroll component by passing a React ref to the `<Scroll.Root />` sub-component `componentRef` prop and then calling the methods stored on it.

### getProgress

| **Value type** | `() => number` |
| -------------- | -------------- |

**Description**

Returns the scroll progress from `0` to `1`. When the `<Scroll.Content />` underlying HTML element start edge is aligned with the `<Scroll.View />` underlying HTML element start edge, scroll progress is `0`. When they are aligned on their end edge, scroll progress is `1`.

### getDistance

| **Value type** | `() => number` |
| -------------- | -------------- |

**Description**

Returns the distance in pixels traveled by the `<Scroll.Content />` underlying HTML element from its start position.

### getAvailableDistance

| **Value type** | `() => number` |
| -------------- | -------------- |

**Description**

Returns the distance in pixels that the `<Scroll.Content />` underlying HTML element can travel in total, from its start position to its end position.

### scrollTo

| **Value type** | `scrollTo: (options: ScrollToOptions) => void`
where
`ScrollToOptions = {
   progress?: number;
   distance?: number;
   animationSettings?: { skip: "default" | "auto" | boolean };
}` |
| --- | --- |

**Description**

Make the `<Scroll.Content />` underlying HTML element travel so it ends up at either the defined `progress` or `distance`.

If the animationSettings `skip` key value computes to `false`, then animation occurs; if it computes to `true` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise.

### scrollBy

| **Value type** | `scrollTo: (options: ScrollByOptions) => void`
where
`ScrollByOptions = {
   progress?: number;
   distance?: number;
   animationSettings?: { skip: "default" | "auto" | boolean };
}` |
| --- | --- |

**Description**

Make the `<Scroll.Content />` underlying HTML element travel by either the defined `progress` or `distance`.

If the animationSettings `skip` key value computes to `false`, then animation occurs; if it computes to `true` the animation is skipped. `"default"` computes to the value provided in the `scrollAnimationSettings` prop on `<Scroll.View />`. `"auto"` computes to `true` when the user has prefers-reduced-motion enabled, it computes to `false` otherwise.
