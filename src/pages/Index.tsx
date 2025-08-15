import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fish, Users, MapPin, Calendar, Heart, Trophy, Settings } from "lucide-react";
import { toast } from "sonner";

import ProfileSetup from "@/components/ProfileSetup";
import LocationPicker from "@/components/LocationPicker";
import DateTimePicker from "@/components/DateTimePicker";
import MatchingInterface from "@/components/MatchingInterface";
import heroImage from "@/assets/hero-fishing.jpg";

type AppStep = 'welcome' | 'profile' | 'location' | 'datetime' | 'matching';

interface UserProfile {
  name: string;
  bio: string;
  fishingStyle: string;
  experience: string;
  location: string;
  interests: string[];
}

interface LocationData {
  address: string;
  radius: number;
  coordinates?: [number, number];
}

interface AvailabilityData {
  dates: string[];
  timeSlots: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep('location');
    toast.success("Profile created! Now let's set your location.");
  };

  const handleLocationSet = (location: LocationData) => {
    setLocationData(location);
    setCurrentStep('datetime');
    toast.success("Location set! When are you available to fish?");
  };

  const handleAvailabilitySet = (availability: AvailabilityData) => {
    setAvailabilityData(availability);
    setCurrentStep('matching');
    toast.success("Perfect! Let's find your fishing buddies.");
  };

  const handleMatch = (anglerId: string) => {
    setMatches(prev => [...prev, anglerId]);
    toast.success("It's a match! 🎣", {
      description: "You both want to fish together!"
    });
  };

  const handlePass = (anglerId: string) => {
    // Just log the pass for now
    console.log("Passed on angler:", anglerId);
  };

  const renderWelcomeScreen = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Peaceful fishing scene at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto text-white">
          <Fish className="w-20 h-20 mx-auto mb-6 text-white drop-shadow-lg" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Angler Match
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow text-white/90 leading-relaxed">
            Connect with fellow anglers in your area. Find fishing buddies who share your passion for the perfect catch.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Location Matching</h3>
                <p className="text-sm text-white/80">Find anglers within your preferred radius</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Time Sync</h3>
                <p className="text-sm text-white/80">Match with anglers available when you are</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Perfect Partners</h3>
                <p className="text-sm text-white/80">Connect with like-minded fishing enthusiasts</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            variant="hero" 
            size="lg"
            onClick={() => setCurrentStep('profile')}
            className="text-xl px-12 py-4 shadow-2xl hover:shadow-3xl"
          >
            Start Fishing Together
          </Button>
          
          <div className="mt-8 flex justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>1,247 matches made</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Active anglers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'profile':
        return (
          <div className="min-h-screen bg-background py-8">
            <ProfileSetup onComplete={handleProfileComplete} />
          </div>
        );
      case 'location':
        return (
          <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
              <LocationPicker onLocationSet={handleLocationSet} />
            </div>
          </div>
        );
      case 'datetime':
        return (
          <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
              <DateTimePicker onAvailabilitySet={handleAvailabilitySet} />
            </div>
          </div>
        );
      case 'matching':
        return (
          <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Find Your Fishing Buddy</h1>
                <p className="text-muted-foreground mb-4">
                  Swipe through anglers who match your location and schedule
                </p>
                {matches.length > 0 && (
                  <Badge variant="default" className="text-sm">
                    {matches.length} matches found!
                  </Badge>
                )}
              </div>
              <MatchingInterface 
                currentUser={userProfile}
                onMatch={handleMatch}
                onPass={handlePass}
              />
            </div>
          </div>
        );
      default:
        return renderWelcomeScreen();
    }
  };

  return renderCurrentStep();
};

export default Index;
