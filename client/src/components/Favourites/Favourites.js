import React, { useEffect, useState } from "react";
import FavouriteCard from "./FavouriteCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const Favourites = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterClick, filterClickSet] = useState(0);
  const [minCostFilter, minCostSet] = useState(0);
  const [maxCostFilter, maxCostSet] = useState(1000);
  const [filterCost, filterCostSet] = useState([0, 1000]);
  const [filterData, setFilterData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [availableF, setAvailableF] = useState(false);
  const [notavailableF, setNotAvailableF] = useState(false);
  const [ringF, setRingF] = useState(false);
  const [necklaceF, setNecklaceF] = useState(false);
  const [earringF, setEarringF] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!isUserLoggedIn()) {
        navigate("/");
      } else {
        let role = localStorage.getItem("role");
        role === "customer" ? navigate("/favorites") : navigate("/admin");

        async function fetchData() {
          const res = await axios.get(
            `${BACKEND_URL}favourites/fetchfavourites?id=${user._id}`
          );
          if (res.data.success) {
            setFavourites(res.data.data);
            let maxCost = 0;
            let minCost = 10000000;
            favourites.forEach((product) => {
              if (product.productPrice > maxCost) {
                maxCost = product.productPrice;
              }
              if (product.productPrice < minCost) {
                minCost = product.productPrice;
              }
            });
            minCostSet(minCost);
            maxCostSet(maxCost);
            filterCostSet([minCostFilter, maxCostFilter]);
          }
        }
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    ClearFilter();
    const user = JSON.parse(localStorage.getItem("user"));
    if (keyword.length > 0) {
      const res = await axios.get(
        `${BACKEND_URL}search/favourites?id=${user._id}&keyword=${keyword}`
      );

      if (res.data.success) {
        setFavourites(res.data.data);
      }
    } else {
      const res = await axios.get(
        BACKEND_URL + `favourites/fetchfavourites?id=${user._id}`
      );

      if (res.data.success) {
        setFavourites(res.data.data);
      }
    }
  };

  const setFilterClick = (e) => {
    e.preventDefault();
    var value = filterClick ? 0 : 1;
    filterClickSet(value);
  };

  const handleFilterCostChange = (e, newValue) => {
    filterCostSet(newValue);
  };

  const costFilterValueLable = (value) => {
    return `CAD ${value}`;
  };

  const handleFilterApply = (e) => {
    var filter = {
      availibility: {
        available: availableF,
        notavailable: notavailableF,
      },
      type: {
        ring: ringF,
        necklace: necklaceF,
        earring: earringF,
      },
      cost: {
        min: filterCost[0],
        max: filterCost[1],
      },
    };
    let filterData_temp = [];

    // eslint-disable-next-line array-callback-return
    filterData_temp = favourites.filter((product) => {
      if (
        (filter.type.ring || filter.type.necklace || filter.type.earring) &&
        (filter.availibility.available || filter.availibility.notavailable)
      ) {
        if (filter.type.ring && product.productType.toLowerCase() === "ring") {
          if (
            filter.availibility.available ||
            filter.availibility.notavailable
          ) {
            if (
              filter.availibility.available &&
              product.inventoryQuantity > 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            } else if (
              filter.availibility.notavailable &&
              product.inventoryQuantity === 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            }
          }
        } else if (
          filter.type.necklace &&
          product.productType.toLowerCase() === "necklace"
        ) {
          if (
            filter.availibility.available ||
            filter.availibility.notavailable
          ) {
            if (
              filter.availibility.available &&
              product.inventoryQuantity > 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            } else if (
              filter.availibility.notavailable &&
              product.inventoryQuantity === 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            }
          }
        } else if (
          filter.type.earring &&
          product.productType.toLowerCase() === "earring"
        ) {
          if (
            filter.availibility.available ||
            filter.availibility.notavailable
          ) {
            if (
              filter.availibility.available &&
              product.inventoryQuantity > 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            } else if (
              filter.availibility.notavailable &&
              product.inventoryQuantity === 0
            ) {
              if (
                product.productPrice >= filter.cost.min &&
                product.productPrice <= filter.cost.max
              ) {
                return product;
              }
            }
          }
        }
      } else if (
        (filter.type.ring || filter.type.necklace || filter.type.earring) &&
        !(filter.availibility.available || filter.availibility.notavailable)
      ) {
        if (filter.type.ring && product.productType.toLowerCase() === "ring") {
          if (
            product.productPrice >= filter.cost.min &&
            product.productPrice <= filter.cost.max
          ) {
            return product;
          }
        } else if (
          filter.type.necklace &&
          product.productType.toLowerCase() === "necklace"
        ) {
          if (
            product.productPrice >= filter.cost.min &&
            product.productPrice <= filter.cost.max
          ) {
            return product;
          }
        } else if (
          filter.type.earring &&
          product.productType.toLowerCase() === "earring"
        ) {
          if (
            product.productPrice >= filter.cost.min &&
            product.productPrice <= filter.cost.max
          ) {
            return product;
          }
        }
      } else if (
        (filter.availibility.available || filter.availibility.notavailable) &&
        !(filter.type.ring || filter.type.necklace || filter.type.earring)
      ) {
        if (filter.availibility.available && product.inventoryQuantity > 0) {
          if (
            product.productPrice >= filter.cost.min &&
            product.productPrice <= filter.cost.max
          ) {
            return product;
          }
        } else if (
          filter.availibility.notavailable &&
          product.inventoryQuantity === 0
        ) {
          if (
            product.productPrice >= filter.cost.min &&
            product.productPrice <= filter.cost.max
          ) {
            return product;
          }
        }
      } else if (
        !(filter.availibility.available || filter.availibility.notavailable) &&
        !(filter.type.ring || filter.type.necklace || filter.type.earring)
      ) {
        if (
          product.productPrice >= filter.cost.min &&
          product.productPrice <= filter.cost.max
        ) {
          return product;
        }
      }
    });

    setFilterData([...filterData_temp]);
    setFilterApplied(true);
  };

  const ClearFilter = () => {
    let temp = false;
    setFilterApplied(temp);
    setAvailableF(temp);
    setNotAvailableF(temp);
    setRingF(temp);
    setNecklaceF(temp);
    setEarringF(temp);
    filterCostSet([0, 600]);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <table style={{ paddingTop: "40px" }}>
          <tr>
            <td style={{ width: "100%" }}>
              <TextField
                label="Search"
                id="outlined-basic"
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon onClick={(e) => handleSearchSubmit(e)} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={keyword}
                onChange={(e) => handleSearchChange(e)}
              />
            </td>
            <td>
              <Fab variant="extended" color="primary">
                <FilterAltIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                  onClick={(e) => setFilterClick(e)}
                />
              </Fab>
            </td>
          </tr>
        </table>
        {filterClick ? (
          <Box
            sx={{
              flexGrow: 1,
              mx: "auto",
              mt: 4,
              elevation: 2,
              border: "4px solid blue",
              borderRadius: "25px",
            }}
          >
            <Grid
              item
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <table
                width="100%"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                <tr width="100%">
                  <td style={{ textAlign: "left", fontFamily: "Helvetica" }}>
                    <h2>Filter</h2>
                  </td>
                  <td colspan="3" style={{ textAlign: "right" }}>
                    <Fab
                      variant="extended"
                      color="primary"
                      aria-label="close"
                      onClick={() => {
                        filterClickSet(0);
                      }}
                    >
                      X
                    </Fab>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style={{ fontFamily: "Helvetica" }}>Availibility</h3>
                  </td>
                  <td style={{ fontFamily: "Helvetica" }}>
                    <Checkbox
                      size="large"
                      label="Available"
                      value={availableF}
                      checked={availableF}
                      id="available"
                      onClick={(e) => {
                        setAvailableF(!availableF);
                      }}
                    />
                    Available
                  </td>
                  <td colspan="2" style={{ fontFamily: "Helvetica" }}>
                    <Checkbox
                      size="large"
                      label="Out of Stock"
                      value={notavailableF}
                      checked={notavailableF}
                      id="notavailable"
                      onClick={(e) => {
                        setNotAvailableF(!notavailableF);
                      }}
                    />
                    Out of Stock
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style={{ fontFamily: "Helvetica" }}>Product Type</h3>
                  </td>

                  <td style={{ fontFamily: "Helvetica" }}>
                    <Checkbox
                      size="large"
                      label="Ring"
                      value={ringF}
                      checked={ringF}
                      id="ring"
                      onClick={(e) => {
                        setRingF(!ringF);
                      }}
                    />
                    Ring
                  </td>
                  <td style={{ fontFamily: "Helvetica" }}>
                    <Checkbox
                      size="large"
                      label="Necklace"
                      value={necklaceF}
                      checked={necklaceF}
                      id="necklace"
                      onClick={(e) => {
                        setNecklaceF(!necklaceF);
                      }}
                    />
                    Necklace
                  </td>
                  <td style={{ fontFamily: "Helvetica" }}>
                    <Checkbox
                      size="large"
                      label="Earring"
                      value={earringF}
                      checked={earringF}
                      id="earring"
                      onClick={(e) => {
                        setEarringF(!earringF);
                      }}
                    />
                    Earring
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style={{ fontFamily: "Helvetica" }}>Cost (CAD)</h3>
                  </td>

                  <td
                    colspan="3"
                    style={{
                      fontFamily: "Helvetica",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    <Slider
                      getAriaLabel={() => "Cost"}
                      value={filterCost}
                      min={50}
                      max={600}
                      onChange={handleFilterCostChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={costFilterValueLable}
                      valueLabelFormat={costFilterValueLable}
                      disableSwap={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style={{ textAlign: "center" }}>
                    <Fab
                      variant="extended"
                      color="primary"
                      aria-label="apply-filter"
                      onClick={handleFilterApply}
                    >
                      Apply
                    </Fab>
                  </td>
                  <td colspan="2" style={{ textAlign: "center" }}>
                    <Fab
                      variant="extended"
                      color="primary"
                      aria-label="clear-filter"
                      onClick={ClearFilter}
                    >
                      Clear All
                    </Fab>
                  </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
              </table>
            </Grid>
          </Box>
        ) : (
          <></>
        )}
        <h1 margin-top="200px" align="left">
          My Wishlist
        </h1>
        <Box sx={{ flexGrow: 1, mx: "auto", mt: 4 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {favourites === undefined ? (
              <h3>You do not have any products added to Wishlist</h3>
            ) : filterApplied ? (
              filterData === [] || filterData.length === 0 ? (
                <h3>No Filter Wishlist found...</h3>
              ) : (
                filterData.map((favourite) => (
                  <Grid item>
                    <FavouriteCard data={favourite} />
                  </Grid>
                ))
              )
            ) : favourites.length === 0 ? (
              <h3>You do not have any products added to Wishlist</h3>
            ) : (
              favourites.map((favourite) => (
                <Grid item>
                  <FavouriteCard data={favourite} setFavourites={setFavourites} favourites={favourites}/>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Favourites;
