Below is a **plain-language** breakdown of the Silk `<Sheet />` component’s parts and how they fit together. The goal is to help you understand, in **simple terms**, how each piece works so you can **use it in React** (with Tailwind or otherwise) without being overwhelmed by the internals.

---

# What Is a “Sheet” in Silk?

A “Sheet” is a panel that typically slides into view from an edge of the screen (like a **bottom sheet** or a **side drawer**). Think of it as a **modal-like** overlay that can appear over your app content, but with a focus on **smooth swiping** and **animations**.

Silk’s `<Sheet />` has many **sub-components** that each handle a piece of the puzzle—things like the **trigger button**, the **backdrop overlay**, the **content area** that slides, etc. This is to keep it very flexible and powerful.

## Key Idea

- You always start with a **root container** (`<Sheet.Root>`).
- You can include a **trigger** button (`<Sheet.Trigger>`) that opens or closes the Sheet.
- You typically put the **actual sliding panel** in a **portal** (`<Sheet.Portal>`) so it’s rendered “on top” of everything.
- Inside that portal, you have a **view** (`<Sheet.View>`) that sets up the sliding logic.
- Inside the view, you place the **backdrop** and the **content**.
- The content can have a **bleeding background**, a **title**, a **description**, etc.

---

# Structure and Sub-Components (in Plain English)

Below, each sub-component is described simply: **what it does** and **why/when you’d use it**.

---

## 1. `<Sheet.Root />`

> The **main** container that holds all the logic and sub-components for a single Sheet instance.

- **Purpose:**
  - Groups the entire Sheet’s pieces: triggers, portal, backdrop, content, etc.
  - Manages the **open** (presented) or **closed** (dismissed) state.
- **Must wrap** everything except `<Sheet.Portal />` (which can live elsewhere in the tree).
- **Important props**:
  - **license**: `"commercial"` or `"non-commercial"`. (Declares how you’re using this library. If for commercial usage, presumably you need a commercial license.)
  - **componentId**: A unique ID to link triggers/views to this particular Sheet if you have multiple Sheets.
  - **defaultPresented** or **presented** + `onPresentedChange`: Controls whether the Sheet is open by default, or you manually control its open/close with state in your React app.
  - **defaultActiveDetent** / **activeDetent** + `onActiveDetentChange`: Lets you manage which “detent” (size/position) the Sheet is currently at if you want partial expansions (like a half-height vs. full-height “snap”).
  - **sheetRole**: If you set it to `"dialog"` or `"alertdialog"`, it changes accessibility behavior (e.g. can’t swipe-dismiss an `alertdialog`).
- **Why use it?**
  You **cannot** build a Sheet without `<Sheet.Root>`. It’s the anchor point for everything.

---

## 2. `<Sheet.Trigger />`

> A **button** (or a clickable element) that **opens**, **closes**, or **moves** the Sheet.

- **Purpose:**
  - Let users do something like “Open bottom sheet” or “Close sidebar” by clicking or tapping.
  - Can also “step” between partial expansions (for multi-step/detent sheets).
- **Important props**:
  - **action**:
    - `"present"` – Open the Sheet if it’s closed.
    - `"dismiss"` – Close the Sheet if it’s open.
    - `"step"` or `{ type: "step", ... }` – Move the Sheet up or down by one detent or jump to a specific detent.
  - **onPress**: Fine-tune what happens on click (e.g., you can say “don’t focus me on click” or “don’t actually run the default action”).
  - **forComponent**: Ties the trigger to a specific sheet ID if you have multiple.
- **Why use it?**
  If you need a button that toggles (or partially toggles) the Sheet’s open state, `<Sheet.Trigger>` is the easiest approach.

---

## 3. `<Sheet.Outlet />`

> An **optional** sub-component to animate **any** element according to the Sheet’s movement.

- **Purpose:**
  - If you want an element (e.g., a header, text, or an icon) to **change** or **animate** as the Sheet slides in and out, you can wrap that element in `<Sheet.Outlet>`.
  - It hooks into the Sheet’s travel (open ↔ closed) and stacking (multiple Sheets layered) states.
- **Important props**:
  - **travelAnimation**: Ties a property (like `opacity`, `translateY`, etc.) to the Sheet’s movement from fully closed (0%) to fully open (100%).
  - **stackingAnimation**: Similar, but applies when multiple sheets are stacked.
- **Why use it?**
  - For fancy animated effects (e.g., fade a background, shift a piece of UI).
  - Or to keep track of how “far open” the sheet is and reflect that in your UI.

---

## 4. `<Sheet.Portal />`

> Moves its children into the **DOM’s “portal”** (by default, `<body>`), ensuring the Sheet is drawn on top.

