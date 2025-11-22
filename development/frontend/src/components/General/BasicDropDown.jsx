import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const BasicDropDown = ({
  width = 120,
  menuItems = [],
  inputLabel = "label",
  value = "",
  setValue,
  menuItemDefaultLabel = "",
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: width }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={inputLabel}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems.length > 0 &&
            menuItems.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default BasicDropDown;
