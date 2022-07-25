import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
} from "react-leaflet";
import Container from "@mui/material/Container";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "./MapDemo.css";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";

const theme = createTheme();

delete L.Icon.Default.prototype_getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapDemo() {
  const navigate = useNavigate();
  const citiesLayerRef = useRef(null);

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/map")
        : navigate("/admin")
      : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locations = [
    { name: "Michael Hill Halifax", position: [44.648311, -63.618778] },
    { name: "Charm Diamond Centers", position: [44.64931, -63.61878] },
    { name: "Pandora Jewellery", position: [44.647633, -63.6196] },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignitems: "center",
          width: "100%",
          height: "auto",
        }}
      >
        <Grid container alignItems="flex-end" justifyContent="flex-end">
          <Grid item xs>
            <Typography
              sx={{ color: "blueGrey" }}
              variant="h4"
              gutterBottom
              component="div"
            >
              Store Locations
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <hr size="10" style={{ color: "#800080", opacity: 0.8, margin: 8 }} />
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          alignitems: "center",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <Container
              component="main"
              style={{ marginRight: 20, marginLeft: 10 }}
              alignitems="left"
            >
              <Box
                //style={{ textAlign: 'left' }}
                sx={{
                  margin: "auto",
                  p: 1,
                  color: "#ffffff",
                  backgroundColor: "#800080db",
                  "&:hover": {
                    backgroundColor: "#800080db",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  //textTransform: 'none',
                }}
              >
                <Link
                  href="#"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  underline="hover"
                >
                  Michael Hill Halifax
                </Link>
                <br></br>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  Shop 252, Halifax Shopping Centre, 7001 Mumford Rd, Halifax,
                  NS B3L 2N9
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  Service options: In-store shopping · In-store pick-up
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  (902) 453-1093
                </Typography>
              </Box>
              <br></br>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#800080db",
                  "&:hover": {
                    backgroundColor: "#800080db",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Link
                  href="#"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  underline="hover"
                >
                  Charm Diamond Centers
                </Link>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  7001 Mumford Road Ste CRU266, Halifax, NS B3L 4N9
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  Service options: In-store shopping · Curbside pickup
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  (902) 455-0168
                </Typography>
              </Box>
              <br></br>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#800080db",
                  "&:hover": {
                    backgroundColor: "#800080db",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Link
                  href="#"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  underline="hover"
                >
                  Pandora Jewellery
                </Link>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  7001 Mumford Rd #114A, Halifax, NS B3L 4R3
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  Service options: In-store shopping · Curbside pickup
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  (902) 201-2890
                </Typography>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <MapContainer
              className="map"
              center={[44.64931, -63.61878]}
              zoom={15}
              style={{ width: "90%", height: "410px", margin: "auto" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LayerGroup ref={citiesLayerRef}>
                {locations.map((locations) => (
                  <Marker
                    key={`locations-${locations.position}`}
                    position={locations.position}
                    title={locations.name}
                  >
                    <Popup>{locations.name}</Popup>
                  </Marker>
                ))}
              </LayerGroup>
              {/* <LeafletSearch searchLayer={citiesLayerRef.current} /> */}
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default MapDemo;
