# Description

The component containing all the sub-components necessary to build an advanced sheet.

# Structure

## Basic

```jsx
import { Sheet } from '@silk-hq/components';

export default () => (
  <Sheet.Root>
    <Sheet.Trigger />
    <Sheet.Portal>
      <Sheet.View>
        <Sheet.Backdrop />
        <Sheet.Content>
          <Sheet.BleedingBackground />
          <Sheet.Title />
          <Sheet.Description />
        </Sheet.Content>
      </Sheet.View>
    </Sheet.Portal>
  </Sheet.Root>
);
```

## With Stack

```jsx
import { Sheet, SheetStack } from '@silk-hq/components';

export default () => (
  <SheetStack.Root>
    <SheetStack.Outlet />

    <Sheet.Root>
      <Sheet.Trigger />
      <Sheet.Portal>
        <Sheet.View>
          <Sheet.Backdrop />
          <Sheet.Content>
            <Sheet.Title />
            <Sheet.Description />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>

    <Sheet.Root>
      <Sheet.Portal>
        <Sheet.View>
          <Sheet.Backdrop />
          <Sheet.Content>
            <Sheet.BleedingBackground />
            <Sheet.Title />
            <Sheet.Description />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  </SheetStack.Root>
);
```

## With createComponentId

```jsx
import { Sheet, createComponentId } from '@silk-hq/components';

const mySheetId = createComponentId();

export default () => {
  return (
    <Sheet.Root componentId={mySheetId}>
      <Sheet.Root>
        <Sheet.Trigger />
        <Sheet.Portal>
          <Sheet.View>
            <Sheet.Backdrop />
            <Sheet.Content>
              <Sheet.BleedingBackground />
              <Sheet.Title />
              <Sheet.Description />
              <Sheet.Trigger forComponent={mySheetId} />
            </Sheet.Content>
          </Sheet.View>
        </Sheet.Portal>
      </Sheet.Root>

      <Sheet.Trigger forComponent={mySheetId} />
      <Sheet.Portal>
        <Sheet.View forComponent={mySheetId}>
          <Sheet.Backdrop />
          <Sheet.Content>
            <Sheet.BleedingBackground />
            <Sheet.Title />
            <Sheet.Description />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
};
```

## With all sub-components & related components

```jsx
import { Sheet, Island } from '@silk-hq/components';

export default () => (
  <Sheet.Root>
    <Island.Root>
      <Island.Content />
    </Island.Root>

    <Sheet.Outlet />
    <Sheet.Trigger />

    <Sheet.Portal>
      <Sheet.View>
        <Sheet.Backdrop />
        <Sheet.Content>
          <Sheet.BleedingBackground />
          <Sheet.Title />
          <Sheet.Description />
          <Sheet.AutoFocusTarget />
        </Sheet.Content>
      </Sheet.View>
    </Sheet.Portal>
  </Sheet.Root>
);
```

## With SpecialWrapper

```jsx
import { Sheet } from '@silk-hq/components';

export default () => (
  <Sheet.Root>
    <Sheet.Trigger />
    <Sheet.Portal>
      <Sheet.View>
        <Sheet.Backdrop />
        <Sheet.Content>
          <Sheet.SpecialWrapper.Root>
            <Sheet.SpecialWrapper.Content>
              <Sheet.BleedingBackground />
              <Sheet.Title />
              <Sheet.Description />
            </Sheet.SpecialWrapper.Content>
          </Sheet.SpecialWrapper.Root>
        </Sheet.Content>
      </Sheet.View>
    </Sheet.Portal>
  </Sheet.Root>
);
```

# Examples

- **Bottom Sheet**
  ```tsx
  const BottomSheet = () => {
    return (
      <Sheet.Root license="commercial">
        <SheetTriggerCard>Bottom Sheet</SheetTriggerCard>
        <Sheet.Portal>
          <Sheet.View>
            <Sheet.Backdrop themeColorDimming="auto" />
            <Sheet.Content>
              <Sheet.BleedingBackground />
              <Sheet.Trigger action="dismiss" asChild>
                <SheetDismissButton />
              </Sheet.Trigger>
              <div />
              <div>
                <Sheet.Title>Lorem ipsum aqua sit amet consectetur</Sheet.Title>
                <Sheet.Description>
                  Lorem ipsum aqua sit amet consectetur adipisicing elit. Optio id nostrum
                  distinctio ullam illo aliquam doloribus. <span>Learn more.</span>
                </Sheet.Description>
              </div>
              <Sheet.Trigger action="dismiss">Got it</Sheet.Trigger>
            </Sheet.Content>
          </Sheet.View>
        </Sheet.Portal>
      </Sheet.Root>
    );
  };
  ```

# Sub-components

## `<Sheet.Root />`

| Required                | yes                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Underlying HTML element | `div`                                                                                                                           |
| Requirements            | Must be a contain all Sheet sub-components of the same instance, except for `<Sheet.Portal />` which can be positioned outside. |

**Description**

The root sub-component for the Sheet component.

This sub-component wraps all other Sheet sub-components of the same instance (except for `<Sheet.Portal />` which can be used around it), as it contains logic that is shared with all of them.

### license

| **Required**   | yes           |
| -------------- | ------------- | ----------------- |
| **Value type** | `"commercial" | "non-commercial"` |

**Values description**

| `"commercial"`     | You declare using the component under the commercial license.     |
| ------------------ | ----------------------------------------------------------------- |
| `"non-commercial"` | You declare using the component under the non-commercial license. |

**Description**

Indicates under what license you are using the component.

**Notes**

For commercial use, you must purchase a commercial license.

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

| **Required**   | no        |
| -------------- | --------- |
| **Value type** | `SheetId` |

**Description**

Defines the id of the Sheet component instance. This id can then be passed to other Sheet sub-components `forComponent` prop to associate them with this instance.

### forComponent

| **Required**   | no            |
| -------------- | ------------- | ---------- |
| **Value type** | `SheetStackId | "closest”` |

**Values description**

