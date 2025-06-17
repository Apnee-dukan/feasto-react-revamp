
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationPickerProps {
  onLocationSelect: (location: string) => void;
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Using a reverse geocoding service (you might want to use Google Maps API)
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const address = `${data.locality}, ${data.principalSubdivision}`;
            setCurrentLocation(address);
            onLocationSelect(address);
            toast({
              title: "Location detected",
              description: `Current location: ${address}`,
            });
          } catch (error) {
            console.error('Error getting location:', error);
            toast({
              title: "Location error",
              description: "Could not get your current location",
              variant: "destructive",
            });
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location access denied",
            description: "Please enable location access or enter manually",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <MapPin className="text-orange-600" size={16} />
      <span className="text-sm text-gray-600">
        {currentLocation || 'Select your location'}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="text-orange-600 hover:text-orange-700"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          'Detect'
        )}
      </Button>
    </div>
  );
};

export default LocationPicker;
