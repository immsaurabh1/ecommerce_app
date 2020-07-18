import React from "react";
import Axios from "axios";
import { Grid, Divider, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setData(cartData);
  }, []);
  const checkoutHandler = async response => {
    const API_URL = "http://localhost:3333/";
    try {
      const paymentId = response.razorpay_payment_id;
      const url = `${API_URL}api/v1/capture/${paymentId}`;
      const captureResponse = await Axios.post(url, {});
      if (captureResponse.data && captureResponse.data.success) {
        alert(captureResponse.data.message);
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkout = async e => {
    const API_URL = "http://localhost:3333/";
    e.preventDefault();
    const orderUrl = `${API_URL}api/v1/order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    const options = {
      // add your razorpay keyId
      key: "keyId",
      name: "Digiplug",
      description: "Helping you build",
      order_id: data.id,
      handler: checkoutHandler,
      theme: {
        color: "#686CFD"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h3>Shopping Bag</h3>
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
        <React.Fragment>
          {data.map((item, index) => {
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
          })}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={7} style={{ textAlign: "right" }}>
            <h3>Total: {data.reduce((acc, item) => acc + item.price, 0)}</h3>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={checkout}>
              {"Proceed to checkout"}
            </Button>
          </Grid>
        </React.Fragment>
      ) : (
        <h5>Your shopping cart is empty</h5>
      )}
    </Grid>
  );
};
