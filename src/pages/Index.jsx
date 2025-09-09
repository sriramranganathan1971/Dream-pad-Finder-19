import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PropertyCard from '@/components/PropertyCard';
import CityCard from '@/components/CityCard';
import Navbar from '@/components/Navbar';
import { getFeaturedProperties, cities } from '@/data/mockData';
import { Search, Home, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredProperties = getFeaturedProperties();
  
  const cityImages = {
    Chennai: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
    Bengaluru: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    Hyderabad: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop',
    Mumbai: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&h=400&fit=crop',
    Delhi: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&h=400&fit=crop',
    Pune: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
  };

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect property with our advanced search filters and recommendations.',
    },
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties are verified and authenticated for your peace of mind.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Get guidance from our real estate experts throughout your journey.',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Access real-time market data and trends to make informed decisions.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in-up">
            Discover the perfect property that matches your lifestyle and budget. 
            From luxury apartments to cozy homes, we have it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Link to="/search">
              <Button className="hero-button">
                <Search className="w-5 h-5 mr-2" />
                Start Your Search
              </Button>
            </Link>
            <Link to="/properties/chennai">
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked properties that offer the best value and location
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                className="animate-fade-in hover-lift"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/search">
              <Button className="btn-primary">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Properties by City
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing properties in top cities across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.slice(0, 6).map((city) => (
              <CityCard 
                key={city} 
                city={city} 
                image={cityImages[city]}
                className="animate-fade-in hover-lift"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RealEstate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the best real estate experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift hover-glow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers who found their dream properties with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="hero-button">
                Get Started Today
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="w-6 h-6" />
                <span className="text-xl font-bold">RealEstate</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Your trusted partner in finding the perfect property. 
                Making real estate dreams come true since 2024.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/search" className="hover:text-white transition-colors">Search Properties</Link></li>
                <li><Link to="/properties/chennai" className="hover:text-white transition-colors">Chennai</Link></li>
                <li><Link to="/properties/bengaluru" className="hover:text-white transition-colors">Bengaluru</Link></li>
                <li><Link to="/properties/hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>📧 support@realestate.com</p>
                <p>📞 +91 1234 567 890</p>
                <p>📍 Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 RealEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;