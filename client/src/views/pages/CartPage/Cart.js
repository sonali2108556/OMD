import { Box, Button, Container, Divider, IconButton, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { GRAPH_URL, getToken } from "../../../config";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import AddressModal from "./components/AddressModal";
import PaymentModal from "./components/PaymentModal";
import ConfirmationModal from "./components/ConfirmationModal";

const initialAddress = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  deliveryDate: moment(new Date()).add(2, "days"),
};
const initialPayment = {
  method: "upi",
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifsc: "",
  upi: "",
  cardNo: "",
};
const Cart = (props) => {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [cartData, setCartData] = React.useState([]);
  const [amount, setAmount] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressData, setAddressData] = useState(initialAddress);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(initialPayment);
  const [orderData, setOrderData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCloseModal = () => {
    setShowAddressModal(false);
    setAddressData(initialAddress);
  };
  const handleChangeAddress = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation CreateOrder($deliveryDate: String!, $addressLine1: String!, $addressLine2: String, $city: String!, $state: String!, $pincode: String!) {\n  createOrder(deliveryDate: $deliveryDate, addressLine1: $addressLine1, addressLine2: $addressLine2, city: $city, state: $state, pincode: $pincode) {\n    status {\n      code\n      message\n      success\n      type\n    }\n    data {\n      amount\n      createdAt\n      id\n      status\n      updatedAt\n      user\n      delivery {\n        addressLine1\n        addressLine2\n        city\n        deliveryDate\n        pincode\n        state\n      }\n      payment {\n        method\n        transactionId\n      }\n      items {\n        quantity\n        commodity {\n          code\n        }\n      }\n    }\n  }\n}",
      variables: addressData,
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data.data);
      const temp = response.data.data;
      // console.log(temp);
      if (temp.createOrder.status.success) {
        setOrderData(temp.createOrder.data);
        setShowPaymentModal(true);
      } else {
        console.error(temp.createOrder.status);
      }
    } catch (error) {
      // console.log(error);
    }

    handleCloseModal();
  };
  const handleClosePayment = () => {
    setShowPaymentModal(false);
    // setPaymentData(initialPayment);
  };
  const handleChangePayment = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    handleClosePayment();
  };
  const handlePaymentStatus = async (status) => {
    // console.log(status);
    // console.log(orderData.id);
    // console.log(paymentData);
    paymentData.orderId = orderData.id;
    paymentData.status = status;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation UpdateOrder($orderId: ID!, $status: String!, $method: String, $bankName: String, $accountHolder: String, $accountNumber: String, $ifsc: String, $upi: String, $cardNo: String) {\n  updateOrder(orderId: $orderId, status: $status, method: $method, bankName: $bankName, accountHolder: $accountHolder, accountNumber: $accountNumber, ifsc: $ifsc, upi: $upi, cardNo: $cardNo) {\n    data {\n      status\n      id\n      amount\n      createdAt\n      delivery {\n        addressLine1\n        addressLine2\n        city\n        deliveryDate\n        pincode\n        state\n      }\n      payment {\n        accountHolder\n        accountNumber\n        bankName\n        cardNo\n        createdAt\n        ifsc\n        method\n        transactionId\n        updatedAt\n        upi\n      }\n      items {\n        commodity {\n          code\n          name\n        }\n        quantity\n      }\n      user\n    }\n    status {\n      type\n      success\n      message\n      code\n    }\n  }\n}",
      variables: paymentData,
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data.data);
      const temp = response.data.data;
      if (temp.updateOrder.status.success) {
        setShowConfirmationModal(false);
      } else {
        console.error(temp.updateOrder.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const cartById = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "query CartById {\n  cartById {\n    data {\n      commodity {\n        name\n        id\n        code\n        price\n        photos\n        discount\n        quantity\n        sellingUnit\n        type\n        unit\n      }\n      quantity\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: {},
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data.data);
      const temp = response.data.data;

      if (temp.cartById.status.success) {
        let cartItems = temp.cartById.data;
        setCartData(cartItems);

        let tempAmount = 0;
        let tempPayable = 0;

        cartItems.forEach((item) => {
          tempPayable = tempPayable + item.commodity.price * item.quantity;
          tempAmount = tempAmount + (item.commodity.price * item.quantity * 100) / (100 - item.commodity.discount);
        });

        setAmount(tempAmount);
        setTotalPayable(tempPayable);
      } else {
        // console.error(temp.cartById.status);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    cartById();
  }, []);

  const deleteFromCart = async (id) => {
    // console.log(id);
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation DeleteFromCart($commodityId: ID!) {\n  deleteFromCart(commodityId: $commodityId) {\n    data {\n      commodity {\n        photos\n        price\n        name\n        id\n        code\n        quantity\n        sellingUnit\n   discount\n     type\n        unit\n      }\n      quantity\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: { commodityId: id },
    };
    try {
      const apiResponse = await axios.post(GRAPH_URL, data, config);
      // console.log(apiResponse.data.data);
      const temp = apiResponse.data.data;

      if (temp.deleteFromCart.status.success) {
        setCartData(temp.deleteFromCart.data);

        setShowAlert(true);
        setAlertType("success");
        setAlertMessage(temp.deleteFromCart.status.message);

        const deleteItems = temp.deleteFromCart.data;
        let tempAmount = 0;
        let tempPayable = 0;

        deleteItems.forEach((item) => {
          tempPayable = tempPayable + item.commodity.price * item.quantity;
          tempAmount = tempAmount + (item.commodity.price * item.quantity * 100) / (100 - item.commodity.discount);
        });

        setAmount(tempAmount);
        setTotalPayable(tempPayable);
      } else {
        setShowAlert(true);
        setAlertMessage(temp.deleteFromCart.status.message);
        setAlertType("warning");
        // console.error(temp.deleteFromCart.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };

  const addItemCart = async (id, quantity) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation AddItemCart($commodityId: ID!, $quantity: Int!) {\n  addItemCart(commodityId: $commodityId, quantity: $quantity) {\n    data {\n      commodity {\n        name\n        id\n        code\n        price\n        photos\n        discount\n        quantity\n        sellingUnit\n        type\n        unit\n      }\n      quantity\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: { quantity: quantity, commodityId: id },
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);
      const temp = response.data;

      if (temp.data.addItemCart.status.success) {
        setCartData(temp.data.addItemCart.data);
        const cartItems = temp.data.addItemCart.data;
        let tempAmount = 0;
        let tempPayable = 0;

        cartItems.forEach((item) => {
          tempPayable = tempPayable + item.commodity.price * item.quantity;
          tempAmount = tempAmount + (item.commodity.price * item.quantity * 100) / (100 - item.commodity.discount);
        });

        setAmount(tempAmount);
        setTotalPayable(tempPayable);
      } else {
        setShowAlert(true);
        setAlertMessage(temp.addItemCart.status.message);
        setAlertType("warning");
        // console.error(temp.data.addItemCart.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };

  return (
    <Box>
      <AddressModal
        open={showAddressModal}
        handleCloseModal={handleCloseModal}
        data={addressData}
        handleChangeAddress={handleChangeAddress}
        handleSubmitOrder={handleSubmitOrder}
      />
      <PaymentModal
        open={showPaymentModal}
        handleClosePayment={handleClosePayment}
        data={paymentData}
        handleChangePayment={handleChangePayment}
        handleSubmitPayment={handleSubmitPayment}
        orderData={orderData}
      />
      <ConfirmationModal open={showConfirmationModal} handlePaymentStatus={handlePaymentStatus} />
      <Box className="cartSection">
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
            <Grid item xs={12} md={8}>
              <Box className="cartSection1">
                <Typography variant="h6" color="#22334D" mb={1}>
                  <strong> My Cart ({cartData.length})</strong>
                </Typography>

                <Box className="cartSection1-box">
                  <Typography variant="body2">You are eligible for free shipping!</Typography>

                  {/* <Typography variant="body2">
                    <span className="section1LinkBorder">
                      <a href="#"> Free return </a>
                    </span>{" "}
                    see details/exclusions.*
                  </Typography> */}

                  {/* <Box marginY="10px">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box className="section1-boxBorder">
                          <Box width="100%">
                            <Typography variant="body2">
                              Get <strong>2 </strong>free sample(s) with every order
                            </Typography>
                            <Typography variant="body2">SELECT YOUR SAMPLE(s)</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className="section1-boxBorder">
                          <Typography variant="body2">
                            <span className="section1LinkBorder">
                              <a href="">Sign in</a>
                            </span>{" "}
                            to see your Beauty Insider points & redeem your rewards{" "}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box> */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    {cartData.sort((a,b)=>{return b.commodity.price-a.commodity.price}).map((item) => {
                      return (
                        <Box
                          key={item.commodity.id}
                          display="flex"
                          gap={2}
                          borderRadius="10px"
                          boxShadow="0px 0px 10px #00000020"
                          p={1}
                        >
                          <Box component={Link} to={"/commodities/list/" + item.commodity.code}>
                            <img
                              alt={item.commodity.name}
                              src={item.commodity.photos[0]}
                              textAlign="left"
                              height="90px"
                              width="70px"
                            ></img>
                          </Box>
                          <Box width="100%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Box display="flex" gap={1} justifyContent="space-between">
                              <Box flexGrow={1}>
                                <Typography variant="body2" textAlign="left">
                                  <strong>{item.commodity.name}</strong>
                                </Typography>

                                <Typography sx={{ textTransform: "capitalize", fontSize: "12px" }}>
                                  {item.commodity.sellingUnit} of {item.commodity.quantity} {item.commodity.unit}{" "}
                                  {item.commodity.type}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography textAlign="end" variant="h6">
                                  <strong>₹{item.commodity.price.toFixed(2)}</strong>
                                  <Typography variant="caption">&nbsp;/{item.commodity.sellingUnit}</Typography>
                                </Typography>
                                <Typography textAlign="end" variant="caption" color="text.secondary">
                                  <s>₹{((item.commodity.price * 100) / (100 - item.commodity.discount)).toFixed(2)}</s>{" "}
                                  &nbsp; <strong>{item.commodity.discount}% off</strong>
                                </Typography>
                              </Box>
                            </Box>

                            <Box display="flex" gap={1} justifyContent="space-between" alignItems="center">
                              <Box display="flex" alignItems="center" gap="5px">
                                <IconButton
                                  disabled={item.quantity < 2}
                                  onClick={() => addItemCart(item.commodity.id, item.quantity - 1)}
                                  color="error"
                                >
                                  <Remove sx={{ fontSize: "18px" }} />
                                </IconButton>
                                <Typography variant="body2">
                                  <strong>{item.quantity}</strong>
                                </Typography>

                                <IconButton
                                  onClick={() => addItemCart(item.commodity.id, item.quantity + 1)}
                                  color="success"
                                >
                                  <Add sx={{ fontSize: "18px" }} />
                                </IconButton>
                              </Box>
                              <Button
                                startIcon={<DeleteOutline sx={{ fontSize: "16px" }} />}
                                onClick={() => deleteFromCart(item.commodity.id)}
                                className="omd-button-outlined error"
                                type="button"
                                size="small"
                                variant="outlined"
                              >
                                Remove
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                    {cartData.length === 0 && (
                      <Typography color="error" variant="body2">
                        No items in the cart
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box className="section2">
                <Box marginBottom="10px">
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Total Amount</Typography>
                    <Typography variant="body2">
                      <strong>₹{amount.toFixed(2)}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" sx={{ color: "orange" }}>
                    <Typography variant="body2">Total Discount</Typography>
                    <Typography variant="body2">
                      <strong>₹{(amount - totalPayable).toFixed(2)}</strong>
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box paddingY={3}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">
                      <strong>Payable Total</strong>
                    </Typography>
                    <Typography variant="body2">
                      <strong>₹{totalPayable}</strong>
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "text.secondary" }} variant="body2" textAlign="justify">
                    Get it delivered by Tommorrow, {moment(new Date()).add(1, "days").format("ll")}, if ordered within{" "}
                    {moment().endOf("day").fromNow()}.
                  </Typography>

                  <Button
                    sx={{ borderRadius: "40px", marginTop: "20px", textTransform: "capitalize" }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="contained"
                    disabled={cartData.length === 0}
                    onClick={() => setShowAddressModal(true)}
                  >
                    <strong>Pay ₹{totalPayable}</strong>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
export default Cart;
