// create unit test for ./initSDK.js
// Path: src/features/initSDK.test.js
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "mobx-react";

import { StoreContext } from "../stores";
import InitSDKCard from "./initSDK";

describe("InitSDKCard", () => {
  it("should render the component", async () => {
    const { asFragment } = render(<InitSDKCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display dispose button when initialized", async () => {
    render(
      <Provider store={StoreContext}>
        <InitSDKCard />
      </Provider>
    );
    const initButton = screen.getByTestId("initialize");
    fireEvent.click(initButton);

    const walletStore = StoreContext._currentValue.walletStore;
    expect(walletStore.isInit).toBe(true);
    const disposeButton = screen.getByTestId("dispose");
    expect(disposeButton).toBeInTheDocument();
  });
});
