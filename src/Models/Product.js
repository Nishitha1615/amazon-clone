const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Productname: {
      type: String,
      required: true,
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true 
  },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offers: {
      type: Number,
    },
    productPicture: [
      {
        img: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "oderUser"
        },
        review: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "oderUser",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
