/** @format */

// Loads persisted state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("persist:hc");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(JSON.parse(serializedState).hc);
  } catch (err) {
    return undefined;
  }
};

// Stores persisted state to local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persist:hc", JSON.stringify({ hc: serializedState }));
  } catch (err) {
    //
  }
};

export { loadState, saveState };
