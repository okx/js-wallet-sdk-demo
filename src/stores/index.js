import { createContext, useContext } from "react";

import WalletStore from "./walletStore.js";

export class RootStore {
  constructor() {
    this.walletStore = new WalletStore(this);
  }
}

export const StoreContext = createContext(new RootStore());

export const useStore = () => {
  return useContext(StoreContext);
};
