import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./About.css";
import section2Med from "../../../asset/images/about-section2.png";

const About = (props) => {
  return (
    <Box>
      <Box className="about-section1">
        <Box className="aboutSection1-overlay" display="flex" alignItems="center">
          <Container maxWidth="lg">
            <Typography variant="h3" color="white">
              <strong>About Us</strong>
            </Typography>
          </Container>
        </Box>
      </Box>

      <Box>
        <Container maxWidth="lg">
          <Box className="about-section2">
            <img src={section2Med} width="100%" alt="About Page"></img>
          </Box>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="lg">
          <Box my={2}>
            <Typography variant="h5" className="about-item-title">
              Welcome to My Pharmacy
            </Typography>
            <Typography variant="body2">
              At My Pharmacy, we are committed to revolutionizing the way you manage your health and wellness by
              offering a comprehensive and convenient online platform for medicine delivery. Our mission is to ensure
              that you have easy and timely access to a wide range of medications and health products, right at your
              doorstep.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5" className="about-item-title">
              Our Vision
            </Typography>
            <Typography variant="body2">
              We envision a world where everyone has seamless access to healthcare products, enabling them to lead
              healthier lives. Our goal is to bridge the gap between patients and essential medications by leveraging
              the power of technology.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5" className="about-item-title">
              Our Mission
            </Typography>
            <Typography variant="body2">
              <strong>Convenience:</strong> To provide an easy-to-use platform where users can order medicines and
              health products online.
            </Typography>
            <Typography variant="body2">
              <strong>Reliability:</strong> To offer a reliable delivery system ensuring timely and safe delivery of
              your orders.
            </Typography>
            <Typography variant="body2">
              <strong>Quality:</strong> To ensure that all products are sourced from trusted and verified suppliers,
              guaranteeing authenticity and quality.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5" className="about-item-title">
              What We Offer
            </Typography>
            <Typography variant="body2">
              <strong>Wide Range of Products</strong>
            </Typography>
            <Typography variant="body2">
              From prescription medications to over-the-counter drugs, health supplements, and wellness products, we
              have a comprehensive selection to cater to all your health needs.
            </Typography>
            <Typography variant="body2">
              <strong>Easy Ordering Process</strong>
            </Typography>
            <Typography variant="body2">
              Our user-friendly website allows you to browse through our extensive catalog, place orders, and track them
              with ease.
            </Typography>
            <Typography variant="body2">
              <strong>Fast and Secure Delivery</strong>
            </Typography>
            <Typography variant="body2">
              We understand the importance of timely medication. Our efficient delivery network ensures that your orders
              reach you quickly and securely.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5" className="about-item-title">
              Why Choose Us?
            </Typography>
            <Typography variant="body2">
              <strong>User-Centric Design:</strong> Our platform is designed with the user in mind, ensuring a seamless
              and intuitive shopping experience.
            </Typography>
            <Typography variant="body2">
              <strong>Secure Transactions:</strong> We prioritize your security with robust payment gateways and data
              protection measures.
            </Typography>
            <Typography variant="body2">
              <strong>Customer Support:</strong> Our dedicated customer support team is always ready to assist you with
              any queries or issues.
            </Typography>
          </Box>
          <Box mb={2}>
          <Typography variant="h5" className="about-item-title">
              At the end
            </Typography>
            <Typography variant="body2">
              At My Pharmacy, we are dedicated to transforming the healthcare landscape by providing a seamless,
              reliable, and convenient online medicine delivery system. Our commitment to quality, user-centric design,
              and advanced technology ensures that you receive the best service possible. Whether you need prescription
              medications, health supplements, or expert consultation, My Pharmacy is your trusted partner in health and
              wellness. Join us on our mission to make healthcare more accessible and experience the future of pharmacy
              today.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default About;
