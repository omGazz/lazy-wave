# LazyLoader Framework

`LazyLoader` è un framework per il lazy loading dei moduli JavaScript basato su vari eventi. Questo framework ti permette di caricare i moduli solo quando sono necessari, migliorando le performance della tua applicazione.

## Funzionalità

### Click
- **Attributo**: `data-load-click`
- **Descrizione**: Carica il modulo quando l'elemento viene cliccato.
- **Esempio**: `<button data-load-click="ext1.js">Click to load module 1</button>`

### Viewport (Scroll)
- **Attributo**: `data-load-observe`
- **Descrizione**: Carica il modulo quando l'elemento entra nel viewport.
- **Esempio**: `<div data-load-observe="ext1.js">Scroll to load module 1</div>`

### Hover
- **Attributo**: `data-load-hover`
- **Descrizione**: Carica il modulo quando il mouse passa sopra l'elemento.
- **Esempio**: `<div data-load-hover="ext3.js">Hover to load module 3</div>`

### Focus
- **Attributo**: `data-load-focus`
- **Descrizione**: Carica il modulo quando l'elemento riceve il focus.
- **Esempio**: `<input type="text" data-load-focus="ext4.js" placeholder="Focus to load module 4">`

### Timeout
- **Attributo**: `data-load-timeout` e `data-load-timeout-module`
- **Descrizione**: Carica il modulo dopo un certo periodo di tempo (timeout in millisecondi).
- **Esempio**: `<div data-load-timeout="5000" data-load-timeout-module="ext5.js">Load module 5 after 5 seconds</div>`

### Custom Event
- **Attributo**: `data-load-custom-event` e `data-load-custom-module`
- **Descrizione**: Carica il modulo in risposta a un evento personalizzato.
- **Esempio**: `<div data-load-custom-event="customEvent" data-load-custom-module="ext6.js">Trigger custom event to load module 6</div>`

## API del Framework

### `setLoadingIndicator(indicator)`
Imposta l'indicatore di caricamento.

- **Parametri**:
  - `indicator` (HTMLElement): L'elemento DOM dell'indicatore di caricamento.

### `loadModule(modulePath, callbackName = 'external')`
Carica dinamicamente un modulo.

- **Parametri**:
  - `modulePath` (string): Il percorso del modulo da caricare.
  - `callbackName` (string, opzionale): Il nome della funzione da chiamare nel modulo. Default: `'external'`.

### `initializeLazyLoaders()`
Inizializza i lazy loaders per tutti gli elementi con attributi `data-load-*`.

## Eventi

Il framework `LazyLoader` emette i seguenti eventi personalizzati:

- **loadingStarted**: Emesso quando inizia il caricamento di un modulo.
- **loadingEnded**: Emesso quando il caricamento di un modulo termina.
- **moduleLoaded**: Emesso quando un modulo è stato caricato con successo.

### Esempio d'Uso

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
