// server/routes/offerRoutes.js
import express from "express";
import Offer from "../models/offer.js";
import auth from "../middleware/auth.js"; // ✅ use your existing auth middleware

const router = express.Router();

import mongoose from "mongoose";
import Property from "../models/property.js";

// Create a new offer (protected route)
router.post("/", async (req, res) => {
  try {
    const { property, amount, message } = req.body;

    console.log('Received offer submission:', { property, amount, message, userId: req.userId });

    if (!property || !amount) {
      return res.status(400).json({ error: "Missing required fields: property and amount are required" });
    }

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find the property to get its ObjectId
    let propertyDoc = null;
    
    // Try to find by ObjectId first
    if (mongoose.Types.ObjectId.isValid(property) && property.length === 24) {
      propertyDoc = await Property.findById(property);
    }
    
    // If not found, try to find by propertyId
    if (!propertyDoc) {
      propertyDoc = await Property.findOne({ propertyId: property });
    }
    
    if (!propertyDoc) {
      return res.status(404).json({ error: `Property not found with ID: ${property}` });
    }

    // Create the offer
    const newOffer = new Offer({
      property: propertyDoc._id, // Use the MongoDB ObjectId
      user: req.userId,
      amount: parseFloat(amount),
      message: message || '',
    });

    await newOffer.save();
    
    // Populate the response with property and user details
    const populatedOffer = await Offer.findById(newOffer._id)
      .populate('property', 'title address price propertyId')
      .populate('user', 'name email');
    
    console.log('Offer created successfully:', populatedOffer);
    res.status(201).json(populatedOffer);
  } catch (err) {
    console.error("Error creating offer:", err);
    res.status(500).json({ 
      error: "Server error", 
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});


// Get current user's offers
router.get("/my", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    console.log('Fetching offers for user:', req.userId);
    
    const offers = await Offer.find({ user: req.userId })
      .populate('property', 'title address price propertyId imageUrls propertyType')
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // Sort by newest first
    
    console.log(`Found ${offers.length} offers for user`);
    res.json(offers);
  } catch (err) {
    console.error("Error fetching user offers:", err);
    res.status(500).json({ 
      error: "Server error", 
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get all offers for a property
router.get("/:propertyId", async (req, res) => {
  try {
    const offers = await Offer.find({ property: req.params.propertyId })
      .populate("user", "name email") // ✅ show user info
      .populate("property", "title address price propertyId");
    res.json(offers);
  } catch (err) {
    console.error("Error fetching offers:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update offer status (for property owners or admins)
router.patch("/:offerId/status", async (req, res) => {
  try {
    const { offerId } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be PENDING, ACCEPTED, or REJECTED" });
    }

    const offer = await Offer.findById(offerId)
      .populate('property', 'title address price propertyId')
      .populate('user', 'name email');

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    offer.status = status;
    await offer.save();

    console.log(`Updated offer ${offerId} status to ${status}`);
    res.json(offer);
  } catch (err) {
    console.error("Error updating offer status:", err);
    res.status(500).json({ 
      error: "Server error", 
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

export default router;
