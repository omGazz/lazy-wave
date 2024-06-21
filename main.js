import LazyWave from './LazyWave.js';

document.addEventListener('DOMContentLoaded', () => {
  const lazyWave = new LazyWave();

  // Event listeners for loading events
  lazyWave.addEventListener('loadingStarted', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }
  });

  lazyWave.addEventListener('loadingEnded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  });

  lazyWave.addEventListener('moduleLoaded', (event) => {
    console.log(`Module loaded: ${event.detail.modulePath}`);
  });

  // Initialize lazy loaders based on custom attributes
  lazyWave.initializeLazyLoaders();

  // Example of triggering the custom event
  const customEventElement = document.querySelector('[data-load-custom-event="customEvent"]');
  if (customEventElement) {
    setTimeout(() => {
      customEventElement.dispatchEvent(new Event('customEvent'));
    }, 3000); // Example: Trigger after 3 seconds
  }
});
