# Marion & Mau — React Anniversary Website

A Vite + React anniversary website for Marion and Mau, with the supplied four photos.

## Requirements
- Node.js 20 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Project structure
```text
marion-mau-react/
├── public/
│   └── images/          # The four supplied couple photos
├── src/
│   ├── App.jsx          # React page and interactions
│   ├── main.jsx         # React entry point
│   └── styles.css       # Responsive styling
├── index.html
├── package.json
└── README.md
```

## Personalize
- Edit the love-letter text and `reasons` array in `src/App.jsx`.
- Replace or add photos in `public/images/` and update the `memories` array.
- The relationship start is November 20, 2024 (Philippines time, UTC+8).
- The song section embeds The Juans' official lyric video for “Ngiti”. The player loads after the visitor presses the envelope or play button. Browser autoplay restrictions may still require pressing play inside the video.

## Deploy
Run `npm run build`, then deploy the contents of `dist/` to GitHub Pages, Netlify, Vercel, or another static host. For GitHub Pages under a repository subpath, configure Vite's `base` in `vite.config.js` to match the repository name.

## Envelope interaction
Click the envelope to open the letter and start the song. Click it again to close the letter and stop the embedded song.

## Creative anniversary extras
- A full-screen personal welcome screen for Mau.
- Subtle falling flower petals.
- A three-stop anniversary timeline.
- A hidden surprise message card near the footer.

## More interactive extras
- Reorderable polaroid wall: drag photos to rearrange them on desktop.
- Four "Open when..." letters with personal supportive notes.
- Three-question relationship quiz with answer feedback.

## Vite parse error fix
The source has been corrected so React state declarations use real line breaks instead of literal `\\n` characters. If you copied an older `App.jsx`, replace it with the corrected `src/App.jsx` in this archive.
