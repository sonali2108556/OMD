import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Section6 = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Box>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" flexDirection="column" borderLeft="none">
            <Typography variant="h5" sx={{ textAlign: "center", marginTop: "50px", color: "#22334D" }}>
              <strong> Frequently Asked Questions</strong>
            </Typography>
            <Box width={300} className="section3-heading"></Box>

            <Accordion
              className="Section6-accordion"
              elevation={0}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Is My Pharmacy right for me?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  My Pharmacy is designed to cater to a wide range of healthcare needs, making it a suitable choice for
                  many individuals. Whether you need regular prescription refills, over-the-counter medications, or
                  personalized healthcare advice, My Pharmacy offers a convenient, reliable, and user-friendly platform.
                  Our service is ideal for those who value the convenience of home delivery, competitive pricing, and
                  access to a wide range of medications and healthcare products. Additionally, if you appreciate having
                  easy access to your prescription history and the ability to manage your health from the comfort of
                  your home, then My Pharmacy is a great fit for you.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="Section6-accordion"
              elevation={0}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  How do I start using My Pharmacy?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  To begin using My Pharmacy, simply visit our website. Create an account by providing your basic
                  details such as name, email address, and contact information. After registration, you can browse
                  through our wide range of available medicines, healthcare products, and services. Add the desired
                  items to your cart, proceed to checkout, and follow the prompts to complete your order. Our
                  user-friendly interface and secure payment options ensure a seamless experience, making it easy for
                  you to get the medications you need conveniently delivered to your doorstep.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="Section6-accordion"
              elevation={0}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Where do you deliver?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  We offer delivery services across India. Our goal is to ensure that everyone has access to quality
                  healthcare products and medications, no matter where they are located. Whether you're in the heart of
                  the city or in a remote area, we strive to reach you with our fast and reliable delivery network.
                  Simply provide your address during checkout, and we'll make sure your order reaches you promptly.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="Section6-accordion"
              elevation={0}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Do you take my insurance?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  No, we do not accept insurance at this time. However, we strive to offer competitive pricing and
                  discounts on our products to ensure affordability and accessibility for all our customers. If you have
                  any questions about pricing or payment options, please feel free to reach out to our customer support
                  team for assistance.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="Section6-accordion"
              elevation={0}
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  How do I transfer or add a prescription to My Pharmacy?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  To start using My Pharmacy, you can easily transfer or add your prescription by uploading a scanned
                  copy or clear photo through our website or mobile app. After uploading, fill in any required
                  information and review the details for accuracy. Our team will then verify the prescription to ensure
                  legal and safety requirements are met, and once confirmed, your medication will be delivered promptly
                  to your preferred address. If you encounter any issues or need assistance, our dedicated customer
                  support team is available to help you every step of the way.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Section6;
