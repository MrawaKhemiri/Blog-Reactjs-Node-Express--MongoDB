import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  password: { type: String, required: true },
});

const user = mongoose.model('User', userSchema)

export default user