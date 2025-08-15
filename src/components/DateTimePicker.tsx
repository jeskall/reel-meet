import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Sunrise, Sun, Sunset, Moon } from "lucide-react";

interface TimeSlot {
  id: string;
  label: string;
  time: string;
  icon: React.ReactNode;
  description: string;
}

interface DateTimePickerProps {
  onAvailabilitySet: (availability: { dates: string[]; timeSlots: string[] }) => void;
}

const DateTimePicker = ({ onAvailabilitySet }: DateTimePickerProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const timeSlots: TimeSlot[] = [
    {
      id: "early-morning",
      label: "Early Morning",
      time: "5:00 AM - 8:00 AM",
      icon: <Sunrise className="w-4 h-4" />,
      description: "Best for bass and trout"
    },
    {
      id: "morning",
      label: "Morning", 
      time: "8:00 AM - 12:00 PM",
      icon: <Sun className="w-4 h-4" />,
      description: "Great for most fish"
    },
    {
      id: "afternoon",
      label: "Afternoon",
      time: "12:00 PM - 5:00 PM", 
      icon: <Sun className="w-4 h-4" />,
      description: "Warmer water fishing"
    },
    {
      id: "evening",
      label: "Evening",
      time: "5:00 PM - 8:00 PM",
      icon: <Sunset className="w-4 h-4" />,
      description: "Perfect for sunset fishing"
    },
    {
      id: "night",
      label: "Night",
      time: "8:00 PM - 11:00 PM",
      icon: <Moon className="w-4 h-4" />,
      description: "Night fishing adventures"
    }
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        dateString: date.toISOString().split('T')[0],
        display: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  const availableDates = generateDates();

  const toggleDate = (dateString: string) => {
    setSelectedDates(prev => 
      prev.includes(dateString)
        ? prev.filter(d => d !== dateString)
        : [...prev, dateString]
    );
  };

  const toggleTimeSlot = (slotId: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(slotId)
        ? prev.filter(s => s !== slotId)
        : [...prev, slotId]  
    );
  };

  const handleSubmit = () => {
    if (selectedDates.length > 0 && selectedTimeSlots.length > 0) {
      onAvailabilitySet({
        dates: selectedDates,
        timeSlots: selectedTimeSlots
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">When are you available?</h2>
        <p className="text-muted-foreground">
          Select your preferred dates and times for fishing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Available Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableDates.map((date) => (
              <Button
                key={date.dateString}
                variant={selectedDates.includes(date.dateString) ? "default" : "outline"}
                className="h-auto py-3 flex flex-col gap-1"
                onClick={() => toggleDate(date.dateString)}
              >
                <span className="font-medium">{date.display}</span>
                <span className="text-xs opacity-75">
                  {new Date(date.dateString).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                </span>
              </Button>
            ))}
          </div>
          {selectedDates.length > 0 && (
            <div className="mt-4 p-3 bg-accent/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Selected dates:</p>
              <div className="flex flex-wrap gap-1">
                {selectedDates.map(dateString => {
                  const dateObj = availableDates.find(d => d.dateString === dateString);
                  return (
                    <Badge key={dateString} variant="secondary">
                      {dateObj?.display}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Preferred Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedTimeSlots.includes(slot.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-accent/50'
                }`}
                onClick={() => toggleTimeSlot(slot.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      {slot.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{slot.label}</h3>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{slot.description}</p>
                    {selectedTimeSlots.includes(slot.id) && (
                      <Badge className="mt-1">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedTimeSlots.length > 0 && (
            <div className="mt-4 p-3 bg-accent/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Selected times:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTimeSlots.map(slotId => {
                  const slot = timeSlots.find(s => s.id === slotId);
                  return (
                    <Badge key={slotId} variant="secondary">
                      {slot?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        variant="ocean"
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={selectedDates.length === 0 || selectedTimeSlots.length === 0}
      >
        Set Availability & Find Matches
      </Button>

      {(selectedDates.length === 0 || selectedTimeSlots.length === 0) && (
        <p className="text-center text-sm text-muted-foreground">
          Please select at least one date and one time slot
        </p>
      )}
    </div>
  );
};

export default DateTimePicker;