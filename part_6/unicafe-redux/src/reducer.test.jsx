import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { createStore } from "redux";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  afterEach(() => {
    cleanup();
  });

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("clicking on a button increments the corresponding type", async () => {
    const user = userEvent.setup();
    const store = createStore(counterReducer);

    render(<App store={store} />);

    const okBtn = screen.getByTestId("ok-button");
    await user.click(okBtn);

    // need to manually re-render because changing redux store doesn't trigger auto-reload
    cleanup();
    render(<App store={store} />);

    expect(screen.getByText(/ok 1/i)).toBeInTheDocument();
  });

  test("clicking on reset wipes all data", async () => {
    const user = userEvent.setup();
    const store = createStore(counterReducer);

    render(<App store={store} />);

    const okBtn = screen.getByTestId("ok-button");
    await user.click(okBtn);

    const goodBtn = screen.getByTestId("good-button");
    await user.click(goodBtn);
    await user.click(goodBtn);

    const badBtn = screen.getByTestId("bad-button");
    await user.click(badBtn);

    const resetBtn = screen.getByTestId("reset-button");
    await user.click(resetBtn);

    // need to manually re-render because changing state in redux doesn't auto-reload
    cleanup();
    render(<App store={store} />);

    expect(screen.getByText(/good 0/i)).toBeInTheDocument();
    expect(screen.getByText(/bad 0/i)).toBeInTheDocument();
    expect(screen.getByText(/ok 0/i)).toBeInTheDocument();
  });
});
