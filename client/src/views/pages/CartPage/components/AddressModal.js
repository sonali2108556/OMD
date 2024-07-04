import { CloseOutlined } from "@mui/icons-material";
import { Typography, Modal, Box, IconButton, TextField, Button } from "@mui/material";
import moment from "moment";
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
export default function AddressModal({ open, handleCloseModal, handleSubmitOrder, data, handleChangeAddress }) {
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="address-title"
      aria-describedby="address-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="address-title" variant="h6" component="h2">
            Add delivery address
          </Typography>
          <IconButton size="small" onClick={() => handleCloseModal()}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmitOrder}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
          autoComplete="off"
        >
          <TextField
            size="small"
            id="outlined-basic-addressLine1"
            name="addressLine1"
            value={data.addressLine1}
            required
            onChange={handleChangeAddress}
            label="Address Line 1"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            id="outlined-basic-addressLine2"
            name="addressLine2"
            value={data.addressLine2}
            onChange={handleChangeAddress}
            label="Address Line 2"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            id="outlined-basic-city"
            name="city"
            value={data.city}
            required
            onChange={handleChangeAddress}
            label="City"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            id="outlined-basic-state"
            name="state"
            value={data.state}
            required
            onChange={handleChangeAddress}
            label="State"
            variant="outlined"
            fullWidth
          />{" "}
          <TextField
            size="small"
            id="outlined-basic-pincode"
            name="pincode"
            value={data.pincode}
            required
            onChange={handleChangeAddress}
            label="Pin Code"
            variant="outlined"
            fullWidth
          />
          {data.addressLine1 && data.city && data.state && data.pincode && (
            <Typography variant="body2" sx={{ color: "indigo !important" }}>
              <strong>Note:</strong>Your can expect the delivery by {moment(data.deliveryDate).format("LL")}.
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Proceed to Payment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
