import { Box, Typography } from "@mui/material";
import SearchBar from '../../../../views/components/SearchBar';
import React from "react";
import { Link } from "react-router-dom";


const Section2 = (props) => {

  const categories = props.categories
  const commodities = props.commoditiesData



  return (

    <Box className="section2-text">
      <Typography variant="h5" sx={{ fontWeight: 500, marginTop: '50px' }}>
        <strong>See if we have your medication</strong>
      </Typography>
      <Typography variant="subtitle2" paddingBottom='20px'>
        Just search for your medication to find low prices.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", }}>
        <SearchBar data={commodities} />
      </Box>

      <Box display={{ xs: "none", md: "flex" }} className="section2-mediname"  >
        {categories.slice(0, 4).map((item) => {
          return (
            <Typography className="mediname" key={item} component={Link} to={`/commodities/list?categories=${encodeURIComponent(item)}`}>
              {item}
            </Typography>
            )
        })}
        <Typography className="mediname" sx={{ backgroundColor: '#22334D', color: "white", cursor: 'pointer', textDecoration: 'none' }} component={Link}
          to="/commodities/list">
          See all meds
        </Typography>

      </Box>

    </Box>

  )
}
export default Section2;