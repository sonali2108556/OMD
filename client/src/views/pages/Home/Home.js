import "./Home.css";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import { Box } from "@mui/material";
import axios from "axios";
import { GRAPH_URL } from "../../../config";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";

const Home = (props) => {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [compositions, setCompositions] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  // const [types, setTypes] = useState([]);

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const getCommodityData = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const data = {
      "query":"query GetCommodityData {\n  getCommodityData {\n    data {\n      compositions\n      commodities {\n        code\n        category\n        content {\n          composition\n        }\n        discount\n        id\n        name\n        photos\n        price\n        purchasedBy\n        quantity\n        rating\n        sellingUnit\n        type\n        unit\n        manufacturer {\n          id\n          manufacturerId\n          name\n        }\n      }\n      types\n      categories\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}"
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);
      var temp = response.data.data;
      if (temp.getCommodityData.status.success) {
        setCategories(temp.getCommodityData.data.categories);
        setCommodities(temp.getCommodityData.data.commodities);
        setCompositions(temp.getCommodityData.data.compositions);
        // setTypes(temp.getCommodityData.data.types);

        const manufacturerMap = new Map();
        const tempManufacturer = [];

        temp.getCommodityData.data.commodities.forEach((commodity) => {
          const manufacturer = commodity.manufacturer;
          if (manufacturerMap.has(manufacturer.id)) {
            manufacturerMap.set(manufacturer.id, {
              ...manufacturer,
              count: manufacturerMap.get(manufacturer.id).count + 1,
            });
          } else {
            manufacturerMap.set(manufacturer.id, { ...manufacturer, count: 1 });
          }
        });

        manufacturerMap.forEach((manufacturer) => {
          tempManufacturer.push({ ...manufacturer });
        });
        setManufacturers(tempManufacturer);

      } else {
        setShowAlert(true);
        setAlertMessage(temp.getCommodityData.status.message);
        setAlertType("warning");
        console.error(temp.getCommodityData.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };

  useEffect(() => {
    getCommodityData();
  }, []);
  return (
    <Box className="mainSection">
      <Box>
      <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
        <Section1 />
        <Section2 categories={categories} commoditiesData={commodities} />

        <Section3 commodities={commodities} compositions={compositions} manufacturers={manufacturers} />

        <Section4 />

        <Section5 />
        <Section6 />
      </Box>
    </Box>
  );
};
export default Home;
