import { Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GRAPH_URL, getToken } from "../../../../config";
import Alert from "../../../components/Alert";

const CommodityItem = (props) => {

  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const item = props.item;
  const navigate = useNavigate();

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const addItemCart = async (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation AddItemCart($commodityId: ID!, $quantity: Int!) {\n  addItemCart(commodityId: $commodityId, quantity: $quantity) {\n    data {\n      commodity {\n        name\n      }\n      quantity\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: { commodityId: id, quantity: 1 },
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);
      const temp = response.data;

      if (temp.data.addItemCart.status.success) {
      } else {
        setShowAlert(true);
        setAlertMessage(temp.data.addItemCart.status.message);
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
    <Box
    
      sx={{
        backgroundColor: "#DFE8ED",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
      mt={1}
      boxShadow="0px 0px 10px #00000020"
    >
    <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
      <Box onClick={() => navigate("/commodities/list/" + item.code)} borderRadius="10px" sx={{ cursor: "pointer" }}>
        <Box>
          <Box
            display="flex"
            position="relative"
            top="5px"
            right="5px"
            justifyContent="end"
            flexDirection="row-reverse"
            marginBottom="-27px"
            borderRadius="10px"
          >
            <Box className="rating-star">
              <Typography variant="body2">
                <strong>{parseFloat(item.rating).toFixed(1)}</strong>{" "}
              </Typography>
              <Star fontSize="small" />
            </Box>

            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#22334D", padding: "5px", letterSpacing: "1px" }}
            >
              {parseInt(item.purchasedBy).toLocaleString("en-IN")} ratings
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "150px",
              justifyContent: "center",
              backgroundColor: "white",
              textAlign: "center",
              overflow: "hidden",
            }}
            borderRadius="10px"
          >
            <img src={item.photos[0]} width="100%" alt="commodity name" />
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">
              <strong>{item.name}</strong>
            </Typography>
            <Typography variant="body2">{item.category}</Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: "gray",
                paddingTop: "5px",
                ":first-letter": { textTransform: "capitalize" },
              }}
            >
              {item.sellingUnit} of {item.quantity} {item.unit} {item.type}
            </Typography>
            <Box display="flex" paddingY="10px"></Box>

            <Typography variant="body2" fontSize="12px">
              Delivery by <strong>10pm, Tomorrow</strong>
            </Typography>

            <Box display="flex" fontSize="14px" color="gray" paddingY="10px">
              <Typography variant="body2" paddingX="5px">
                MRP{" "}
              </Typography>

              <Typography variant="body2">
                {" "}
                <strike>
                  ₹
                  {parseFloat((item.price * 100) / (100 - item.discount))
                    .toFixed(2)
                    .toLocaleString("en-IN")}
                </strike>{" "}
              </Typography>
              <Typography variant="body2" color="#22334D" paddingX="5px">
                <strong>{item.discount}% OFF</strong>{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="10px">
        <Typography variant="body1">₹{item.price}</Typography>
        <Typography onClick={() => addItemCart(item.id)} variant="body2" sx={{ color: "red", cursor: "pointer" }}>
          Add to Cart
        </Typography>
      </Box>
    </Box>
  );
};
export default CommodityItem;
