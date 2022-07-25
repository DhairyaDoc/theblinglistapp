import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
// import { textAlign } from "@mui/system";

const NavBar = (props) => {
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

            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
