import { Box, Button, IconButton, InputBase, Paper, Popper, Fade, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";


const SearchBar = ({ data, fullWidth }) => {

 
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState(data);

  const handleChange = (event) => {
    setSearchText(event.target.value);
    
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

        <InputBase size="small"
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
                      <Typography className="SearchItem" key={item.name}>
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
