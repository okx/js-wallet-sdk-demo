// create unit test for ./generatePrivateKey.js
// Path: src/features/generatePrivateKey.test.js
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BtcWallet } from "@okxweb3/coin-bitcoin";

import { useStore } from "../stores";
import GeneratePrivateKeyCard from "./generatePrivateKey";

const mockData = {
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
    getWallet: (_) => {
      return new BtcWallet();
    },
  },
};

jest.mock("../stores");
describe("generatePrivateKey", () => {
  it("should render the component", () => {
    useStore.mockReturnValue(mockData);
    const { asFragment } = render(<GeneratePrivateKeyCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display wallet info when generate address", async () => {
    useStore.mockReturnValue(mockData);
    render(<GeneratePrivateKeyCard />);

    const autocomplete = screen.getByTestId("autocomplete");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, { target: { value: "BTC" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    const button = screen.getByTestId("generate-address");
    fireEvent.click(button);

    await screen.findAllByTestId(/wallet-info/);
    const walletInfo = screen.getByTestId("wallet-info-0");
    expect(walletInfo).toHaveTextContent("BTC");
  });
});
