
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";


const Section1 = (props) => {
    return (
        <Box className="section1-background">
          <Box className="section1-text">
            <Container maxWidth="xl">
              <Box maxWidth={{ xs: 400, lg: 500 }} height={600} display="flex" alignItems="center">
                <Box>
                  <Typography sx={{ fontSize: { xs: "40px", lg: "50px" }, lineHeight: { xs: "50px", lg: "60px" } }}>

                    <strong>The pharmacy that really delivers</strong>
                  </Typography>
                  <Typography variant="subtitle1" letterSpacing={"0.75px"}
                  >
                    With transparent pricing. Easy refills.
                    Even savings for Prime members.
                  </Typography>
                  <Button className="section1-getButton"
                    type="submit" npm
                    variant="contained"
                  >
                    Get Started
                  </Button>
                </Box>

              </Box>
            </Container>
          </Box>
        </Box>
    )
}
export default Section1;