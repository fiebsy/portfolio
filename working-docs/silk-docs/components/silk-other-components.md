# Silk – AutoFocusTarget

# Description

A component whose underlying HTML element will be prioritized to receive focus when a Silk-controlled autoFocus mechanism runs.

# Sub-components

## `<AutoFocusTarget.Root />`

| Required                | yes   |
| ----------------------- | ----- |
| Underlying HTML element | `div` |

**Description**

A component whose underlying HTML element will be prioritized depending on its props to receive focus when a Silk-controlled autoFocus mechanism runs.

If several `<AutoFocusTarget.Root />` are present on the page and matches the required criteria to receive focus, the first focusable one (i.e. whose not disabled, not inert, not outside an inertOutside Sheet, etc) is the one which will receive focus.

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

### forComponent

| **Required**      | no          |
| ----------------- | ----------- |
| **Value type**    | `SheetId`   |
| **Default value** | `undefined` |

**Values description**

| `SheetId`   | The AutoFocusTarget instance is associated with the Sheet instance matching the `SheetId` provided. |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `undefined` | The AutoFocusTarget instance is associated with all the Sheet instances present on page.            |

**Description**

Associates the AutoFocusTarget instance with the desired Sheet instance.

### timing

| **Required**   | yes        |
| -------------- | ---------- | --------- | --------------- | ----------- |
| **Value type** | `"present" | "dismiss" | Array<"present" | "dismiss">` |

**Values description**

| `"present"` | The AutoFocusTarget instance will be considered a target when the associated Sheet instance gets presented. |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `"dismiss"` | The AutoFocusTarget instance will be considered a target when the associated Sheet instance gets dismissed. |

**Description**

Defines at what Sheet timing the AutoFocusTarget instance should be considered a target for the associated Sheet instance autoFocus mechanism.

# Silk – Island

# Description

When a `<Sheet.View />` sub-component has its `inertOutside` prop set to `true`, only descendant DOM elements of its underlying HTML element can be interacted with. The Island components allows to make the Island descendant HTML elements interactive as well. As such, it creates “islands of interactivity” outside of the Sheet.

For example, this is useful to keep a navigation bar accessible even though a Sheet is presented.

# Structure

## Basic

```jsx
import { Sheet, Island } from "@silk-hq/sheet";

export default () => (
	<Island.Root>
		<Island.Content>
			{* Interactive content *}
		</Island.Content>
	</Island.Root>

	<Sheet.Root>
		<Sheet.Trigger />
		<Sheet.Portal>
			<Sheet.View inertOutside={true}>
				<Sheet.Backdrop />
				<Sheet.Content>
					{* Interactive content *}
				</Sheet.Content>
			</Sheet.View>
		</Sheet.Portal>
	</Sheet.Root>
);
```

# Sub-components

## `<Island.Root />`

| Required                | yes                               |
| ----------------------- | --------------------------------- |
| Underlying HTML element | `div`                             |
| Requirements            | Must contain `<Island.Content />` |

**Description**

The root sub-component of the Island component.

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

### forComponent

| **Required**      | no          |
| ----------------- | ----------- | ------------ | ------------- | -------------- |
| **Value type**    | `SheetId    | SheetStackId | Array<SheetId | SheetStackId>` |
| **Default value** | `undefined` |

**Values description**

| `| SheetId
| SheetStackId
| Array<SheetId | SheetStackId>` | The Island instance is associated with the Sheet instance(s) matching the component ids provided. |
| --- | --- |
| `undefined` | The Island instance is associated with all the Sheet instances present on page. |

**Description**

Associates the Island instance with the desired Sheet instance(s).

### contentGetter

| **Required**   | only if the `<Island.Content />` is not used |
| -------------- | -------------------------------------------- | ------- | ---- | ---------- | ------- |
| **Value type** | `(() => HTMLElement                          | Element | null | undefined) | string` |

**Values description**

| `(() => HTMLElement     | Element                                                                                                                                           | null | undefined)` | A function which returns an HTML element when called. |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------------------------------------------------- |
| `string` (CSS selector) | A `string` containing a CSS selector matching at least one HTML element. If several HTML element match the CSS selector, the first one is picked. |

**Description**

Defines the content of the Island instance by getting an HTML element through a function call or the use of a CSS selector instead of using the `<Island.Content />` sub-component and its `children` prop.

**Notes**

- This is useful when you are not able to wrap the HTML element inside of `<Island.Content />`. One possible reason is that it is created outside of React (e.g. a chat plugin’s bubble).
- When using the `contentGetter` prop, scroll is not trapped inside of the Island instance, so it is up to the gotten element to implement some scroll trapping mechanism.

## `<Island.Content />`

| Required                | if the `contentGetter` prop is not used on `<Island.Root />` |
| ----------------------- | ------------------------------------------------------------ |
| Underlying HTML element | `div`                                                        |
| Requirements            | Must be a child of `<Island.Root />`                         |

**Description**

The content sub-component of the Island component.

The underlying HTML element will be interactive when the associated Sheet instance(s) are presented.

**Notes**

