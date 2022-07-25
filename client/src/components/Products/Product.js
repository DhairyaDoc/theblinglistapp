import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterProductCard from "./FilterProductCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [productsI, setProductsI] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filterClick, filterClickSet] = useState(0)
  const [minCostFilter, minCostSet] = useState(0)
  const [maxCostFilter, maxCostSet] = useState(1000)
  const [filterCost, filterCostSet] = useState([0, 1000])
  const [filterData, setFilterData] = useState([])
  const [filterApplied, setFilterApplied] = useState(false)
  const [availableF, setAvailableF] = useState(false)
  const [notavailableF, setNotAvailableF] = useState(false)
  const [ringF, setRingF] = useState(false)
  const [necklaceF, setNecklaceF] = useState(false)
  const [earringF, setEarringF] = useState(false)
  const [favouritesList, setFavouritesList] = useState([])
  const [productsFavourites, setProductsFavourites] = useState([])

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!isUserLoggedIn()) {
        navigate("/");
      } else {
        let role = localStorage.getItem("role");
        role === "customer" ? navigate("/products") : navigate("/admin");
        async function fetchData() {
          const res = await axios.get(
            `${BACKEND_URL}products/getproducts?id=${user._id}`
          );

          if (res.data.success) {
            let fL = []
            setProductsI(res.data.data)
            res.data.data.forEach(product => {
              if (product.favourite) {
                fL.push(true)
              } else {
                fL.push(false)
              }
            })
            setFavouritesList(fL)
            setProductsFavourites(fL)
            res.data.data.forEach(product => {
              if (product.productPrice > maxCost) {
                maxCost = product.productPrice;
              }
              if (product.productPrice < minCost) {
                minCost = product.productPrice;
              }
            });
            filterCostSet([0, 600]);
            setProducts(res.data.data)
          } else {
            setProducts([]);
          }
        }
        fetchData();
        let maxCost = 0;
        let minCost = 10000000;

      }
    } catch (error) {
      console.error(error.message);
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
      const resp=await axios.post(`${BACKEND_URL}search/addToSearch`, {
        user_id: user._id, keyword: keyword
      })
      let data = [];
      data = productsI.filter(product => {
        if (product._id.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        } else if (product.productName.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        } else if (product.productType.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        } else if (product.productDescription.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        } else if (product.metalType.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        } else if (product.productColor.toLowerCase().includes(keyword.toLowerCase())) {
          return product
        }
      })
      let mn = []
      data.forEach(product => {
        if (product.favourite) {
          mn.push(true)
        } else {
          mn.push(false)
        }
      })
      setFavouritesList(mn)
      ClearFilter()
      setProductsFavourites(mn)
      setProducts(data)
    } else {
      setFavouritesList([])
      let ef = []
      productsI.forEach(product => {
        if (product.favourite) {
          ef.push(true)
        } else {
          ef.push(false)
        }
      })
      setFavouritesList(ef)
      ClearFilter()
      setProductsFavourites(ef)
      setProducts(productsI)
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
    if (value === 600) {
      return `CAD 600+`
    }
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
    filterData_temp = products.filter((product) => {
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
        } else if (filter.type.necklace && product.productType.toLowerCase() === 'necklace') {
          if (filter.availibility.available || filter.availibility.notavailable) {
            if (filter.availibility.available && product.inventoryQuantity > 0) {
              if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
                return product
              } else if (filter.cost_max === 600) {
                if (product.productPrice >= filter.cost.min) {
                  return product
                }
              }
            } else if (filter.availibility.notavailable && product.inventoryQuantity === 0) {
              if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
                return product
              } else if (filter.cost_max === 600) {
                if (product.productPrice >= filter.cost.min) {
                  return product
                }
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
            } else if (filter.availibility.notavailable && product.inventoryQuantity === 0) {
              if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
                return product
              } else if (filter.cost_max === 600) {
                if (product.productPrice >= filter.cost.min) {
                  return product
                }
              }
            }
          }
        }
      } else if ((filter.type.ring || filter.type.necklace || filter.type.earring) && !(filter.availibility.available || filter.availibility.notavailable)) {
        if (filter.type.ring && product.productType.toLowerCase() === 'ring') {
          if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
            return product
          } else if (filter.cost_max === 600) {
            if (product.productPrice >= filter.cost.min) {
              return product
            }
          }
        } else if (filter.type.necklace && product.productType.toLowerCase() === 'necklace') {
          if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
            return product
          } else if (filter.cost_max === 600) {
            if (product.productPrice >= filter.cost.min) {
              return product
            }
          }
        } else if (filter.type.earring && product.productType.toLowerCase() === 'earring') {
          if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
            return product
          } else if (filter.cost_max === 600) {
            if (product.productPrice >= filter.cost.min) {
              return product
            }
          }
        }
      } else if (
        (filter.availibility.available || filter.availibility.notavailable) &&
        !(filter.type.ring || filter.type.necklace || filter.type.earring)
      ) {
        if (filter.availibility.available && product.inventoryQuantity > 0) {
          if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
            return product
          } else if (filter.cost_max === 600) {
            if (product.productPrice >= filter.cost.min) {
              return product
            }
          }
        } else if (filter.availibility.notavailable && product.inventoryQuantity === 0) {
          if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
            return product
          } else if (filter.cost_max === 600) {
            if (product.productPrice >= filter.cost.min) {
              return product
            }
          }
        }

      } else if (!(filter.availibility.available || filter.availibility.notavailable) && !(filter.type.ring || filter.type.necklace || filter.type.earring)) {
        if (product.productPrice >= filter.cost.min && product.productPrice <= filter.cost.max) {
          return product
        } else if (filter.cost_max === 600) {
          if (product.productPrice >= filter.cost.min) {
            return product
          }
        }
      }
    })
    setFavouritesList([])
    let fL = []
    filterData_temp.forEach(product => {
      if (product.favourite) {
        fL.push(true)
      } else {
        fL.push(false)
      }
    })
    setFavouritesList(fL)
    setFilterData([...filterData_temp]);
    setFilterApplied(true)
  }

  const ClearFilter = () => {
    let temp = false;
    setFilterApplied(temp)
    setAvailableF(temp)
    setNotAvailableF(temp)
    setRingF(temp)
    setNecklaceF(temp)
    setEarringF(temp)
    filterCostSet([0, 600])
    setFavouritesList([])
  }
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
                      min={0}
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
          Products
        </h1>
        <Box sx={{ flexGrow: 1, mx: "auto", mt: 4 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {products == null ?
              <h3>Loading Products...</h3> :
              filterApplied ?
                filterData === [] || filterData.length === 0 ?
                  <h3>No Filter Products found...</h3>
                  : filterData.map((product, index) => (
                    <Grid item>
                      <FilterProductCard data={product} favouriteInitial={favouritesList[index]} countI={0} />
                    </Grid>
                  ))
                : products.length === 0 ?
                  <h3>No Products found...</h3>
                  : products.map((product, index) => (
                    <Grid item>
                      <ProductCard data={product} favouriteInitial={productsFavourites[index]} countI={0} />
                    </Grid>
                  ))
            }
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Product;
