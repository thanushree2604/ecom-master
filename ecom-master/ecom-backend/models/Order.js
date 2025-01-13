const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id: { type: String },
        quantity: { type: Number, default: 1 },
        category: { type: String },
        company: { type: String },
        description: { type: String },
        image: { type: String },
        model: { type: String },
        price: { type: String },
        product: { type: String },
        brand: { type: String },
        type: { type: String },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
