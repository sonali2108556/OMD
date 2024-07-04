import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { GRAPH_URL, getToken } from "../../../config";
import { Box, Typography, Grid, Container, Divider } from "@mui/material";

const getColor = (type) => {
  if (type === "Failed") return { bg: "#ff000015", text: "error" };
  else if (type === "Successful") return { bg: "#00ff0015", text: "primary" };
  return { bg: "white", text: "inherit" };
};

const OrderDetails = (props) => {
  const params = useParams();
  const [order, setOrder] = useState();

  const getOrderById = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "query OrderById($orderByIdId: ID!) {\n  orderById(id: $orderByIdId) {\n    status {\n      code\n      message\n      success\n      type\n    }\n    data {\n      amount\n      createdAt\n      id\n      items {\n        commodity {\n          name\n          price\n          photos\n          code\n          quantity\n          sellingUnit\n          type\n          unit\n          discount\n        }\n        quantity\n      }\n      status\n      updatedAt\n      user\n      payment {\n        method\n        transactionId\n        accountHolder\n        accountNumber\n        bankName\n        cardNo\n        createdAt\n        ifsc\n        upi\n        updatedAt\n      }\n      delivery {\n        addressLine1\n        addressLine2\n        city\n        deliveryDate\n        pincode\n        state\n      }\n    }\n  }\n}",
      variables: { orderByIdId: params.id },
    };
    try {
      const apiResponse = await axios.post(GRAPH_URL, data, config);
      // console.log(apiResponse);
      var store = apiResponse.data.data;
      if (store.orderById.status.success) {
        setOrder(store.orderById.data);
      } else {
        // console.error(store.orderById.status);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  console.log(order);
  useEffect(() => {
    getOrderById();
  }, [params]);
  return (
    <Box marginTop="100px">
      {order ? (
        <Container>
          <Typography variant="h6">
            <strong>Order Summary</strong>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Order Date</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{moment(order.createdAt).format("llll")}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Delivery Date</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">
                {new Date() - new Date(order.delivery.deliveryDate) < 0 ? "Expected by " : ""}
                {moment(order.delivery.deliveryDate).format("ll")}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Order Amount</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">₹{parseFloat(order.amount).toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Order Id</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.id.substring(14).toUpperCase()}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Order Status</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color={getColor(order.status).text}>
                <strong>{order.status}</strong>
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">
            <strong>Delivery Address</strong>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Address Line 1</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.delivery.addressLine1}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Address Line 2</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.delivery.addressLine2}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>City</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.delivery.city}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>State</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.delivery.state}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <strong>Pin Code</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{order.delivery.pincode}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          {order.payment && (
            <>
              <Typography variant="h6">
                <strong>Payment Details</strong>
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    <strong>Method</strong>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{order.payment.method}</Typography>
                </Grid>
                {order.payment.method === "nb" && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>Account Holder Name</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.accountHolder}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>Account Number</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.accountNumber}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>Bank Name</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.ifsc}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>IFSC Code</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.ifsc}</Typography>
                    </Grid>
                  </>
                )}
                {order.payment.method === "upi" && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>UPI Id</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.upi}</Typography>
                    </Grid>
                  </>
                )}
                {order.payment.method === "card" && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        <strong>Card Number</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{order.payment.cardNo}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
          <Typography variant="h6">
            <strong>Item Details</strong>
          </Typography>
          {order.items.map((item, index) => {
            return (
              <Box key={item.commodity.code}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <strong>Item name</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{item.commodity.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <strong>Item Quantity</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <strong>Price</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      ₹{parseFloat(item.commodity.price).toFixed(2)}/{item.commodity.sellingUnit}
                    </Typography>
                  </Grid>
                </Grid>
                {index !== order.items.length - 1 && <Divider sx={{ my: 0.5 }} />}
              </Box>
            );
          })}
        </Container>
      ) : (
        <Typography variant="caption">Order details not found.</Typography>
      )}
    </Box>
  );
};

export default OrderDetails;
