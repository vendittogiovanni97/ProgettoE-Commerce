import mongoose from "mongoose";

const { Schema, model } = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, require: true },
});

const Users = model("users", User);
console.log("Schema creato", Users);

export default Users;
