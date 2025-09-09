import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import { searchProperties, cities } from '@/data/mockData';
import { Search as SearchIcon, Filter, MapPin, IndianRupee, Bed, Home } from 'lucide-react';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      city: 'all',
      minPrice: 0,
      maxPrice: 50000000,
      bedrooms: 0,
      propertyType: 'all',
    },
  });

  const watchedFilters = watch();

  const propertyTypes = ['apartment', 'house', 'villa', 'penthouse'];

  const onSubmit = async (data) => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate search delay
    setTimeout(() => {
      const filters = {};
      
      if (data.city && data.city !== 'all') filters.city = data.city;
      if (data.minPrice > 0) filters.minPrice = data.minPrice;
      if (data.maxPrice < 50000000) filters.maxPrice = data.maxPrice;
      if (data.bedrooms > 0) filters.bedrooms = data.bedrooms;
      if (data.propertyType && data.propertyType !== 'all') filters.propertyType = data.propertyType;
      
      const results = searchProperties(filters);
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const formatPrice = (price) => {
    const crores = price / 10000000;
    const lakhs = price / 100000;
    
    if (crores >= 1) {
      return `₹${crores.toFixed(1)} Cr`;
    } else {
      return `₹${lakhs.toFixed(1)} L`;
    }
  };

  const clearFilters = () => {
    setValue('city', 'all');
    setValue('minPrice', 0);
    setValue('maxPrice', 50000000);
    setValue('bedrooms', 0);
    setValue('propertyType', 'all');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced Property Search
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect property with our powerful search filters. 
            Narrow down by location, price, size, and more.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Select onValueChange={(value) => setValue('city', value)} defaultValue="all">
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Select onValueChange={(value) => setValue('propertyType', value)} defaultValue="all">
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Property type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="all">All Types</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Select onValueChange={(value) => setValue('bedrooms', parseInt(value))} defaultValue="0">
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Any bedrooms" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="0">Any</SelectItem>
                        <SelectItem value="1">1+ Bedroom</SelectItem>
                        <SelectItem value="2">2+ Bedrooms</SelectItem>
                        <SelectItem value="3">3+ Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Min Price */}
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Minimum Price</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="Min price"
                      className="pl-10"
                      {...register('minPrice', { valueAsNumber: true })}
                    />
                  </div>
                  {watchedFilters.minPrice > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(watchedFilters.minPrice)}
                    </p>
                  )}
                </div>

                {/* Max Price */}
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Maximum Price</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="Max price"
                      className="pl-10"
                      {...register('maxPrice', { valueAsNumber: true })}
                    />
                  </div>
                  {watchedFilters.maxPrice < 50000000 && (
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(watchedFilters.maxPrice)}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    'Searching...'
                  ) : (
                    <>
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Search Properties
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="sm:w-auto"
                >
                  Clear Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching for properties...</p>
          </div>
        )}

        {hasSearched && !isSearching && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Search Results ({searchResults.length} properties found)
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    className="animate-fade-in hover-lift"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any properties matching your criteria. 
                  Try adjusting your filters or search in a different area.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters & Try Again
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Quick Search Suggestions */}
        {!hasSearched && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Popular Searches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Apartments in Chennai', filters: { city: 'chennai', propertyType: 'apartment' } },
                { label: 'Villas in Bengaluru', filters: { city: 'bengaluru', propertyType: 'villa' } },
                { label: 'Properties under ₹1 Cr', filters: { maxPrice: 10000000 } },
                { label: '3+ Bedroom Properties', filters: { bedrooms: 3 } },
                { label: 'Luxury Penthouses', filters: { propertyType: 'penthouse' } },
                { label: 'Houses in Hyderabad', filters: { city: 'hyderabad', propertyType: 'house' } },
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => {
                    Object.entries(suggestion.filters).forEach(([key, value]) => {
                      if (key === 'city' || key === 'propertyType') {
                        setValue(key, value);
                      } else {
                        setValue(key, value);
                      }
                    });
                    handleSubmit(onSubmit)();
                  }}
                >
                  <div>
                    <div className="font-medium">{suggestion.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Click to search
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;