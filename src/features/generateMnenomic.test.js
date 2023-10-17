// create unit test for ./generateMnenomic.js
// Path: src/features/generateMnenomic.test.js
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import GenerateMnenomicCard from "./generateMnenomic";

describe("generateMnenomic", () => {
  it("should render the component", () => {
    const { asFragment } = render(<GenerateMnenomicCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
