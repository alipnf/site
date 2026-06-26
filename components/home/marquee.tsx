import { stackItems } from "@/lib/home-data";

export function Marquee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "overflow-hidden border-y border-border-soft py-4" : "relative z-[2] overflow-hidden border-y border-border-soft bg-bg-primary py-7"} aria-label="Technical stack">
      <div className="marquee-track">
        {[...stackItems, ...stackItems].map((item, index) => (
          <span className={compact ? "marquee-item marquee-item-compact" : "marquee-item"} key={`${item}-${index}`}>
            {item}
            <span className="sep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