| `SheetStackId` | Associates this Sheet instance with the SheetStack instance whose `<SheetStack.Root />` sub-component received the same id in its `componentId` prop |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"closest"`    | Associates this Sheet instance with the closest ancestor SheetStack instance                                                                         |

**Description**

Associates this Sheet instance with the desired SheetStack instance.

### sheetRole

| **Required**       | no                                      |
| ------------------ | --------------------------------------- |
| **Value type**     | `React.AriaRole`                        |
| **Default value**  | `undefined`                             |
| **Example values** | `"dialog"`, `"alertdialog"`, `"status"` |

**Description**

Defines the WAI-ARIA role attribute used on the `<Sheet.View />` underlying HTML element.

This value is also used to define the presence of the `aria-haspopup` attribute on the `<Sheet.Trigger />` underlying HTML element.

### defaultPresented

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `false`   |

**Description**

Defines whether the Sheet is initially presented or not.

**Notes**

- On first page render, it is presented after hydration occurs when set to `true`.

### presented

| **Required**      | no                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| **Value type**    | `boolean`                                                                                              |
| **Default value** | `undefined`                                                                                            |
| **Requirements**  | When this prop is used, passing the state setter function to the `onPresentedChange` is also required. |

**Values description**

| `undefined` | The presented state of the Sheet is uncontrolled, it will only present and dismiss based on the user interactions handled internally (e.g. press on a `<Sheet.Trigger />` sub-component). |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `true`      | Will cause the sheet to be presented if it is not currently.                                                                                                                              |
| `false`     | Will cause the sheet to be dismissed if it is currently presented.                                                                                                                        |

**Description**

Allows to control the presented state of the sheet.

**Notes**

- This is an alternative method to the `defaultPresented` prop.
- **!** Currently Sheet doesn’t support interruption during entering & exiting, and cannot be closed when it is not frontmost in a SheetStack (i.e. a sheet is stacked on top of it). Therefore, if `presented` is set to `false` during entering or when not frontmost in a SheetStack, or to `true` during exiting, nothing will happen, and onPresentedChange will be called with the current value of `presented` to avoid any mismatch between the controlled state and the internal one. **This limitation will be lifted in the future**.

### onPresentedChange

| **Required**      | only if the `presented` prop is also used |
| ----------------- | ----------------------------------------- |
| **Value type**    | `(presented: boolean) => void`            |
| **Default value** | `undefined`                               |

**Description**

Setter for the state passed in the `presented` prop. It will be called with the `presented` state value as parameter when it is changed internally (e.g. press on a `<Sheet.Trigger />` sub-component).

**Notes**

- This is an alternative method to the `defaultPresented` prop.

### defaultActiveDetent

| **Required**      | no          |
| ----------------- | ----------- |
| **Value type**    | `number`    |
| **Default value** | `undefined` |

**Description**

Defines the index of the detent the Sheet should initially rest on.

**Notes**

- Detents indexes are defined as follow:
  - when the Sheet is fully outside of the view, it rests on the detent with index `0`;
  - all declared intermediate detents indexes go from `1` to `n-1`;
  - when the Sheet is fully expanded inside of the view, it rests on the last detent, numbered `n` (e.g. index `1` if there is no intermediate detents; index `2` if there is one intermediate detent).
- If defaultActiveDetent is `undefined`, the initial detent the Sheet rests on is the detent with the index `1`.

- **Example**
  ```jsx
  <Sheet.Root defaultActiveDetent={2}>...</Sheet.Root>
  ```

### activeDetent

| **Required**      | no          |
| ----------------- | ----------- |
| **Value type**    | `number`    |
| **Default value** | `undefined` |

**Values description**

| `undefined` | The `activeDetent` underlying state of the Sheet is uncontrolled, it will only change based on the user interactions handled internally (e.g. swipe, or press on a `<Sheet.Trigger />` sub-component). |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `number`    | The `activeDetent` underlying state of the Sheet is controlled, and this value reflects the index of the detent the Sheet is resting on or traveling towards.                                          |

**Description**

Allows to control the `activeDetent` underlying state of the sheet.

**Notes**

- This is an alternative method to the `defaultActiveDetent` prop.
- **!!** Currently it is not possible to step to a detent while stepping is already occurring. So if detent is changed during that state, nothing will occur, but there will be a mismatch between detent and the actual detent the sheet is resting on. So, before updating detent, you should check whether travelStatus ≠ “stepping”. **This limitation will be lifted in the future**.

### onActiveDetentChange

| **Required**      | only if the `activeDetent` prop is also used |
| ----------------- | -------------------------------------------- |
| **Value type**    | `(activeDetent: number) => void`             |
| **Default value** | `undefined`                                  |

**Description**

Setter for the state passed in the `activeDetent` prop. It will be called with the `activeDetent` state value as parameter when it is changed internally (e.g. swipe, or press on a `<Sheet.Trigger />` sub-component).

**Notes**

- This is an alternative method to the `defaultPresented` prop.

## `<Sheet.Trigger />`

| Required                | no                                                                 |
| ----------------------- | ------------------------------------------------------------------ |
| Underlying HTML element | `button`                                                           |
| Requirements            | Must be a child of the `<Sheet.Root />` of the same Sheet instance |

**Description**

A Trigger sub-component for the Sheet component.

It allows to run specific actions related to Sheet based on user input.

- **Example**
  ```jsx
  const MyTrigger = () =>
  	<Sheet.Trigger
  		action={{ type: "step", direction: "down" }}
  		onPress={{ forceFocus: false }}
  	>
  		Step down
  	</Sheet.Trigger>
  }
  ```

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### forComponent

| **Required**      | no                                                     |
| ----------------- | ------------------------------------------------------ |
| **Value type**    | `SheetId`                                              |
| **Default value** | the `SheetId` of the closest `<Sheet.Root />` ancestor |

**Description**

Associates this sub-component with the desired Sheet instance.

### action

| **Required**   | no  |
| -------------- | --- | --------- |
| **Value type** | `   | "present" |

