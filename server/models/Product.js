const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel;
