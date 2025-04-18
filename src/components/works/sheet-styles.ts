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

  /* Animation Keyframes */

  /* Test circle bounce animation */
  @keyframes appear-bounce {
    0% {
      opacity: 0;
      transform: translate(-50%, -20px) scale(0.5);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, 0) scale(1.1);
    }
    75% {
      transform: translate(-50%, -5px) scale(0.95);
    }
    100% {
      transform: translate(-50%, 0) scale(1);
    }
  }

  /* List item animation with slide up, fade in, and subtle scale */
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
    70% {
      opacity: 1;
      transform: translateY(0) scale(1.01);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Animation Classes */

  /* Test circle animation class */
  .animate-test-circle {
    animation: appear-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  /* List item animation class */
  .animate-list-item {
    animation: slide-in 0.25s cubic-bezier(0.2, 0.85, 0.4, 1.2) forwards;
    opacity: 0;
    will-change: transform, opacity;
  }

  /* Alternative animation with more pronounced scale effect */
  .animate-scale-in {
    animation: scale-in 0.3s cubic-bezier(0.17, 0.67, 0.3, 1.33) forwards;
    opacity: 0;
    will-change: transform, opacity;
  }

  /* Scale in animation */
  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.92);
    }
    70% {
      opacity: 1;
      transform: scale(1.03);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Float in animation (diagonal movement) */
  @keyframes float-in {
    0% {
      opacity: 0;
      transform: translate(-10px, 10px) scale(0.98);
    }
    60% {
      opacity: 1;
      transform: translate(2px, -2px) scale(1.01);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
  }

  /* Float in animation class */
  .animate-float-in {
    animation: float-in 0.35s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    opacity: 0;
    will-change: transform, opacity;
  }
`;
