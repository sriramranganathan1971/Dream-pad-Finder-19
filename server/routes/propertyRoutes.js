import express from "express";
import Property from "../models/property.js"; // ✅ correct model path

const router = express.Router();

// Get all properties with optional filtering
router.get("/", async (req, res) => {
  try {
    const { city, minPrice, maxPrice, bedrooms, propertyType } = req.query;
    
    // Build filter object
    const filter = {};
    if (city) filter.city = new RegExp(city, 'i'); // Case-insensitive search
    if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    if (bedrooms) filter.bedrooms = parseInt(bedrooms);
    if (propertyType) filter.propertyType = propertyType;
    
    const properties = await Property.find(filter);
    
    // Convert MongoDB _id to id and add propertyId for consistency
    const formatted = properties.map((p) => ({
      ...p.toObject(),
      id: p.propertyId || p._id.toString()
    }));
    
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ 
      message: "Error fetching properties",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});
import mongoose from "mongoose";

// Get property by ID - supports both ObjectId and propertyId
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let property = null;
    
    // Try to find by MongoDB ObjectId first (24-char hex string)
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      property = await Property.findById(id);
    }
    
    // If not found, try to find by custom propertyId field (e.g., "1", "2", etc.)
    if (!property) {
      property = await Property.findOne({ propertyId: id });
    }
    
    if (!property) {
      return res.status(404).json({ 
        error: "Property not found",
        message: `No property found with ID: ${id}. Please check if the property exists in the database.`
      });
    }
    
    // Return property with consistent ID format for frontend
    const responseProperty = {
      ...property.toObject(),
      id: property.propertyId || property._id.toString()
    };
    
    res.json(responseProperty);
  } catch (err) {
    console.error("Error fetching property by id:", err);
    res.status(500).json({ 
      error: "Server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});


// Search properties endpoint (more advanced filtering)
router.get("/search", async (req, res) => {
  try {
    const { query, city, minPrice, maxPrice, bedrooms, bathrooms, propertyType, features } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Text search in title and description
    if (query) {
      filter.$or = [
        { title: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
        { address: new RegExp(query, 'i') }
      ];
    }
    
    if (city) filter.city = new RegExp(city, 'i');
    if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    if (bedrooms) filter.bedrooms = parseInt(bedrooms);
    if (bathrooms) filter.bathrooms = parseInt(bathrooms);
    if (propertyType) filter.propertyType = propertyType;
    if (features) {
      const featuresArray = features.split(',').map(f => f.trim());
      filter.features = { $in: featuresArray };
    }
    
    const properties = await Property.find(filter);
    
    // Format response
    const formatted = properties.map((p) => ({
      ...p.toObject(),
      id: p.propertyId || p._id.toString()
    }));
    
    res.json({
      results: formatted,
      count: formatted.length,
      filters: req.query
    });
    
  } catch (err) {
    console.error('Error searching properties:', err);
    res.status(500).json({ 
      message: "Error searching properties",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

export default router;
