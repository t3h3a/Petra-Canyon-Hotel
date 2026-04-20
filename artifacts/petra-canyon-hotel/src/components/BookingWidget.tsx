import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, ChevronUp, User, Users } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

function CounterField({
  label,
  value,
  min,
  max,
  icon,
  mobile = false,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  icon: React.ReactNode;
  mobile?: boolean;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  React.useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commitDraft = (nextValue: string) => {
    const normalized = Math.max(min, Math.min(max, Number(nextValue) || min));
    onChange(normalized);
    setDraft(String(normalized));
  };

  const handleDraftChange = (nextValue: string) => {
    if (!/^\d*$/.test(nextValue)) return;
    setDraft(nextValue);
    if (nextValue === "") return;
    onChange(Math.max(min, Math.min(max, Number(nextValue))));
  };

  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1.5 rounded-[1rem] border border-primary/15 bg-white p-2.5 shadow-sm transition-all focus-within:border-primary/55 focus-within:ring-2 focus-within:ring-primary/12",
        !mobile && "rounded-none border-0 bg-transparent p-0 shadow-none focus-within:ring-0"
      )}
    >
      <label className={cn("text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60", !mobile && "text-sm font-medium normal-case tracking-normal text-foreground")}>
        {label}
      </label>

      <div
        className={cn(
          "flex h-9 items-center justify-between gap-2 rounded-xl border border-primary/10 bg-white/35 px-2.5 backdrop-blur-sm",
          !mobile && "h-11 border-primary/15 bg-white/45 px-3 shadow-sm"
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="text-primary">{icon}</div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            onBlur={(e) => commitDraft(e.target.value)}
            className={cn(
              "h-6 w-10 min-w-0 border-0 bg-transparent px-0 text-sm font-semibold text-foreground outline-none",
              !mobile && "text-sm font-medium"
            )}
            aria-label={label}
          />
        </div>

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            className="flex h-4 w-5 items-center justify-center rounded-md text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-primary/35"
            aria-label={`Increase ${label}`}
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            className="flex h-4 w-5 items-center justify-center rounded-md text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-primary/35"
            aria-label={`Decrease ${label}`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookingWidget() {
  const { t, dir } = useLanguage();
  const [, navigate] = useLocation();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const formattedCheckIn = checkIn ? format(checkIn, "dd/MM/yyyy") : "__/__/____";
  const formattedCheckOut = checkOut ? format(checkOut, "dd/MM/yyyy") : "__/__/____";

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;

    const checkInStr = format(checkIn, "yyyy-MM-dd");
    const checkOutStr = format(checkOut, "yyyy-MM-dd");
    const query = new URLSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      adults: String(adults),
      children: String(children),
    });
    navigate(`/booking-request?${query.toString()}`);
  };

  const calendarPopoverClassName =
    "w-auto min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-primary/15 bg-white/95 p-0 shadow-[0_20px_40px_rgba(0,0,0,0.14)]";

  return (
    <div className="mx-auto w-full rounded-[1.75rem] border border-white/20 bg-background/90 p-3 shadow-2xl backdrop-blur-md sm:p-5 md:p-6">
      <div className="rounded-[1.5rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,239,233,0.98))] p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.1)] sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex min-w-0 flex-col gap-1.5 rounded-[1rem] border border-primary/15 bg-white p-2.5 shadow-sm transition-all focus-within:border-primary/55 focus-within:ring-2 focus-within:ring-primary/12">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {t.booking.checkIn}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex h-9 w-full items-center justify-start gap-2 rounded-xl border border-primary/10 bg-white/35 px-2.5 text-start text-xs font-medium text-foreground backdrop-blur-sm transition-colors",
                    !checkIn && "text-muted-foreground"
                  )}
                  dir="ltr"
                >
                  <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">
                    {formattedCheckIn}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className={calendarPopoverClassName} align={dir === "rtl" ? "end" : "start"}>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5 rounded-[1rem] border border-primary/15 bg-white p-2.5 shadow-sm transition-all focus-within:border-primary/55 focus-within:ring-2 focus-within:ring-primary/12">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {t.booking.checkOut}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex h-9 w-full items-center justify-start gap-2 rounded-xl border border-primary/10 bg-white/35 px-2.5 text-start text-xs font-medium text-foreground backdrop-blur-sm transition-colors",
                    !checkOut && "text-muted-foreground"
                  )}
                  dir="ltr"
                >
                  <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">
                    {formattedCheckOut}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className={calendarPopoverClassName} align={dir === "rtl" ? "end" : "start"}>
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

          <CounterField
            label={t.booking.adults}
            value={adults}
            min={1}
            max={10}
            mobile
            icon={<User className="h-3.5 w-3.5 shrink-0" />}
            onChange={setAdults}
          />

          <CounterField
            label={t.booking.children}
            value={children}
            min={0}
            max={10}
            mobile
            icon={<Users className="h-3.5 w-3.5 shrink-0" />}
            onChange={setChildren}
          />
        </div>

        <div className="mt-3.5 flex justify-center">
          <Button
            className="h-10 min-w-[8rem] rounded-xl bg-primary px-5 text-xs font-semibold tracking-[0.14em] text-primary-foreground shadow-[0_12px_24px_rgba(179,91,69,0.28)] transition hover:bg-primary/90"
            onClick={handleSearch}
            disabled={!checkIn || !checkOut}
          >
            {t.booking.search}
          </Button>
        </div>
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-5 xl:items-end">
        <div className="flex min-w-0 flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            {t.booking.checkIn}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`h-11 w-full justify-start gap-2.5 overflow-hidden border-primary/15 bg-white/45 text-start text-sm font-medium backdrop-blur-sm ${!checkIn && "text-muted-foreground"}`}
                dir="ltr"
              >
                <CalendarIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{formattedCheckIn}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={calendarPopoverClassName} align={dir === "rtl" ? "end" : "start"}>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            {t.booking.checkOut}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`h-11 w-full justify-start gap-2.5 overflow-hidden border-primary/15 bg-white/45 text-start text-sm font-medium backdrop-blur-sm ${!checkOut && "text-muted-foreground"}`}
                dir="ltr"
              >
                <CalendarIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{formattedCheckOut}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={calendarPopoverClassName} align={dir === "rtl" ? "end" : "start"}>
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

        <CounterField
          label={t.booking.adults}
          value={adults}
          min={1}
          max={10}
          icon={<User className="h-4 w-4" />}
          onChange={setAdults}
        />

        <CounterField
          label={t.booking.children}
          value={children}
          min={0}
          max={10}
          icon={<Users className="h-4 w-4" />}
          onChange={setChildren}
        />

        <Button
          className="h-11 w-full text-base transition-all"
          onClick={handleSearch}
          disabled={!checkIn || !checkOut}
        >
          {t.booking.search}
        </Button>
      </div>
    </div>
  );
}
