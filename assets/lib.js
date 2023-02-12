export class Application {
  #registeredEffects = new Map();

  constructor() {}

  createState = (id, value) => {
    const executeEffects = this.runEffects.bind(this);
    const updateElements = this.updateElements.bind(this);

    const state = new Proxy(
      { value },
      {
        set(target, _key, newValue) {
          target.value = newValue;

          updateElements(id, newValue);
          executeEffects(id);

          return true;
        },
      }
    );

    return {
      get: () => state.value,
      update: (newValue) => (state.value = newValue),
      id,
    };
  };

  createAction = (id, fn) => {
    window[id] = fn;
    return fn;
  };

  useEffect = (fn, dependencies) => {
    dependencies.forEach((dependency) => {
      if (!this.#registeredEffects.has(dependency.id)) {
        this.#registeredEffects.set(dependency.id, new Set());
      }

      this.#registeredEffects.get(dependency.id).add(fn);
    });
  };

  runEffects = (stateId) => {
    if (this.#registeredEffects.has(stateId)) {
      this.#registeredEffects.get(stateId).forEach((fn) => fn());
    }
  };

  updateElements = (stateId, value) => {
    const elements = document.querySelectorAll(`[data-state="${stateId}"]`);
    elements.forEach((element) => {
      element.innerHTML = value;
    });
  };
}
