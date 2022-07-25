import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import InputCard from "./InputCard";
import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

function ReviewPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/reviews")
        : navigate("/admin")
      : navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      sx={{
        backgroundColor: "#f3e5f5",
        borderRadius: "16px",
        mt: 8,
        mb: 2,
        p: 1,
      }}
    >
      <Grid item>
        <ReviewHeader />
      </Grid>
      <Grid item xs>
        <InputCard id={props.id} />

        <ReviewCard id={props.id} />
      </Grid>
    </Container>
  );
}

export default ReviewPage;
