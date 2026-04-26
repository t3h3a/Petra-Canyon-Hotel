import { Check, CircleAlert, Users } from "lucide-react";
import { Link } from "wouter";

type RoomCardProps = {
  image: string;
  title: string;
  description: string;
  perks: string[];
  size: string;
  view: string;
  price: string;
  occupancy: string;
  availability?: string;
  policy: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
  extraBedNote?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  descriptionLanguage?: "en" | "ar" | "fr";
};

export function RoomCard({
  image,
  title,
  description,
  perks,
  size,
  view,
  price,
  occupancy,
  availability,
  policy,
  badge,
  ctaLabel,
  ctaHref,
  extraBedNote,
  secondaryLabel,
  secondaryHref,
  descriptionLanguage = "en",
}: RoomCardProps) {
  const isArabicDescription = descriptionLanguage === "ar";

  return (
    <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[18rem]">
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {size}
            </span>
            <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80">
              {view}
            </span>
            {availability ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {availability}
              </span>
            ) : null}
          </div>

          <h2 className="mt-5 text-3xl font-serif">{title}</h2>
          {isArabicDescription ? (
            <div
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "Noto Sans Arabic, sans-serif",
                textAlign: "right"
              }}
            >
              <p
                style={{
                  margin: 0,
                  lineHeight: "1.7",
                  letterSpacing: "normal",
                  textTransform: "none"
                }}
              >
                {description}
              </p>
            </div>
          ) : (
            <p>{description}</p>
          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
            <Users className="h-4 w-4 text-primary" />
            <span>{occupancy}</span>
          </div>

          <ul className="mt-6 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[1.5rem] border border-primary/10 bg-secondary/20 p-5">
            <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold text-foreground">{price}</p>
                <p className="mt-1 text-sm text-muted-foreground">Base room rate</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{badge}</span>
            </div>

            <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-4">
              <p className="text-sm font-semibold text-foreground">Room policy</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{policy}</p>
            </div>
          </div>

          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary/35 px-4 py-3 text-sm leading-6 text-muted-foreground">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{extraBedNote || "Any guest aged 6 or more needs an extra bed when exceeding the room's base capacity."}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {ctaLabel}
            </a>
            {secondaryLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/40"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
