import { Autocomplete, TextField } from "@mui/material";

const DemoAutocompleteSegwit = ({ setSegwitType }) => {
  const segwitTypeOptions = [
    { label: "legacy", value: undefined, enumValue: 0 },
    { label: "segwit_native", value: "segwit_native", enumValue: 3 },
    { label: "segwit_nested", value: "segwit_nested", enumValue: 1 },
    { label: "segwit_nested_49", value: "segwit_nested_49", enumValue: 2 },
    { label: "segwit_taproot", value: "segwit_taproot", enumValue: 4 },
  ];
  return (
    <Autocomplete
      options={segwitTypeOptions}
      sx={{ width: 288, py: 1, pr: 1 }}
      renderInput={(params) => <TextField {...params} label="Segwit Type" />}
      onChange={(_, value) => {
        setSegwitType(value);
      }}
      isOptionEqualToValue={(option, value) =>
        !option.value || option.value === value.value
      }
      groupBy={(option) => option.network}
      data-testid="autocomplete-segwit"
      defaultValue={segwitTypeOptions[0]}
    />
  );
};

export { DemoAutocompleteSegwit };
