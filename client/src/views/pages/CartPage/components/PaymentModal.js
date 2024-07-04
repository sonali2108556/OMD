import { CloseOutlined } from "@mui/icons-material";
import {
  Typography,
  Modal,
  Box,
  IconButton,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
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
export default function PaymentModal({
  open,
  handleClosePayment,
  handleSubmitPayment,
  data,
  handleChangePayment,
  orderData,
}) {
  const renderPaymentDetails = (method) => {
    switch (method) {
      case "nb":
        return (
          <>
            <TextField
              size="small"
              id="outlined-basic-accountNumber"
              name="accountNumber"
              value={data.accountNumber}
              required
              onChange={handleChangePayment}
              label="Account Number"
              variant="outlined"
              fullWidth
            />
            <TextField
              size="small"
              id="outlined-basic-accountHolder"
              name="accountHolder"
              value={data.accountHolder}
              required
              onChange={handleChangePayment}
              label="Account Holder Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              size="small"
              id="outlined-basic-bankName"
              name="bankName"
              value={data.bankName}
              required
              onChange={handleChangePayment}
              label="Bank Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              size="small"
              id="outlined-basic-ifsc"
              name="ifsc"
              value={data.ifsc}
              required
              onChange={handleChangePayment}
              label="IFSC Code"
              variant="outlined"
              fullWidth
            />
          </>
        );
      case "upi":
        return (
          <TextField
            size="small"
            id="outlined-basic-upi"
            name="upi"
            value={data.upi}
            required
            onChange={handleChangePayment}
            label="UPI Id"
            variant="outlined"
            fullWidth
          />
        );
      case "card":
        return (
          <>
            <TextField
              size="small"
              id="outlined-basic-cardNo"
              name="cardNo"
              value={data.cardNo}
              required
              onChange={handleChangePayment}
              label="Card Number"
              variant="outlined"
              fullWidth
            />
            <TextField
              size="small"
              id="outlined-basic-expiryDate"
              name="expiryDate"
              value={data.expiryDate}
              required
              onChange={handleChangePayment}
              label="Expiry Date"
              variant="outlined"
              fullWidth
            />
            <TextField
              size="small"
              id="outlined-basic-cvv"
              name="cvv"
              value={data.cvv}
              required
              type="password"
              onChange={handleChangePayment}
              label="CVV"
              variant="outlined"
              fullWidth
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClosePayment}
      aria-labelledby="address-title"
      aria-describedby="address-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="address-title" variant="h6" component="h2">
            Choose payment method
          </Typography>
          <IconButton size="small" onClick={() => handleClosePayment()}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmitPayment}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
          autoComplete="off"
        >
          <FormControl size="small" required>
            <FormLabel id="demo-row-radio-buttons-group-label">Payment Method</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={data.method}
              onChange={handleChangePayment}
              name="method"
            >
              <FormControlLabel value="upi" control={<Radio size="small" />} label="UPI" />
              <FormControlLabel value="nb" control={<Radio size="small" />} label="Net Banking" />
              <FormControlLabel value="card" control={<Radio size="small" />} label="Credit/Debit Cards" />
            </RadioGroup>
          </FormControl>
          {renderPaymentDetails(data.method)}
          <Button
            disabled={!orderData}
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Pay ₹{orderData ? orderData.amount : 0}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
