/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    img_root: {
      display: "flex",
      width: "100px",
      height: "100px",
      borderRadius: "100%",
      border: "1px solid #f97141",
      margin: "0 auto",
      transition: "ease 0.7s",
      cursor: "pointer",
      "&:hover ": {
        border: "4px dotted #f97141"
      }
    },
    img_responsive: {
      maxHeight: "100px",
      width: "100%",
      textAlign: "center",
      margin: "0 auto",
      padding: "10px 16px",
      display: "flex",
      justifyContent: "center",
      alignSelf: "center"
    },
    gridItem: {
      margin: "20px",
      transition: "ease 2s"
    },
    typoo: { color: "#f97242", transition: "ease 0.7s" },
    typooHover: { color: "#000", transition: "ease 0.7s" }
  }));