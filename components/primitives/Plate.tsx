import { cn } from "@/lib/utils";
import type { Plate as PlateT } from "@/lib/api/types";

/**
 * The universal image container. A bordered frame, a code above, a caption
 * below in mono micro-caps. Every image on the site sits inside one.
 *
 * With no `src` it renders as a pending slot — which is where the whole
 * catalogue currently sits, since no photography exists yet.
 */
export function Plate({
  plate,
  ratio = "3 / 4",
  className,
  small = false,
  showCaption = true,
  priority,
}: {
  plate: Pick<PlateT, "code" | "caption" | "src">;
  ratio?: string;
  className?: string;
  small?: boolean;
  showCaption?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      {plate.code && <span className="t-plate text-accent">{plate.code}</span>}
      <div
        className={cn(
          "plate-slot w-full",
          !plate.src && (small ? "plate-slot--pending plate-slot--pending-sm" : "plate-slot--pending"),
        )}
        style={{ aspectRatio: ratio }}
      >
        {plate.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plate.src}
            alt={plate.caption}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {showCaption && plate.caption && (
        <figcaption className="t-mono-s text-faint">{plate.caption}</figcaption>
      )}
    </figure>
  );
}

/** A bare slot, for thumbnails and background dressing. */
export function Slot({
  className,
  ratio = "3 / 4",
  small = true,
  src,
  alt = "",
}: {
  className?: string;
  ratio?: string;
  small?: boolean;
  src?: string | null;
  alt?: string;
}) {
  return (
    <div
      className={cn(
        "plate-slot",
        !src && (small ? "plate-slot--pending plate-slot--pending-sm" : "plate-slot--pending"),
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      )}
    </div>
  );
}
