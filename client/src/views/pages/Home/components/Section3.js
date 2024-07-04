import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CommodityItem from "../../Commodity/components/CommodityItem";
import { Link } from "react-router-dom";

export default function Section3(props) {
  const commodities = props.commodities;
  // const compositions = props.compositions
  const manufacturers = props.manufacturers;
  return (
    <Box className="section-3">
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Typography variant="h5" sx={{ textAlign: "center", marginTop: "50px", color: "#22334D" }}>
            <strong> Medication In Demand</strong>
          </Typography>
          <Box width={300} className="section3-heading"></Box>
        </Box>

        <Grid container spacing={5}>
          {commodities.slice(0, 12).map((item) => {
            return (
              <Grid item xs={6} md={4} lg={2} key={item.code}>
                <CommodityItem item={item} />
              </Grid>
            );
          })}
        </Grid>

        <Box>
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Typography variant="h5" sx={{ textAlign: "center", marginTop: "50px", color: "#22334D" }}>
              <strong>Shop By Brand Name</strong>
            </Typography>
            <Box width={200} className="section3-heading"></Box>
          </Box>
        </Box>
        <Grid container spacing={5} justifyContent="space-between">
          {manufacturers.slice(0, 6).map((item) => {
            return (
              <Grid item xs={6} md={4} lg={2} key={item.id}>
                <Typography
                  className="section3-medi"
                  component={Link}
                  to={`/commodities/list?manufacturers=${encodeURIComponent(item.id)}`}
                >
                  {item.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
