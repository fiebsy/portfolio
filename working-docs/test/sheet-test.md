````markdown
# sheet-test.md

## Overview

We’re investigating a **video flash/flicker** issue when embedding video elements (or iframes) inside a Silk `<Sheet>` component. This document collects Silk’s official Sheet examples, references relevant props/hooks, and outlines a **test plan** to help isolate and mitigate the flicker problem.

## Core Issue

- When the Sheet slides up (using the `<Sheet.View>` + `<Sheet.Content>` structure), our embedded video or iframe briefly shows a blank area or a partially loaded poster frame.
- This flicker is more noticeable once the sheet’s slide animation finishes.

## Hypothesis

1. **Render/Animation Timing**: The video doesn’t fully load or paint until the sheet has _nearly_ finished animating in, causing a noticeable “pop-in.”
2. **No Lazy Mount**: The Silk docs indicate `<Sheet.Content>` is mounted right away, so the flicker isn’t a Silk “lazy-hydration” bug but rather a normal browser decode/paint delay.
3. **Potential Solutions**:
   - Delay rendering the video (or at least its visible portion) until the sheet is _fully_ in (`onTravelStatusChange = "idleInside"`).
   - Preload the video poster or resources so the thumbnail is ready as soon as the sheet is visible.
   - Adjust or skip the sheet’s own entering animation if the flicker is less noticeable with faster or no animation.
   - Fade in the video after the sheet finishes traveling.

## Relevant Silk Docs

Below are concise references taken directly from the Silk docs, focusing on how `<Sheet>` handles:

