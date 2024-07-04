import { Box, Button, IconButton, InputBase, Paper, Popper, Fade, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = ({ data, fullWidth }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const commodityName = searchParams.get("commodity");

  const [searchText, setSearchText] = useState(commodityName);
  const [filterData, setFilterData] = useState(data);

  const handleChange = (event) => {
    setSearchText(event.target.value);
    setSearchParams({commodity:event.target.value})
    const temp = data.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilterData(temp);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  // console.log(filterData)
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  useEffect(()=>{
    setSearchText(commodityName);
  },[commodityName]);
  return (
    <Box>
      <Paper
        elevation={0}
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: fullWidth ? "100%" : { xs: "90%", md: 500, lg: 600 },
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={handleChange}
          value={searchText}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setOpen(true);
          }}
          onBlurCapture={(event) => {
            setOpen(false);
          }}
          placeholder="Search Drugs..."
          inputProps={{ "aria-label": "search Drugs" }}
        />
        <Button
        startIcon={<SearchIcon/>}
          onClick={() => navigate("/commodities/list")}
          sx={{
            backgroundColor: "#22334D",
            borderRadius: "0px 10px 10px 0px",
            px: "30px",
            mr: "2px",
            ":hover": { backgroundColor: "#22334D" },
          }}
          type="button"
          variant="contained"
        >
          Find
        </Button>
        <Popper
          id={"search"}
          open={open}
          anchorEl={anchorEl}
          sx={{ width: anchorEl && anchorEl.offsetWidth }}
          placement="bottom-start"
          disablePortal={false}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ borderRadius: "10px", boxShadow: "4px 4px 10px #c4c4c4", p: 1, bgcolor: "background.paper" }}>
                {filterData.length > 0 ? (
                  filterData.map((item) => {
                    // console.log(item)
                    return (
                      <Typography onClick={() => navigate("/commodities/list?commodity="+encodeURIComponent(item.name))} className="SearchItem" key={item.name}>
                        {item.name}
                      </Typography>
                    );
                  })
                ) : (
                  <Typography>No items founds</Typography>
                )}
              </Box>
            </Fade>
          )}
        </Popper>
      </Paper>
    </Box>
  );
};
export default SearchBar;
