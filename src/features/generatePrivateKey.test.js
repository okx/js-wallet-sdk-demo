// create unit test for ./generatePrivateKey.js
// Path: src/features/generatePrivateKey.test.js
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import GeneratePrivateKeyCard from "./generatePrivateKey";

describe("generatePrivateKey", () => {
  it("should render the component", () => {
    const { asFragment } = render(<GeneratePrivateKeyCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
