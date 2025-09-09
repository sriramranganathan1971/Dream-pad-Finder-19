import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { PropertyImage } from "@/components/SmartImage";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Eye, Search, Calendar, IndianRupee } from "lucide-react";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAuth();

  useEffect(() => {
  const fetchOffers = async () => {
      try {
        console.log('Fetching user offers...');
        const res = await authFetch("/api/offers/my");
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch offers (${res.status})`);
        }
        
        const data = await res.json();
        console.log('Fetched offers:', data);
        setOffers(data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [authFetch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="border-warning text-warning">
            Pending
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="border-success text-success">
            Accepted
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="border-destructive text-destructive"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatPrice = (price) => {
    const crores = price / 10000000;
    if (crores >= 1) {
      return `₹${crores.toFixed(2)} Cr`;
    } else {
      const lakhs = price / 100000;
      return `₹${lakhs.toFixed(2)} L`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading your offers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          My Offers
        </h1>

        {offers.length > 0 ? (
          <div className="space-y-6">
            {offers.map((offer) => (
              <Card
                key={offer._id}
                className="hover-lift hover-glow transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Property image */}
                    <div className="relative">
                      <PropertyImage
                        src={offer.property?.imageUrls?.[0]}
                        alt={offer.property?.title || 'Property'}
                        propertyType={offer.property?.propertyType}
                        className="w-full h-32 rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(offer.status)}
                      </div>
                    </div>

                    {/* Offer details */}
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">
                        {offer.property?.title ||
                          "Property Title Not Available"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {offer.property?.address || "Address not available"}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Your Offer:
                          </span>
                          <span className="font-semibold text-primary">
                            {formatPrice(offer.amount)}
                          </span>
                        </div>
                        {offer.property?.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Listed Price:
                            </span>
                            <span className="text-sm">
                              {formatPrice(offer.property.price)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                          <Calendar className="w-3 h-3" />
                          {new Date(offer.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        {offer.message && (
                          <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                            <span className="text-muted-foreground">Message: </span>
                            {offer.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="space-y-4">
                      {offer.property && (
                        <Link to={`/property/${offer.property.propertyId || offer.property._id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Property
                          </Button>
                        </Link>
                      )}
                      <div className="text-xs text-center text-muted-foreground">
                        Offer #{offer._id?.slice(-6).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Offers Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't made any offers on properties yet.
            </p>
            <Link to="/search">
              <Button className="btn-primary">
                <Search className="w-4 h-4 mr-2" />
                Search Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOffers;
