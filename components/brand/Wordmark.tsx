import { cn } from "@/lib/utils";

/**
 * The identity — the whole identity. There is no separate icon mark.
 * Minimum width 120px. Bone on ink, or ink on bone. Nothing else.
 */
export function Wordmark({
  width = 186,
  className,
  title = "Beyond Mortals",
}: {
  width?: number | string;
  className?: string;
  title?: string;
}) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn("wordmark block shrink-0", className)}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    />
  );
}
