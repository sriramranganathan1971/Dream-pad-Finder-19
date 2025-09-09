// server/testOffer.js
import fetch from 'node-fetch';

const testOfferSubmission = async () => {
  try {
    console.log('🔍 Testing offer submission...\n');

    // Step 1: Login to get a token
    console.log('1. Logging in...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status} ${loginResponse.statusText}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login successful, token received');

    // Step 2: Check if property exists
    console.log('\n2. Checking property...');
    const propertyResponse = await fetch('http://localhost:5000/api/properties/2');
    
    if (!propertyResponse.ok) {
      throw new Error(`Property not found: ${propertyResponse.status}`);
    }

    const property = await propertyResponse.json();
    console.log('✅ Property found:', property.title);
    console.log('   Property ID:', property.propertyId);
    console.log('   MongoDB ObjectId:', property._id);

    // Step 3: Submit offer
    console.log('\n3. Submitting offer...');
    const offerResponse = await fetch('http://localhost:5000/api/offers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        property: '2', // Use property ID (not ObjectId)
        amount: 5000000,
        message: 'Test offer submission'
      })
    });

    console.log('Response status:', offerResponse.status);
    console.log('Response headers:', Object.fromEntries(offerResponse.headers.entries()));

    if (!offerResponse.ok) {
      const errorText = await offerResponse.text();
      console.error('❌ Offer submission failed:');
      console.error('Status:', offerResponse.status);
      console.error('Response:', errorText);
      return;
    }

    const offerData = await offerResponse.json();
    console.log('✅ Offer submitted successfully!');
    console.log(offerData);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testOfferSubmission();
