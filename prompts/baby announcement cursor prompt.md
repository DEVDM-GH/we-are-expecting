# Baby Announcement Website — Cursor Prompt

> Copy and paste the prompt below directly into Cursor to build the announcement website.

-----

## 🍼 Cursor Prompt: Storybook + Countdown Locket Baby Announcement

Create a single-page React website (Vite + Tailwind CSS) for a pregnancy announcement combining a **Storybook** and a **Countdown Locket** reveal.

-----

### FLOW & EXPERIENCE

#### Stage 1 — The Storybook

- On load, show an open book centered on screen with a warm parchment/cream texture (CSS only, no images)
- Pages turn one by one (CSS 3D flip animation) with the following story. Each page turn is triggered by a “Next →” button or a tap/swipe:

|Page          |Text                                                                      |
|--------------|--------------------------------------------------------------------------|
|Page 1        |“Once upon a time, in a city called Bangalore… 🌆”                         |
|Page 2        |“…two people found each other, and built a beautiful life together. 💑”    |
|Page 3        |“They laughed, they travelled, they dreamed… ✨”                           |
|Page 4        |“And then one day, the universe gave them the most magical gift of all… 🌟”|
|Page 5 (final)|“But first… open this locket. 🔒” *(locket icon glows gently on this page)*|

-----

#### Stage 2 — The Countdown Locket

- After the final storybook page, the book gently closes and fades out
- A glowing golden locket appears centered on screen, softly pulsing
- Text below it reads: *“Something precious is waiting inside… 💛”*
- On click, the locket opens with a smooth hinge animation (CSS transform)
- Inside the locket, with a soft light glow effect, reveal:

> **“Dev & Priti are expecting! 🍼”**
> **“Baby arrives in March 2027”**
> 
> *(Below this, show a live countdown in days:)*
> **“That’s only [X] days away! 🎉”** *(calculate dynamically from Mar 1, 2027)*

- Trigger a confetti burst animation on locket open (use `canvas-confetti` npm package)
- Below the locket, fade in: *“We can’t wait for you to meet them. With all our love ❤️ — Dev & Priti”*

-----

### DESIGN

- **Color palette:** Warm ivory background, gold accents, blush pink highlights, sage green touches
- **Fonts:** Playfair Display (serif) for story text, Lato for UI elements — both from Google Fonts
- The book should look like a real storybook — rounded corners, drop shadow, parchment page color `#F5ECD7`
- The locket should be gold (`#C9A84C`) with a heart cutout, built entirely in CSS/SVG — no external images
- Fully **mobile responsive** — book and locket scale gracefully on small screens
- Subtle background: soft animated stars or floating particles (pure CSS)

-----

### TECHNICAL REQUIREMENTS

- **Stack:** Vite + React + Tailwind CSS
- **Confetti:** `canvas-confetti` npm package
- All assets self-contained — no broken external dependencies
- Static site, deployable directly to Vercel
- Include a `README.md` with local setup and Vercel deploy steps
- Countdown calculates dynamically:

```js
Math.ceil((new Date('2027-03-01') - new Date()) / (1000 * 60 * 60 * 24))
```

-----

### FOLDER STRUCTURE (Standard Vite React App)

```
baby-announcement/
├── public/
├── src/
│   ├── components/
│   │   ├── Storybook.jsx
│   │   └── Locket.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

-----

*Built with love for Dev & Priti’s little one arriving March 2027 🌟*