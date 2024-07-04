import { Modal, Box, Grid, Typography } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
export default function ConfirmationModal({ open, handlePaymentStatus }) {
  return (
    <Modal open={open} aria-labelledby="address-title" aria-describedby="address-description" keepMounted>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" textAlign="center" sx={{ color: "#ff0800" }}>
              <strong>
                Note: This payment is being processed in testing environment, please select the status of your payment.
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box
              height="80px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#ff7f50", cursor: "pointer" }}
              onClick={() => handlePaymentStatus("Failed")}
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Failure
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              height="80px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#1338be", cursor: "pointer" }}
              onClick={() => handlePaymentStatus("Successful")}
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Success
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