| "dismiss"
| "step"
| {
type: "step";
direction?: "up" | "down";
detent?: number;
}`|
| **Default value** |`"present"` |

**Values description**

| `"present"` | A press event fired on the underlying HTML element will cause the Sheet to be presented.                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"dismiss"` | A press event fired on the underlying HTML element will cause the Sheet to be dismissed.                                                                              |
| `"step"`    | A press event fired on the underlying HTML element will cause the Sheet to step to the next detent in the upward direction, and cycle after reaching the last detent. |

| `{
    type: "step";
    direction?: "up" | "down";
    detent?: number;
}` | A press event fired on the underlying HTML element will cause the Sheet to step to a detent:

- if the `direction` key is used, it will step to the next detent in that direction and cycle after reaching the last detent;
- if the `detent` key is used, it will step to the detent matching that detent index. |

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
    return <Sheet.Trigger onPress={{ forceFocus: false }}>Click me</Sheet.Trigger>;
  };
  ```
  ```jsx
  // Will not run the Trigger action

  const MyTrigger = () => {
    const pressHandler = ({ changeDefault }) => {
      changeDefault({ runAction: false });
      console.log("I don't run the Trigger action!");
    };

    return <Sheet.Trigger onPress={pressHandler}>Click me</Sheet.Trigger>;
  };
  ```

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.Outlet />`

| Required                | no                                                                 |
| ----------------------- | ------------------------------------------------------------------ |
| Underlying HTML element | `div`                                                              |
| Requirements            | Must be a child of the `<Sheet.Root />` of the same Sheet instance |

**Description**

An Outlet sub-component for the Sheet component.

It allows to declaratively define animations based on the travel and stacking progress of the associated Sheet on any HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### forComponent

| **Required**      | no                                                   |
| ----------------- | ---------------------------------------------------- |
| **Value type**    | `SheetId`                                            |
| **Default value** | the SheetId of the closest `<Sheet.Root />` ancestor |

**Description**

Associates this sub-component with the desired Sheet instance.

### travelAnimation

| **Required**   | no  |
| -------------- | --- |
| **Value type** | `{  |

[property: string]:
| [string | number, string | number]
| ({
progress: number;
tween: (start: number | string, end: number | string) => string;
}) => string | number
| string
| null
| undefined;
}`  |
| **Default value** |`undefined` |

**Values description for each key**

| `[string | number, string | number]` | As the Sheet travels from its first detent (index 0) to its last detent, the underlying HTML element will have its related CSS property animated from the first to the second value in the array, each value in-between being interpolated linearly. |
| -------- | -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| `({
   progress: number;
   tween: (start: number | string, end: number | string) => string;
}) => string | number` | As the Sheet travels from its first detent (index 0) to its last detent, the underlying HTML element will have its related CSS property animated based on the value returned by the function. The progress value goes from 0 to 1. |
| `string` | As the Sheet travels, the underlying HTML element will have its related CSS property receive the defined value. |
| `null | undefined` | The underlying HTML element related CSS property will not be animated or set. |

**Description**

Allows to declaratively define animations driven by the Sheet travel for any CSS property of the underlying HTML element.

The keyframe array syntax allows to easily define values that will evolve linearly between 2 values. The function syntax gives you full freedom to return any value based on the travel progress.

**Notes**

- The name of this prop is short for "travel-driven animation".
- **!!** The CSS properties must be written in camelcase form.
- All individual components of the `transform` CSS property can be used individually.
  - **List**
    ```tsx
    | "translate"
    | "translateX"
    | "translateY"
    | "translateZ"
    | "scale"
    | "scaleX"
    | "scaleY"
    | "scaleZ"
    | "rotate"
    | "rotateX"
    | "rotateY"
    | "rotateZ"
    | "skew"
    | "skewX"
    | "skewY"
    ```
- **!!** The keyframes array syntax (`[string | number, string | number]`) is only supported with the following keys:
  - **Keys allowing the keyframes array syntax**
    Note that, apart from `opacity`, all of the following keys will be incorporated into a single `transform` declaration.
    ```tsx
    | "opacity"
    | "translate"
    | "translateX"
    | "translateY"
    | "translateZ"
    | "scale"
    | "scaleX"
    | "scaleY"
    | "scaleZ"
    | "rotate"
    | "rotateX"
    | "rotateY"
    | "rotateZ"
    | "skew"
    | "skewX"
    | "skewY"
    ```
- Three special CSS properties related to clipping are available:

  - `clipBoundary` accepts only one value: `"layout-viewport"`. This special CSS property allows to clip the underlying HTML element where the layout viewport is drawn. Therefore, if the HTML element is overflowing, the layout viewport, it will now be cut off. You can then use apply a transformation to it like `scale` and reveal its clipping.
  - `clipBorderRadius` accepts the same value as the `borderRadius` CSS property. It defines a border radius for the clip area when used in combination with the `clipBoundary` \*\*\*\*special CSS property.
  - `clipTransformOrigin` accept the same value as the `transformOrigin` CSS property. It defines the origin for the CSS transform applied to the element when used in combination with the `clipBoundary` \*\*\*\*special CSS property.

