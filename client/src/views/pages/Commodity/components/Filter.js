import React, { useState } from "react";
import { Box, Typography, Divider, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Clear } from "@mui/icons-material";

export default function FilterComponent(props) {
  const { brands, types, categories, filterFunction } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const catFilter = searchParams.get("categories");
  const typeFilter = searchParams.get("types");
  const manuFilter = searchParams.get("manufacturers");

  const initialFilterData = {
    categories: [],
    types: [],
    manufacturers: [],
  };
  const [filterData, setFilterData] = useState({
    ...initialFilterData,
    categories: catFilter ? [catFilter] : [],
    types: typeFilter ? [typeFilter] : [],
    manufacturers: manuFilter ? [manuFilter] : [],
  });

  const handleClearFilter = () => {
    setFilterData(initialFilterData);
    setSearchParams({});
    filterFunction(initialFilterData);
  };
  const handleChangeFilter = (event) => {
    // console.log(event.target.name, event.target.value, event.target.checked);
    let tempData = [];

    if (!event.target.checked) {
      tempData = filterData[event.target.name].filter((item) => item !== event.target.value);
    } else {
      tempData = [...filterData[event.target.name], event.target.value];
    }
    const finalFilter = { ...filterData, [event.target.name]: tempData };
    setFilterData(finalFilter);

    filterFunction(finalFilter);
  };
  return (
    <Box sx={{ backgroundColor: "white", padding: "20px" }}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="body2">
          <strong>FILTERS</strong>
        </Typography>
        <Button
          size="small"
          variant="text"
          color="error"
          startIcon={<Clear sx={{ fontSize: "17px" }} />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleClearFilter()}
        >
          Clear
        </Button>
      </Box>
      <Divider />
      <Typography variant="body2" paddingTop="10px">
        <strong>Brands</strong>
      </Typography>
      <FormGroup className="my-custom-checkbox">
        {brands.map((brand) => {
          return (
            <Box display="flex" justifyContent="space-between" alignItems="center" key={brand.id}>
              <FormControlLabel
                value={brand.id}
                control={<Checkbox size="small" />}
                label={brand.name}
                checked={filterData.manufacturers.includes(brand.id)}
                onChange={handleChangeFilter}
                name="manufacturers"
              />
              <Typography variant="body2">{brand.count}</Typography>
            </Box>
          );
        })}
      </FormGroup>
      <Divider />

      <FormGroup className="my-custom-checkbox">
        <Typography variant="body2">
          <strong>Medicine Type</strong>
        </Typography>
        {types.map((item) => {
          return (
            <Box key={item.label} display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={item.label}
                value={item.label}
                onChange={handleChangeFilter}
                checked={filterData.types.includes(item.label)}
                name="types"
              />
              <Typography variant="body2">{item.count}</Typography>
            </Box>
          );
        })}
      </FormGroup>
      <Divider />

      <FormGroup className="my-custom-checkbox">
        <Typography variant="body2">
          <strong>Category</strong>
        </Typography>
        {categories.map((item) => {
          return (
            <Box key={item.label} display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={item.label}
                value={item.label}
                onChange={handleChangeFilter}
                checked={filterData.categories.includes(item.label)}
                name="categories"
              />
              <Typography variant="body2">{item.count}</Typography>
            </Box>
          );
        })}
      </FormGroup>
    </Box>
  );
}
