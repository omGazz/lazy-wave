class LazyWave extends EventTarget {
    constructor() {
      super();
      this.loadedModules = new Map();
      this.observer = null;
    }
  
    async loadModule(modulePath, callbackName = 'external') {
      if (this.loadedModules.has(modulePath)) {
        const module = this.loadedModules.get(modulePath);
        if (module && typeof module[callbackName] === 'function') {
          module[callbackName]();
          this.dispatchEvent(new CustomEvent('moduleLoaded', { detail: { modulePath } }));
        }
        return;
      }
  
      try {
        this.dispatchEvent(new Event('loadingStarted'));
        const module = await import(`./${modulePath}`);
        this.dispatchEvent(new Event('loadingEnded'));
        if (module && typeof module[callbackName] === 'function') {
          this.loadedModules.set(modulePath, module);
          module[callbackName]();
          this.dispatchEvent(new CustomEvent('moduleLoaded', { detail: { modulePath } }));
        } else {
          console.error(`The module does not have a ${callbackName} function`);
        }
      } catch (err) {
        this.dispatchEvent(new Event('loadingEnded'));
        console.error("Error loading module:", err);
      }
    }
  
    attachEventHandler(element, event, attribute) {
      element.addEventListener(event, () => {
        const modulePath = element.getAttribute(attribute);
        if (modulePath) {
          this.loadModule(modulePath);
        } else {
          console.error('No module specified to load');
        }
      });
    }
  
    attachButtonHandler(button) {
      this.attachEventHandler(button, 'click', 'data-load-click');
    }
  
    attachDblClickHandler(element) {
      this.attachEventHandler(element, 'dblclick', 'data-load-dblclick');
    }
  
    attachMouseEnterHandler(element) {
      this.attachEventHandler(element, 'mouseenter', 'data-load-mouseenter');
    }
  
    attachMouseLeaveHandler(element) {
      this.attachEventHandler(element, 'mouseleave', 'data-load-mouseleave');
    }
  
    attachChangeHandler(element) {
      this.attachEventHandler(element, 'change', 'data-load-change');
    }
  
    attachSubmitHandler(element) {
      this.attachEventHandler(element, 'submit', 'data-load-submit');
    }
  
    attachResizeHandler(element) {
      window.addEventListener('resize', () => {
        const modulePath = element.getAttribute('data-load-resize');
        if (modulePath) {
          this.loadModule(modulePath);
        } else {
          console.error('No module specified to load');
        }
      });
    }
  
    attachScrollHandler(element) {
      this.attachEventHandler(element, 'scroll', 'data-load-scroll');
    }
  
    attachKeydownHandler(element) {
      this.attachEventHandler(element, 'keydown', 'data-load-keydown');
    }
  
    observeElement(element) {
      const modulePath = element.getAttribute('data-load-observe');
      if (!modulePath) {
        console.error('No module specified to load');
        return;
      }
  
      const observerCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadModule(modulePath);
            this.observer.unobserve(entry.target);
          }
        });
      };
  
      this.observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
      this.observer.observe(element);
    }
  
    attachHoverHandler(element) {
      this.attachEventHandler(element, 'mouseenter', 'data-load-hover');
    }
  
    attachFocusHandler(element) {
      this.attachEventHandler(element, 'focus', 'data-load-focus');
    }
  
    attachTimeoutHandler(element) {
      const timeout = parseInt(element.getAttribute('data-load-timeout'), 10);
      const modulePath = element.getAttribute('data-load-timeout-module');
      if (!isNaN(timeout) && modulePath) {
        setTimeout(() => {
          this.loadModule(modulePath);
        }, timeout);
      } else {
        console.error('Invalid timeout or module path');
      }
    }
  
    attachCustomEventHandler(element) {
      const eventName = element.getAttribute('data-load-custom-event');
      const modulePath = element.getAttribute('data-load-custom-module');
      if (eventName && modulePath) {
        element.addEventListener(eventName, () => {
          this.loadModule(modulePath);
        });
      } else {
        console.error('Invalid event name or module path');
      }
    }
  
    initializeLazyLoaders() {
      const clickElements = document.querySelectorAll('[data-load-click]');
      clickElements.forEach(button => this.attachButtonHandler(button));
  
      const dblClickElements = document.querySelectorAll('[data-load-dblclick]');
      dblClickElements.forEach(element => this.attachDblClickHandler(element));
  
      const mouseEnterElements = document.querySelectorAll('[data-load-mouseenter]');
      mouseEnterElements.forEach(element => this.attachMouseEnterHandler(element));
  
      const mouseLeaveElements = document.querySelectorAll('[data-load-mouseleave]');
      mouseLeaveElements.forEach(element => this.attachMouseLeaveHandler(element));
  
      const changeElements = document.querySelectorAll('[data-load-change]');
      changeElements.forEach(element => this.attachChangeHandler(element));
  
      const submitElements = document.querySelectorAll('[data-load-submit]');
      submitElements.forEach(element => this.attachSubmitHandler(element));
  
      const resizeElements = document.querySelectorAll('[data-load-resize]');
      resizeElements.forEach(element => this.attachResizeHandler(element));
  
      const scrollElements = document.querySelectorAll('[data-load-scroll]');
      scrollElements.forEach(element => this.attachScrollHandler(element));
  
      const keydownElements = document.querySelectorAll('[data-load-keydown]');
      keydownElements.forEach(element => this.attachKeydownHandler(element));
  
      const observeElements = document.querySelectorAll('[data-load-observe]');
      observeElements.forEach(element => this.observeElement(element));
  
      const hoverElements = document.querySelectorAll('[data-load-hover]');
      hoverElements.forEach(element => this.attachHoverHandler(element));
  
      const focusElements = document.querySelectorAll('[data-load-focus]');
      focusElements.forEach(element => this.attachFocusHandler(element));
  
      const timeoutElements = document.querySelectorAll('[data-load-timeout]');
      timeoutElements.forEach(element => this.attachTimeoutHandler(element));
  
      const customEventElements = document.querySelectorAll('[data-load-custom-event]');
      customEventElements.forEach(element => this.attachCustomEventHandler(element));
    }
  }
  
  export default LazyWave;
  