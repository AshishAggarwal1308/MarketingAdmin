import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  sessionid: {
    type: String
  },
  orderid: {
    type: String
  },
  customerid: {
    type: String
  },
  paymentstatus: {
    type: Boolean,
    default: false
  },
  failurereason: {
    type: String
  },
  created_at: { type: Date, default: Date.now },
  price: Number
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
