import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { PropertyImage } from '@/components/SmartImage';
import { fetchPropertyById } from '@/services/propertyService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Bed, Bath, Square, ArrowLeft } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        console.warn('PropertyDetail: No ID provided');
        return;
      }
      
      console.log('PropertyDetail: Loading property with ID:', id);
      setIsLoading(true);
      try {
        const foundProperty = await fetchPropertyById(id);
        console.log('PropertyDetail: Received property data:', foundProperty);
        setProperty(foundProperty || null);
      } catch (error) {
        console.error('PropertyDetail: Error loading property:', error);
        toast({
          title: 'Error',
          description: 'Failed to load property details. Please try again.',
          variant: 'destructive',
        });
        setProperty(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [id, toast]);

  const formatPrice = (price) => {
    const crores = price / 10000000;
    if (crores >= 1) {
      return `₹${crores.toFixed(2)} Crores`;
    } else {
      const lakhs = price / 100000;
      return `₹${lakhs.toFixed(2)} Lakhs`;
    }
  };

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to make an offer on this property.',
        variant: 'destructive',
      });
      navigate('/signin');
      return;
    }
    navigate(`/offer/${property?.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Link to="/">
              <Button className="btn-primary">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to={`/properties/${property?.city?.toLowerCase() || 'all'}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Button>
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="h-96 rounded-xl overflow-hidden">
            <PropertyImage
              src={property?.imageUrls?.[currentImageIndex]}
              alt={property?.title || 'Property'}
              propertyType={property?.propertyType}
              className="w-full h-full"
            />
          </div>
          
          {property?.imageUrls?.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {property?.imageUrls?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-border'
                  }`}
                >
                  <PropertyImage
                    src={image}
                    alt={`View ${index + 1}`}
                    propertyType={property?.propertyType}
                    className="w-full h-full"
                    showLoader={false}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {property?.title || 'Property Title'}
              </h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property?.address || 'Address not available'}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {property?.propertyType || 'Property'}
                </Badge>
                <div className="text-3xl font-bold text-primary">
                  {property?.price ? formatPrice(property.price) : 'Price not available'}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property?.bedrooms || 0}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property?.bathrooms || 0}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property?.area?.toLocaleString() || 0}</div>
                  <div className="text-sm text-muted-foreground">Sq Ft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property?.description || 'No description available.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Make Offer Card */}
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit an offer and the agent will get back to you soon.
                </p>
                <Button 
                  onClick={handleMakeOffer}
                  className="w-full btn-accent"
                  size="lg"
                >
                  Make an Offer
                </Button>
                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    You'll need to sign in to make an offer
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;