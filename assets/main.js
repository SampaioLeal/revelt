import { Application } from "./lib.js";

const { createState, createAction, useEffect } = new Application();

const counter = createState("count", 0);

useEffect(() => {
  console.log("counter changed to:", counter.get());
}, [counter]);

createAction("increment", (value) => {
  counter.update(counter.get() + value || 1);
});
