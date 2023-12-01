// create unit test for ./generateMnemonic.js
// Path: src/features/generateMnemonic.test.js
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BtcWallet } from "@okxweb3/coin-bitcoin";

import { useStore } from "../stores";
import GenerateMnemonicCard from "./generateMnemonic";

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
describe("generateMnemonic", () => {
  it("should render the component", () => {
    useStore.mockReturnValue(mockData);
    const { asFragment } = render(<GenerateMnemonicCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display wallet info when generate address", async () => {
    useStore.mockReturnValue(mockData);
    render(<GenerateMnemonicCard />);

    const generateMnemonicButton = screen.getByTestId("generate-mnemonic");
    fireEvent.click(generateMnemonicButton);

    await screen.findByTestId("derive-address");
    const deriveAddressButton = screen.getByTestId("derive-address");
    expect(deriveAddressButton).toBeInTheDocument();

    const autocomplete = screen.getByTestId("autocomplete-coin-type");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, { target: { value: "BTC" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    fireEvent.click(deriveAddressButton);

    await screen.findAllByTestId(/wallet-info/);
    const walletInfo = screen.getByTestId("wallet-info-0");
    expect(walletInfo).toHaveTextContent("BTC");
  });
});
