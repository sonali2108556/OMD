import { Button, Container, Divider, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./commodityDetails.css";
import { useParams } from "react-router-dom";
import { GRAPH_URL, getToken } from "../../../config";
import axios from "axios";
import moment from "moment";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import Alert from "../../components/Alert";

export default function CommodityDetails(props) {
  const params = useParams();

  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [commodityId, setCommodityId] = React.useState(params.id);
  const [strip, setStrip] = React.useState(1);
  const [commodity, setCommodity] = React.useState(null);

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const handleChange = (event) => {
    setStrip(event.target.value);
  };

  const getCommodityById = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const data = {
      query:
        "query CommodityByIdPublic($commodityByIdPublicId: ID!) {\n  commodityByIdPublic(id: $commodityByIdPublicId) {\n    data {\n      batchNo\n      benefits {\n        summary\n        title\n      }\n      category\n      code\n      content {\n        composition\n        details\n      }\n      createdAt\n      disclaimer\n      discount\n      dosage\n      expiryDate\n      id\n      manufacturer {\n        address {\n          city\n          postalCode\n          state\n          street\n        }\n        contact {\n          email\n          phone\n        }\n        country\n        createdAt\n        id\n        manufacturerId\n        name\n        updatedAt\n        website\n      }\n      mfdDate\n      name\n      photos\n      price\n      purchasedBy\n      quantity\n      rating\n      sellingUnit\n      sideEffects\n      type\n      unit\n      updatedAt\n      usedFor\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: { commodityByIdPublicId: commodityId },
    };
    try {
      const apiResponse = await axios.post(GRAPH_URL, data, config);
      // console.log(apiResponse);
      var store = apiResponse.data.data;
      if (store.commodityByIdPublic.status.success) {
        setCommodity(store.commodityByIdPublic.data);
      } else {
        setShowAlert(true);
        setAlertMessage(store.commodityByIdPublic.status.message);
        setAlertType("warning");
        // console.error(store.commodityByIdPublic.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };
  useEffect(() => {
    getCommodityById();
  }, [commodityId]);

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
      variables: { commodityId: id, quantity: isNaN(parseInt(strip)) ? 1 : parseInt(strip) },
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);
      const temp = response.data;

      if (temp.data.addItemCart.status.success) {
        setShowAlert(true);
        setAlertMessage("Item added to cart successfully");
        setAlertType("success");
      } 
      else {
        
        console.error(temp.data.addItemCart.status);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Box>
      {commodity ? (
        <Box className="section1-comodity">
          <Container maxWidth="xl">
            <Grid container spacing={2}>
            <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
              <Grid item xm={12} md={8}>
                <Typography variant="h5" marginBottom="20px">
                  <strong>{commodity.name}</strong>
                </Typography>
                <Box>
                  <Grid container>
                    <Grid item xm={12} md={6}>
                      <Box sx={{ color: "#666361" }}>
                        <Typography variant="body2" sx={{ marginTop: "10px" }}>
                          {" "}
                          <strong>MARKETER</strong>
                        </Typography>
                        <Typography component="a" href={commodity.manufacturer.website} target="_blank" variant="body2">
                          {" "}
                          {commodity.manufacturer.name}
                        </Typography>

                        <Typography variant="body2" sx={{ marginTop: "10px" }}>
                          <strong>SALT COMPOSITION</strong>
                        </Typography>
                        <Typography variant="body2">{commodity.content.composition.join(", ")}</Typography>

                        <Typography variant="body2" sx={{ marginTop: "10px" }}>
                          <strong>SALT CATEGORY</strong>
                        </Typography>
                        <Typography variant="body2">{commodity.category}</Typography>

                        <Typography variant="body2" sx={{ marginTop: "10px" }}>
                          <strong>TYPE</strong>
                        </Typography>
                        <Typography variant="body2">{commodity.type}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xm={12} md={6}>
                      <img alt={commodity.name} src={commodity.photos[0]} width="300px" />
                    </Grid>
                  </Grid>

                  <Divider />
                  <Typography variant="body2" marginTop="20px">
                    <strong>PRODUCT INTRODUCTION</strong>
                  </Typography>
                  <Typography variant="body2" className="section1-Text">
                    {commodity.content.details}
                  </Typography>
                  <Typography variant="body2" pb="30px" className="section1-Text">
                    {commodity.disclaimer}
                  </Typography>

                  <Divider />
                  <Typography variant="body2" marginTop="20px">
                    <strong>USES OF {commodity.name.toUpperCase()}</strong>
                  </Typography>
                  <Box sx={{ color: "#666361 !important" }}>
                    <ul className="section1-Uses-of-Dolo">
                      {commodity.usedFor.split(", ").map((item) => {
                        return (
                          <li key={item}>
                            <Typography variant="body2">{item}</Typography>
                          </li>
                        );
                      })}
                    </ul>
                  </Box>

                  <Typography variant="body2">
                    <strong>BENEFITS OF {commodity.name.toUpperCase()}</strong>
                  </Typography>
                  {commodity.benefits.map((item) => {
                    return (
                      <Box key={item.title}>
                        <Typography variant="body2" paddingTop="10px">
                          <strong>{item.title}</strong>
                        </Typography>

                        <Typography variant="body2" color="#666361">
                          {item.summary}
                        </Typography>
                      </Box>
                    );
                  })}
                  {/* <Typography variant="body2" paddingTop="10px">
                  In Pain relief
                </Typography>

                <Typography variant="body2" paddingTop="10px" color='#666361'>
                  Dolo 650 Tablet is a common painkiller for treating aches and pains. It is widely used and rarely causes any side effects if taken properly. To get the most benefits, take it as prescribed. Do not take more or for longer than needed as that can be dangerous.
                </Typography>

                {open ? (<><Typography variant="body2" paddingTop="10px">
                  In Treatment of Fever
                </Typography>
                  <Typography variant="body2" paddingTop="10px" color='#666361'>
                    Dolo 650 Tablet is also used to reduce a high temperature (fever). It works by blocking the release of certain chemical messengers that cause fever. It may be prescribed alone or in combination with other medicines. Take it as prescribed by the doctor.
                  </Typography></>) : null}

                {open ? (
                  <Typography variant="body2" className="showButton" onClick={(event) => setOpen(false)}>
                    Show less
                  </Typography>) :
                  (<Typography variant="body2" className="showButton" onClick={(event) => setOpen(true)}>
                    Show More
                  </Typography>)} */}

                  <Divider sx={{ marginTop: "10px" }} />
                  <Typography variant="body2" paddingTop="20px">
                    <strong>SIDE EFFECTS OF {commodity.name.toUpperCase()}</strong>
                  </Typography>

                  <ul className="list-SideEffect">
                    {commodity.sideEffects.map((item) => {
                      return (
                        <li key={item}>
                          <Typography variant="body2">{item}</Typography>
                        </li>
                      );
                    })}
                  </ul>

                  <Divider />
                  <Typography variant="body2" paddingTop="20px" paddingBottom="10px">
                    <strong> DOSAGE OF {commodity.name.toUpperCase()}</strong>
                  </Typography>
                  <Typography variant="body2" paddingBottom="20px" color="#666361">
                    Prescription required ({commodity.dosage})
                  </Typography>
                  <Divider />
                  <Typography variant="body2" paddingTop="20px" paddingBottom="10px">
                    <strong>DETAILS OF {commodity.name.toUpperCase()} </strong>
                  </Typography>

                  <Box display="flex" gap="10px" flexDirection="column">
                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Mfd. Date</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">{moment(commodity.mfdDate).format("MMM DD, YYYY")}</Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Expiry Date</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2"> {moment(commodity.expiryDate).format("MMM DD, YYYY")}</Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Batch No.</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">{commodity.batchNo}</Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Quantity</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {commodity.quantity} {commodity.unit}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Manufacturer Name</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">{commodity.manufacturer.name}</Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Manufacturer Website</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" component="a" href={commodity.manufacturer.website} target="_blank">
                          {commodity.manufacturer.website}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Manufacturer Address</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {commodity.manufacturer.address.street}, {commodity.manufacturer.address.city},{" "}
                          {commodity.manufacturer.address.state}, {commodity.manufacturer.address.postalCode}
                        </Typography>
                        <Typography>{commodity.manufacturer.country}</Typography>
                      </Box>
                    </Box>

                    <Box className="details-section-item">
                      <Box width="30%">
                        <Typography variant="body2">
                          <strong>Manufacturer Contact</strong>
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="body2"
                          className="manufacturer-contact"
                          component="a"
                          href={"tel:" + commodity.manufacturer.contact.phone}
                        >
                          <PhoneIcon fontSize="small " /> {commodity.manufacturer.contact.phone}
                        </Typography>
                        <Typography
                          className="manufacturer-contact"
                          component="a"
                          href={"mailto:" + commodity.manufacturer.contact.email}
                        >
                          <MailIcon fontSize="small " /> <span>{commodity.manufacturer.contact.email}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xm={12} md={4} width="100%">
                <Box sx={{ width: "100% !important" }}>
                  <Box className="section2-AddCart">
                    <Typography
                      variant="body2"
                      sx={{ backgroundColor: "#eafcee", padding: "8px", textAlign: "center", borderRadius: "10px" }}
                    >
                      {parseInt(commodity.purchasedBy).toLocaleString("en-IN")} people bought this recently
                    </Typography>

                    <Box display="flex" justifyContent="left" padding="10px">
                      <Typography variant="body2" color="#666361" paddingLeft="10px" paddingRight="20px">
                        MRP <strike>₹{((commodity.price * 100) / (100 - commodity.discount)).toFixed(2)}</strike>
                      </Typography>
                      <Typography color="#6ad879" variant="body2">
                        {commodity.discount}% OFF
                      </Typography>
                    </Box>

                    <Typography variant="h4" paddingLeft="30px" paddingBottom="10px">
                      <strong>₹{parseFloat(commodity.price).toFixed(2).toLocaleString("en-IN")}</strong>
                    </Typography>
                    <Typography paddingLeft="20px" color="#666361" variant="body2">
                      Inclusive of all taxes
                    </Typography>

                    <Box display="flex" margin="20px" alignItems="center">
                      <FormControl size="small" sx={{ marginRight: "10px" }}>
                        <TextField
                          id="outlined-strip"
                          label={
                            "Qty (" + commodity.sellingUnit[0].toUpperCase() + commodity.sellingUnit.substring(1) + ")"
                          }
                          type="number"
                          value={strip}
                          onChange={handleChange}
                          variant="standard"
                          size="small"
                          sx={{ width: "80px" }}
                        />
                      </FormControl>
                      <Typography variant="body2" color="#666361">
                        {commodity.quantity} {commodity.unit} in 1 {commodity.sellingUnit}
                      </Typography>
                    </Box>
                    <Box width="100%" display="flex" justifyContent="center">
                      <Button
                        onClick={() => addItemCart(commodity.id)}
                        sx={{ marginBottom: "20px", backgroundColor: "#ff5b59", width: "90%" }}
                        color="error"
                        type="button"
                        startIcon={<AddShoppingCartOutlined />}
                        fullWidth
                        variant="contained"
                      >
                        <strong>Add To Cart</strong>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box>
          <Typography>No Data Found</Typography>
        </Box>
      )}
    </Box>
  );
}
