import { Autocomplete, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useStore } from "../stores";

const DemoAutocompleteChain = ({ setChain }) => {
  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const { chainsAvailable } = walletStore;
  const chainOptions =
    chainsAvailable && chainsAvailable.length
      ? chainsAvailable.map((data) => {
          return {
            name: data.name,
            label: `${data.name} - ${data.shortName}`,
            value: data.chainId,
          };
        })
      : [];
  return (
    <Autocomplete
      options={chainOptions}
      sx={{ width: 288, py: 1, pr: 1 }}
      renderInput={(params) => <TextField {...params} label="Chain" />}
      onChange={(_, value) => {
        setChain(value?.value);
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      groupBy={(option) => option.name}
      data-testid="autocomplete-chain"
    />
  );
};

export default observer(DemoAutocompleteChain);
