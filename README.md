# Revelt

An example of how easy we can achive a framework experience with simples features
of vanilla JavaScript.

## Features

- [x] States and Reactivity
- [x] Actions
- [x] Effects

## Usage

You can start building your application by using some fundamentals of the
library like states and effects.

```js
import { Application } from "./lib.js";

const { createState, createAction, useEffect } = new Application();

/**
 * Create a state with an id and a default value.
 * You can access the state value using the `get` method.
 * You can update the state value using the `update` method.
 */
const counter = createState("count", 0);

/**
 * Create an action with an id and a callback.
 * This will be injected to the global scope, so you can call it from anywhere
 * in the view layer (html) using the id.
 * Example: `<button onclick="increment()">Increment</button>`
 */
createAction("increment", (value) => {
  counter.update(counter.get() + value || 1);
});

/**
 * Create an effect with a callback.
 * This will be called every time the state changes.
 */
useEffect(() => {
  console.log("counter changed to:", counter.get());
}, [counter]);
```

Now you can use the state and action in your view layer (html).

```html
<p>Count: <span data-state="count">0</span></p>
<button onclick="increment()">Increment</button>
```

The `span` with the `data-state` attribute will be updated every time the state
changes.

## License

MIT License
