import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyImage } from './SmartImage';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

const ImageTester = ({ images = [], title = "Image Test" }) => {
  const [imageStatuses, setImageStatuses] = useState({});
  const [isTestingAll, setIsTestingAll] = useState(false);

  const testImage = async (url, index) => {
    if (!url) {
      setImageStatuses(prev => ({
        ...prev,
        [index]: { status: 'error', error: 'No URL provided', loadTime: 0 }
      }));
      return;
    }

    setImageStatuses(prev => ({
      ...prev,
      [index]: { status: 'loading', error: null, loadTime: 0 }
    }));

    const startTime = Date.now();
    
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const imagePromise = new Promise((resolve, reject) => {
        img.onload = () => {
          const loadTime = Date.now() - startTime;
          resolve({ 
            status: 'success', 
            error: null, 
            loadTime,
            dimensions: { width: img.naturalWidth, height: img.naturalHeight }
          });
        };
        
        img.onerror = () => {
          const loadTime = Date.now() - startTime;
          reject({ 
            status: 'error', 
            error: 'Failed to load image', 
            loadTime 
          });
        };
      });

      // Set timeout for slow images
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject({ 
            status: 'error', 
            error: 'Timeout (>10s)', 
            loadTime: 10000 
          });
        }, 10000);
      });

      img.src = url;
      
      const result = await Promise.race([imagePromise, timeoutPromise]);
      
      setImageStatuses(prev => ({
        ...prev,
        [index]: result
      }));
      
    } catch (error) {
      setImageStatuses(prev => ({
        ...prev,
        [index]: error
      }));
    }
  };

  const testAllImages = async () => {
    setIsTestingAll(true);
    setImageStatuses({});
    
    const promises = images.map((url, index) => testImage(url, index));
    await Promise.all(promises);
    
    setIsTestingAll(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'loading':
        return <Clock className="w-4 h-4 text-yellow-600 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status, error) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="text-green-600 border-green-600">Success</Badge>;
      case 'error':
        return <Badge variant="outline" className="text-red-600 border-red-600">{error || 'Error'}</Badge>;
      case 'loading':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Loading...</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-400 border-gray-400">Not tested</Badge>;
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      testAllImages();
    }
  }, [images]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {title}
          <Badge variant="secondary">{images.length} images</Badge>
        </CardTitle>
        <Button 
          onClick={testAllImages} 
          disabled={isTestingAll}
          size="sm"
          variant="outline"
        >
          {isTestingAll ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Test All
            </>
          )}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {images.map((url, index) => {
          const status = imageStatuses[index];
          
          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                {/* Image preview */}
                <div className="flex-shrink-0">
                  <PropertyImage
                    src={url}
                    alt={`Test image ${index + 1}`}
                    className="w-24 h-16 rounded border"
                  />
                </div>
                
                {/* Image details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(status?.status)}
                    <span className="font-medium">Image {index + 1}</span>
                    {getStatusBadge(status?.status, status?.error)}
                  </div>
                  
                  <div className="text-sm text-muted-foreground break-all mb-2">
                    {url || 'No URL'}
                  </div>
                  
                  {status && (
                    <div className="text-xs space-y-1">
                      <div>Load time: {status.loadTime}ms</div>
                      {status.dimensions && (
                        <div>Dimensions: {status.dimensions.width}×{status.dimensions.height}</div>
                      )}
                      {status.error && (
                        <div className="text-red-600">Error: {status.error}</div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Test individual button */}
                <Button
                  onClick={() => testImage(url, index)}
                  disabled={status?.status === 'loading'}
                  size="sm"
                  variant="ghost"
                >
                  {status?.status === 'loading' ? 'Testing...' : 'Test'}
                </Button>
              </div>
            </div>
          );
        })}
        
        {images.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No images to test
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageTester;