- **Purpose:**
  - By default, React renders elements inside the place you wrote them. But for things like modals or sheets, you often want them to appear **above** everything else.
  - `<Sheet.Portal>` ensures your `<Sheet.View>` (and the backdrop) appear on top, unaffected by parents’ z-index or overflow.
- **Important prop**:
  - **container**: Where to attach the portal. Default is `document.body`. You can specify a different container if you want.
- **Why use it?**
  - Common pattern for modals/overlays. You almost always want the panel in a portal to avoid styling conflicts.

---

## 5. `<Sheet.View />`

> The **container for the actual sliding**. Usually lives inside `<Sheet.Portal>`.

- **Purpose:**
  - Orchestrates the “panel area” that actually does the sliding or traveling.
  - Holds the Sheet’s _ARIA role_ (e.g., if it’s a dialog for accessibility).
- **Important props**:
  - **contentPlacement**: `"top"`, `"bottom"`, `"left"`, `"right"`, or `"center"` → Where the sheet enters from.
    (Example: If `contentPlacement="bottom"`, it slides up from the bottom.)
  - **tracks** and **detents**: If you have multiple partial “snap” positions. For example, you might have an intermediate height plus a full-screen height.
  - **swipeDismissal**: Allows or forbids swiping it completely off-screen to close.
  - **inertOutside**: When `true`, everything behind the sheet is non-interactive, like a true modal.
  - **onClickOutside** and **onEscapeKeyDown**: Control if clicking outside or pressing `Esc` dismisses the sheet.
  - **onTravel**, **onTravelStart**, **onTravelEnd**: Callbacks that let you respond to the panel movement in real time.
- **Why use it?**
  - This is the actual “view” that slides. All the **functionality** for swiping, animating, and focusing is set up here.

---

## 6. `<Sheet.Backdrop />`

> A **see-through overlay** behind the panel that dims the background and blocks clicks.

- **Purpose:**
  - Gives the typical “modal dimmed background” effect.
  - Also intercepts clicks if you want clicks outside the panel to close the sheet.
- **Important props**:
  - **themeColorDimming**: If set to `"auto"`, tries to dim the **browser’s address bar/status bar** color to match the backdrop. (Supported mainly on WebKit browsers like Safari.)
  - **travelAnimation** / **stackingAnimation**: You can animate the backdrop fade in/out.
  - **swipeable**: Whether you can start swiping to dismiss from the backdrop area.
- **Why use it?**
  - Typical “modal overlay” usage. If your design wants a darkened background, you drop a `<Sheet.Backdrop>` behind `<Sheet.Content>`.

---

## 7. `<Sheet.Content />`

> The **panel** itself that physically **moves** in/out when the Sheet is opened or closed.

- **Purpose:**
  - Contains the **actual stuff** you want to show the user (text, forms, images, etc.).
- **Important details**:
  - The library automatically handles its position along whichever edge or center you chose.
  - You can animate it further with `travelAnimation` or `stackingAnimation`.
- **Why use it?**
  - It’s the visible “body” of the sheet that the user interacts with.

---

## 8. `<Sheet.BleedingBackground />`

> A **background layer** that can “bleed” beyond the main panel during **swipe** or **overshoot**.

- **Purpose:**
  - Creates that trendy effect where your background extends a bit beyond the panel so that, when you pull/swipe the Sheet, you see a nice “stretched” or “bleeding” background.
- **Why use it?**
  - Visual polish. Commonly used to make the panel look bigger than it is when dragging.

---

## 9. `<Sheet.Handle />` (Optional)

> A small **handle/drag bar** sub-component, typically a little bar at the top (or side).

- **Purpose:**
  - Tells the user “hey, you can grab/swipe me.”
  - Under the hood, it’s actually a `<Sheet.Trigger>` that can step or dismiss.
- **Why use it?**
  - A quick, standard way to show a “pull handle” for your sheet.

---

## 10. `<Sheet.Title />` and `<Sheet.Description />`

> The accessible **title** and **description** for the Sheet.

- **Purpose:**
  - If you set the sheet’s role to `"dialog"` or `"alertdialog"`, these become crucial for screen readers.
  - Puts proper `aria-labelledby`/`aria-describedby` attributes on the `<Sheet.View>`.
- **Why use them?**
  - **Accessibility**. Screen readers rely on these for context.
  - If the sheet is a normal non-dialog usage, these are optional—but still nice for headings.

---

## 11. `<Sheet.SpecialWrapper.Root />` and `<Sheet.SpecialWrapper.Content />`

> A **Safari bug workaround** when you don’t have a Backdrop or you set `inertOutside={false}`.

