import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";

const Alert = (props) => {
  const alertColor = () => {
    if (props.type === "error") {
      return "red";
    } else if (props.type === "warning") {
      return "orange";
    } else if (props.type === "success") {
      return "green";
    } else {
      return "magenta";
    }
  };
  useEffect(() => {
    if (props.show === true) {
      setTimeout(() => {
        props.handleClose();
      }, 3000);
    }
  }, [props.show]);
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        position: "absolute",
        bottom: "20px",
        left: "0px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        zIndex: 4000,
      }}
    >
      <Box
        className={props.show ? "alert-opened" : "alert-closed"}
        sx={{
          backgroundColor: `${alertColor()} !important`,
        }}
      >
        <Typography color="white" textAlign="center" width="90%">
          {props.message}
        </Typography>

        <Box width="10%">
          <IconButton onClick={() => props.handleClose()} sx={{ color: "white" }} size="small">
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default Alert;
