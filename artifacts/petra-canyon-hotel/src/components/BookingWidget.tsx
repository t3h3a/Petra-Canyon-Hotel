import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { CalendarIcon, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/components/LanguageProvider";

export function BookingWidget() {
  const { t } = useLanguage();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;
    
    const checkInStr = format(checkIn, 'yyyy-MM-dd');
    const checkOutStr = format(checkOut, 'yyyy-MM-dd');
    
    const url = `https://www.booking.com/hotel/jo/petra-canyon.en-gb.html?checkin=${checkInStr}&checkout=${checkOutStr}&group_adults=${adults}&group_children=${children}&no_rooms=1`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-background/95 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-xl max-w-5xl w-full mx-auto border border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Check In */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">{t.booking.checkIn}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!checkIn && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : <span>{t.booking.checkIn}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check Out */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">{t.booking.checkOut}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!checkOut && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : <span>{t.booking.checkOut}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => (checkIn ? date <= checkIn : false)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Adults */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">{t.booking.adults}</label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <select 
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            >
              {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">{t.booking.children}</label>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <select 
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            >
              {Array.from({length: 6}, (_, i) => i).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-lg transition-all"
          onClick={handleSearch}
          disabled={!checkIn || !checkOut}
        >
          {t.booking.search}
        </Button>
      </div>
    </div>
  );
}
