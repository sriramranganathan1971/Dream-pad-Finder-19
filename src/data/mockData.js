export const cities = [
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Pune',
];

export const mockProperties = [
  {
    id: '1',
    title: 'Luxury Apartment in Anna Nagar',
    description: 'Beautiful 3BHK apartment with modern amenities, gym, swimming pool, and 24/7 security. Located in the heart of Chennai with easy access to IT parks and shopping centers.',
    price: 8500000,
    city: 'Chennai',
    address: '123 Anna Nagar, Chennai, Tamil Nadu 600040',
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    listedBy: 'Chennai Properties Ltd.',
    createdAt: '2024-01-15',
    features: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
    propertyType: 'apartment',
  },
  {
    id: '2',
    title: 'Modern Villa in Whitefield',
    description: 'Spacious 4BHK villa with private garden, modern kitchen, and premium finishes. Perfect for families looking for comfort and luxury in Bengaluru.',
    price: 12000000,
    city: 'Bengaluru',
    address: '456 Whitefield, Bengaluru, Karnataka 560066',
    imageUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    listedBy: 'Bangalore Realty Solutions',
    createdAt: '2024-01-20',
    features: ['Private Garden', 'Modern Kitchen', 'Parking', 'Security', 'Study Room'],
    propertyType: 'villa',
  },
  {
    id: '3',
    title: 'Premium Penthouse in Banjara Hills',
    description: 'Exclusive penthouse with panoramic city views, private terrace, and luxury amenities. Located in the prestigious Banjara Hills area of Hyderabad.',
    price: 15000000,
    city: 'Hyderabad',
    address: '789 Banjara Hills, Hyderabad, Telangana 500034',
    imageUrls: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    listedBy: 'Hyderabad Luxury Homes',
    createdAt: '2024-01-25',
    features: ['City Views', 'Private Terrace', 'Concierge', 'Valet Parking', 'Club House'],
    propertyType: 'penthouse',
  },
  {
    id: '4',
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
    createdAt: '2024-02-01',
    features: ['Metro Connectivity', 'Shopping Centers', 'Parking', 'Power Backup'],
    propertyType: 'apartment',
  },
  {
    id: '5',
    title: 'Tech Park Adjacent Apartment',
    description: 'Brand new 3BHK apartment near major tech parks in Electronic City. Ideal for IT professionals.',
    price: 9200000,
    city: 'Bengaluru',
    address: '654 Electronic City, Bengaluru, Karnataka 560100',
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    listedBy: 'Bangalore Realty Solutions',
    createdAt: '2024-02-05',
    features: ['Tech Park Access', 'Metro Station', 'Food Court', 'Gym', 'Library'],
    propertyType: 'apartment',
  },
  {
    id: '6',
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
    createdAt: '2024-02-10',
    features: ['Gated Community', 'Children Play Area', 'Jogging Track', 'Club House', 'Security'],
    propertyType: 'house',
  },
  {
    id: '7',
    title: 'Luxury Penthouse in Bandra',
    description: 'Premium 4BHK penthouse in Mumbai\'s most sought-after location. Features panoramic sea views, private elevator, and world-class amenities.',
    price: 35000000,
    city: 'Mumbai',
    address: '123 Bandra West, Mumbai, Maharashtra 400050',
    imageUrls: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8',
      'https://picsum.photos/800/600?random=9',
    ],
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    listedBy: 'Mumbai Prime Properties',
    createdAt: '2024-02-15',
    features: ['Sea View', 'Private Elevator', 'Swimming Pool', 'Valet Parking', 'Concierge'],
    propertyType: 'penthouse',
  },
  {
    id: '8',
    title: 'Modern Apartment in Andheri',
    description: 'Well-designed 3BHK apartment in Andheri East with excellent connectivity to business districts and international airport.',
    price: 18500000,
    city: 'Mumbai',
    address: '789 Andheri East, Mumbai, Maharashtra 400069',
    imageUrls: [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
    ],
    bedrooms: 3,
    bathrooms: 3,
    area: 1950,
    listedBy: 'Mumbai Prime Properties',
    createdAt: '2024-02-18',
    features: ['Metro Access', 'Shopping Mall', 'Gym', 'Security', 'Parking'],
    propertyType: 'apartment',
  },
  {
    id: '9',
    title: 'Premium Villa in Koregaon Park',
    description: 'Exclusive 4BHK villa in Pune\'s upscale Koregaon Park area. Perfect blend of luxury and comfort with private garden and modern amenities.',
    price: 25000000,
    city: 'Pune',
    address: '456 Koregaon Park, Pune, Maharashtra 411001',
    imageUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    listedBy: 'Pune Elite Realty',
    createdAt: '2024-02-20',
    features: ['Private Garden', 'Swimming Pool', 'Home Theater', 'Wine Cellar', 'Security'],
    propertyType: 'villa',
  },
  {
    id: '10',
    title: 'IT Park Apartment in Hinjewadi',
    description: 'Modern 2BHK apartment near major IT parks in Hinjewadi. Ideal for young professionals with excellent connectivity and amenities.',
    price: 8500000,
    city: 'Pune',
    address: '321 Hinjewadi Phase 2, Pune, Maharashtra 411057',
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    listedBy: 'Pune Elite Realty',
    createdAt: '2024-02-22',
    features: ['IT Park Access', 'Metro Station', 'Gym', 'Food Court', 'Security'],
    propertyType: 'apartment',
  },
];

export const mockOffers = [
  {
    id: '1',
    userId: '1',
    propertyId: '1',
    amount: 8200000,
    message: 'I am very interested in this property. Would like to schedule a viewing.',
    status: 'PENDING',
    createdAt: '2024-02-15',
  },
  {
    id: '2',
    userId: '1',
    propertyId: '3',
    amount: 14500000,
    message: 'Offering slightly below asking price. Can close quickly.',
    status: 'ACCEPTED',
    createdAt: '2024-02-12',
  },
];

// Helper functions
export const getPropertiesByCity = (city) => {
  return mockProperties.filter(property => 
    property.city.toLowerCase() === city.toLowerCase()
  );
};

export const getPropertyById = (id) => {
  return mockProperties.find(property => property.id === id);
};

export const getFeaturedProperties = () => {
  return mockProperties.slice(0, 3);
};

export const searchProperties = (filters) => {
  return mockProperties.filter(property => {
    if (filters.city && property.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms !== filters.bedrooms) {
      return false;
    }
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    return true;
  });
};

export const getOffersByUserId = (userId) => {
  return mockOffers
    .filter(offer => offer.userId === userId)
    .map(offer => ({
      ...offer,
      property: getPropertyById(offer.propertyId),
    }));
};
