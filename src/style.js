/**
 * Typography scale — import from "../style" (adjust path depth) and compose, e.g.
 *   className={`${TEXT_NORMAL} font-semibold`}
 *
 * TEXT_TITLE    — Screen / dialog titles (largest)
 * TEXT_SUBTITLE — Section headers, grouped operation titles
 * TEXT_LARGE    — Prominent one-off lines (key amounts, success headings)
 * TEXT_NORMAL   — Default body, card titles, form fields, lists
 * TEXT_SMALL    — Secondary copy, timestamps, helper text (responsive)
 * TEXT_BADGE    — Chips, tags, dense labels (fixed small at all breakpoints)
 * ICON_SIZE     — Inline icons scaled with breakpoints
 */

export const TEXT_TITLE = "text-base sm:text-xl md:text-2xl lg:text-3xl";

export const TEXT_SUBTITLE = "text-sm sm:text-base md:text-lg lg:text-xl";

export const TEXT_LARGE = "text-lg sm:text-xl md:text-2xl lg:text-3xl";

export const TEXT_NORMAL = "text-sm sm:text-base md:text-lg lg:text-xl";

export const TEXT_SMALL = "text-xs sm:text-sm md:text-base lg:text-lg";

export const TEXT_BADGE = "text-xs";

export const ICON_SIZE = "text-base sm:text-xl md:text-2xl lg:text-3xl";
