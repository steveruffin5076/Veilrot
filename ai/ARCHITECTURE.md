# ARCHITECTURE.md — Technical Architecture & Project Structure

**Purpose:** Tells Claude Code how the project is organised, what the systems are, and where code goes. Prevents architecture drift across many implementation sessions.

**Status:** ⚠️ BLOCKED on **D-02 (engine)**. Folder structure, systems breakdown and data conventions below are 🔵 PROPOSAL and engine-agnostic; they will be finalised the moment the engine is chosen.

---

## 1. Engine / technology decision support

> ⚠️ **Research for the owner, NOT a decision.** The agent does not choose the engine.
> **This section is now scoped by DEC-001: the target is the browser, mobile browsers included.** That makes two things first-class selection criteria that a native-first project would ignore: **build size** (how long the player stares at a loading bar) and **mobile-web performance** (the weakest device sets the budget).

### 1.1 Why build size decides this project

A browser player who waits 20 seconds to load a game has usually already left. Download size is therefore a *design* constraint, not a technical detail.

| Engine | Typical minimum web build | Time to first play (50 Mbps, cold) | Verdict for Veilrot's target |
|---|---|---|---|
| **Phaser 4** (JS/TS) | ~200 KB – 2 MB | < 1 s | ✅ Best-in-class load. Web-native: no export step, the game *is* the website |
| **Defold** | < 2 MB gzipped | ~1 s | ✅ Smallest footprints in the industry; Lua workflow; smaller ecosystem |
| **Three.js / Babylon.js** (3D) | ~600 KB + app + assets | 1–3 s | ✅ Web-native 3D; you build more of the engine yourself |
| **Godot 4** (GDScript) | ~15–50 MB | 5–15 s+ | ⚠️ Workable but heavy. Web export is **GDScript-only — C# does not export to web**. Editor-based workflow is a genuine advantage |
| **Unity 6** (WebGL) | ~30–200 MB+ | 10–60 s | ❌ Poor fit: largest builds, long loads, and its mobile-web support is widely reported as weak |
| **Unreal 5** | Not practical for browsers | — | ❌ Ruled out by DEC-001 |

*Sources: engine comparison reporting for browser-first development, 2025–2026. Figures are indicative minimums, not guarantees — the agent will measure a real hello-world build for the two shortlisted engines before D-02 is finalised if the owner wants hard numbers.*

### 1.2 The shortlist

| Option | Choose it when… | What you give up |
|---|---|---|
| **Phaser 4 + TypeScript** ⭐ *agent's lead recommendation* | The game is **2D** and the browser is the product. Instant iteration (edit → refresh), tiny builds, trivial deployment to a static host, best mobile-web performance | No editor — you compose scenes in code. Weaker for 3D. Asset tooling is more manual |
| **Godot 4** | The owner or the implementer wants a **visual editor**, or the game is 3D. GDScript-only for web | 15–50 MB builds and multi-second loads — a real cost for a browser game |
| **Defold** | Absolute smallest load time matters more than ecosystem size | Smaller community, fewer tutorials, Lua |
| **Three.js / Babylon.js** | The game is **3D** and browser-first | You assemble more systems yourself; more engine code to maintain |

**Agent's recommendation for the owner's decision (D-02):** if Veilrot is 2D, **Phaser 4** is the best fit for the stated target and by a wide margin on the metrics that matter most in a browser — load time and mobile performance. If it is 3D, or if an editor-based workflow is important to how the owner and Claude Code will work, **Godot 4** is the practical alternative, accepting substantially heavier builds.

**This is a recommendation. D-02 remains an owner decision.**

### 1.3 Consequence if Godot is chosen

Godot's build size changes the design constraints: the game would need a loading screen with a real progress bar, an initial payload budget, and probably asset streaming — costs that Phaser simply does not impose. Worth weighing before deciding.

---

## 2. Repository layout

```
Veilrot/
├── README.md                 # Front door → points at /ai
├── ai/                       # ALL design & planning documentation (this folder)
│   ├── PROJECT.md … ASSET_PIPELINE.md
│   └── tasks/                # Atomic Claude Code task cards
├── assets/                   # ALL art, audio, font, data assets  (→ bundled/processed into the web build)
│   ├── art/                  # sprites, models, textures, animation
│   ├── audio/                # music, sfx, ambience
│   ├── fonts/
│   ├── ui/                   # UI atlas, icons, 9-slices
│   └── _reference/           # mood boards, style refs (NOT shipped)
├── src/                      # ⏳ exact layout confirmed with D-02 (engine)
│   ├── core/                 # bootstrapping, state machine, service locator
│   ├── gameplay/             # mechanics, systems
│   ├── entities/             # actors, characters
│   ├── ui/                   # screens, HUD, widgets
│   ├── data/                 # tunable data files (JSON/CSV)
│   ├── platform/             # web-specific: storage, audio unlock, visibility, PWA  ← new, see §11
│   ├── audio/
│   └── util/
├── tests/                    # automated tests
├── public/                   # static web shell: index.html, manifest, icons, service worker  ← if not engine-generated
└── docs/                     # (reserved) player-facing or generated docs
```

