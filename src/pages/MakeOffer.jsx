import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import { PropertyImage } from '@/components/SmartImage';
import { fetchPropertyById } from '@/services/propertyService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, IndianRupee, Send } from 'lucide-react';

const offerSchema = z.object({
  amount: z.number().min(1000000, 'Offer amount must be at least ₹10 lakhs'),
  message: z.string().min(10, 'Please provide a message with at least 10 characters'),
});

const MakeOffer = () => {
  const { id } = useParams(); // ✅ changed propertyId → id
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authFetch, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
  });

  // Fetch property details
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPropertyById(id);
        
        if (!data) {
          throw new Error(`Property with ID ${id} not found`);
        }
        
        setProperty(data);
        setValue('amount', 0);
        setIsLoading(false);
      } catch (err) {
        console.error('fetchProperty error:', err);
        toast({
          title: 'Error',
          description: err.message || 'Failed to load property details. Please try again.',
          variant: 'destructive',
        });
        setProperty(null);
        setIsLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id, isAuthenticated, navigate, setValue, toast, authFetch]);

  // Submit offer
  const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    // Debug logging
    console.log('🚀 Submitting offer...');
    console.log('Property ID:', id);
    console.log('Property data:', property);
    console.log('Form data:', data);
    console.log('User authenticated:', isAuthenticated);
    
    // Check if user is still authenticated
    const token = localStorage.getItem('auth_token');
    console.log('Token exists:', !!token);
    if (token) {
      console.log('Token preview:', token.substring(0, 20) + '...');
    }
    
    const requestBody = {
      property: property._id || id, // Use MongoDB ObjectId if available, otherwise use id
      amount: data.amount,
      message: data.message,
    };
    
    console.log('Request body:', requestBody);
    
    const res = await authFetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      console.error('❌ Request failed with status:', res.status);
      let errMsg = `Failed to submit offer (status ${res.status})`;
      let errorDetails = null;
      
      try {
        const errBody = await res.json();
        console.error('Error response body:', errBody);
        errorDetails = errBody;
        if (errBody?.message) errMsg = errBody.message;
        if (errBody?.error) errMsg = errBody.error;
      } catch (e) {
        console.error('Could not parse error response as JSON');
        const textResponse = await res.text();
        console.error('Raw error response:', textResponse);
        errMsg += `: ${textResponse}`;
      }
      
      throw new Error(errMsg);
    }

    const successData = await res.json();
    console.log('✅ Offer submitted successfully:', successData);
    
    toast({
      title: 'Offer Submitted Successfully!',
      description: 'Your offer has been sent to the property agent.',
    });
    navigate('/profile/offers');
  } catch (error) {
    console.error('submit offer error:', error);
    toast({
      title: 'Error',
      description: error?.message || 'Failed to submit offer. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};


  if (isLoading || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to={`/property/${id}`}>
          <Button variant="ghost" size="sm" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Property
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Make an Offer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertyImage
                src={property?.imageUrls?.[0]}
                alt={property?.title || 'Property'}
                propertyType={property?.propertyType}
                className="w-full h-48 rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg">{property.title}</h3>
              <p className="text-muted-foreground text-sm">{property.address}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Your Offer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Offer Amount</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter your offer amount"
                      className="pl-10"
                      {...register('amount', { valueAsNumber: true })}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message to Agent</Label>
                  <Textarea
                    id="message"
                    placeholder="Explain your offer, timeline, or any special conditions..."
                    rows={4}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full btn-accent"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Offer...' : 'Submit Offer'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;
