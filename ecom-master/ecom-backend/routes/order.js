const { verifyToken } = require("../middleware/verifyToken");
const Order = require("../models/Order");
const express = require("express");
const router = express.Router();

router.post("/confirm-order", verifyToken, async (req, res) => {
  try {
    const { products, address } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No order items" });
    }

    const totalAmount = products.reduce((acc, item) => acc + parseInt(item.price), 0);
    const order = new Order({
      userId: req.user._id,
      products,
      amount: totalAmount,
      address,
      status: "confirmed",
    });

    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/fetch-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    const allProducts = orders.map((order) => order.products).flat();
    return res.status(200).json({ allProducts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
