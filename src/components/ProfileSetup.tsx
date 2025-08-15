import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Fish, MapPin, Calendar, Users } from "lucide-react";

interface ProfileData {
  name: string;
  bio: string;
  fishingStyle: string;
  experience: string;
  location: string;
  interests: string[];
}

interface ProfileSetupProps {
  onComplete: (profile: ProfileData) => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    bio: "",
    fishingStyle: "",
    experience: "",
    location: "",
    interests: []
  });

  const fishingInterests = [
    "Bass Fishing", "Fly Fishing", "Ice Fishing", "Deep Sea", 
    "Saltwater", "Freshwater", "Trout", "Salmon", "Shore Fishing", "Boat Fishing"
  ];

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    if (profile.name && profile.location && profile.fishingStyle && profile.experience) {
      onComplete(profile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <Fish className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Complete Your Angler Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Help other anglers find the perfect fishing buddy
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your fishing name"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State or Zip Code"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell other anglers about yourself..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fish className="w-5 h-5" />
            Fishing Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fishingStyle">Preferred Fishing Style</Label>
            <Select onValueChange={(value) => setProfile(prev => ({ ...prev, fishingStyle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual/Recreational</SelectItem>
                <SelectItem value="serious">Serious Sport Fishing</SelectItem>
                <SelectItem value="competitive">Tournament/Competitive</SelectItem>
                <SelectItem value="photography">Catch & Release/Photography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience">Experience Level</Label>
            <Select onValueChange={(value) => setProfile(prev => ({ ...prev, experience: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Fishing Interests</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {fishingInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={profile.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit} 
        variant="hero" 
        size="lg" 
        className="w-full"
        disabled={!profile.name || !profile.location || !profile.fishingStyle || !profile.experience}
      >
        Complete Profile & Start Matching
      </Button>
    </div>
  );
};

export default ProfileSetup;