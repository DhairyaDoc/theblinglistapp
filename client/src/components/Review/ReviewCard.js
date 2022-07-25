import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Rating, Stack } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setIntialReviewState } from "../../store/actions/Jewels.js";
import { BACKEND_URL } from "../../config/config.js";

function ReviewCard(props) {
  //update global state with database
  useEffect(() => {
    axios
      .post(BACKEND_URL + "reviews/getreviews", { product_id: props.id })
      .then((response) => {
        props.setIntialReviewState(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  var filtered_reviews = useSelector(
    (state) => state.jewelsReducer.filtered_reviews,
    shallowEqual
  );
  return (
    <>
      {filtered_reviews.map((review, index) => {
        return (
          <Card sx={{ width: "90%", m: 2 }} key={index}>
            <Stack direction="row">
              <Avatar sx={{ m: 1 }}></Avatar>

              <Typography sx={{ mt: 2, ml: 1 }}>{review.user_name}</Typography>
            </Stack>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {review.title}
              </Typography>
              <Rating readOnly name="size-medium" value={review.rating} />
              <Typography variant="body2" color="text.secondary">
                {review.description}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        );
      })}
    </>
  );
}
//state managaement
const mapDispatchtoProps = (dispatch) => {
  return {
    setIntialReviewState: (data) => {
      dispatch(setIntialReviewState(data));
    },
  };
};
export default connect(null, mapDispatchtoProps)(ReviewCard);
