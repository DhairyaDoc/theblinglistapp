/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/


import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
// import { textAlign } from "@mui/system";

const NavBarProfile = (props) => {
  const navigate = useNavigate();
  let title = props.title;
  let color = props.color;
  return (
    <div>
      <AppBar position="static" style={{ background: color }}>
        <Toolbar>
          <Typography
            variant="title"
            fontFamily={"Lorem Ipsum"}
            fontSize={50}
            margin={0}
            style={{
              flexGrow: 1,
            }}
          >
            {/* Join us today! Please enter the details below  */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {title}
              <Button
                className="form-input-btn"
                onClick={() => navigate("/previousorders")}
                variant="contained"
                type="submit"
                style={{
                  color: "secondary",
                  background: "#6A0DAD",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                MY ORDERS
              </Button>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarProfile;
