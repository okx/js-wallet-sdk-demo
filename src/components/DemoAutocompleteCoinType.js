import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "../stores";

const DemoAutocompleteCoinType = ({
  setCoinType,
  setNetwork,
  setSegwitType,
}) => {
  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const coinTypeOptions = walletStore.coinTypeMapping.map((data) => {
    return {
      network: data.network,
      label: `${data.network} - ${data.label}`,
      value: data.label,
    };
  });
  return (
    <Autocomplete
      options={coinTypeOptions}
      sx={{ width: 288, py: 1, pr: 1 }}
      renderInput={(params) => <TextField {...params} label="Coin Type" />}
      onChange={(_, value) => {
        setCoinType(value?.value);
        setNetwork(value?.network === "BTC" ? value?.network : undefined);
        if (value?.network !== "BTC") {
          setSegwitType();
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      groupBy={(option) => option.network}
      data-testid="autocomplete-coin-type"
    />
  );
};

export { DemoAutocompleteCoinType };
