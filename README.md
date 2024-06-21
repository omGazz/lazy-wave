# LazyLoader Library

`LazyLoader` is a library for lazy loading JavaScript modules based on various events. This lib allows you to load modules only when they are needed, improving the performance of your application.

## Features

### Click
- **Attribute**: `data-load-click`
- **Description**: Loads the module when the element is clicked.
- **Example**: `<button data-load-click="ext1.js">Click to load module 1</button>`

### Viewport (Scroll)
- **Attribute**: `data-load-observe`
- **Description**: Loads the module when the element enters the viewport.
- **Example**: `<div data-load-observe="ext1.js">Scroll to load module 1</div>`

### Hover
- **Attribute**: `data-load-hover`
- **Description**: Loads the module when the mouse hovers over the element.
- **Example**: `<div data-load-hover="ext3.js">Hover to load module 3</div>`

### Focus
- **Attribute**: `data-load-focus`
- **Description**: Loads the module when the element receives focus.
- **Example**: `<input type="text" data-load-focus="ext4.js" placeholder="Focus to load module 4">`

### Timeout
- **Attribute**: `data-load-timeout` and `data-load-timeout-module`
- **Description**: Loads the module after a certain period of time (timeout in milliseconds).
- **Example**: `<div data-load-timeout="5000" data-load-timeout-module="ext5.js">Load module 5 after 5 seconds</div>`

### Custom Event
- **Attribute**: `data-load-custom-event` and `data-load-custom-module`
- **Description**: Loads the module in response to a custom event.
- **Example**: `<div data-load-custom-event="customEvent" data-load-custom-module="ext6.js">Trigger custom event to load module 6</div>`

## Framework API

### `setLoadingIndicator(indicator)`
Sets the loading indicator.

- **Parameters**:
  - `indicator` (HTMLElement): The DOM element for the loading indicator.

### `loadModule(modulePath, callbackName = 'external')`
Dynamically loads a module.

- **Parameters**:
  - `modulePath` (string): The path of the module to load.
  - `callbackName` (string, optional): The name of the function to call in the module. Default: `'external'`.

### `initializeLazyLoaders()`
Initializes the lazy loaders for all elements with `data-load-*` attributes.

## Events

The `LazyLoader` framework emits the following custom events:

- **loadingStarted**: Emitted when the loading of a module starts.
- **loadingEnded**: Emitted when the loading of a module ends.
- **moduleLoaded**: Emitted when a module has been successfully loaded.

### Usage Example

#### HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="loading-indicator" style="display: none;">Loading...</div>
    <button data-load-click="ext1.js">Click to load module 1</button>
    <button data-load-click="ext2.js">Click to load module 2</button>
    <div data-load-observe="ext1.js" style="margin-top: 1000px;">Scroll to load module 1</div>
    <div data-load-observe="ext2.js" style="margin-top: 1500px;">Scroll to load module 2</div>
    <div data-load-hover="ext3.js">Hover to load module 3</div>
    <input type="text" data-load-focus="ext4.js" placeholder="Focus to load module 4">
    <div data-load-timeout="5000" data-load-timeout-module="ext5.js">Load module 5 after 5 seconds</div>
    <div data-load-custom-event="customEvent" data-load-custom-module="ext6.js">Trigger custom event to load module 6</div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```
