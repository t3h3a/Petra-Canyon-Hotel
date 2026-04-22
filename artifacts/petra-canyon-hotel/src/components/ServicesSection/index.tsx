import type { LucideIcon } from "lucide-react";

type ServiceItem = {
  key: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
};

export function ServicesSection({ items }: { items: ServiceItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.key} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-serif">{item.title}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">{item.headline}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
          </article>
        );
      })}
    </div>
  );
}
