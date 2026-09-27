<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-informational" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6" alt="CSS3" />
  <img src="https://img.shields.io/badge/vanilla-JS-f7df1e" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-success" alt="Zero dependencies" />
  <img src="https://img.shields.io/badge/build_step-none-success" alt="No build step" />
  <img src="https://img.shields.io/badge/license-MIT-8b5cf6" alt="MIT License" />
</p>

# Invoice Nepal

A free invoice, quotation and receipt generator built for Nepali small businesses —
cafés, shops, freelancers, tutors, studios. Works fully offline, stores nothing on a
server, and prints to A4 or A5 with one click.

Built because most Nepali businesses still write bills by hand or fight with
overpriced software that does not speak their language — PAN fields, VAT, Bikram
Sambat dates, amount in words.

## Features

**Documents**
- Invoice, Quotation and Receipt (one click to switch)
- A4 and A5 paper sizes
- Live preview that matches the print output exactly
- Print / Save as PDF straight from the browser

**Nepal-specific**
- Bikram Sambat date shown alongside the Gregorian date
- Amount in words using the lakh/crore system (e.g. *One Lakh Twenty Three Thousand Four Hundred Fifty Six*)
- PAN / VAT number fields for both parties
- VAT percentage, defaulting to 13%
- NPR, USD, INR, EUR, GBP with lakh/crore number formatting

**Business**
- Upload your logo by clicking, dragging a file in, or pasting from the clipboard
- Accepts PNG, JPG, WEBP, GIF and SVG up to 4 MB
- Photos are resized to 420 px and re-encoded automatically, so a camera-sized
  image still fits in browser storage; transparency is kept for PNG
- One logo for the whole business — it is stored once and reused on every
  invoice, quotation and receipt
- Itemised lines with quantity, rate and per-line totals
- Flat discount plus VAT, calculated automatically
- Signature area and optional authorised stamp box
- Customer address, phone and PAN on the bill

**Your data**
- Everything stays in `localStorage` — no account, no server, no tracking
- Autosaves as you type, so a refresh never loses work
- Named save slots for documents you reuse
- One-click JSON backup and restore, including your logo
- Light and dark mode

## Quick start

No build step, no install. Either:

```bash
# just open it
start index.html
```

or serve it locally (recommended, keeps autosave consistent):

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy free

Push to GitHub and enable **Pages** on the repo, or drop the three app files on
[Netlify Drop](https://app.netlify.com/drop) / [Vercel](https://vercel.com).
It is static — nothing to configure.

## Tech

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5, `<details>` panels |
| Styling | CSS custom properties, `color-mix()`, print stylesheet |
| Logic | Vanilla ES5-compatible JS, single IIFE, no build step |
| Bikram Sambat | Embedded calendar table (B.S. 1970–2090) |
| Storage | `localStorage` — one slot for the draft, one for the logo, one for saved documents |

No frameworks, no bundler, no dependencies — the whole app is three files you can
read end to end in an afternoon.

## How the maths works

```
subtotal  = Σ (qty × rate)
taxable   = max(0, subtotal − discount)
vat       = taxable × vatRate ÷ 100
total     = taxable + vat
```

## About the logo

The logo is a **business setting, not part of a document**, so it lives in its own
`localStorage` slot (`invoicenepal.logo.v1`) instead of being copied into the draft
and every saved invoice. That keeps saved documents small — a few hundred bytes
each, however large the logo is — and means starting a new document or opening an
old one never disturbs it.

Raster uploads are drawn onto a canvas capped at 420 px on the longest edge and
re-encoded as PNG when they have transparency, JPEG otherwise. SVG is kept as text
and passed through a sanitizer that strips `<script>`, event handlers, external
references and embedded content. Browsers additionally refuse to run scripts in an
SVG loaded through `<img>`, so the sanitizer is a second line of defence.

## Files

```
invoice-nepal/
├── index.html   # structure
├── styles.css   # app chrome + paper + print rules
├── app.js       # state, calculations, calendar, storage
├── README.md
└── LICENSE
```

## License

MIT
