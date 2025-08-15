import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Calendar, Fish, Star } from "lucide-react";

interface Angler {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  distance: number;
  experience: string;
  fishingStyle: string;
  interests: string[];
  availability: string;
  rating: number;
  totalCatches: number;
}

interface MatchingInterfaceProps {
  currentUser: any;
  onMatch: (anglerId: string) => void;
  onPass: (anglerId: string) => void;
}

const MatchingInterface = ({ currentUser, onMatch, onPass }: MatchingInterfaceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mock data for potential matches
  const potentialMatches: Angler[] = [
    {
      id: "1",
      name: "Mike Johnson",
      age: 34,
      bio: "Love early morning bass fishing and sharing techniques. Looking for a regular fishing buddy who enjoys peaceful mornings on the water.",
      location: "Lake Michigan",
      distance: 2.3,
      experience: "experienced",
      fishingStyle: "serious",
      interests: ["Bass Fishing", "Boat Fishing", "Freshwater"],
      availability: "Tomorrow, 6:00 AM",
      rating: 4.8,
      totalCatches: 127
    },
    {
      id: "2", 
      name: "Sarah Chen",
      age: 28,
      bio: "Fly fishing enthusiast who loves exploring new streams and rivers. Always excited to learn new techniques!",
      location: "Colorado River",
      distance: 5.1,
      experience: "intermediate",
      fishingStyle: "casual",
      interests: ["Fly Fishing", "Trout", "Shore Fishing"],
      availability: "This Weekend",
      rating: 4.6,
      totalCatches: 89
    },
    {
      id: "3",
      name: "David Rodriguez",
      age: 42,
      bio: "Tournament angler looking for serious fishing partners. I know all the best spots around here!",
      location: "Tampa Bay",
      distance: 1.8,
      experience: "expert",
      fishingStyle: "competitive",
      interests: ["Saltwater", "Deep Sea", "Boat Fishing"],
      availability: "Next Tuesday, 5:30 AM",
      rating: 4.9,
      totalCatches: 203
    }
  ];

  const currentAngler = potentialMatches[currentIndex];

  const handleLike = () => {
    if (currentAngler) {
      onMatch(currentAngler.id);
      nextAngler();
    }
  };

  const handlePass = () => {
    if (currentAngler) {
      onPass(currentAngler.id);
      nextAngler();
    }
  };

  const nextAngler = () => {
    setCurrentIndex(prev => (prev + 1) % potentialMatches.length);
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-blue-100 text-blue-800";
      case "experienced": return "bg-purple-100 text-purple-800";
      case "expert": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!currentAngler) {
    return (
      <div className="text-center py-12">
        <Fish className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No more anglers nearby</h3>
        <p className="text-muted-foreground">Try expanding your search radius or check back later!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="h-48 bg-gradient-hero relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold">{currentAngler.name}, {currentAngler.age}</h2>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{currentAngler.distance} miles away</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{currentAngler.rating}</span>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">{currentAngler.bio}</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Experience</span>
              <Badge className={getExperienceColor(currentAngler.experience)}>
                {currentAngler.experience}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Style</span>
              <Badge variant="outline">{currentAngler.fishingStyle}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Catches</span>
              <span className="font-medium">{currentAngler.totalCatches}</span>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground mb-2 block">Interests</span>
            <div className="flex flex-wrap gap-1">
              {currentAngler.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-accent/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">Available: {currentAngler.availability}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{currentAngler.location}</span>
            </div>
          </div>
        </CardContent>

        <div className="p-6 pt-0">
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-12 border-2 hover:border-red-300 hover:bg-red-50"
              onClick={handlePass}
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            <Button
              variant="ocean"
              size="lg"
              className="flex-1 h-12"
              onClick={handleLike}
            >
              <Heart className="w-6 h-6" />
              Match
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} of {potentialMatches.length} anglers
      </div>
    </div>
  );
};

export default MatchingInterface;