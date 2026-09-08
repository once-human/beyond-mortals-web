/**
 * Grain in three grades, plus an uneven off-centre vignette.
 * Applied once, at the root, over everything. Never per component.
 */
export function Film() {
  return (
    <div className="film" aria-hidden>
      <div className="film__vignette" />
      <div className="film__fine" />
      <div className="film__coarse" />
      <div className="film__dust" />
    </div>
  );
}
