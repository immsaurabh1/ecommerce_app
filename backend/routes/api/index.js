const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const request = require("request");

// add your key id and key secret from Razor pay dashboard
const instance = new Razorpay({
  key_id: "",
  key_secret: ""
});

router.get("/status", (req, res) => {
  res.ok({ success: "true" });
});
router.get("/products", (req, res) => {
  _models.Product.find({}, function(err, docs) {
    if (!err) {
      res.ok(200, {
        success: true,
        message: "Fetched Product Details",
        data: docs
      });
    } else {
      res.error(400, { info: err, message: "Some error occurred" });
    }
  });
});
router.get("/order", (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0
      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function(err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong"
    });
  }
});
router.post("/capture/:paymentId", (req, res) => {
  try {
    return request(
      {
        method: "POST",
        // add razor pay key id and key secret
        url: `https://keyId:keySecret@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100, // amount == Rs 10 // Same As Order amount
          currency: "INR"
        }
      },
      async function(err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong"
          });
        }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        return res.ok(200, {
          success: true,
          message: "Payment Successful",
          data: body
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong"
    });
  }
});

module.exports = router;