- **Purpose:**
  - If you want a sheet that **doesn’t** block interaction with background content (like a non-modal side panel), Safari sometimes breaks swiping.
  - Wrapping your panel content in `SpecialWrapper` fixes that by controlling how overflow and pointer events work.
- **Why use it?**
  - Only needed in tricky cases: no backdrop, no modal behavior, and you still want swiping to work in Safari.

---

# Other Related Pieces

## `<SheetStack>` (For Multiple Sheets)

If you want to **layer multiple sheets** on top of each other, you use `<SheetStack.Root>` and nest several `<Sheet.Root>` inside it. This way, Silk can handle complicated stacking logic (which sheet is on top, how backdrops overlap, etc.).

```jsx
<SheetStack.Root>
  <SheetStack.Outlet />

  <Sheet.Root>{/* First sheet... */}</Sheet.Root>

  <Sheet.Root>{/* Second sheet... */}</Sheet.Root>
</SheetStack.Root>
```

- **SheetStack.Outlet**: Similar to `<Sheet.Outlet>`, but specifically for stack-based animations.
- Typically, you only reach for this if you want a “layered” experience (like one sheet slides up, then another is opened on top, etc.).

---

## `createComponentId()`

A helper that **generates unique IDs** if you want to link multiple triggers or sub-components to the same sheet instance. This is especially handy if you have nested sheets or want to open one sheet from inside another sheet’s content.

---

# Examples in a Nutshell

- **Basic usage**:
  1. `<Sheet.Root>` wraps everything.
  2. `<Sheet.Trigger>` (a button) that opens the Sheet.
  3. `<Sheet.Portal>` so the sheet can appear on top. Inside it:
     - `<Sheet.View>` which holds your `<Sheet.Backdrop>` and `<Sheet.Content>`.
       - Inside `<Sheet.Content>`, you can place your `<Sheet.Title>`, `<Sheet.Description>`, etc.
- **Bottom Sheet** usage: same pattern, but typically you set `contentPlacement="bottom"`.
- **Non-modal** usage: set `inertOutside={false}`, possibly add `<Sheet.SpecialWrapper>`.

---

# How to Use This in React with Tailwind

1. **Install** `@silk-hq/components`.
2. **Import** the `<Sheet />` sub-components you want.
3. Wrap a chunk of your React app in `<Sheet.Root>`.
4. Add a `<Sheet.Trigger>` where you want a button to open/close the sheet.
5. Put the actual sliding panel in a `<Sheet.Portal>` → `<Sheet.View>` → `<Sheet.Content>`.
6. Style everything with **Tailwind** classes if you like. For example:
   ```jsx
   <Sheet.Root className="relative">
     <Sheet.Trigger className="p-2 bg-blue-500 text-white rounded">Open Sheet</Sheet.Trigger>
     <Sheet.Portal>
       <Sheet.View contentPlacement="bottom">
         <Sheet.Backdrop className="bg-black/40" />
         <Sheet.Content className="bg-white shadow-lg rounded-t-2xl p-4">
           <Sheet.Title className="text-xl font-bold">My Sheet</Sheet.Title>
           <Sheet.Description className="text-sm text-gray-600">Details go here.</Sheet.Description>
         </Sheet.Content>
       </Sheet.View>
     </Sheet.Portal>
   </Sheet.Root>
   ```
7. **Optional advanced**:
   - Use `<Sheet.Outlet>` for custom fade or scale animations based on the sheet’s progress.
   - Use `<SheetStack>` if you want multiple sheets at once.
   - Tweak `onClickOutside`, `onEscapeKeyDown`, etc., to control dismissal.

---

# Final Thoughts

- **Most common usage**:
  - You have a **simple bottom sheet** or side drawer. You only really need:
    1. `<Sheet.Root>`
    2. `<Sheet.Trigger>` (to open/close)
    3. `<Sheet.Portal>`
    4. `<Sheet.View>` (with maybe `<Sheet.Backdrop>` for dimming, `<Sheet.Content>` for the panel)
- **Remember**: If you don’t want a dimmed background or you want to keep the page underneath interactive, set `inertOutside={false}` on `<Sheet.View>`. But watch out for Safari. If you also remove `<Sheet.Backdrop swipeable={true}>`, you might need `SpecialWrapper`.
- The **rest** of the props are there if you want:
  - **Advanced animations**
  - **Multiple “snapping” heights**
  - **Accessibility** compliance for dialogs or alerts
  - **Fancy** entrance/exit animations.

With that, you should have a **solid, plain-English reference** for each sub-component of Silk’s `<Sheet />`. Whenever you’re in doubt, come back to this breakdown to remind yourself:

- **Which piece** is responsible for what
- **Which props** you might tweak for your use case
- **Where** to place them in your React markup.

Happy coding!
