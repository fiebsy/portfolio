export const sheetStyles = `
  .long-sheet-view {
    z-index: 1;
    top: 0;
    bottom: initial;
    /* Adding 60px to make it fully visible below iOS Safari's bottom UI */
    height: calc(var(--silk-100-lvh-dvh-pct) + 60px);
    overflow: hidden;
  }

  .long-sheet-scroll-view {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    overflow: hidden;
  }

  .long-sheet-scroll-content {
    height: auto;
    min-height: 100%;
    padding: 20px 28px 0px 28px;
    overflow: hidden;
    border-radius: 40px;
  }
      .project-sheet-scroll-content {
    height: auto;
    min-height: 100%;
    padding: 0px 0px 0px 0px;
    overflow: hidden;
    border-radius: 40px;
  }

  .long-sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 20px));
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 40px;
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