**Rule:** design intent lives in `/ai`; assets in `/assets`; code in `/src`. Claude Code must never place tunable values inline in code — they belong in `/src/data` or the engine's resource files.

---

## 3. System breakdown

> ⏳ Systems listed below are the *expected* skeleton of any game; the specific systems will be derived from the concept after intake. Each becomes a module with a single owner file.

| System | Responsibility | Depends on | Status |
|---|---|---|---|
| Bootstrapper / Game state machine | App lifecycle: boot → menu → play → pause → results | — | ⏳ |
| Input service | Device detection, remapping, action mapping | UX_UI §5 | ⏳ |
| Asset service | Loading, caching, placeholder substitution | ASSET_PIPELINE §mock protocol | ⏳ |
| Save service | Versioned save/load, migration, corruption guards | PR-7xx | ⏳ |
| Settings service | Persisted player preferences, applied on boot | UX_UI §4 | ⏳ |
| Audio service | Bus routing (music/sfx/ambience/UI), ducking | PR-8xx | ⏳ |
| UI framework | Screen stack, focus management, transitions, six states | UX_UI §2, §8 | ⏳ |
| Localization | String table lookup, no hard-coded text | NFR-11 | ⏳ |
| Core gameplay systems | ⏳ pending concept | — | ⏳ |
| Progression system | ⏳ pending concept | — | ⏳ |
| Debug / dev tools | Overlays, spawn menus, cheat toggles, frame budget readout | — | 🔵 PROPOSAL |

---

## 4. Data & configuration conventions

- **Tunables live in data, not code.** Damage numbers, speeds, spawn rates, timings — all in data files so balancing never requires a code change.
- **Naming:** `snake_case` for data keys, `PascalCase` for types/classes, `camelCase` for variables and functions, `SCREAMING_SNAKE_CASE` for constants. Prefix private members consistently within the chosen language.
- **Data format:** engine-native resources preferred; JSON/CSV as the interchange format for anything the agent or an external tool must generate.
- **Schema versioning:** every data file carries a `version` field; the save service carries an explicit migration table.

---

## 5. Save system requirements

Even before knowing the game, these are non-negotiable (they prevent the worst class of bug):

1. Saves are versioned and migration is explicit — never assume the schema is stable.
2. Writes are atomic: write to a temp file, then swap. Never overwrite in place.
3. Corruption is *detected* and reported, never loaded blindly.
4. Save data is human-inspectable for debugging.
5. What is saved is listed explicitly in this doc once gameplay exists (player state, world state, progression, settings).

---

## 6. Asset & placeholder policy (see also ASSET_PIPELINE.md)

**Missing-art-tool protocol — the project is never blocked by missing art.**

1. Every asset that does not yet exist gets a **spec entry** in `ASSET_PIPELINE.md` with an ID.
2. Code loads by **asset ID**, never by hard-coded path.
3. If the file is absent, the asset service substitutes a **procedural/mock placeholder** (primitive shape, flat colour from a deterministic palette, label text of the asset ID, or silence for audio).
4. Placeholders are visually obvious and must be trivially identifiable in screenshots.
5. Design, logic, math and systems continue to be built and tested against placeholders.
6. When the real asset lands in `/assets`, it is integrated **without code changes** beyond the registry entry.

**Consequence:** no task card may be marked blocked solely because art is missing.

---

## 7. Testing hooks

- Game logic must be testable headlessly, without rendering.
- Systems expose deterministic entry points so tests can drive them frame-by-frame.
- Randomness goes through a single seeded RNG service (crucial for reproducible tests and bug reports).
- Debug overlays toggled by a single flag/command, stripped or hidden in release.

---

## 8. Performance budgets

Per `PRODUCT_REQUIREMENTS.md` §4: 60 fps target, 16.6 ms frame budget, render ≤ 10 ms, logic ≤ 4 ms. Claude Code must include a frame-time readout in the debug overlay so regressions are visible immediately rather than discovered at polish time.

---

## 9. Open decisions

