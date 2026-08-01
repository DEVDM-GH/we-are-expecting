# Storybook UX Upgrade — Cursor Prompts

> Replace the current static card + Next button storybook on we-are-expecting.vercel.app
> Six options below — recommended combo at the end.

-----

## TABLE OF CONTENTS

1. [Option 1 — Realistic 3D Book Page Turn](#option-1--realistic-3d-book-page-turn)
1. [Option 2 — Full Screen Cinematic Swipe](#option-2--full-screen-cinematic-swipe)
1. [Option 3 — Vertical Scroll Story](#option-3--vertical-scroll-story)
1. [Option 4 — Stacked Cards Peel](#option-4--stacked-cards-peel)
1. [Option 5 — Typewriter + Fade Reveal](#option-5--typewriter--fade-reveal)
1. [Option 6 — Polaroid Wall Reveal](#option-6--polaroid-wall-reveal)
1. [⭐ RECOMMENDED — Combined Option 1 + 5](#-recommended--combined-option-1--5)

-----

## Option 1 — Realistic 3D Book Page Turn

Replace the current static card + Next button storybook with a realistic 3D open book with physical page turns.

### Layout

- Show a **double-page open book** centered on screen
- Left page shows the previous story beat; right page shows the current one
- Book has realistic proportions: hardcover spine in the center, slightly curved pages, drop shadow underneath

### Page Turn Animation

- On “Next” tap, the **right page lifts and flips left** using CSS `perspective` and `rotateY(0deg → -180deg)`
- During the flip, a **page curl shadow** appears under the turning page
- The back of the flipping page (visible mid-turn) shows a warm parchment texture
- Flip duration: 0.7s ease-in-out
- After flip completes, new content fades in on the right page

### Design Details

- Book cover: deep brown (`#3B1F0A`) with gold title embossing *“Dev & Priti”*
- Pages: parchment `#F5ECD7`
- Spine: dark leather texture using CSS gradients
- Page numbers at bottom center of each page
- Subtle paper texture on pages using CSS noise or SVG filter

### Navigation

- Left/right tap zones on either side of the book (invisible hit areas)
- Small arrow indicators at page edges
- Remove the pill-shaped NEXT button — navigation is gesture/tap based
- On mobile: full-width book, single page view with swipe gesture

-----

## Option 2 — Full Screen Cinematic Swipe

Replace the current storybook with a full-screen immersive cinematic experience.

### Layout

- Each story page takes **100vw × 100vh** (full screen)
- Warm ivory background with floating particle animation carried over from current design

### Transition

- Swipe left or tap right arrow to advance
- **Horizontal slide transition** with parallax: background moves at 20% speed, content moves at 100% speed
- Outgoing page slides left and fades out; incoming page slides in from right
- Transition duration: 0.5s cubic-bezier

### Each Page Layout

- Emoji centered, 4rem, with a subtle entrance animation (scale 0.5 → 1)
- Story text below, Playfair Display, 1.8rem, centered
- Page indicator dots at the very bottom (matching current design)

### Navigation

- Swipe gesture (touch) for mobile
- Left/right keyboard arrows for desktop
- Subtle translucent arrow buttons on left and right edges

### Progress Bar

- Thin gold line at the very top of the screen
- Fills left to right as pages advance
- Smooth transition between pages

-----

## Option 3 — Vertical Scroll Story

Replace the storybook with a mobile-native vertical scroll experience.

### Layout

- Each story page is a **full-screen section** (100vh)
- User scrolls down naturally — no buttons needed
- Scroll snap: `scroll-snap-type: y mandatory` so each page locks into place

### Entrance Animation Per Page

- As each section scrolls into view: content **fades in + scales up** from 0.9 → 1.0
- Previous section **shrinks and fades** as it exits upward
- Use Intersection Observer API to trigger animations

### Progress Indicator

- Vertical progress bar on the right edge of the screen
- Gold fill grows downward as user scrolls through the story
- Small dot markers for each page

### Design

- Each page has a slightly different **warm background tint** — alternating between ivory `#FDF6E3` and blush `#FFF0F0`
- Emoji floats in 300ms before the text
- Text fades in 300ms after emoji

-----

## Option 4 — Stacked Cards Peel

Replace the storybook with a tactile stacked card deck experience.

### Layout

- All 5 story cards are **stacked on top of each other**, slightly offset (each card rotated ±2–3deg randomly, offset 4px down and right)
- Only the top card is fully visible; edges of cards below peek out from underneath
- Stack sits centered on screen with a subtle drop shadow

### Peel Animation

- On tap, the **top card peels from the bottom-right corner**
- Corner lifts first (`transform-origin: top left`), then the whole card arcs away
- Reveal the next card underneath with a subtle scale-up (0.97 → 1.0)
- Animation: 0.6s ease-in-out
- Each card has a slightly different rotation so the stack feels natural

### Design

- Cards: parchment `#F5ECD7`, rounded corners 16px, drop shadow
- Card counter: *“3 of 5”* in small gold text at top right of each card
- Peeled card disappears off-screen to the bottom-right

-----

## Option 5 — Typewriter + Fade Reveal

Replace the storybook with a deeply emotional typewriter experience.

### Layout

- One story beat at a time, **full screen**, no book frame
- Clean, minimal — just warm background, emoji, and text

### Sequence Per Page

1. Emoji **floats down** from above with a soft bounce (0.4s)
1. Text **types itself out** letter by letter — 50ms per character
1. After last character, a **soft gold cursor blink** appears for 1s
1. After 2.5s pause, entire page **fades out** and next page fades in automatically
1. Tap anywhere to skip to next page early

### Design

- Font: Playfair Display italic, 2rem, deep brown `#3B1F0A`
- Background: warm ivory with very subtle vignette edges
- Emoji: 3.5rem, centered above text

### Progress

- 5 small gold dots at the bottom, filling one by one as pages auto-advance
- Tap anywhere to skip to next page early

-----

## Option 6 — Polaroid Wall Reveal

Replace the storybook with a corkboard polaroid pinning experience — matching the cork board visible in the couple’s actual photo.

### Layout

- A **warm corkboard texture background** (CSS — cork pattern using gradients and noise)
- Story beats appear as **polaroid photos being pinned** to the board one by one

### Animation Per Beat

- Polaroid drops in from the top with a slight rotation
- A pushpin graphic appears at the top center of each polaroid as it lands
- Polaroid settles with a subtle bounce
- Text inside the polaroid fades in after it lands

### Polaroid Design

- White frame, 12px padding sides, 40px bottom
- Handwriting font (`Caveat`) for caption text
- Each polaroid randomly rotated ±5deg
- Emoji at top, caption below
- Soft drop shadow

### Final Polaroid

- The 5th polaroid is **blurred/frosted** when it lands
- Caption reads: *“and then… 🔒”*
- Tap to unblur — transitions to the locket screen

### Corkboard Details

- Background: `#C4A882` with subtle noise texture
- Pushpin colors: red, gold, blue — randomly assigned
- Polaroids arranged in a natural scattered grid, not perfectly aligned

-----

## ⭐ RECOMMENDED — Combined Option 1 + 5

The best of both worlds — realistic 3D book page flip with typewriter text on each new page.

Replace the current static card + Next button storybook with the following combined experience:

### Book Structure (from Option 1)

- **Double-page open book** centered on screen
- Left page: previous story beat; Right page: current one
- Book cover: deep brown `#3B1F0A` with gold embossed *“Dev & Priti”*
- Pages: parchment `#F5ECD7`
- Realistic spine, page curl shadow during flip, drop shadow beneath the book
- On mobile: single page view, full-width, swipe gesture to turn

### Page Turn Animation (from Option 1)

- Right page lifts and flips left: `rotateY(0deg → -180deg)`, 0.7s ease-in-out
- Page curl shadow visible mid-flip
- Back of turning page shows plain parchment texture

### Typewriter Text Reveal (from Option 5)

After each page turn completes, content appears like this:

1. Emoji floats in first (scale 0 → 1, 0.3s)
1. Text types itself out letter by letter (50ms per character)
1. Gold blinking cursor appears after last character for 1s then fades

### Navigation

- Elegant gold bookmark tab on the right edge of the book as the “Next” button
- Swipe gesture also works on mobile
- Page numbers at bottom center of the right page

### Story Pages

|Page|Emoji|Text                                                                      |
|----|-----|--------------------------------------------------------------------------|
|1   |🌆    |*“Once upon a time, in a city called Bangalore…”*                         |
|2   |💑    |*”…two people found each other, and built a beautiful life together.”*    |
|3   |✨    |*“They laughed, they travelled, they dreamed…”*                           |
|4   |🌟    |*“And then one day, the universe gave them the most magical gift of all…”*|
|5   |🔒    |*“But first… open this locket.”*                                          |

### Transition to Locket

- After Page 5 typewriter completes, the **book slowly closes** (both covers animate shut, 1s)
- Book gently shrinks and fades out
- Locket fades in on the now-clear screen

-----

*For we-are-expecting.vercel.app — Dev & Priti’s Baby Announcement · Mar 2027 🌟*