- **Examples**
  ```jsx
  <Sheet.Outlet
    travelAnimation={{
      opacity: [0, 0.5],
    }}
  />
  ```
  ```jsx
  <Sheet.Outlet
    travelAnimation={{
      opacity: ({ progress }) => progress * 0.5,
    }}
  />
  ```
  ```jsx
  <Sheet.Outlet
  	travelAnimation={{
  		backgroundColor:
  			({ tween }) =>
  				`rgb(${tween(100, 0)}, ${tween(100, 0), ${tween(100, 0))`,
  	}}
  />
  ```

### stackingAnimation

| **Required**   | no  |
| -------------- | --- |
| **Value type** | `{  |

[property: string]:
| [string | number, string | number]
| ({
progress: number;
tween: (start: number | string, end: number | string) => string;
}) => string | number
| string
| null
| undefined;
}`  |
| **Default value** |`undefined` |

**Values description for each key**

| `[string | number, string | number]` | As Sheets travel and get stacked on top of the associated Sheet, the underlying HTML element will have its related CSS property animated from the first to the second value in the array, each value in-between being interpolated linearly. |
| -------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| `({
   progress: number;
   tween: (start: number | string, end: number | string) => string;
}) => string | number` | As Sheets travel and get stacked on top of the associated Sheet, the underlying HTML element will have its related CSS property animated based on the value returned by the function. The progress value goes from 0 to n (n being the number of Sheets stacked on top of the associated Sheet). |
| `string` | As the Sheets get stacked on top of the associated Sheet, the underlying HTML element will have its related CSS property receive the defined value. |
| `null | undefined` | The underlying HTML element related CSS property will not be animated or set. |

**Description**

Allows to declaratively define animations driven by the aggregated travel (called “stacking”) of Sheets belonging to the same SheetStack stacked on top of the associated Sheet for any CSS property of the underlying HTML element.

The keyframe array syntax allows to easily define values that will evolve linearly between 2 values. The function syntax gives you full freedom to return any value based on the stacking progress.

**Notes**

- The name of this prop is short for "stacking-driven animation".
- **!!** The CSS properties must be written in camelcase form.
- **!!** The keyframes array syntax (`[string | number, string | number]`) is only supported with the following keys:

  - **Keys allowing the keyframes array syntax**
    Note that, apart from `opacity`, all of the following keys will be incorporated into a single `transform` declaration.
    ```tsx
    | "opacity"
    | "translate"
    | "translateX"
    | "translateY"
    | "translateZ"
    | "scale"
    | "scaleX"
    | "scaleY"
    | "scaleZ"
    | "rotate"
    | "rotateX"
    | "rotateY"
    | "rotateZ"
    | "skew"
    | "skewX"
    | "skewY"
    ```

- **Examples**
  ```jsx
  <Sheet.Outlet
    stackingAnimation={{
      translateX: ['0px', '100px'],
    }}
  />
  ```
  ```jsx
  <Sheet.Outlet
    stackingAnimation={{
      translateX: ({ progress }) => progress * 100 + 'px',
    }}
  />
  ```
  ```jsx
  <Sheet.Outlet
  	stackingAnimation={{
  		backgroundColor:
  			({ tween }) =>
  				`rgb(${tween(10, 0)}, ${tween(10, 0), ${tween(10, 0))`,
  	}}
  />
  ```

## `<Sheet.Portal />`

| Required                | no   |
| ----------------------- | ---- |
| Underlying HTML element | none |

**Description**

A Portal sub-component for the Sheet component.

Allows to append its child into any HTML element, including the `document.body`.

### container

| **Required**      | no              |
| ----------------- | --------------- |
| **Value type**    | HTMLElement     |
| **Default value** | `document.body` |

**Description**

Appends the child React element inside of the HTML element provided in the `container` prop.

**Notes**

- This is useful to append `<Sheet.View />` inside of the `document.body` to be sure they always appear on top of all other elements.

## `<Sheet.View />`

| Required                | yes                                                                |
| ----------------------- | ------------------------------------------------------------------ |
| Underlying HTML element | `div`                                                              |
| Requirements            | Must be a child of the `<Sheet.Root />` of the same Sheet instance |

**Description**

The View sub-component for the Sheet component.

The underlying HTML element is used as the view inside of which the `<Sheet.Content />` underlying HTML element can travel.

It holds the aria role of the Sheet.

### forComponent

| **Required**      | no                                                   |
| ----------------- | ---------------------------------------------------- |
| **Value type**    | SheetId                                              |
| **Default value** | the SheetId of the closest `<Sheet.Root />` ancestor |

**Description**

Associates this sub-component with the desired Sheet instance.

### contentPlacement

| **Required**      | no                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------- | -------- | ------ | ------- | --------- |
| **Value type**    | `"top"                                                                                          | "bottom" | "left" | "right" | "center"` |
| **Default value** | `"bottom"` if the `tracks` prop is not set, otherwise it matches the value of the `tracks` prop |

**Description**

Defines the placement of `<Sheet.Content />` underlying HTML element inside of `<Sheet.View />` underlying HTML element on the travel axis. On the cross axis, it is always centered.

### tracks

| **Required**   | no  |
| -------------- | --- | ----- |
| **Value type** | `   | "top" |

| "bottom"
| "left"
| "right"
| ["top", "bottom"]
| ["left", "right"]`|
| **Default value** |`"bottom"`if no`contentPlacement`prop is set, otherwise it matches the value of the`contentPlacement` prop |

**Description**

Defines the track(s) that `<Sheet.Content />` underlying HTML can travel on, from its last detent to its origin detent (index 0).

### detents

| **Required**      | no          |
| ----------------- | ----------- | ------------------------------------------------------------------------- |
| **Value type**    | `string     | Array<string>`where`string`is a CSS length which does not use the`%` unit |
| **Default value** | `undefined` |

**Description**

Defines one or several intermediate detents on which `<Sheet.Content />` underlying HTML element can rest on the track between the origin detent (index `0`) and the last detent.

### swipeTrap

| **Required**      | no       |
| ----------------- | -------- | ------------------------------ |
| **Value type**    | `boolean | { x?: boolean; y?: boolean; }` |
| **Default value** |          |

**Values description**

| `true`        | Traps swipe both on both the x and y axis |
| ------------- | ----------------------------------------- |
| `{ x: true }` | Traps swipe on the x axis                 |
| `{ y: true }` | Traps swipe on the y axis                 |

**Description**

Defines whether swipes on the specified axis or axes are trapped within the `<Sheet.View />` underlying HTML element or not. When not trapped, when swiping in a direction where further travel is not possible, the swipe gesture will propagate to the closest ancestor Sheet, scroll container, or window (triggering swipe to go back in history in browser that support it).

**Notes**

- On Android in non-standalone mode, `swipeTrap` on the y axis always computes to `false` not to prevent the browser UI from being revealed.
- If the `swipeOvershoot` prop is set to `false`, `swipeTrap` on the travel axis always computes to `true`.
- Safari has a bug causing swipe to always be trapped when swiping over a vertically swipeable Sheet or Scroll which is inside of a horizontally swipeable Sheet or Scroll (and vice versa). We hope to see that issue resolved quickly.

### swipeOvershoot

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Values description**

| `true`  | Overshoot will occur, causing the `<Sheet.Content />` underlying HTML element to move further than the last detent, and snap back into place when released. |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `false` | Overshoot will not occur, the `<Sheet.Content />` underlying HTML element will stop right away when being swiped past the last detent.                      |

**Description**

Defines the behavior when the user performs a swipe that would cause the `<Sheet.Content />` underlying HTML element to move further than its last detent.

**Notes**

- Overshoot will only work in browsers that support elastic overscroll (Safari on all Apple’s Oses, and Firefox on macOS)

### swipeDismissal

| **Required**      | no                                                                          |
| ----------------- | --------------------------------------------------------------------------- |
| **Value type**    | `boolean`                                                                   |
| **Default value** | `false` if the `sheetRole` prop is set to `"alertdialog"`, `true` otherwise |

**Description**

Defines whether it is possible to dismiss the Sheet by swiping the `<Sheet.Content />` underlying HTML element out of the `<Sheet.View />` underlying HTML element.

**Notes**

- Always computes to `false` if the `sheetRole` prop is set to `"alertdialog"`.

### swipe

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether performing a swipe over the `<Sheet.Content />` underlying HTML element causes the Sheet to travel.

**Notes**

- **!!** Can only be set when the Sheet is resting on a detent, not while it is traveling.

### nativeEdgeSwipePrevention

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `false`   |

**Description**

Defines whether a swipe from the edge of the screen on iOS Safari will cause the browser to go back in navigation history.

**Notes**

- The behavior of the Safari browser allowing this mechanism to work is not subject to a web standard; therefore there is no guarantee that is will keep working in the future.
- This mechanism is not perfect, rarely fast gestures can still go through and cause the browser to go back in navigation history.
  - For a perfect prevention on iOS in standalone mode we recommend simply not adding new entries to the page history, but to instead replace the existing one. That way, Safari will not allow the user to go back to history with a swipe from the edge, as there will be no entry to go back to.
- This mechanism relies on a 28px-wide element positioned at the left edge of the screen. By default it will appear above any element inside `<Sheet.View />` underlying HTML element, and prevent interaction with any HTML elements below. If this is a problem, you can lift your elements by applying “position: relative” (or any other position different from “static”) and a `z-index` value strictly superior to `0`.
- This element will also capture click outside, preventing dismiss if the user clicks on it, even if visually outside of `<View.Content />` underlying HTML element.

### enteringAnimationSettings

| **Required**      | no       |
| ----------------- | -------- | -------- | -------- | -------- | ---------- | -------- | --------- |
| **Value type**    | `        | "gentle" | "smooth" | "snappy" | "brisk"    | "bouncy" | "elastic" |
| {                 |
| preset?: "gentle" | "smooth" | "snappy" | "brisk"  | "bouncy" | "elastic"; |

track?: Track;
contentMove?: boolean;
skip?: boolean;
}
| {
easing: "spring";
stiffness: number;
damping: number;
mass: number;
initialVelocity?: number;
precision?: number;
delay?: number;
track?: Track;
contentMove?: boolean;
skip?: boolean;
}
| {
easing:
| "ease"
| "ease-in"
| "ease-out"
| "ease-in-out"
| "linear";
duration: number;
delay?: number;
track?: Track;
contentMove?: boolean;
skip?: boolean;
}`|
| **Default value** |`{
preset: "smooth",
contentMove: true,
skip: prefersReducedMotion, // computes to true if prefers reduced motion
}` |

**Values description**

| `"gentle"                | { preset: "gentle" }`                                                                                                                                                                                           | Use the `"gentle"` preset. |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `{ track: "top" }`       | For Sheet with two tracks defined, picks the track on which travel occurs during the entering phase (e.g. the `"top"` track here).                                                                              |
| `{ contentMove: false }` | The `<Sheet.Content />` underlying HTML element travel will not be animated, instead it will be placed on its last detent immediately. All other sub-components underlying HTML elements are animated normally. |
| `{ skip: true }`         | The entering animation is skipped entirely and the Sheet doesn’t go through the corresponding state.                                                                                                            |

**Description**

Defines the configuration for the programmatic entering travel animation of all animated sub-components underlying HTML elements.

**Notes**

- **Presets definitions**
  ```tsx
  presets: {
  	gentle: {
  	  easing: "spring",
      stiffness: 560,
      damping: 68,
      mass: 1.85,
    },
    smooth: {
  	  easing: "spring",
      stiffness: 580,
      damping: 60,
      mass: 1.35,
    },
    snappy: {
  	  easing: "spring",
      stiffness: 350,
      damping: 34,
      mass: 0.9,
    },
    brisk: {
  	  easing: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.65,
    },
    bouncy: {
  	  easing: "spring",
      stiffness: 240,
      damping: 19,
      mass: 0.7,
    },
    elastic: {
  	  easing: "spring",
      stiffness: 260,
      damping: 20,
      mass: 1,
    },
  }
  ```

### exitingAnimationSettings

**Description**

Defines the configuration for the programmatic exiting travel animation of all animated sub-components underlying HTML elements.

See [enteringAnimationSettings](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21).

### steppingAnimationSettings

**Description**

Defines the configuration for the programmatic entering travel animation of all animated sub-components underlying HTML elements.

See [enteringAnimationSettings](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21). The `track` and `contentMove` keys do not apply here.

### onTravelStatusChange

| **Required**      | no           |
| ----------------- | ------------ | ------------ | ---------- | --------- | ----------------------- |
| **Value type**    | `("entering" | "idleInside" | "stepping" | "exiting" | "idleOutside") => void` |
| **Default value** | `undefined`  |

**Description**

An event handler which runs when the travel status changes.

### onTravelRangeChange

| **Required**      | no                                          |
| ----------------- | ------------------------------------------- |
| **Value type**    | `({ start: number; end: number; }) => void` |
| **Default value** | `undefined`                                 |

**Description**

An event handler which runs when the travel range changes. A range is defined its a start detent and an end detent.

The Sheet is considered to be within a range when the edge opposite to the dismiss direction of the `<Sheet.Content />` underlying HTML element is between the start and end detent of that range.

When the Sheet is resting on a specific detent, the start and end detent are equal to the index of that detent.

**Notes**

- The range does not reflect overshoot. Therefore, if the Sheet is overshooting after the detent with index 1, its travel range will be `{ start: 1, end: 1 }`.

### onTravel

| **Required**   | no  |
| -------------- | --- |
| **Value type** | `({ |

progress: number;
range: { start: number; end: number };
progressAtDetents: Array<number>;
}) => void`|
| **Default value** |`undefined` |

**Parameters description**

| `progress`          | The progress value of the Sheet, going from `0` to `1`. It is `0` when the Sheet is fully out, and `1` when it is resting on the last detent. |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `range`             | The travel range the Sheet is currently within.                                                                                               |
| `progressAtDetents` | The equivalent progress value for each detent. It is useful to make calculations and apply effects only within specific ranges                |

**Description**

An event handler which runs on every frame when travel occurs, whether it is caused by swipe or programmatically.

### onTravelStart

| **Required**      | no           |
| ----------------- | ------------ |
| **Value type**    | `() => void` |
| **Default value** | `undefined`  |

**Description**

An event handler which runs when the Sheet starts traveling, whether it is caused by swipe or programmatically. It runs before the first `onTravel` event handler call.

### onTravelEnd

| **Required**      | no           |
| ----------------- | ------------ |
| **Value type**    | `() => void` |
| **Default value** | `undefined`  |

**Description**

An event handler which runs after the Sheet finish traveling, whether it is caused by swipe or programmatically. It runs before the last `onTravel` event handler call.

### inertOutside

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines, when the Sheet is frontmost, whether all interactions outside of the `<Sheet.View />` and all associated `<Island.Content />` underlying HTML elements should be prevented. In other words, this prop defines whether the Sheet is **modal** or not.

It also prevents `<body>` from being scrollable, as expected. As a result, scrollbars are removed, and a CSS padding is added to compensate for it. In order to adjust the position of HTML elements using the CSS `fixed` positioning, please use the Fixed component. See [Silk – Fixed](https://www.notion.so/Silk-Fixed-0ceb28a9bdf34700928b838e6bdd0140?pvs=21).

**Notes**

- Use the Island component to wrap any HTML element that you want the user to be able to interact with when this prop is set to `true`. See [Silk – Island](https://www.notion.so/Silk-Island-0490ff00d4164aafb9d677daa5b94d78?pvs=21).
- **!!** Due to a Safari bug, when this prop is set to `false` and you are not using `<Sheet.Backdrop />`, you need to use `<Sheet.SpecialWrapper.Root />` and `<Sheet.SpecialWrapper.Content />` inside of `<Sheet.Content />`, otherwise the Sheet will not be swipeable.

### onPresentAutoFocus

| **Required**   | no  |
| -------------- | --- | --- |
| **Value type** | `   | {   |

    focus?: boolean;

}
| ((customEvent: {
changeDefault: (changedBehavior: {
focus?: boolean;
}) => void;
nativeEvent: null;
}) => void)}`|
| **Default value** |`{ focus: true }` |

**Values description**

| `{ focus: true }`  | Causes the first `<AutoFocusTarget />` underlying HTML element if there is one, or the first focusable HTML element within the `<Sheet.View />` underlying HTML element to receive focus when the Sheet gets presented. |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{ focus: false }` | Prevent the autofocus mechanism to focus any HTML element when the Sheet gets prevented.                                                                                                                                |

**Description**

An event handler which runs when the autofocus mechanism is executed at the time the Sheet is presented (at the end of the entering animation if there is one).

### onDismissAutoFocus

| **Required**   | no  |
| -------------- | --- | --- |
| **Value type** | `   | {   |

    focus?: boolean;

}
| ((customEvent: {
changeDefault: (changedBehavior: {
focus?: boolean;
}) => void;
nativeEvent: null;
}) => void)}`|
| **Default value** |`{ focus: true }` |

**Values description**

| `{ focus: true }`  | Causes the first `<AutoFocusTarget />` underlying HTML element if there is one, or the first focusable HTML element within the `<Sheet.View />` underlying HTML element to receive focus when the Sheet gets dismissed. |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{ focus: false }` | Prevents the autofocus mechanism to focus any HTML element when the Sheet gets dismissed.                                                                                                                               |

**Description**

An event handler which runs when the autofocus mechanism is executed at the time the Sheet is dismissed (at the end of the exiting animation if there is one).

### onClickOutside

| **Required**   | no  |
| -------------- | --- | --- |
| **Value type** | `   | {   |

    dismiss?: boolean;
    stopOverlayPropagation?: boolean;

}
| ((customEvent: {
changeDefault: (changedBehavior: {
dismiss?: boolean;
stopOverlayPropagation?: boolean;
}) => void;
nativeEvent: React.SyntheticEvent;
}) => void)}`|
| **Default value** |`{ dismiss: true, stopOverlayPropagation: true }` |

**Values description**

| `{ dismiss: true }`                 | If the `sheetRole` prop is not set to `"alertdialog"`, then it will get dismissed when a click occurs outside.                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{ dismiss: false }`                | The Sheet will not get dismissed when a click occurs outside.                                                                                                               |
| `{ stopOverlayPropagation: true }`  | The custom event “click outside” will not propagate to overlays (i.e. Sheets) that are presented below this one. Only this Sheet will deal with this event.                 |
| `{ stopOverlayPropagation: false }` | The custom event “click outside” will propagate to overlays (i.e. Sheets) that are presented below this one, causing them to get dismissed if they are configured to do so. |

**Description**

An event handler which runs when a click occurs outside of `<Sheet.View />` and all associated `<Island.Content />` underlying HTML elements.

Click event performed on `<Sheet.Backdrop />` underlying HTML element are considered as outside. `<Sheet.View />` underlying HTML element is click-through, so click events performed directly over it are considered as outside.

**Notes**

- `{ dismiss: false, stopOverlayPropagation: false }` is useful for example in combination with the `inertOutside` prop set to `false` in the case of a toast or sidebar component which may be presented on top of another Sheet. In that case you don’t want the toast or sidebar component to get dismissed when a click outside occurs, but may want the Sheet below to do so. Because the click outside custom event will be propagated to the Sheet below, it will get dismissed if its `onClickOutside` prop is set to `{ dismiss: true }`.

### onEscapeKeyDown

| **Required**   | no  |
| -------------- | --- | --- |
| **Value type** | `   | {   |

    nativePreventDefault?: boolean;
    dismiss?: boolean;
    stopOverlayPropagation?: boolean;

}
| ((customEvent: {
changeDefault: (changedBehavior: {
nativePreventDefault?: boolean;
dismiss?: boolean;
stopOverlayPropagation?: boolean;
}) => void;
nativeEvent: React.SyntheticEvent;
}) => void)}`|
| **Default value** |`{
nativePreventDefault: true,
dismiss: true,
stopOverlayPropagation: true
}` |

**Values description**

| `{ nativePreventDefault: true }`    | The user-agent default action run when the escape key is pressed is prevented. (Safari macOS default action is escaping full-screen mode.)                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{ nativePreventDefault: true }`    | The user-agent default action run when the escape key is pressed is not prevented. (Safari macOS default action is escaping full-screen mode.)               |
| `{ dismiss: true }`                 | If the `sheetRole` prop is not set to `"alertdialog"`, then it will get dismissed when the escape key is pressed.                                            |
| `{ dismiss: false }`                | The Sheet will not get dismissed when the escape key is pressed.                                                                                             |
| `{ stopOverlayPropagation: true }`  | The keydown event will not propagate to overlays (i.e. Sheets) that are presented below this one. Only this Sheet will deal with this event.                 |
| `{ stopOverlayPropagation: false }` | The keydown event will propagate to overlays (i.e. Sheets) that are presented below this one, causing them to get dismissed if they are configured to do so. |

**Description**

An event handler which runs when a the escape key is pressed.

**Notes**

- `{ dismiss: false, stopOverlayPropagation: false }` is useful for example in combination with the `inertOutside` prop set to `false` in the case of a toast or sidebar component which may be presented on top of another Sheet. In that case you don’t want the toast or sidebar component to get dismissed when the escape key is pressed, but may want the Sheet below to do so. Because the keydown event will be propagated to the Sheet below, it will get dismissed if its `onEscapeKeyDown` prop is set to `{ dismiss: true }`.

### **onFocusInside**

| **Required**   | no               |
| -------------- | ---------------- |
| **Value type** | `(customEvent: { |

nativeEvent: Event;
}) => void`|
| **Default value** |`undefined` |

**Description**

An event handler which runs when focus occurs inside of `<Sheet.View />` underlying HTML element.

### **nativeFocusScrollPrevention**

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether the native browser scroll into view mechanism should be prevented or not when an HTML element which is the descendant of the `<Sheet.View />` underlying HTML element receives focus.

When an HTML element receives focus on mobile, if the browser determines that it will be off-screen, or that it will end up being covered by the on-screen keyboard after receiving focus, it may move some scroll containers into views and shift the viewport up or down so that the focused HTML element ends up being visible to the user. Unfortunately, in all browsers this behavior is currently buggy, janky, and possibly ineffective, resulting in a terrible user experience.

That is why we allow to prevent the default behavior, and properly deal with the position of the focused HTML element.

If the focused HTML element is naturally positioned at the top of the screen, you have nothing else to do. If it ends up being covered by the on-screen keyboard, we recommend using the Scroll component so it gets scrolled into view automatically.

**Notes**

- **!** When the user clicks on text present in a text input, the caret will always be put back at its previous position when the mechanism is used. If it is a problem for you, you can disable the mechanism by setting the prop to `false`.
- **!** In iOS Safari, the mechanism doesn’t work effectively with password inputs whose `autoComplete` html attribute is set to anything else than `"current-password"`. Therefore, we strongly recommend always using this value. Safari won’t suggest a new password directly, but the user can still get a suggested password by tapping the “Password” button in the suggestion bar and asking the password manager to provide a new password.
- **!** Due to Safari bugs, the mechanism may still sometimes fail with password-related inputs (i.e. any field for which Safari shows the Password button in the suggestion bar).
- **!** Due to a bug in Chrome Android, the prevention mechanism doesn’t work effectively when the focus is moved using the on-screen keyboard “next input” button.
- **!** Due to a bug in Chrome Android, for inputs causing the suggestion bar of the keyboard to be shown, a distance of at least 48px between the last text input and the bottom of the viewport is required to avoid a layout shift.

## `<Sheet.Backdrop />`

| Required                | no                                                                 |
| ----------------------- | ------------------------------------------------------------------ |
| Underlying HTML element | `div`                                                              |
| Requirements            | Must be a child of the `<Sheet.View />` of the same Sheet instance |

**Description**

A Backdrop sub-component for the Sheet component.

This sub-component prevents user interactions with the content below.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### swipeable

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether swiping over the Backdrop underlying HTML element causes the Sheet to travel.

**Notes**

- When set to `false`, using the SpecialWrapper sub-component is required in Safari due to a bug.

### themeColorDimming

| **Required**      | no      |
| ----------------- | ------- | ------- |
| **Value type**    | `false  | "auto"` |
| **Default value** | `false` |

**Values description**

| `"auto"` | Computes to `true` in WebKit-based browsers. When `true`, the theme-color gets dimmed. |
| -------- | -------------------------------------------------------------------------------------- |
| `false`  | The theme-color does not get dimmed.                                                   |

**Description**

Defines whether the theme-color of the page gets dimmed to match the CSS `background-color` and opacity of `<Sheet.Backdrop />` underlying HTML element, and make the OS status bar and browser UI blend into it.

**Requirements**

- The HTML meta-tag with the `theme-color` name must be set, and its value declared using the RGB format (`rgb(<integer>, <integer>, <integer>)`).
- The `<Sheet.Backdrop />` underlying HTML element CSS `background-color` value must not include the alpha channel.
- The `<Sheet.Backdrop />` must have a travel animation declared for its `opacity` CSS property, and its value must either a keyframes array using numbers (not string) or a callback returning a number.

### travelAnimation

| **Default value** | `({ progress }) => Math.min(progress * 0.33, 0.33)` |
| ----------------- | --------------------------------------------------- |

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

**Notes**

- You can remove the default value by setting it to `{ opacity: null }`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.Content />`

| Required                | yes                                                                |
| ----------------------- | ------------------------------------------------------------------ |
| Underlying HTML element | `div`                                                              |
| Requirements            | Must be a child of the `<Sheet.View />` of the same Sheet instance |

**Description**

The Content sub-component for the Sheet component.

This is the sub-component which represents the panel which moves during travel.

**Notes**

- Its position is determined by the `contentPlacement` prop on `<Sheet.View />`. You cannot, and must not try to define its position in any other way.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.BleedingBackground />`

| Required                | no                                          |
| ----------------------- | ------------------------------------------- |
| Underlying HTML element | `div`                                       |
| Requirements            | Must be a descendant of `<Sheet.Content />` |

**Description**

This sub-component renders an HTML element which is automatically sized and positioned to fully occupy the `<Sheet.Content />` underlying HTML element and bleed in the swipe dismissal direction to make it look like it is expanded during overshooting.

The underlying HTML element can be styled freely to customize its appearance.

**Notes**

- As an optimization, the underlying HTML element is being resized to be smaller during entering and exiting animation. This can cause undesired effects in some cases when using gradient or images as background.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.Handle />`

| Required                | no                                       |
| ----------------------- | ---------------------------------------- |
| Underlying HTML element | `div`                                    |
| Requirements            | Must be a descendant of `<Sheet.Root />` |

**Description**

A sub-component rendering representing a “handle”, a signifier usually used to indicate to the user that swiping the Sheet is possible.

Internally, this sub-component renders a `<Sheet.Trigger />` sub-component wrapping a `<VisuallyHidden />` component. Therefore, any textual content passed to it will only be accessible to screen-readers and visually hidden.

A `::before` pseudo-element is used to expand the interactive area of the underlying Trigger.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### forComponent

| **Required**      | no                                                     |
| ----------------- | ------------------------------------------------------ |
| **Value type**    | `SheetId`                                              |
| **Default value** | the `SheetId` of the closest `<Sheet.Root />` ancestor |

**Description**

Associates this sub-component with the desired Sheet instance.

### action

| **Required**   | no  |
| -------------- | --- | --------- |
| **Value type** | `   | "dismiss" |

| "step"
| {
type: "step";
direction?: "up" | "down";
detent?: number;
}`|
| **Default value** |`"step"` |

**Values description**

| `"dismiss"` | A press event fired on the underlying HTML element will cause the Sheet to be dismissed.                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"step"`    | A press event fired on the underlying HTML element will cause the Sheet to step to the next detent in the upward direction, and cycle after reaching the last detent. |

| `{
    type: "step";
    direction?: "up" | "down";
    detent?: number;
}` | A press event fired on the underlying HTML element will cause the Sheet to step to a detent:

- if the `direction` key is used, it will step to the next detent in that direction and cycle after reaching the last detent;
- if the `detent` key is used, it will step to the detent matching that detent index. |

**Description**

Defines the action the Trigger will run when it is pressed.

### onPress

See [onPress](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Trigger />`.

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.Title />`

| Required                | only if the `sheetRole` is set to `dialog` or `alertdialog` |
| ----------------------- | ----------------------------------------------------------- |
| Underlying HTML element | `h2`                                                        |
| Requirements            | Must be a descendant of `<Sheet.View />`                    |

**Description**

A sub-component used to define a title for the Sheet.

The `aria-labelledby` HTML attribute is set automatically on `<Sheet.View />` underlying HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.Description />`

| Required                | only if the `sheetRole` is set to `dialog` or `alertdialog` |
| ----------------------- | ----------------------------------------------------------- |
| Underlying HTML element | `h2`                                                        |
| Requirements            | Must be a descendant of `<Sheet.View />`                    |

**Description**

A sub-component used to define a title for the Sheet.

The `aria-describedby` HTML attribute is set automatically on `<Sheet.View />` underlying HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

### travelAnimation

See [travelAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

### stackingAnimation

See [stackingAnimation](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Outlet />`.

## `<Sheet.SpecialWrapper.Root />`

| Required                | no                                                                    |
| ----------------------- | --------------------------------------------------------------------- |
| Underlying HTML element | `div`                                                                 |
| Requirements            | Must be a child of the `<Sheet.Content />` of the same Sheet instance |

**Description**

This sub-component allows to workaround a bug causing swiping not to work in Safari when both:

- the `inertOutside` prop on `<Sheet.View />` is set to `false`;
- the Backdrop sub-component is not present, or it is present but its `swipeable` prop is set to `false`.

**Notes**

- There is two limitations caused by the use this sub-component:
  - The underlying HTML element makes use of the `overflow` CSS property with a value other than `visible`, causing any content overflowing its bound to be clipped.
  - When swiping over the underlying HTML element in the cross axis of the Sheet, and then in the travel axis without initiating a new swipe, Sheet travel will not occur.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.

## `<Sheet.SpecialWrapper.Content />`

| Required                | if `<Sheet.SpecialWrapper.Root />` is used, yes        |
| ----------------------- | ------------------------------------------------------ |
| Underlying HTML element | `div`                                                  |
| Requirements            | Must be a child of the `<Sheet.SpecialWrapper.Root />` |

**Description**

This sub-component is to be used in combination with `<Sheet.SpecialWrapper.Root />`.

### asChild

See [asChild](https://www.notion.so/Silk-Sheet-91198030a4a4412faede6530be7c705b?pvs=21) on `<Sheet.Root />`.