- Scrolling is trapped inside of the underlying HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-Island-0490ff00d4164aafb9d677daa5b94d78?pvs=21) on `<Island.Root />`.

# Silk – ExternalOverlay

# Description

The ExternalOverlay component allows to indicate to the Sheet component instances currently presented that an overlay component out of Silk’s control is also present.

This allows to either include such overlay inside of the inert outside mechanism of the Sheet component instances, or to disable it to avoid any potential conflict.

# Sub-components

## `<ExternalOverlay.Root />`

| Required                | yes   |
| ----------------------- | ----- |
| Underlying HTML element | `div` |

**Description**

The root sub-component of the ExternalOverlay component.

It should be mounted or have its `disabled` prop set to `false` at the same time as the component it wraps gets mounted or its inert outside mechanism gets set up.

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

### disabled

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `false`   |

**Description**

Defines whether the ExternalOverlay is disabled. If it is, it will have no effect.

### selfManagedInertOutside

| **Required**      | no        |
| ----------------- | --------- |
| **Value type**    | `boolean` |
| **Default value** | `true`    |

**Description**

Defines whether the ExternalOverlay sets up its own inert outside mechanism (preventing the focus from being moved outside of its root HTML element), and if as a consequence the Sheet instance(s) present on the page should disable their own inert outside mechanism to avoid any conflict.

**Notes**

- We run the change in a React layout effect when ExternalOverlay gets mounted, or the value of the `disabled` prop changes. If the wrapped component sets up/cleans up it own mechanism in a React layout effect as well, there may be a conflict. It should be performed in a normal effect instead.

### contentGetter

| **Required**   | only if the `children` prop is not used |
| -------------- | --------------------------------------- | ------- | ---- | ---------- | ------- |
| **Value type** | `(() => HTMLElement                     | Element | null | undefined) | string` |

**Values description**

| `(() => HTMLElement     | Element                                                                                                                                           | null | undefined)` | A function which returns an HTML element when called. |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------------------------------------------------- |
| `string` (CSS selector) | A `string` containing a CSS selector matching at least one HTML element. If several HTML element match the CSS selector, the first one is picked. |

**Description**

Defines the content of the ExternalOverlay instance by getting an HTML element through a function call or the use of a CSS selector instead of passing it to the `children` prop.

**Notes**

- This is useful when you are not able to wrap the HTML element inside of `<ExternalOverlay.Root />`. One possible reason is that it is created outside of React (e.g. a chat plugin’s bubble).

# Silk – Fixed

# Description

**Features**

- Traps scrolling occurring on the underlying elements, preventing page scrolling when used in combination with a Sheet component for example.
- Preserves the visual position of the underlying HTML element when it is a descendant of `<Sheet.Outlet />` or `<SheetStack.Outlet />` underlying HTML elements and those have their `transform` CSS property animated during a travel or stacking animation.
- Exposes `--x-collapsed-scrollbar-thickness` and `--y-collapsed-scrollbar-thickness` CSS custom properties when page scrolling is temporarily disabled, allowing to adjust the position of the underlying HTML elements and descendant HTML elements to avoid visual position changes caused by the removal of the page scrollbars.

**Notes**

- `<Sheet.View />` is internally wrapped inside of a Fixed component, so you can use it in the same way without having to wrap it yourself.

# Structure

## Basic

```jsx
import { Fixed } from '@silk-hq/sheet';

export default () => (
  <Fixed.Root>
    <Fixed.Content>...</Fixed.Content>
  </Fixed.Root>
);
```

## With `<Sheet.Outlet />`

```jsx
import { Sheet, Fixed } from '@silk-hq/sheet';

export default () => (
  <Sheet.Outlet>
    <Fixed.Root>
      <Fixed.Content>...</Fixed.Content>
    </Fixed.Root>
  </Sheet.Outlet>
);
```

# Sub-components

## `<Fixed.Root />`

| Required                | yes                              |
| ----------------------- | -------------------------------- |
| Underlying HTML element | `div`                            |
| Requirements            | Must contain `<Fixed.Content />` |

**Description**

The root sub-component of the Fixed component.

- **Notes**
  - If you are setting a value to the `bottom` CSS property (without using the `top` CSS property) and/or the `right` CSS property (without using the `left` CSS property), you have to declare the property used in the `--silk-fixed-side` value.
    - **Example**
      ```css
      .my-fixed-element {
        bottom: 16px;
        right: 16px;
        --silk-fixed-side: bottom right;
      }
      ```
  - Under the hood we use CSS transform styles to maintain the position of the element. If you need to apply CSS transform styles yourself, you should do it on a descendant element to avoid any conflict.

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

## `<Fixed.Content />`

| Required                | yes                                 |
| ----------------------- | ----------------------------------- |
| Underlying HTML element | `div`                               |
| Requirements            | Must be a child of `<Fixed.Root />` |

**Description**

The content sub-component of the Fixed component.

**Notes**

- Scrolling is trapped inside of the underlying HTML element.

### asChild

See [asChild](https://www.notion.so/Silk-Fixed-0ceb28a9bdf34700928b838e6bdd0140?pvs=21) on `<Fixed.Root />`.
