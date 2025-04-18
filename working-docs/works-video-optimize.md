# Video Optimization Plan for Works Component

## Current Issue

There's a noticeable latency when opening project sheets because:

1. Video URLs are fetched from Vercel Blob only when a sheet is opened
2. The videos need to load after the URL is resolved
3. This causes a delay or blank video state when a user first opens a project

## Optimization Plan

### 1. Pre-fetch Video URLs from Vercel Blob

Move the video URL fetching logic from individual components to the parent `Works` component. This will:

- Fetch all video URLs when the Works component first loads
- Make the URLs immediately available when a sheet opens
- Eliminate the fetch-time latency

```tsx
// In Works component
const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});

useEffect(() => {
  // Pre-fetch all video URLs on component mount
  const fetchAllVideoUrls = async () => {
    const urlMap = {};
    for (const project of projects) {
      urlMap[project.thumbnail] = await getVideoUrlFromBlob(project.thumbnail);
      urlMap[project.fullVideo] = await getVideoUrlFromBlob(project.fullVideo);
      urlMap[project.featureVideo] = await getVideoUrlFromBlob(project.featureVideo);
    }
    setVideoUrls(urlMap);
  };

  fetchAllVideoUrls();
}, []);

// Pass videoUrls to child components
```

### 2. Pre-load Critical Videos

Add a hidden preload section to load the thumbnail videos as soon as the page loads:

```tsx
// In Works component
<div className="hidden">
  {projects.map((project, index) => (
    <video key={index} preload="auto">
      <source src={videoUrls[project.thumbnail]} type="video/mp4" />
    </video>
  ))}
</div>
```

### 3. Pass Pre-loaded URLs to Child Components

Update both sheet components to accept pre-loaded URLs instead of fetching them:

```tsx
<ListSheetContent
  projects={projects}
  videoRefs={videoRefs}
  videoUrls={videoUrls} // Add this prop
  isListSheetScaled={isListSheetScaled}
  setActiveProjectIndex={setActiveProjectIndex}
  openSheet={openSheet}
  activeProjectIndex={activeProjectIndex}
  isProjectSheetActive={isSheetActive('project-sheet')}
/>

<ProjectSheetContent
  activeProjectIndex={activeProjectIndex}
  projects={projects}
  sheetVideoRefs={sheetVideoRefs}
  videoUrls={videoUrls} // Add this prop
/>
```

### 4. Prioritize Loading

Prioritize loading in this order:

1. Thumbnail videos (essential for the list view)
2. Main project videos
3. Feature videos

### 5. Add Loading States

Add simple loading states to video containers:

- Show a low-resolution placeholder or static image while videos load
- Implement a subtle fade-in transition when video is ready to play

## Implementation Steps

1. Update the Works component to pre-fetch all video URLs
2. Add a hidden preload section for thumbnails
3. Modify child components to accept pre-loaded URLs instead of fetching them
4. Update video elements to use the passed-in URLs
5. Add loading states and placeholders

## Benefits

- Eliminate fetch-wait time when opening sheets
- Provide a smoother user experience with no blank video states
- Maintain the same CDN performance advantages from Vercel Blob
- Keep code changes minimal and focused

This approach reduces complexity by centralizing the URL fetching logic while maximizing perceived performance.

# Implementation Summary

We have successfully implemented the optimization plan with the following changes:

1. **Centralized Video URL Fetching**

   - Moved all URL fetching logic to the parent `Works` component
   - Pre-fetches all video URLs when the component first mounts
   - Handles fetch errors gracefully with fallbacks to original paths

2. **Prioritized Loading Strategy**

   - Implemented a 3-stage loading approach:
     1. First load thumbnail videos (critical for list UI)
     2. Then load main project videos (needed for detail view)
     3. Finally load feature videos (supplementary content)
   - Update the UI after each stage so content becomes available incrementally

3. **Silent Preloading Mechanism**

   - Added a hidden `VideoPreloader` component that efficiently preloads videos
   - Uses the browser's native preloading capabilities
   - Handles errors silently without disrupting the UI

4. **Loading State Indicators**

   - Added loading placeholder elements that display while videos are loading
   - Implemented subtle animations to indicate loading is in progress
   - Ensures UI remains responsive even before content is ready

5. **Props-Based Architecture**
   - Modified child components to accept pre-loaded URLs through props
   - Eliminated component-level URL fetching that caused latency
   - Ensures videos are immediately available when sheets are opened

This approach significantly reduces the latency when opening sheets by ensuring video content is already available or in the process of loading before the user interaction. It maintains the CDN performance advantages while providing a smoother user experience.
