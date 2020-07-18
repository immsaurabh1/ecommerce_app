import React from "react";
import { Grid, Divider } from "@material-ui/core";

export default () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setData(cartData);
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h3>Wishlist</h3>
        <Divider />
      </Grid>
      <Grid item xs={2}>
        <h5>S No.</h5>
      </Grid>
      <Grid item xs={4}>
        <h5>Product</h5>
      </Grid>
      <Grid item xs={4}>
        <h5>Description</h5>
      </Grid>
      <Grid item xs={2}>
        <h5>Price</h5>
      </Grid>
      {data.length ? (
        data.map((item, index) => {
          return (
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  {index + 1}
                </Grid>
                <Grid item xs={4}>
                  <img
                    alt="product"
                    style={{ height: "100px" }}
                    src={item.image}
                  />
                </Grid>
                <Grid item xs={4}>
                  {item.category}
                </Grid>
                <Grid item xs={2}>
                  {item.price}
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <h5 style={{ textAlign: "center" }}>Your wishlist is empty</h5>
        </Grid>
      )}
    </Grid>
  );
};
