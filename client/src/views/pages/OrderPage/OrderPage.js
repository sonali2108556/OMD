import { Box, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { GRAPH_URL, getToken } from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getColor = (type) => {
  if (type === "Failed") return { bg: "#ff000015", text: "error" };
  else if (type === "Successful") return { bg: "#00ff0015", text: "primary" };
  return { bg: "white", text: "inherit" };
};
export default function OrderPage(props) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const getOrderList = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "query OrderList {\n  orderList {\n    data {\n      amount\n      createdAt\n      id\n      status\n      updatedAt\n      user\n      delivery {\n        city\n        addressLine1\n        addressLine2\n        deliveryDate\n        pincode\n        state\n      }\n      items {\n        commodity {\n          name\n          code\n        }\n        quantity\n      }\n      payment {\n        accountHolder\n        accountNumber\n        bankName\n        cardNo\n        createdAt\n        ifsc\n        method\n        transactionId\n        updatedAt\n        upi\n      }\n    }\n    status {\n      success\n      message\n      code\n      type\n    }\n  }\n}",
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data.data);
      const temp = response.data.data;
      // console.log(temp);
      if (temp.orderList.status.success) {
        setOrders(temp.orderList.data);
      } else {
        // console.error(temp.orderList.status);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <Box marginTop="100px">
      <Container>
        <Typography variant="h6" py={2}>
          <strong>My Orders</strong>
        </Typography>
        <Grid container spacing={2}>
          {orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => {
              return (
                <Grid item xs={12} key={item.orderId}>
                  <Card
                    sx={{ backgroundColor: getColor(item.status).bg }}
                    onClick={() => navigate("/my/orders/" + item.id)}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2">
                            <strong>Order Id</strong>
                          </Typography>
                          <Typography>#{item.id.substring(14).toUpperCase()}</Typography>
                        </Box>

                        <Box textAlign="right">
                          <Typography variant="body2">
                            <strong>Order Date</strong>
                          </Typography>
                          <Typography>{moment(item.createdAt).format("MMM DD, YYYY")}</Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box>
                        <Typography variant="body1">
                          <strong>
                            {item.items.slice(0, 2).map((it, index) => (
                              <span key={it.commodity.code}>
                                {it.commodity.name} {index === 0 && item.items.length !== 1 && ", "}
                              </span>
                            ))}
                          </strong>
                          <Typography variant="caption">
                            {item.items.length - 2 > 0 &&
                              `+ ${item.items.length - 2} more item${item.items.length > 1 && "s"}`}
                          </Typography>
                        </Typography>
                        <Typography variant="caption">
                          {item.items.length} item{item.items.length > 1 && "s"}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6">
                            <strong>₹ {parseFloat(item.amount).toFixed(2).toLocaleString("en-IN")}</strong>
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="body2" color={getColor(item.status).text}>
                            <strong>{item.status}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
}
