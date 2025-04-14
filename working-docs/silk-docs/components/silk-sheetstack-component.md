# Silk – SheetStack

# Description

A component designed to group together several Sheet components and enable the definition of stacking-driven animations (i.e. animations based on the travel of Sheets stacked on top of each other).

**Limitations**

- Sheets which are part of a SheetStack can only be dismissed when they are frontmost (i.e. at the top of the stack). This limitation will be lifted in the future.

# Structure

## Basic

```jsx
import { Sheet } from '@silk-hq/components';

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
  </SheetStack.Root>
);
```

# Sub-components

## `<SheetStack.Root />`

| Required                                                     | yes                                                                   |
| ------------------------------------------------------------ | --------------------------------------------------------------------- |
| Underlying HTML element                                      | `div`                                                                 |
| Requirements                                                 | Must be a contain all SheetStack sub-components of the same instance. |
| Must contain all associated `<Sheet.Root />` sub-components. |

**Description**

The root sub-component for the SheetStack component.

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

| **Required**   | no             |
| -------------- | -------------- |
| **Value type** | `SheetStackId` |

**Description**

Defines the id of the SheetStack component instance. This id can then be passed to `<Sheet.Root />`, or `<Island.Root />` `forComponent` prop to associate them with this SheetStack instance.

## `<SheetStack.Outlet />`

| Required                | no                                                                           |
| ----------------------- | ---------------------------------------------------------------------------- |
| Underlying HTML element | `div`                                                                        |
| Requirements            | Must be a child of the `<SheetStack.Root />` of the same SheetStack instance |

**Description**

An Outlet sub-component for the SheetStack component.

It allows to declaratively define animations based on the stacking progress of the associated SheetStack on any HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-SheetStack-2942d5c5fe244f07a32b457ceab476a8?pvs=21) on `<SheetStack.Root />`.

### forComponent

| **Required**      | no                                                        |
| ----------------- | --------------------------------------------------------- |
| **Value type**    | `SheetStackId`                                            |
| **Default value** | the SheetId of the closest `<SheetStack.Root />` ancestor |

**Description**

Associates this sub-component with the desired Sheet instance.

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

| `[string | number, string | number]` | As Sheets travel and get stacked on top of the first Sheet added to the SheetStack, the underlying HTML element will have its related CSS property animated from the first to the second value in the array, each value in-between being interpolated linearly. |
| -------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| `({
   progress: number;
   tween: (start: number | string, end: number | string) => string;
}) => string | number` | As Sheets travel and get stacked on top of the first Sheet added to the SheetStack, the underlying HTML element will have its related CSS property animated based on the value returned by the function. The progress value goes from 0 to n (n being the number of Sheets stacked on top of the associated Sheet). |
| `string` | As the Sheets get stacked on top of first Sheet added to the SheetStack, the underlying HTML element will have its related CSS property receive the defined value. |
| `null | undefined` | The underlying HTML element related CSS property will not be animated or set. |

**Description**

Allows to declaratively define animations driven by the aggregated travel (called “stacking”) of Sheets belonging to the same SheetStack stacked on top of the first Sheet added to the SheetStack for any CSS property of the underlying HTML element.

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
  <SheetStack.Outlet
    stackingAnimation={{
      translateX: ['0px', '100px'],
    }}
  />
  ```
  ```jsx
  <SheetStack.Outlet
    stackingAnimation={{
      translateX: ({ progress }) => progress * 100 + 'px',
    }}
  />
  ```
  ```jsx
  <SheetStack.Outlet
  	stackingAnimation={{
  		backgroundColor:
  			({ tween }) =>
  				`rgb(${tween(10, 0)}, ${tween(10, 0), ${tween(10, 0))`,
  	}}
  />
  ```
