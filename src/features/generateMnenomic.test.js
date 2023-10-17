// create unit test for ./generateMnenomic.js
// Path: src/features/generateMnenomic.test.js
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { useStore } from "../stores";
import GenerateMnenomicCard from "./generateMnenomic";

jest.mock("../stores");

describe("generateMnenomic", () => {
  it("should render the component", () => {
    useStore.mockReturnValue({
      walletStore: {
        isInit: true,
        coinTypeMapping: [
          {
            network: "BTC",
            label: "BTC",
            token: "BTC",
          },
          {
            network: "ETH",
            label: "ETH",
            token: "ETH",
          },
        ],
      },
    });
    const { asFragment } = render(<GenerateMnenomicCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
