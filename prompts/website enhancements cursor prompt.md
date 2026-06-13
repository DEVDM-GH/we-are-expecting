# Website Enhancements — Cursor Prompts

> Two combined prompts to enhance we-are-expecting.vercel.app
> Apply both changes in the same Cursor session for best results.

-----

## PROMPT 1 — Fix “Dev & Priti” Header Visibility

In the Storybook component, the “✦ Dev & Priti ✦” header text at the top of each book card is blending into the parchment background and is hard to read. Please improve it with the following changes:

1. **Increase contrast** — change the text color to a rich deep brown (`#3B1F0A`) or dark espresso tone that pops against the parchment card background (`#F5ECD7`)
1. **Add a subtle text shadow** — `text-shadow: 0px 1px 2px rgba(0,0,0,0.15)` to give it gentle depth
1. **Increase font size slightly** — bump it up by 1–2px from current size
1. **Make the ✦ sparkle decorators gold** — color them `#C9A84C` while keeping the name text dark brown, so there’s a beautiful two-tone effect
1. **Optional enhancement** — add a very subtle thin gold horizontal rule (`border-bottom: 1px solid #C9A84C`) below the “Dev & Priti” header to visually separate it from the page content, matching the gold dividers already used in the “A LITTLE STORY” title above

> **Goal:** “Dev & Priti” should feel like an elegant book dedication line — clearly readable, warm, and premium. Gold sparkles + dark brown name against the parchment card. Keep all other card styles unchanged.

-----

## PROMPT 2 — Add Photo Reveal After Locket Opens

After the locket opens and the reveal content fades in (the “Dev & Priti are expecting”, countdown, and love note), add a new section below with the following flow:

### Step 1 — The Teaser

- Show a polaroid-style card (white background, shadow, slight tilt) with a **frosted/blurred shimmer overlay** covering the photo — like a fogged-up picture
- Overlay text on the shimmer: *“our little secret… 🤫”*
- Below the polaroid, small italic text: *“tap to reveal the moment we found out 📸”*
- The polaroid should have a **gentle floating animation** (subtle up-down bob)

### Step 2 — The Flip Reveal

- On tap, trigger a **smooth 3D CSS card-flip animation** (`rotateY 0deg → 180deg`)
- The back of the card shows the actual photo (`/src/assets/couple.jpg`) inside the polaroid frame
- Below the photo, handwriting-style font text fades in:
  *“Feb 2027 — the best chapter yet ❤️”*
- Trigger a second soft confetti burst — smaller and more intimate — rose gold and gold colors only:
  `#C9A84C`, `#E8B4B8`, `#ffffff`

### Design Details

- **Polaroid frame:** white (`#FFFFFF`), padding 12px on sides, 40px at bottom, soft drop shadow
- **Rotation:** slight natural tilt `rotate(-2deg)` on the polaroid
- **Shimmer overlay:** animated gradient sweep moving left to right on loop:
  
  ```css
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.1),
    rgba(255,255,255,0.6),
    rgba(255,255,255,0.1)
  );
  ```
- **Timing:** entire photo section fades in 1 second after the love note appears — let the emotion breathe before showing the photo
- **Caption font:** Google Font `Caveat` or `Dancing Script` for the handwriting-style text below the photo
- **Responsive:** polaroid max-width 280px, centered on all screen sizes
- **Photo fit:** `object-fit: cover` so the photo fills the polaroid naturally

### Asset

Place the couple’s photo at:

```
/src/assets/couple.jpg
```

-----

## COMBINED GOAL

> The family first reads the story → unlocks the locket → gets the big news → then gets the bonus of seeing Dev & Priti’s actual faces in the magical moment they found out. The shimmer + flip combo feels like unwrapping a precious gift. 🎁🥹

-----

*For we-are-expecting.vercel.app — Dev & Priti’s Baby Announcement · Feb 2027 🌟*