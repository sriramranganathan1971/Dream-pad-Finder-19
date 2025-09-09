import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PropertyImage } from '@/components/SmartImage';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property, className = '' }) => {
  const formatPrice = (price) => {
    const crores = price / 10000000;
    const lakhs = price / 100000;
    
    if (crores >= 1) {
      return `₹${crores.toFixed(1)} Cr`;
    } else {
      return `₹${lakhs.toFixed(1)} L`;
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="block">
      <Card className={`property-card group ${className}`}>
        <div className="relative overflow-hidden">
          <PropertyImage
            src={property.imageUrls[0]}
            alt={property.title}
            propertyType={property.propertyType}
            className="property-card-image"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {property.propertyType}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-success text-success-foreground">
              {formatPrice(property.price)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{property.address}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {property.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{property.bedrooms} Bed</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{property.bathrooms} Bath</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{property.area.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">Listed by {property.listedBy}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;