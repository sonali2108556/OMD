import {Box,Container, Typography, Grid} from '@mui/material';
import pricing from "../../asset/images/pricing.png";
import insurance from "../../asset/images/insurance.png";
import trustedSecurity from "../../asset/images/trustedSecurity.png";
import support from "../../asset/images/support.png";

export default function Section7(props){
    return (
        <Box className="section5-Background" mt={4}>
        <Container maxWidth="xl" align="center">
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: "50px", color: "white", paddingTop: "20px", fontWeight: 600 }}
          >
            Our Promises To You
          </Typography>

          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <img alt="sample" src={pricing} width={50} height={50} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: "600" }}>
                Simple pricing
              </Typography>
              <Typography variant="body2" sx={{ color: "white", letterSpacing: "0.95px" }}>
                Our pricing options are clear and understandable
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <img alt="sample" src={insurance} width={50} height={50} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: "600" }}>
                Works with insurance
              </Typography>
              <Typography variant="body2" sx={{ color: "white", letterSpacing: "0.95px" }}>
                You'll see medication prices based on your plan
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <img alt="sample" src={trustedSecurity} width={50} height={50} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: "600" }}>
                Trusted security
              </Typography>
              <Typography variant="body2" sx={{ color: "white", letterSpacing: "0.95px" }}>
                Your medical information is always protected
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <img alt="sample" src={support} width={50} height={50} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: "600" }}>
                24/7 support
              </Typography>
              <Typography variant="body2" sx={{ color: "white", letterSpacing: "0.95px" }}>
                You can always speak to a pharmacist
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

    )
}