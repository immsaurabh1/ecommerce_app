import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Tooltip,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Typography,
  CardContent,
  CardActions
} from "@material-ui/core";
import axios from "axios";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function ProductComponent() {
  const [productData, setProductData] = useState([]);

  const populateProducts = async () => {
    let data = [];
    const response = await axios.get("http://localhost:3333/api/v1/products");
    if (response.data && response.data.success) {
      data = response.data.data;
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      const wishListData = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (cartData.length) {
        let cartIds = cartData.map(item => item._id);
        data.forEach(item => {
          if (cartIds.indexOf(item._id) > -1) {
            item.cartAdded = true;
          } else {
            item.cartAdded = false;
          }
        });
      }
      if (wishListData.length) {
        let wishListIds = wishListData.map(item => item._id);
        data.forEach(item => {
          if (wishListIds.indexOf(item._id) > -1) {
            item.wishListAdded = true;
          } else {
            item.wishListAdded = false;
          }
        });
      }
      setProductData(data);
    }
  };
  useEffect(() => {
    populateProducts();
  }, []);
  const addToLocalStorage = (item, key) => {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data.push(item);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const removeFromLocalStorage = (id, key) => {
    let data = JSON.parse(localStorage.getItem(key));
    const index = data.map(item => item._id).indexOf(id);
    if (index > -1) {
      data.splice(index, 1);
    }
    localStorage.setItem(key, JSON.stringify(data));
  };
  const addToWishList = (index, data) => {
    const prodData = JSON.parse(JSON.stringify(productData));
    data.wishListAdded = !data.wishListAdded;
    prodData[index] = data;
    setProductData(prodData);
    if (data.wishListAdded) {
      addToLocalStorage(data, "wishlist");
    } else {
      removeFromLocalStorage(data._id, "wishlist");
    }
  };
  const addToCart = (index, data) => {
    const prodData = JSON.parse(JSON.stringify(productData));
    data.cartAdded = !data.cartAdded;
    prodData[index] = data;
    setProductData(prodData);
    if (data.cartAdded) {
      addToLocalStorage(data, "cart");
    } else {
      removeFromLocalStorage(data._id, "cart");
    }
  };
  return (
    <div>
      <h2>Product Section</h2>
      <Grid container spacing={3}>
        {productData.map((item, index) => {
          return (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={<Avatar aria-label="recipe">P</Avatar>}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.name}
                  subheader={item.category}
                />
                <CardMedia
                  style={{ height: "150px", margin: "0 16px" }}
                  image={item.image}
                  title={item.name}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    This section will consist of product description
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Tooltip title="add to wishlist">
                    <IconButton onClick={() => addToWishList(index, item)}>
                      <FavoriteIcon
                        color={item.wishListAdded ? "primary" : ""}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="add to cart">
                    <IconButton onClick={() => addToCart(index, item)}>
                      <ShoppingCartIcon
                        color={item.cartAdded ? "primary" : ""}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="share">
                    <IconButton aria-label="">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  $ {item.price}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
