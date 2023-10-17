// create unit test for ./initSDK.js
// Path: src/features/initSDK.test.js
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import InitSDKCard from "./initSDK";

describe("InitSDKCard", () => {
  it("should render the component", () => {
    const { asFragment } = render(<InitSDKCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
