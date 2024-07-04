import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import "./Contact.css";
import CallIcon from "@mui/icons-material/Call";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ChatIcon from "@mui/icons-material/Chat";

const Contact = (props) => {
  return (
    <Box>
      <Box className="contact-section1">
        <Box className="contactSection1-overlay" display="flex" alignItems="center">
          <Container maxWidth="lg">
            <Typography variant="h3" color="white">
              <strong>Contact Us</strong>
            </Typography>
          </Container>
        </Box>
      </Box>

      <Box className="contact-section2" sx={{ marginY: 5 }}>
        <Container maxWidth="lg">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.39138725709!2d76.832934376125!3d30.48167219772176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb8a30a29cc93%3A0xfa962d2fa5871c35!2sUniversal%20Group%20Of%20Institutions!5e0!3m2!1sen!2sin!4v1714288507482!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <Box marginTop="40px">
            <Grid container spacing={9}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" color="#22334D">
                  <strong>Get In Touch</strong>
                </Typography>
                <Typography variant="body2" color="#22334D">
                  Have a query? Write us.
                </Typography>
                <Box component="form" onSubmit={(e) => e.preventDefault()}>
                  <Box className="textfield">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          sx={{ marginBottom: 2 }}
                          size="small"
                          className="name"
                          type="text"
                          label="Name"
                          placeholder="Enter your name"
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          sx={{ marginBottom: 2 }}
                          size="small"
                          type="tel"
                          label="Phone"
                          placeholder="Enter your phone number"
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      sx={{ marginBottom: 2 }}
                      size="small"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      variant="standard"
                      fullWidth
                    />
                    <TextField
                      sx={{ marginBottom: 2 }}
                      size="small"
                      type="text"
                      label="Message"
                      placeholder="Write your message"
                      variant="standard"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Box>
                  <Box textAlign="end">
                    <Button
                      className="primary-button"
                      sx={{ marginTop: "10px", paddingX: "50px ! important" }}
                      type="submit"
                      variant="contained"
                    >
                      submit
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    marginBottom="30px"
                    className="icon"
                    gap="20px"
                  >
                    <CallIcon sx={{ fontSize: "30px" }} />
                    <Box>
                      <Typography variant="body2">
                        <strong>Call Us</strong>
                      </Typography>
                      <Typography variant="body2">+91-1800-242456</Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" marginBottom="30px" className="location" gap="20px">
                    <AddLocationIcon sx={{ fontSize: "30px" }} />
                    <Box>
                      <Typography variant="body2">
                        <strong>Visit Us</strong>
                      </Typography>
                      <Typography variant="body2">Lalru, Ambala Chandigarh Expy,Dera Bassi, Punjab 140501</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" marginBottom="30px" className="chat" gap="20px">
                    <ChatIcon sx={{ fontSize: "30px" }} />
                    <Box>
                      <Typography variant="body2">
                        <strong>Live Chat</strong>
                      </Typography>
                      <Typography variant="body2"> Chat with us</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Contact;
