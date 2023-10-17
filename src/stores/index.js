import { createContext, useContext } from "react";

import WalletStore from "./walletStore.js";
import AppStore from "./appStore.js";

export class RootStore {
  constructor() {
    this.walletStore = new WalletStore(this);
    this.appStore = new AppStore(this);
  }
}

export const StoreContext = createContext(new RootStore());

export const useStore = () => {
  return useContext(StoreContext);
};
