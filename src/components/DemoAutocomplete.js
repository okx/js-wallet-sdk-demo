import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "../stores";

const DemoAutocomplete = ({ setCoinType }) => {
  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const coinTypeOptions = walletStore.coinTypeMapping.map((data) => {
    return {
      label: `${data.network} - ${data.label}`,
      value: data.token,
    };
  });
  return (
    <Autocomplete
      options={coinTypeOptions}
      sx={{ width: 288, p: 1 }}
      renderInput={(params) => <TextField {...params} label="Coin Type" />}
      onChange={(_, value) => setCoinType(value?.value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};

export { DemoAutocomplete };
