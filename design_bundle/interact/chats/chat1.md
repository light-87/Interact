# Note App with HTML Showcase

_Started 2026-04-24 13:11 UTC_

---

## User

Create the design for this I will then use and open this in Claude code to complete the functionality code


Create a simple note app just that it have a folder named html_standalones folder in which I will upload the html
  files and the app will just show boxes of these application with URL such that the URL will render that HTML
  automatically whatever things are present in the folder so that I can share that url to my client to see the
  interative demo of the the full scale application that we will later build for them

## Assistant

I'll design a hi-fi interactive prototype for your HTML demo gallery app. Let me ask a few quick questions to get this right.

_[tool: questions_v2]_

## User

Questions answered:
- purpose: Sharing client demos / interactive prototypes
- aesthetic: Warm & editorial (paper-like)
- card_style: Every client will require different demo so I will share the demo link by selecting it from multiple HTML flies from the folder
- metadata: Title (filename), Take the HTML name
- layout: Grid of cards
- viewer: Decide for me
- features: Search / filter
- branding: Generic 'Demos' branding
- variations: Just one polished direction
- tweaks: Card density (compact/comfy)

## Assistant

Got it. Warm & editorial paper-like aesthetic, grid of cards, filename as title, search/filter, density tweak. Let me build this.

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the main app. Warm editorial paper-like aesthetic — cream/ivory backgrounds, deep ink text, a serif display face (Fraktur/Instrument Serif feel), subtle paper texture, rule-line accents.

System choice (declaring out loud):
- **Type**: *Fraunces* for display (warm, editorial), *IBM Plex Mono* for metadata/filenames, *Source Serif 4* for body
- **Palette**: ivory `#f5efe4`, paper `#faf6ed`, ink `#1a1613`, rule `#d9cfbd`, accent `#8b3a1f` (burnt sienna)
- **Layout**: magazine-style masthead → search bar → grid of paper-card tiles with filename in mono, decorative index number, hairline rules

Wait — user said "the URL will render that HTML automatically". Since this is a design-only deliverable for Claude Code to wire up, I'll mock the real viewer URLs (`html_standalones/xxx.html`) and the gallery will `fetch` the folder listing via a manifest for the design — Claude Code can later swap in a real directory scan.

_[tool: write_file]_

_[tool: write_file]_

Now the main app + viewer page.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Let me verify the tweaks panel hook signature matches what I'm using.

_[tool: grep]_

I need to fix: `useTweaks` returns `[values, setTweak]` (array, not object), `TweakSection` uses `label` not `title`, `TweakRadio` options may need different shape.

_[tool: read_file]_

_[tool: snip]_

Now fix app.jsx — `useTweaks` returns an array, `TweakSection` uses `label`.

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Done — the Demos gallery is built in a warm editorial paper style.

**What you've got:**
- `index.html` — the catalogue page (masthead, search, grid of cards, density tweak)
- `viewer.html` — opens any demo at `viewer.html?f=<filename>.html` with a thin toolbar (back, copy link, open standalone)
- `html_standalones/` — drop your HTML files here
- `manifest.js` — lists which files to show (Claude Code should swap this for a real `fs.readdir` of the folder)

**Share URLs look like:** `viewer.html?f=checkout_flow.html`

**Notes for Claude Code:**
- Replace `manifest.js` with a server-side scan of `html_standalones/` so new files appear automatically
- The viewer uses an `<iframe sandbox>` — adjust permissions if your demos need clipboard/storage access

