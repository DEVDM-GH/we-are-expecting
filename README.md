# We Are Expecting 🍼

A magical, interactive pregnancy announcement — readers turn through a **storybook**, unlock a **golden countdown locket**, and finally unwrap a **secret photo reveal** of the moment Dev & Priti found out.

Built with **Vite + React + Tailwind CSS**, deployed on Vercel.

🔗 **Live:** [we-are-expecting.vercel.app](https://we-are-expecting.vercel.app)

---

## The Experience

1. **📖 Storybook** — a 5-page story turns one page at a time with a CSS 3D page-flip animation, leading up to the big moment.
2. **🔒 Countdown Locket** — a large golden locket whose cover hinges open to reveal the announcement, the due date, and a live countdown badge.
3. **📸 Photo Reveal** — a polaroid with a frosted shimmer teaser flips in 3D to show the real photo, with an intimate second confetti burst.

---

## Features

- 📖 **Storybook** — 5-page narrative with CSS 3D page-flip animation and progress dots
- 🔒 **Countdown Locket** — full-cover gold lid hinges open (`rotateX` + `backface-visibility`) with a staggered, sequential content reveal
- 🎉 **Confetti** — celebratory burst on locket open + a softer rose-gold burst on the photo flip (`canvas-confetti`)
- ⏳ **Live countdown** — dynamically calculates the days remaining until February 2027
- 📸 **Photo reveal** — frosted shimmer teaser that flips in 3D to the real photo, with a `Caveat` handwriting caption
- 🍼 **Custom tab icon** — themed SVG favicon (gold heart locket) with an emoji fallback
- 📱 **Fully responsive** — book, locket, and polaroid scale gracefully on mobile and desktop
- ✨ **Animated background** — soft twinkling particles in the brand palette

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool & dev server |
| React 18 | UI components |
| Tailwind CSS 3 | Styling & animation utilities |
| canvas-confetti | Confetti effects |
| Google Fonts | Playfair Display, Lato, Caveat |

---

## Project Structure

```
we-are-expecting/
├── public/
│   └── favicon.svg          # themed tab icon
├── src/
│   ├── assets/
│   │   └── couple.png       # photo revealed after the locket
│   ├── components/
│   │   ├── Storybook.jsx    # 5-page flip story
│   │   ├── Locket.jsx       # countdown locket + reveal
│   │   ├── PhotoReveal.jsx  # polaroid shimmer + 3D flip
│   │   └── Stars.jsx        # animated background particles
│   ├── App.jsx              # stage manager (storybook → locket)
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Local Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
```

The optimized output is generated in the `dist/` folder. Preview it locally with:

```bash
npm run preview
```

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `we-are-expecting` repository
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `*.vercel.app` 🎉

---

## Customization

- **Due date / countdown** — update `BABY_DATE` in `src/components/Locket.jsx`
- **Story pages** — edit the `PAGES` array in `src/components/Storybook.jsx`
- **Photo** — replace `src/assets/couple.png`
- **Colors & fonts** — adjust the theme in `tailwind.config.js`

---

*Built with love for Dev & Priti's little one arriving February 2027 🌟*
