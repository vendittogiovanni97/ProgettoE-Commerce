import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  disponibility: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now, require: true },
});

const Products = model("products", Product);
console.log("Schema creato", Products);

export default Products;
