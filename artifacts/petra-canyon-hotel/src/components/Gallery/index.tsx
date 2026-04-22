type GalleryItem = {
  title: string;
  description: string;
  image: string;
};

export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
        >
          <div className="relative h-64">
            <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-serif">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
