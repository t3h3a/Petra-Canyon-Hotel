import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type BookingRoomOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type BookingRoomRow = {
  id: string;
  title: string;
  roomType: string;
  adults: number;
  childrenUnder6: number;
  children6Plus: number;
  options: BookingRoomOption[];
  summary: string;
  totals: string[];
  invalid?: boolean;
};

type BookingFormProps = {
  labels: Record<string, string>;
  form: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    arrivalTime: string;
    notes: string;
  };
  rooms: BookingRoomRow[];
  estimate: string;
  canAddRoom: boolean;
  submitting: boolean;
  onChangeField: (field: string, value: string) => void;
  onRoomTypeChange: (roomId: string, value: string) => void;
  onGuestChange: (roomId: string, field: "adults" | "childrenUnder6" | "children6Plus", value: number) => void;
  onAddRoom: () => void;
  onRemoveRoom: (roomId: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function BookingForm({
  labels,
  form,
  rooms,
  estimate,
  canAddRoom,
  submitting,
  onChangeField,
  onRoomTypeChange,
  onGuestChange,
  onAddRoom,
  onRemoveRoom,
  onSubmit,
}: BookingFormProps) {
  return (
    <form className="mt-8 grid gap-6" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{labels.fullName}</label>
          <Input value={form.fullName} onChange={(e) => onChangeField("fullName", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{labels.email}</label>
          <Input type="email" value={form.email} onChange={(e) => onChangeField("email", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{labels.phone}</label>
          <Input value={form.phone} onChange={(e) => onChangeField("phone", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{labels.country}</label>
          <Input value={form.country} onChange={(e) => onChangeField("country", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{labels.arrivalTime}</label>
          <Input value={form.arrivalTime} onChange={(e) => onChangeField("arrivalTime", e.target.value)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
        </div>
        <div className="rounded-[1.5rem] border border-primary/10 bg-secondary/20 px-5 py-4">
          <p className="text-sm font-semibold text-foreground">{labels.estimateTitle}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{labels.estimateBody}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-serif text-foreground">{labels.roomsTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{labels.roomsHint}</p>
          </div>
          <Button type="button" onClick={onAddRoom} disabled={!canAddRoom} className="rounded-full px-5 disabled:opacity-60">
            {labels.addRoom}
          </Button>
        </div>

        {rooms.map((room, index) => (
          <div
            key={room.id}
            className={`rounded-[1.75rem] border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.05)] ${
              room.invalid ? "border-destructive/30 bg-destructive/5" : "border-primary/10 bg-white"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-xl font-serif text-foreground">
                {labels.roomLabel} {index + 1}
              </h4>
              <Button type="button" variant="ghost" onClick={() => onRemoveRoom(room.id)} disabled={rooms.length === 1} className="rounded-full text-destructive disabled:opacity-40">
                {labels.removeRoom}
              </Button>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{labels.roomType}</label>
                <Select value={room.roomType} onValueChange={(value) => onRoomTypeChange(room.id, value)}>
                  <SelectTrigger className="h-12 rounded-2xl border-primary/10 bg-background/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-primary/10 bg-white/95 backdrop-blur-md">
                    {room.options.map((option) => (
                      <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{labels.adults}</label>
                  <Input type="number" min="1" max="6" value={room.adults} onChange={(e) => onGuestChange(room.id, "adults", Number(e.target.value) || 1)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{labels.childUnder6}</label>
                  <Input type="number" min="0" max="6" value={room.childrenUnder6} onChange={(e) => onGuestChange(room.id, "childrenUnder6", Number(e.target.value) || 0)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{labels.childOver6}</label>
                  <Input type="number" min="0" max="6" value={room.children6Plus} onChange={(e) => onGuestChange(room.id, "children6Plus", Number(e.target.value) || 0)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-primary/10 bg-secondary/20 p-5">
              <p className="text-sm font-semibold text-foreground">{labels.roomSummary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {room.totals.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-foreground">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{room.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">{labels.notes}</label>
        <Textarea
          value={form.notes}
          onChange={(e) => onChangeField("notes", e.target.value)}
          placeholder={labels.notesPlaceholder}
          className="min-h-[9rem] rounded-[1.5rem] border-primary/10 bg-background/70"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(197,138,112,0.09),rgba(255,255,255,0.82))] px-5 py-5">
        <div>
          <p className="text-sm font-semibold text-foreground">{labels.totalEstimate}</p>
          <p className="mt-1 text-2xl font-semibold text-primary">{estimate}</p>
        </div>
        <Button type="submit" disabled={submitting} className="h-12 rounded-full px-6 text-sm font-semibold disabled:opacity-70">
          {submitting ? labels.sending : labels.send}
        </Button>
      </div>
    </form>
  );
}
