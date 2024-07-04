import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CommodityList.css";
import { GRAPH_URL } from "../../../config";
import CommodityItem from "./components/CommodityItem";
import FilterComponent from "./components/Filter";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Alert from "../../components/Alert";

export default function CommodityList(props) {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [commodities, setCommodities] = React.useState([]);
  const [commoditiesFiltered, setCommoditiesFiltered] = React.useState([]);
  const [manufacturers, setManufacturers] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const catFilter = searchParams.get("categories");
  const typeFilter = searchParams.get("types");
  const manuFilter = searchParams.get("manufacturers");
  const commodityName = searchParams.get
  ("commodity");

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };


  const getCommodities = async () => {
    const config = {
      header: {
        "content-type": "application/json",
      },
    };
    const data = {
      query:
        "query GetOderListPageData {\n  commodityListPublic {\n    data {\n      id\n      category\n      code\n      discount\n      name\n      photos\n      price\n      purchasedBy\n      quantity\n      rating\n      sellingUnit\n      type\n      unit\n      content {\n        composition\n      }\n      manufacturer {\n        id\n        manufacturerId\n        name\n      }\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
    };
    try {
      const response = await fetch(GRAPH_URL, {
        method: "POST",
        headers: config.header,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // console.log(result);
      if (result.data.commodityListPublic.status.success) {
        let commoditiesData = result.data.commodityListPublic.data;
        setCommodities(commoditiesData);
        setCommoditiesFiltered(commoditiesData);

        const manufacturerMap = new Map();
        const typeMap = new Map();
        const categoryMap = new Map();
        const tempManufacturer = [];
        const tempType = [];
        const tempCategory = [];
        commoditiesData.forEach((commodity) => {
          const manufacturer = commodity.manufacturer;
          if (manufacturerMap.has(manufacturer.id)) {
            manufacturerMap.set(manufacturer.id, {
              ...manufacturer,
              count: manufacturerMap.get(manufacturer.id).count + 1,
            });
          } else {
            manufacturerMap.set(manufacturer.id, { ...manufacturer, count: 1 });
          }

          if (typeMap.has(commodity.type)) {
            typeMap.set(commodity.type, typeMap.get(commodity.type) + 1);
          } else {
            typeMap.set(commodity.type, 1);
          }

          if (categoryMap.has(commodity.category)) {
            categoryMap.set(commodity.category, categoryMap.get(commodity.category) + 1);
          } else {
            categoryMap.set(commodity.category, 1);
          }
        });
        manufacturerMap.forEach((manufacturer) => {
          tempManufacturer.push({ ...manufacturer });
        });
        typeMap.forEach((count, type) => {
          tempType.push({ label: type, count });
        });

        categoryMap.forEach((count, category) => {
          tempCategory.push({ label: category, count });
        });

        setManufacturers(tempManufacturer);
        setTypes(tempType);
        setCategories(tempCategory);
      } else {
        setShowAlert(true);
        setAlertMessage(result.data.commodityListPublic.status.message);
        setAlertType("warning");
        // console.log(result.data.commodityListPublic.status.message);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };

  const handleFilterChange = (data) => {
    // console.log(data);
    let tempCommodities = commodities;

    if (data) {
      if (data.manufacturers.length) {
        tempCommodities = tempCommodities.filter((commodity) => {
          return data.manufacturers.includes(commodity.manufacturer.id);
        });
      }
      // console.log(tempCommodities)
      if (data.categories.length) {
        tempCommodities = tempCommodities.filter((commodity) => {
          return data.categories.includes(commodity.category);
        });
      }
      // console.log(tempCommodities)
      if (data.types.length) {
        tempCommodities = tempCommodities.filter((commodity) => {
          return data.types.includes(commodity.type);
        });
      }
    }
    setCommoditiesFiltered(tempCommodities);
  };
  useEffect(() => {
    getCommodities();
  }, []);

  useEffect(() => {
    handleFilterChange({
      categories: catFilter ? [catFilter] : [],
      types: typeFilter ? [typeFilter] : [],
      manufacturers: manuFilter ? [manuFilter] : [],
    });
  }, [commodities]);

  useEffect(() => {
    if (commodityName) {
      let temp = commodities.filter((item) => item.name.toLowerCase().includes(commodityName.toLowerCase()));
      setCommoditiesFiltered(temp);
    }
  }, [commodityName]);
  return (
    <Box className="main-section">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
        <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
          <Grid item xs={12} md={3} paddingTop="10px">
            <FilterComponent
              brands={manufacturers}
              types={types}
              categories={categories}
              filterFunction={handleFilterChange}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container>
              {commodities.length !== commoditiesFiltered.length && (
                <Grid item xs={12}>
                  <Typography variant="caption">
                    Showing {commodities.length} of {commodities.length} items
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <SearchBar data={commodities} fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {commoditiesFiltered.map((item) => {
                return (
                  <Grid item xs={6} md={4} key={item.code}>
                    <CommodityItem item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
