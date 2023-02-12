const registeredEffects = new Map();

function createState(id, value) {
  const state = new Proxy(
    { value },
    {
      set(target, _key, value) {
        target.value = value;

        const elements = document.querySelectorAll(`[data-state="${id}"]`);
        elements.forEach((element) => {
          element.innerHTML = value;
        });

        if (registeredEffects.has(id)) {
          registeredEffects.get(id).forEach((fn) => fn());
        }

        return true;
      },
    }
  );

  return {
    get: () => state.value,
    update: (newValue) => (state.value = newValue),
    id,
  };
}

function useEffect(fn, dependencies) {
  dependencies.forEach((dependency) => {
    if (!registeredEffects.has(dependency.id)) {
      registeredEffects.set(dependency.id, new Set());
    }

    registeredEffects.get(dependency.id).add(fn);
  });
}

const counter = createState("count", 0);

function increment() {
  counter.update(counter.get() + 1);
}

useEffect(() => {
  console.log("counter changed to:", counter.get());
}, [counter]);