| # | Decision | Blocks | Status |
|---|---|---|---|
| D-02 | Engine | Everything technical | ⏳ OWNER — web-scoped comparison in §1 |
| ~~D-03~~ | ~~Platform~~ | — | ✅ **RESOLVED — DEC-001 browser-first** |
| D-23 | Android packaging (TWA vs Capacitor) | Android release path, Play Console timing | ⏳ OWNER — see `DECISIONS.md` §4 |
| D-24 | Web distribution (itch.io / own domain / portals) | SDK & ad integration, file-size limits, build pipeline | ⏳ OWNER |
| D-25 | Mobile browser support scope (devices/OS floor) | Performance floor, bundle budget, testing matrix | ⏳ OWNER |
| D-26 | Browser storage / save-loss policy | Save service implementation | ⏳ OWNER |
| D-12 | Multiplayer → netcode layer | Systems breakdown | ⏳ OWNER |
| D-16 | Save slots | Save service | ⏳ OWNER |
| D-21 | CI provider & build automation | Milestone 1 | 🔵 agent proposal after engine choice |
| D-22 | Branching model & review rules | All code work | 🔵 agent proposal after engine choice |

---

## 11. Web-platform architecture requirements

> Mandated by **DEC-001**. These are browser facts, not preferences — each one breaks the game if ignored. They are listed here so the implementer plans for them from Milestone 1 rather than discovering them at release.

### 11.1 Audio unlock
Browsers block audio until the player interacts with the page. The game **must** route its first audio play through an explicit "click to start" gate on the title screen, and re-unlock on resume after the page regains focus. Audio must never fail silently — a game with broken sound reads as broken.

### 11.2 Save persistence
Browser storage is not permanent: it can be evicted, and it is cleared by "clear browsing data" or by private/incognito sessions. Required mitigations:
- Use `localStorage` for small saves, `IndexedDB` for anything large; treat both as *evictable*.
- **Export/import save file** so a player can back up progress (also the support path for corrupted saves).
- Never assume a save is present — handle first-run, missing and malformed saves as normal cases.
- Request persistent storage where available, and report the result honestly rather than promising permanence.

### 11.3 Canvas scaling, DPI and input
- Render at the device pixel ratio but **cap it on mobile** — a 3× DPR phone device is a large, silent performance tax.
- Fit to the window with letterboxing (or a chosen scale policy) and handle **orientation changes** mid-session without losing state.
- Account for mobile browser UI chrome and **safe areas** (notches, gesture bars) — nothing interactive may sit under the system gesture zones.
- Pointer coordinates must be translated through the canvas transform; never assume 1 CSS pixel = 1 render pixel.
- Support mouse **and** touch **and** keyboard from the start, and switch prompt glyphs on input-device change (`UX_UI.md` §5).

### 11.4 Lifecycle: the tab is not a respectful environment
The page can be hidden, backgrounded, suspended, or killed at any moment. Required:
- Pause gameplay on `visibilitychange`; never simulate in the background.
- Clamp delta time after a long frame (returning from a background tab can produce a multi-second delta that teleports the player).
- Autosave on hide/unload where the design allows.
- The game must be resumable from a cold start at any moment.

### 11.5 Download size & loading
- Set an **initial payload budget** before production and hold to it (figure pending D-25; the agent proposes ≤ 5 MB initial download as a starting target for a browser game).
- Show a real progress indicator for anything over ~2 seconds; a frozen-looking screen is read as a crash.
- Load progressively where the design permits: core first, then stream what the current level needs.
- Compress textures (WebP/AVIF) and audio (Opus/Vorbis) as the default, not as an optimisation pass.

### 11.6 Deployment & caching
- The build is a folder of static files — deployable to any static host; the pipeline must produce one command's worth of output.
- Use content-hashed filenames + a service worker so updates are atomic and players never run a half-updated build from cache.
- A version string must be visible in the debug overlay and on the menu, so a bug report can be tied to a build. **Browser caching makes this non-optional.**
- HTTPS is mandatory (also required for TWA — `DECISIONS.md` D-23).

### 11.7 Mobile-specific performance floor
The performance budget is set by the weakest supported mobile browser (**D-25**), not by the owner's desktop. Practical implications: no per-frame allocations, pooled objects, batched sprites/draw calls, avoided layout thrash, and **measured** results on a real mid-range Android phone — not on a desktop emulator.

### 11.8 Progressive Web App (PWA)
A web manifest + service worker make the game installable to the home screen and give offline play — and they are a **prerequisite for Trusted Web Activity packaging** (`DECISIONS.md` D-23). Recommended from Milestone 3, mandatory before Android packaging.

---

## 12. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Engine comparison researched and presented (no choice made). Repo layout, data conventions, save requirements, placeholder protocol and testing hooks established. | Agent |
| 2026-09-18 | **Re-scoped for DEC-001 (browser-first).** §1 rewritten around build size and mobile-web performance with a shortlist and a lead recommendation (no decision made). Added `src/platform/` + `public/` to the layout. Added §11 web-platform architecture requirements (audio unlock, save eviction, DPI/canvas, tab lifecycle, payload budget, caching/deploy, mobile perf floor, PWA). | Agent |
