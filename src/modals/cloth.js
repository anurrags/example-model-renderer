import mongoose from "mongoose";

const clothSchema = new mongoose.Schema({
  cloth_id: {
    type: String,
    required: true,
  },
  model_link: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  accross_shoulder: {
    type: Number,
    required: true,
  },
  sleeve_length: {
    type: Number,
    required: true,
  },
  front_length: {
    type: Number,
    required: true,
  },
});

const Cloth = mongoose.model("Cloth", clothSchema);
module.exports = Cloth;