- [**Mount & Portal**](#sheetportal)
- [**Animation Settings & Callbacks**](#animation-props)
- [**Lifecycle States**](#ontravelstatuschange)

For the full in-depth doc, see the appended official documentation at the bottom of this file.

### `<Sheet.Portal>`

- Lets you render `<Sheet.View>` outside your normal React tree (by default in `document.body`).
- Relevant if you suspect the portal mount is delaying or changing video hydration.

### Animation Props <a id="animation-props"></a>

- `enteringAnimationSettings`, `exitingAnimationSettings`, `steppingAnimationSettings`
- **Example**:
  ```jsx
  <Sheet.View
    enteringAnimationSettings={{
      preset: 'smooth',
      skip: false,
      contentMove: true,
    }}
    exitingAnimationSettings={{
      preset: 'bouncy',
    }}
  >
    ...
  </Sheet.View>
  ```
````

- Could skip or speed up the slide to reduce any perceived flash.

### Callbacks

- **`onTravelStatusChange`**: Tells us when the Sheet transitions among `entering`, `idleInside`, `stepping`, `exiting`, `idleOutside`.
- **`onTravelEnd`**: Fires when all traveling is finished.
- Using these, we can conditionally show the video _after_ the sheet is fully in view.

---

## Test Plan / Approaches

Below are several approaches we’ll code up in small `<Sheet>` test components. We’ll open them one by one, comparing the user experience to see if the flicker is mitigated.

---

### 1. Basic Sheet with Direct `<video>` or Iframe

**Goal**: Verify the baseline behavior—no special code, just a `<video>` or YouTube embed inside `<Sheet.Content>`.

```jsx
// BasicSheetVideoFlashTest.jsx
import { Sheet } from '@silk-hq/components';

export default function BasicSheetVideoFlashTest() {
  return (
    <Sheet.Root license="commercial">
      <Sheet.Trigger>Open Sheet</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View>
          <Sheet.Backdrop />
          <Sheet.Content>
            {/* This is the naive approach */}
            <video src="path/to/video.mp4" poster="path/to/poster.jpg" controls width="300" />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
```

- **Expected Result**: Likely we still see the flicker of the poster not instantly loaded when the sheet finishes sliding in.

---

### 2. Delay Rendering with `onTravelStatusChange`

**Goal**: Hide the video until `travelStatus === "idleInside"`, preventing flicker from partially loaded frames.

```jsx
// DelayedVideoSheet.jsx
import { Sheet } from '@silk-hq/components';
import { useState } from 'react';

export default function DelayedVideoSheet() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Sheet.Root license="commercial">
      <Sheet.Trigger>Open Delayed Video Sheet</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View
          onTravelStatusChange={(status) => {
            if (status === 'idleInside') {
              setShowVideo(true);
            }
            if (status === 'entering') {
              setShowVideo(false);
            }
          }}
        >
          <Sheet.Backdrop />
          <Sheet.Content>
            {!showVideo ? (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                <span>Loading preview...</span>
              </div>
            ) : (
              <video src="path/to/video.mp4" poster="path/to/poster.jpg" controls width="300" />
            )}
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
```

- **Expected Result**: We see a placeholder while the sheet slides up, and only after it’s fully open does the video appear (hopefully no flicker).

---

### 3. Preloading Poster, or Using an `<img>` Fallback

**Goal**: Test if manually preloading the poster image helps.
For external iframes (e.g., YouTube/Vimeo), test a static `<img>` for the thumbnail, replaced by the real iframe only on click.

```jsx
// PreloadVideoSheet.jsx
import { Sheet } from '@silk-hq/components';
import { useEffect } from 'react';

export default function PreloadVideoSheet() {
  useEffect(() => {
    // Preload the poster (or small chunk) in background
    const poster = new Image();
    poster.src = 'path/to/poster.jpg';
  }, []);

  return (
    <Sheet.Root license="commercial">
      <Sheet.Trigger>Open Preload Video Sheet</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View>
          <Sheet.Backdrop />
          <Sheet.Content>
            <video
              src="path/to/video.mp4"
              poster="path/to/poster.jpg" // hopefully now in cache
              controls
              width="300"
            />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
```

- **Expected Result**: If the poster is cached by the time the sheet opens, the flicker might be reduced or invisible.

---

### 4. Adjust or Skip the Entering Animation

**Goal**: Try skipping the sheet’s own slide animation. If the sheet appears instantly, the flicker might be less noticeable.

```jsx
// InstantSheet.jsx
import { Sheet } from '@silk-hq/components';

export default function InstantSheet() {
  return (
    <Sheet.Root license="commercial">
      <Sheet.Trigger>Open Instant Sheet</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View
          enteringAnimationSettings={{
            skip: true, // No entering animation
          }}
        >
          <Sheet.Backdrop />
          <Sheet.Content>
            <video src="path/to/video.mp4" poster="path/to/poster.jpg" controls width="300" />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
```

- **Expected Result**: The flicker might still occur, but the user sees the entire sheet + video appear at once, making it potentially less jarring.

---

### 5. Fade the Video In

**Goal**: Combine a placeholder with a short fade-in (CSS transition or style changes) once the sheet finishes traveling.

```jsx
// FadeInVideoSheet.jsx
import { Sheet } from '@silk-hq/components';
import { useState } from 'react';

export default function FadeInVideoSheet() {
  const [fadeInClass, setFadeInClass] = useState('opacity-0');

  return (
    <Sheet.Root license="commercial">
      <Sheet.Trigger>Open Fade-in Video Sheet</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View
          onTravelStatusChange={(status) => {
            if (status === 'idleInside') {
              // Trigger fade-in
              requestAnimationFrame(() => {
                setFadeInClass('transition-opacity duration-300 opacity-100');
              });
            }
          }}
        >
          <Sheet.Backdrop />
          <Sheet.Content>
            <video
              className={fadeInClass}
              src="path/to/video.mp4"
              poster="path/to/poster.jpg"
              controls
              width="300"
            />
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
```

- **Expected Result**: The sheet slides in with the video invisible, then quickly fades in once fully open.

---

## Observations & Next Steps

1. **Compare Flickers**: Which approach, if any, fully eliminates or significantly reduces the flicker on your devices/browsers?
2. **Check Safari**: If you use iOS Safari, be mindful of how it handles iframes, native edge swipes, etc.
3. **Potential Customization**: Combine multiple tactics (e.g., preload the poster _and_ fade in after `idleInside`).

If none of these approaches solves your flicker, consider that the flash might be a browser-level decode/paint quirk. You might do further testing with simpler static `<img>` vs. real `<video>` or external iframe.

---

## Appendix: Silk Sheet Documentation

(See the **long-form reference** below, excerpted from Silk docs. This includes everything about `<Sheet.Root>`, `<Sheet.Portal>`, `<Sheet.View>`, `<Sheet.Content>`, sub-components, props, and usage notes. It covers stacking, animation settings, event callbacks, focus behavior, and more.)

<details>
<summary>Click to expand the full Silk – Sheet docs reference.</summary>

[Paste your full Silk docs content here]

</details>

---

**End of sheet-test.md**

```

```
