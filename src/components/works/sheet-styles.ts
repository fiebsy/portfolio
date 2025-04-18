export const sheetStyles = `
  /* Universal Sheet Styles (Used by both List and Project sheets) */
  .universal-sheet-view {
    z-index: 1;
    top: 0;
    bottom: initial;
    /* Adding 60px to make it fully visible below iOS Safari's bottom UI */
    height: calc(var(--silk-100-lvh-dvh-pct));
    width: 100%;
    overflow: hidden;
  }

  .list-sheet-view {
    z-index: 1;
    top: 0;
    bottom: initial;
    /* Adding 60px to make it fully visible below iOS Safari's bottom UI */
    height: auto;
    width: 100%;
    overflow: hidden;
  }

  .universal-sheet-scroll-view {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    overflow: hidden;
  }

  .universal-sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 20px));
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 40px;
  }

  .list-sheet-content {
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 40px;
  }

  /* List Sheet Specific Styles */
  .list-sheet-scroll-content {
    height: auto;
    min-height: 100%;
    padding: 20px 28px 0px 28px;
    overflow: hidden;
    border-radius: 40px;
  }

  /* Project Sheet Specific Styles */
  .project-sheet-scroll-content {
    height: auto;
    min-height: 100%;
    padding: 0px 0px 0px 0px;
    overflow: hidden;
    border-radius: 40px;
  }

  /* Common UI Elements and Utilities */
  .sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 6px));
    background-color: transparent;
  }

  /* Add backdrop styling for Safari fix - but allow opacity animation */
  [data-sheet-backdrop] {
    background-color: rgba(0, 0, 0, 1) !important;
  }

  .bleeding-background {
    filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    height: 100%;
    border-radius: 40px 40px 0 0;
    background-color: var(--color-gray-3);
    overflow: hidden;
    border: 3px solid var(--color-gray-6);
    border-bottom: 0;
  }

  @media (min-width: 800px) {
    .sheet-content {
      height: calc(100% - max(env(safe-area-inset-top), 5vh));
    }
  }

  /* Safari-specific fixes */
  @supports (-webkit-touch-callout: none) {
    .safari-flex-fix {
      /* These fixes only apply to Safari */
      height: 100% !important;
      flex: 1 1 auto !important;
      min-height: 0 !important;
    }

    .safari-video-fix {
      /* Safari video fixes */
      object-fit: cover !important;
      height: 100% !important;
      width: 100% !important;
    }
  }
`;
