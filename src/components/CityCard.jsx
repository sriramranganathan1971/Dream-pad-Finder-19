import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyImage } from '@/components/SmartImage';
import { getPropertiesByCity } from '@/data/mockData';
import { MapPin, Building } from 'lucide-react';

const CityCard = ({ city, image, className = '' }) => {
  const propertyCount = getPropertiesByCity(city).length;
  
  return (
    <Link to={`/properties/${city.toLowerCase()}`} className="block">
      <Card className={`city-card group ${className}`}>
        <div className="relative overflow-hidden h-48">
          <PropertyImage
            src={image}
            alt={city}
            propertyType="city"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold mb-1">{city}</h3>
            <div className="flex items-center text-sm opacity-90">
              <Building className="w-4 h-4 mr-1" />
              <span>{propertyCount} Properties</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Explore {city}</span>
            </div>
            <div className="text-sm font-medium text-primary">
              View All →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CityCard;