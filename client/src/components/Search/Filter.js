// import React, { useEffect, useState } from "react";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import { IconButton, Typography } from "@mui/material";
// import Card from "@mui/material/Card";
// import CloseIcon from "@mui/icons-material/Close";
// import Button from "@mui/material/Button";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import { BACKEND_URL } from "../../config/config";
// import { red } from "@mui/material/colors";
// import moment from 'moment';

// export default function Filter({ data }) {
//   const navigate = useNavigate();

//   const [favourite, setFavourite] = useState(data.favourite ? true : false)

//   return (
//     <div>
//       <Card
//         key={data.id}
//         elevation={1}
//         sx={{ maxWidth: 345, boxShadow: 5 }}
//         xs={{ flex: 1 }}
//       >
//         <CardHeader
//           action={
//               <IconButton id={data._id} aria-label="favourite" >
//                 <CloseIcon sx={{ color: red[500] }} />
//               </IconButton>
//           }
//           title={data.productName.length > 22 ? data.productName.substring(0, 20) + "..." : data.productName}
//           subheader={moment(new Date(data.createdAt).toISOString().
//             replace(/T/, ' ').      // replace T with a space
//             replace(/\..+/, '')).format('MMMM DD, YYYY')}
//         />
//         <CardMedia
//           sx={{ boxShadow: 3 }}
//           title={data.productName}
//           image={`${data.productImage}`}
//           style={{
//             height: 0,
//             paddingTop: "56.25%", // 16:9,
//             marginTop: "50",
//           }}
//         />

//         <CardContent style={{ height: "7vw" }}>
//           <table width="100%" maxWidth="100%">
//             <tr>
//               <td style={{ textAlign: "left" }}>
//                 <b>Price:</b> CAD {data.productPrice}
//               </td>
//               <td style={{ textAlign: "right" }}>
//                 {data.inventoryQuantity ? (
//                   <Typography
//                     backgroundColor="green"
//                     textAlign="center"
//                     color="white"
//                     width="100%"
//                     borderRadius="15%"
//                   >
//                     Available
//                   </Typography>
//                 ) : (
//                   <Typography
//                     backgroundColor="red"
//                     textAlign="center"
//                     color="white"
//                     width="100%"
//                     borderRadius="15%"
//                   >
//                     Not Available
//                   </Typography>
//                 )}
//               </td>
//             </tr>
//             <tr style={{ textAlign: "left" }}>
//               <b>Description:</b>
//             </tr>
//           </table>
//           <Typography textAlign="justify">
//             {
//               data.productDescription.length > 99 ?
//                 data.productDescription.substring(0, 96) + "..."
//                 : data.productDescription.length == 0 ?
//                   "No description available"
//                   :
//                   data.productDescription
//             }
//           </Typography>
//         </CardContent>
//         <div>
//           <table align="center">
//             <tr>
//               <td>
//                 <Button variant="outlined" id={`detail-${data._id}`} onClick={event=>viewProductDetails(event)}>
//                   {<InfoOutlinedIcon />}&nbsp;View Details
//                 </Button>
//               </td>
//               <td>
//                 <Button variant="outlined" onClick={() => navigate("/cart")}>
//                   Add to Cart&nbsp; {<AddShoppingCartOutlinedIcon />}
//                 </Button>
//               </td>
//             </tr>
//           </table>
//           <br />
//         </div>
//       </Card>
//       <ToastContainer />
//     </div>
//   );
// }
