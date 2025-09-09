// server/fixExistingData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/property.js';

dotenv.config();

const fixExistingData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB');

    // Get all properties without propertyId
    const properties = await Property.find({ $or: [{ propertyId: { $exists: false } }, { propertyId: '' }] });
    console.log(`Found ${properties.length} properties to update`);

    // Update each property with a propertyId
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const newPropertyId = (i + 1).toString(); // Start from "1"
      
      await Property.updateOne(
        { _id: property._id },
        { propertyId: newPropertyId }
      );
      
      console.log(`✅ Updated property "${property.title}" with propertyId: ${newPropertyId}`);
    }

    // Add more properties if we only have one
    if (properties.length < 6) {
      console.log('📝 Adding additional properties...');
      
      const additionalProperties = [
        {
          propertyId: '2',
          title: 'Modern Villa in Whitefield',
          description: 'Spacious 4BHK villa with private garden, modern kitchen, and premium finishes. Perfect for families looking for comfort and luxury in Bengaluru.',
          price: 12000000,
          city: 'Bengaluru',
          address: '456 Whitefield, Bengaluru, Karnataka 560066',
          imageUrls: [
            'https://images.unsplash.com/photo-1534655610770-dd69616f05ff?q=80&w=956&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
          ],
          bedrooms: 4,
          bathrooms: 3,
          area: 2500,
          listedBy: 'Bangalore Realty Solutions',
          features: ['Private Garden', 'Modern Kitchen', 'Parking', 'Security', 'Study Room'],
          propertyType: 'villa',
        },
        {
          propertyId: '3',
          title: 'Premium Penthouse in Banjara Hills',
          description: 'Exclusive penthouse with panoramic city views, private terrace, and luxury amenities. Located in the prestigious Banjara Hills area of Hyderabad.',
          price: 15000000,
          city: 'Hyderabad',
          address: '789 Banjara Hills, Hyderabad, Telangana 500034',
          imageUrls: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
          ],
          bedrooms: 4,
          bathrooms: 4,
          area: 3200,
          listedBy: 'Hyderabad Luxury Homes',
          features: ['City Views', 'Private Terrace', 'Concierge', 'Valet Parking', 'Club House'],
          propertyType: 'penthouse',
        }
      ];

      for (const propData of additionalProperties) {
        const existingProp = await Property.findOne({ propertyId: propData.propertyId });
        if (!existingProp) {
          const newProperty = await Property.create(propData);
          console.log(`✅ Created property "${newProperty.title}" with propertyId: ${newProperty.propertyId}`);
        }
      }
    }

    console.log('\n📋 Current Properties:');
    const allProperties = await Property.find({});
    allProperties.forEach((prop) => {
      console.log(`  • Property ID: ${prop.propertyId} → MongoDB ObjectId: ${prop._id}`);
      console.log(`    Title: ${prop.title}`);
      console.log('');
    });

    console.log('🎉 Database fix completed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📤 Database connection closed');
    process.exit(0);
  }
};

fixExistingData();
