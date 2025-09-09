import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import { getPropertiesByCity } from '@/data/mockData';
import { MapPin, ArrowLeft } from 'lucide-react';

const Properties = () => {
  const { city } = useParams();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      setTimeout(() => {
        const cityProperties = getPropertiesByCity(city);
        setProperties(cityProperties);
        setIsLoading(false);
      }, 500);
    }
  }, [city]);

  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading properties...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Properties in {cityName}
          </h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{properties.length} properties found</span>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                className="animate-fade-in hover-lift"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any properties in {cityName}.
            </p>
            <Link to="/">
              <Button className="btn-primary">Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;