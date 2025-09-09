import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyId: { type: String, unique: true, sparse: true }, // For compatibility with frontend mock IDs
  title: { type: String, required: true },
  address: { type: String, required: true },
  imageUrls: [{ type: String }],
  price: { type: Number, required: true },
  description: { type: String },
  city: { type: String, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number },
  propertyType: { type: String },
  features: [{ type: String }],
  listedBy: { type: String },
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
