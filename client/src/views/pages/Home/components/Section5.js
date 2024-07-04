import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import tick from "../../../../asset/images/tick.png";
import untick from "../../../../asset/images/untick.png";
import { Link } from "react-router-dom";

export default function Section5(props) {
  return (
    <>
      <Box className="section4-backgroundColor">
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Box className="Section4-background"></Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="section4-text">
                <Typography variant="h4">
                  <strong>An easier way to save on medication</strong>
                </Typography>

                <Box width={300} alignSelf="flex-end">
                  <Typography variant="h6" letterSpacing={"2.75px"}>
                    One low price Surprisingly simple Refreshingly reliable
                  </Typography>
                </Box>

                <Box width={300} alignSelf="flex-end">
                  <Button
                    className="section4-RxPassButton"
                    type="button"
                    size="large"
                    variant="contained"
                    component={Link}
                    to="/about"
                  >
                    Learn more
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Typography variant="h5" sx={{ textAlign: "center", marginTop: "50px", color: "#22334D" }}>
              <strong>There’s more to My Pharmacy</strong>
            </Typography>
            <Box width={300} className="section3-heading"></Box>

            <Table className="table-Background" sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ borderBottom: "2px solid #c4c4c4 !important", fontWeight: "600 !important" }}>
                  <TableCell sx={{ fontSize: "16px", fontWeight: 600, color: "text.secondary" }}>Benefits</TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: 600, color: "text.secondary" }} align="center">
                    The Other Pharmacy
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: 600, color: "text.secondary" }} align="center">
                    My Pharmacy
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Accepts most insurance plans
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Reviewed by pharmacists
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Automatic refills
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />{" "}
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Available to you 24/7
                  </TableCell>
                  <TableCell align="center">
                    <img src={untick} alt="untick" width={20} height={20} />{" "}
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Shows prices upfront
                  </TableCell>
                  <TableCell align="center">
                    <img src={untick} alt="untick" width={20} height={20} />{" "}
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th"sx={{color:'text.secondary'}} scope="row">
                    Delivers to your door
                  </TableCell>
                  <TableCell align="center">
                    <img src={untick} alt="untick" width={20} height={20} />{" "}
                  </TableCell>
                  <TableCell align="center">
                    <img src={tick} alt="tick" width={20} height={20} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Container maxWidth="sm">
              <Typography variant="h6" sx={{ textAlign: "center", marginTop: "50px", color: "blue" }}>
                WHAT CUSTOMERS ARE SAYING
              </Typography>
              <Typography variant="h5" sx={{ textAlign: "center", color: "#22334D", fontWeight:'600' }}>
                Aalok Kumar
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center", color: "#22334D", marginBottom: "20px" }}>
                CEO, WHPL
              </Typography>

              <Box display="flex" justifyContent="center" flexDirection="column">
                <Typography variant="body2" sx={{ textAlign: "center", color: "#22334D", marginBottom: "50px" }}>
                  “I was able to save over half my insurance co-pay on my allergy medication Singular by using Flex
                  Script App.”
                </Typography>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
}
