// create unit test for ./generatePrivateKey.js
// Path: src/features/generatePrivateKey.test.js
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { useStore } from "../stores";
import GeneratePrivateKeyCard from "./generatePrivateKey";

jest.mock("../stores");

describe("generatePrivateKey", () => {
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
    const { asFragment } = render(<GeneratePrivateKeyCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
