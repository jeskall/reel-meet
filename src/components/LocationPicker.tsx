import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Navigation, Search } from "lucide-react";

interface LocationPickerProps {
  onLocationSet: (location: { address: string; radius: number; coordinates?: [number, number] }) => void;
  initialRadius?: number;
}

const LocationPicker = ({ onLocationSet, initialRadius = 25 }: LocationPickerProps) => {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState([initialRadius]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode these coordinates
          setAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setIsLoading(false);
          onLocationSet({
            address: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            radius: radius[0],
            coordinates: [latitude, longitude]
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          // Handle error - could show a toast here
        }
      );
    } else {
      setIsLoading(false);
      // Handle no geolocation support
    }
  };

  const handleManualLocation = () => {
    if (address.trim()) {
      onLocationSet({
        address: address.trim(),
        radius: radius[0]
      });
    }
  };

  const popularLocations = [
    "Lake Michigan, Chicago",
    "Tampa Bay, Florida", 
    "Colorado River, Colorado",
    "Chesapeake Bay, Maryland",
    "Lake Tahoe, California",
    "Thousand Islands, New York"
  ];

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Where do you want to fish?</h2>
        <p className="text-muted-foreground">
          Set your location and preferred search radius
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Location Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
          >
            <Navigation className="w-4 h-4 mr-2" />
            {isLoading ? "Getting location..." : "Use Current Location"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Manual Location Input */}
          <div className="space-y-2">
            <Label htmlFor="address">Enter Location</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, State or Zip Code"
                className="pl-10"
              />
            </div>
          </div>

          {/* Popular Locations */}
          <div className="space-y-2">
            <Label>Popular Fishing Locations</Label>
            <div className="grid grid-cols-1 gap-2">
              {popularLocations.map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  className="justify-start text-left h-auto py-2"
                  onClick={() => setAddress(location)}
                >
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Radius Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Search Radius</Label>
              <span className="text-sm font-medium text-primary">
                {radius[0]} miles
              </span>
            </div>
            <Slider
              value={radius}
              onValueChange={setRadius}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 mile</span>
              <span>100 miles</span>
            </div>
          </div>

          <Button
            variant="ocean"
            className="w-full"
            onClick={handleManualLocation}
            disabled={!address.trim()}
          >
            Set Fishing Location
          </Button>
        </CardContent>
      </Card>

      {address && (
        <Card className="bg-accent/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Current Selection</p>
                <p className="text-sm text-muted-foreground">{address}</p>
                <p className="text-sm text-muted-foreground">
                  Within {radius[0]} miles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationPicker;