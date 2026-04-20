import { useEffect, useState } from "react";

type HeroSlideshowProps = {
  slides: readonly string[];
  fallbackImage: string;
  intervalMs?: number;
  overlayClassName?: string;
  topGlowClassName?: string;
  bottomGlowClassName?: string;
};

const DEFAULT_INTERVAL = 6000;

export function HeroSlideshow({
  slides,
  fallbackImage,
  intervalMs = DEFAULT_INTERVAL,
  overlayClassName = "bg-[radial-gradient(circle_at_top,rgba(229,149,111,0.34),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_26%),linear-gradient(135deg,rgba(12,10,10,0.28),rgba(12,10,10,0.78))]",
  topGlowClassName = "bg-[linear-gradient(180deg,rgba(10,8,8,0.52),transparent)]",
  bottomGlowClassName = "bg-[linear-gradient(180deg,transparent,rgba(12,10,10,0.62))]",
}: HeroSlideshowProps) {
  const effectiveSlides = slides.length > 0 ? slides : [fallbackImage];
  const [activeSlide, setActiveSlide] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (effectiveSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % effectiveSlides.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [effectiveSlides.length, intervalMs]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {effectiveSlides.map((slide, index) => {
            const src = failedSlides[slide] ? fallbackImage : slide;

            return (
              <div key={`${slide}-${index}`} className="relative h-full min-w-full overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2200ms] ease-out ${
                    index === activeSlide ? "scale-100" : "scale-[1.045]"
                  }`}
                  onError={() => {
                    setFailedSlides((current) => ({ ...current, [slide]: true }));
                  }}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            );
          })}
        </div>
      </div>

      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className={`absolute inset-x-0 top-0 h-40 ${topGlowClassName} backdrop-blur-[1px]`} />
      <div className={`absolute inset-x-0 bottom-0 h-44 ${bottomGlowClassName}`} />
      <div className="absolute inset-y-0 left-0 hidden w-28 bg-[linear-gradient(90deg,rgba(12,10,10,0.18),transparent)] sm:block" />
      <div className="absolute inset-y-0 right-0 hidden w-28 bg-[linear-gradient(270deg,rgba(12,10,10,0.18),transparent)] sm:block" />

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[1] flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-md">
          {effectiveSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`block h-1.5 rounded-full transition-all duration-700 ${
                index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
