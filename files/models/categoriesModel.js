import mongoose from "mongoose";


const categoriesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const category = mongoose.model('Category', categoriesSchema)
export default category