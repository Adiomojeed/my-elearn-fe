/** @format */

// Loads persisted state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("persist:el");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(JSON.parse(serializedState).el);
  } catch (err) {
    return undefined;
  }
};

// Stores persisted state to local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persist:el", JSON.stringify({ el: serializedState }));
  } catch (err) {
    //
  }
};

export { loadState, saveState };
