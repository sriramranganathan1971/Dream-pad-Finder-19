// server/seedDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/property.js';

// Load environment variables
dotenv.config();

// Mock data (copied from your frontend mockData.js)
const mockProperties = [
  {
    propertyId: '1',
    title: 'Luxury Apartment in Anna Nagar',
    description: 'Beautiful 3BHK apartment with modern amenities, gym, swimming pool, and 24/7 security. Located in the heart of Chennai with easy access to IT parks and shopping centers.',
    price: 8500000,
    city: 'Chennai',
    address: '123 Anna Nagar, Chennai, Tamil Nadu 600040',
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    listedBy: 'Chennai Properties Ltd.',
    features: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
    propertyType: 'apartment',
  },
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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
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
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    listedBy: 'Hyderabad Luxury Homes',
    features: ['City Views', 'Private Terrace', 'Concierge', 'Valet Parking', 'Club House'],
    propertyType: 'penthouse',
  },
  {
    propertyId: '4',
    title: 'Cozy 2BHK in T Nagar',
    description: 'Well-maintained 2BHK apartment in the bustling T Nagar area. Perfect for young professionals and small families.',
    price: 5500000,
    city: 'Chennai',
    address: '321 T Nagar, Chennai, Tamil Nadu 600017',
    imageUrls: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    listedBy: 'Chennai Properties Ltd.',
    features: ['Metro Connectivity', 'Shopping Centers', 'Parking', 'Power Backup'],
    propertyType: 'apartment',
  },
  {
    propertyId: '5',
    title: 'Tech Park Adjacent Apartment',
    description: 'Brand new 3BHK apartment near major tech parks in Electronic City. Ideal for IT professionals.',
    price: 9200000,
    city: 'Bengaluru',
    address: '654 Electronic City, Bengaluru, Karnataka 560100',
    imageUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    listedBy: 'Bangalore Realty Solutions',
    features: ['Tech Park Access', 'Metro Station', 'Food Court', 'Gym', 'Library'],
    propertyType: 'apartment',
  },
  {
    propertyId: '6',
    title: 'Gated Community House',
    description: 'Beautiful 3BHK house in a premium gated community with all modern amenities and green spaces.',
    price: 11500000,
    city: 'Hyderabad',
    address: '987 Gachibowli, Hyderabad, Telangana 500032',
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    listedBy: 'Hyderabad Luxury Homes',
    features: ['Gated Community', 'Children Play Area', 'Jogging Track', 'Club House', 'Security'],
    propertyType: 'house',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB with timeout
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing properties (optional - remove this line if you want to keep existing data)
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    // Insert mock properties
    const insertedProperties = await Property.insertMany(mockProperties);
    console.log(`✅ Successfully inserted ${insertedProperties.length} properties`);

    // Display inserted properties with their MongoDB ObjectIds
    console.log('\n📋 Inserted Properties:');
    insertedProperties.forEach((prop) => {
      console.log(`  • Property ID: ${prop.propertyId} → MongoDB ObjectId: ${prop._id}`);
      console.log(`    Title: ${prop.title}`);
      console.log('');
    });

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('📤 Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  seedDatabase();
}

export default seedDatabase;
